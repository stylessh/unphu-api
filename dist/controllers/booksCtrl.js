"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _Book = _interopRequireDefault(require("../models/Book"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Books Routes Controllers
var booksCtrl = {}; // import file system module

// getting all books
booksCtrl.getBooks =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var books;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Book["default"].find().sort({
              timestamp: -1
            });

          case 2:
            books = _context.sent;
            res.render("allBooks", {
              books: books
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // getting one book


booksCtrl.getOneBook =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var book;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Book["default"].findById(req.params.id);

          case 2:
            book = _context2.sent;
            res.render("singleBook", {
              book: book
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // form to create a book


booksCtrl.formRender =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var books;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Book["default"].find().limit(4).sort({
              likes: -1
            });

          case 2:
            books = _context3.sent;
            res.render("bookAdd", {
              books: books
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // creating a book


booksCtrl.createBook =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, title, description, author, imageTempPath, imageName, targetPath, ext, book, newBook;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // obtaining the data from the request
            _req$body = req.body, title = _req$body.title, description = _req$body.description, author = _req$body.author;
            imageTempPath = req.file.path;
            imageName = req.file.filename;
            targetPath = _path["default"].resolve("src/public/uploads/".concat(imageName));
            console.log(req.file); // extracting the extension of the image

            ext = _path["default"].extname(req.file.originalname).toLowerCase(); // verifying if the file is a image
            //   verifying if the book exists

            _context4.next = 8;
            return _Book["default"].findOne({
              title: title
            });

          case 8:
            book = _context4.sent;

            if (!book) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", res.json({
              message: "the book already exists!"
            }));

          case 13:
            if (!(ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif")) {
              _context4.next = 22;
              break;
            }

            _context4.next = 16;
            return _fsExtra["default"].rename(imageTempPath, targetPath);

          case 16:
            // creating the new book
            newBook = new _Book["default"]({
              title: title,
              description: description,
              author: author,
              imageName: imageName
            }); // saving it

            _context4.next = 19;
            return newBook.save();

          case 19:
            res.redirect("/api/books/view");
            _context4.next = 25;
            break;

          case 22:
            _context4.next = 24;
            return _fsExtra["default"].unlink(imageTempPath);

          case 24:
            res.status(500).json({
              error: "Only images ar allowed"
            });

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

booksCtrl.addLike =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var book;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Book["default"].findOne({
              _id: req.params.id
            });

          case 2:
            book = _context5.sent;

            if (!book) {
              _context5.next = 10;
              break;
            }

            book.likes = book.likes + 1;
            _context5.next = 7;
            return book.save();

          case 7:
            res.json({
              likes: book.likes
            });
            _context5.next = 11;
            break;

          case 10:
            res.status(500).json({
              error: "internal error"
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

booksCtrl.addDislike =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var book;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Book["default"].findOne({
              _id: req.params.id
            });

          case 2:
            book = _context6.sent;

            if (!book) {
              _context6.next = 10;
              break;
            }

            book.dislikes = book.dislikes + 1;
            _context6.next = 7;
            return book.save();

          case 7:
            res.json({
              dislikes: book.dislikes
            });
            _context6.next = 11;
            break;

          case 10:
            res.status(500).json({
              error: "internal error"
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); // deleting a book


booksCtrl.deleteBook =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Book["default"].findByIdAndDelete(req.params.id);

          case 2:
            res.redirect("/api/books/view");

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var _default = booksCtrl;
exports["default"] = _default;