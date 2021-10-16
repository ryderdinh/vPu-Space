"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoardRoutes = void 0;

var _express = require("express");

var _board = require("../../controllers/board.controller");

var _board2 = require("../../validations/board.validation");

var router = (0, _express.Router)();
router.route('/').post(_board2.BoardValidation.createNew, _board.BoardController.createNew);
router.route('/:id').get(_board.BoardController.getFullBoard).put(_board2.BoardValidation.update, _board.BoardController.update);
var BoardRoutes = router;
exports.BoardRoutes = BoardRoutes;