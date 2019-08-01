"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _booksCtrl = _interopRequireDefault(require("../controllers/booksCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // importing the books routes controller

router.get('/view', _booksCtrl["default"].getBooks);
router.get('/view/:id', _booksCtrl["default"].getOneBook);
router.get('/add', _booksCtrl["default"].formRender);
router.post('/add', _booksCtrl["default"].createBook);
router.post('/like/:id', _booksCtrl["default"].addLike);
router.post('/dislike/:id', _booksCtrl["default"].addDislike);
router["delete"]('/:id', _booksCtrl["default"].deleteBook);
var _default = router;
exports["default"] = _default;