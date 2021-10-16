"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("../config/mongodb");

var _mongodb2 = require("mongodb");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Define column collection
var collectionName = 'columns';

var columnCollectionSchema = _joi["default"].object({
  boardId: _joi["default"].string().required(),
  title: _joi["default"].string().required().min(4).max(21).trim(),
  cardOrder: _joi["default"].array().items(_joi["default"].string())["default"]([]),
  createdAt: _joi["default"].date().timestamp()["default"](Date.now()),
  updatedAt: _joi["default"].date().timestamp()["default"](null),
  _destroy: _joi["default"]["boolean"]()["default"](false)
});

var validateSchema = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return columnCollectionSchema.validateAsync(data, {
              abortEarly: false
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateSchema(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createNew = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    var validatedValue, insertValue, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return validateSchema(data);

          case 3:
            validatedValue = _context2.sent;
            insertValue = _objectSpread(_objectSpread({}, validatedValue), {}, {
              boardId: (0, _mongodb2.ObjectId)(validatedValue.boardId)
            });
            _context2.next = 7;
            return (0, _mongodb.getDB)().collection(collectionName).insertOne(insertValue);

          case 7:
            result = _context2.sent;
            _context2.next = 10;
            return (0, _mongodb.getDB)().collection(collectionName).findOne({
              _id: result.insertedId
            });

          case 10:
            return _context2.abrupt("return", _context2.sent);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function createNew(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @param {string} columnId
 * @param {string} cardId
 */


var pushCardOrder = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(columnId, cardId) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _mongodb.getDB)().collection(collectionName).findOneAndUpdate({
              _id: (0, _mongodb2.ObjectId)(columnId)
            }, {
              $push: {
                cardOrder: cardId
              }
            }, {
              returnDocument: 'after'
            });

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", result.value);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            throw new Error(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function pushCardOrder(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, data) {
    var resetData, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            resetData = data.boardId ? _objectSpread(_objectSpread({}, data), {}, {
              boardId: (0, _mongodb2.ObjectId)(data.boardId)
            }) : _objectSpread({}, data);
            _context4.prev = 1;
            _context4.next = 4;
            return (0, _mongodb.getDB)().collection(collectionName).findOneAndUpdate({
              _id: (0, _mongodb2.ObjectId)(id)
            }, {
              $set: resetData
            }, {
              returnDocument: 'after'
            });

          case 4:
            result = _context4.sent;
            return _context4.abrupt("return", result.value);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            throw new Error(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function update(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var ColumnModel = {
  collectionName: collectionName,
  createNew: createNew,
  update: update,
  pushCardOrder: pushCardOrder
};
exports.ColumnModel = ColumnModel;