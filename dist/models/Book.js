"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

// creating the database Book schema
var bookSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  imageName: {
    type: String
  },
  likes: {
    type: Number,
    "default": 0
  },
  dislikes: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Book", bookSchema);

exports["default"] = _default;