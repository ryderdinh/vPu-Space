"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _cors2 = require("./config/cors");

var _environtment = require("./config/environtment");

var _mongodb = require("./config/mongodb");

var _v = require("./routes/v1");

var port = _environtment.env.APP_PORT;
var host = "http://localhost:".concat(port); //? DATABASE

(0, _mongodb.connectDB)().then(function () {
  console.clear();
  console.log('[🌀]  Database');
}).then(function () {
  return bootServer();
})["catch"](function (err) {
  console.error(err);
  process.exit(1);
});

var bootServer = function bootServer() {
  var app = (0, _express["default"])(); // Allow cors

  app.use((0, _cors["default"])(_cors2.corsOptions)); //? Enable req.body data

  app.use(_express["default"].json()); //? ROUTER

  app.use('/v1', _v.apiV1); //? CONNECT TO PORT

  app.listen(process.env.PORT || port, function () {
    console.log('[🌀]  Server: @vpuspace');
    console.log('    ◽' + host);
    console.log('    ◽' + 'ctrl+click to open');
  });
};