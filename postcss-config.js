"use strict";

const lost = require("lost");
const pxtorem = require("postcss-pxtorem");
const autoprefixer = require("autoprefixer");

module.exports = [
  lost(),
  pxtorem({
    rootValue: 16,
    unitPrecision: 5,
    propList: ["*"],
    selectorBlackList: [],
    replace: true,
    mediaQuery: true,
    minPixelValue: 0,
  }),
  autoprefixer(),
];
