"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _joi = _interopRequireDefault(require("joi"));

var _mongodb = require("../config/mongodb");

var _mongodb2 = require("mongodb");

var _column = require("./column.model");

var _card = require("./card.model");

var _lodash = require("lodash");

// Define board collection
var collectionName = 'boards';

var boardCollectionSchema = _joi["default"].object({
  title: _joi["default"].string().required().min(4).max(21).trim(),
  columnOrder: _joi["default"].array().items(_joi["default"].string())["default"]([]),
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
            return boardCollectionSchema.validateAsync(data, {
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
    var value, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return validateSchema(data);

          case 3:
            value = _context2.sent;
            _context2.next = 6;
            return (0, _mongodb.getDB)().collection(collectionName).insertOne(value);

          case 6:
            result = _context2.sent;
            _context2.next = 9;
            return (0, _mongodb.getDB)().collection(collectionName).findOne({
              _id: result.insertedId
            });

          case 9:
            return _context2.abrupt("return", _context2.sent);

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            throw new Error(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function createNew(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, data) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _mongodb.getDB)().collection(collectionName).findOneAndUpdate({
              _id: (0, _mongodb2.ObjectId)(id)
            }, {
              $set: data
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

  return function update(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * @param {string} boardId
 * @param {string} columnId
 */


var pushColumnOrder = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(boardId, columnId) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _mongodb.getDB)().collection(collectionName).findOneAndUpdate({
              _id: (0, _mongodb2.ObjectId)(boardId)
            }, {
              $push: {
                columnOrder: columnId
              }
            }, {
              returnDocument: 'after'
            });

          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", result.value);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            throw new Error(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function pushColumnOrder(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var getFullBoard = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _mongodb.getDB)().collection(collectionName).aggregate([{
              $match: {
                _id: (0, _mongodb2.ObjectId)(id),
                _destroy: false
              }
            }, // { $addFields: { _id: { $toString: "$_id" } } },
            {
              $lookup: {
                from: _column.ColumnModel.collectionName,
                //collection to join
                localField: '_id',
                //field from the input documents
                foreignField: 'boardId',
                //field from the documents of the "from" collection
                as: 'columns' //array field

              }
            }, {
              $lookup: {
                from: _card.CardModel.collectionName,
                //collection to join
                localField: '_id',
                //field from the input documents
                foreignField: 'boardId',
                //field from the documents of the "from" collection
                as: 'cards' //array field

              }
            }]).toArray();

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", result[0] || {});

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function getFullBoard(_x7) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteItem = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(data) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _mongodb.getDB)().collection(collectionName).deleteMany(data);

          case 3:
            result = _context6.sent;
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            throw new Error(_context6.t0);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 6]]);
  }));

  return function deleteItem(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

var BoardModel = {
  createNew: createNew,
  update: update,
  deleteItem: deleteItem,
  getFullBoard: getFullBoard,
  pushColumnOrder: pushColumnOrder
};
exports.BoardModel = BoardModel;