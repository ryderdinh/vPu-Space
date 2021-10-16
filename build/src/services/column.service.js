"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _column = require("../models/column.model");

var _board = require("../models/board.model");

var _card = require("../models/card.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var keysColumn = ['boardId', 'cardOrder', 'title', 'updatedAt', '_destroy'];

var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var newColumnData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _column.ColumnModel.createNew(data);

          case 3:
            newColumnData = _context.sent;
            newColumnData.cards = []; // Update column order

            _context.next = 7;
            return _board.BoardModel.pushColumnOrder(newColumnData.boardId.toString(), newColumnData._id.toString());

          case 7:
            return _context.abrupt("return", newColumnData);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function createNew(_x) {
    return _ref.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, data) {
    var updateData, listKeyData, _i, _listKeyData, keyItem, result;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            updateData = _objectSpread(_objectSpread({}, data), {}, {
              updatedAt: Date.now()
            });
            listKeyData = Object.keys(updateData); // Remove unnecessary keys (Ex remove: _id)

            for (_i = 0, _listKeyData = listKeyData; _i < _listKeyData.length; _i++) {
              keyItem = _listKeyData[_i];

              if (!keysColumn.includes(keyItem)) {
                delete updateData[keyItem];
              }
            }

            _context2.next = 6;
            return _column.ColumnModel.update(id, updateData);

          case 6:
            result = _context2.sent;

            if (result._destroy) {
              // Delete many card in this column
              _card.CardModel.deleteMany(result.cardOrder);
            }

            return _context2.abrupt("return", result);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            throw new Error("column-service: ".concat(_context2.t0));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function update(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var ColumnService = {
  createNew: createNew,
  update: update
};
exports.ColumnService = ColumnService;