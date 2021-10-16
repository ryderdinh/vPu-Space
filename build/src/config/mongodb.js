"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDB = exports.connectDB = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

var _environtment = require("./environtment");

var uri = _environtment.env.MONGODB_URI;
var dbInstance = null;

var connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = new _mongodb.MongoClient(uri, {
              useUnifiedTopology: true,
              useNewUrlParser: true
            }); //TODO: Connect to the server

            _context.next = 3;
            return client.connect();

          case 3:
            //TODO: Assign clientDB to our dbInstance
            dbInstance = client.db(_environtment.env.DATABASE_NAME);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}(); //? Get database instance


exports.connectDB = connectDB;

var getDB = function getDB() {
  if (!dbInstance) throw new Error('No database instance');
  return dbInstance;
};

exports.getDB = getDB;