"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;

require('dotenv').config();

var env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_PORT: process.env.APP_PORT,
  SERVER_TYPE: process.env.SERVER_TYPE
};
exports.env = env;