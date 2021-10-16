"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardRoutes = void 0;

var _express = require("express");

var _card = require("../../controllers/card.controller");

var _card2 = require("../../validations/card.validation");

var router = (0, _express.Router)();
router.route('/').post(_card2.CardValidation.createNew, _card.CardController.createNew);
router.route('/:id').put(_card2.CardValidation.update, _card.CardController.update);
var CardRoutes = router;
exports.CardRoutes = CardRoutes;