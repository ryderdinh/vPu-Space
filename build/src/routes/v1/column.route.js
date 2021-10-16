"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnRoutes = void 0;

var _express = require("express");

var _column = require("../../controllers/column.controller");

var _column2 = require("../../validations/column.validation");

var router = (0, _express.Router)();
router.route('/').post(_column2.ColumnValidation.createNew, _column.ColumnController.createNew);
router.route('/:id').put(_column2.ColumnValidation.update, _column.ColumnController.update);
var ColumnRoutes = router;
exports.ColumnRoutes = ColumnRoutes;