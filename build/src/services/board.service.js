"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _board = require("../models/board.model");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var keysBoard = ['title', 'columnOrder', 'updatedAt', '_destroy'];

var createNew = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _board.BoardModel.createNew(data);

          case 3:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw new Error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function createNew(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getFullBoard = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(boardId) {
    var board, transformBoard;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _board.BoardModel.getFullBoard(boardId);

          case 3:
            board = _context2.sent;

            if (!(!board || !board.columns)) {
              _context2.next = 6;
              break;
            }

            throw new Error('Board not found');

          case 6:
            transformBoard = (0, _lodash.cloneDeep)(board); // Filter deleted columns

            transformBoard.columns = transformBoard.columns.filter(function (column) {
              return !column._destroy;
            }); // Add card to each column

            transformBoard.columns.forEach(function (column) {
              column.cards = transformBoard.cards.filter(function (card) {
                return card.columnId.toString() === column._id.toString();
              });
            }); // Sort column by columnOrder, sort cards bt cardOrder
            // Remove cards data from transformBoard

            delete transformBoard.cards;
            return _context2.abrupt("return", transformBoard);

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

  return function getFullBoard(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var update = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, data) {
    var updateData, listKeyData, _i, _listKeyData, keyItem, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            updateData = _objectSpread(_objectSpread({}, data), {}, {
              updatedAt: Date.now()
            });
            listKeyData = Object.keys(updateData); // Remove unnecessary keys (Ex remove: _id)

            for (_i = 0, _listKeyData = listKeyData; _i < _listKeyData.length; _i++) {
              keyItem = _listKeyData[_i];

              if (!keysBoard.includes(keyItem)) {
                delete updateData[keyItem];
              }
            }

            _context3.next = 6;
            return _board.BoardModel.update(id, updateData);

          case 6:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            throw new Error("Board-service: ".concat(_context3.t0));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function update(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var BoardService = {
  createNew: createNew,
  getFullBoard: getFullBoard,
  update: update
};
exports.BoardService = BoardService;