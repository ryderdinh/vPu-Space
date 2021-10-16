"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;

var _environtment = require("./environtment");

var whitelist = ['https://vpuspace.pages.dev'];
var corsOptions = _environtment.env.SERVER_TYPE === 'DEV' ? '' : {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("".concat(_origin, " not allowed by CORS")));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
exports.corsOptions = corsOptions;