"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiV1 = void 0;

var _express = _interopRequireDefault(require("express"));

var _constants = require("../../utilities/constants");

var _board = require("./board.route");

var _column = require("./column.route");

var _card = require("./card.route");

var router = _express["default"].Router();
/**
 * GET v1/status
 */


router.get('/status', function (req, res) {
  return res.status(_constants.HttpStatusCode.OK).json({
    status: '200 OK'
  });
});
/** Board APIs */

router.use('/boards', _board.BoardRoutes);
/** Column APIs */

router.use('/columns', _column.ColumnRoutes);
/** Column APIs */

router.use('/cards', _card.CardRoutes);
var apiV1 = router;
exports.apiV1 = apiV1;