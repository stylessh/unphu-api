"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _multer = _interopRequireDefault(require("multer"));

var _index = _interopRequireDefault(require("./routes/index"));

var _books = _interopRequireDefault(require("./routes/books"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// requirements
var app = (0, _express["default"])(); // importing routes

// setting the enviorement variables
_dotenv["default"].config(); // settings
// setting up the port


app.set("port", process.env.PORT || 3000); // setting up the views

app.set("views", _path["default"].join(__dirname, "views")); // setting up the view engine

app.engine(".hbs", (0, _expressHandlebars["default"])({
  defaultLayout: "main",
  layoutsDir: _path["default"].join(app.get("views"), "layouts"),
  partialsDir: _path["default"].join(app.get("views"), "partials"),
  extname: ".hbs"
})); // setting up the view engine

app.set("view engine", ".hbs"); // middlewares
// setting  up the morgan module

app.use((0, _morgan["default"])("dev")); // setting up the express json module

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // setting up the multer module

var storage = _multer["default"].diskStorage({
  destination: _path["default"].join(__dirname, "public/uploads"),
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + _path["default"].extname(file.originalname));
  }
});

app.use((0, _multer["default"])({
  storage: storage
}).single("image")); // routes

app.use(_index["default"]);
app.use("/api/books", _books["default"]); // static files

app.use('/public', _express["default"]["static"](_path["default"].join(__dirname, 'public')));
var _default = app;
exports["default"] = _default;