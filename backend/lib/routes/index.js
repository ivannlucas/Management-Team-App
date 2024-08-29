"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var router = (0, _express.Router)();
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
var _default = exports["default"] = router;