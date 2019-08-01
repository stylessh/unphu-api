"use strict";

var _mongoose = require("mongoose");

// connecting with the database
(0, _mongoose.connect)(process.env.MONGODB_URI, {
  useNewUrlParser: true
}) // if the db is successfully conected, show a message
.then(function (db) {
  return console.log('db is connected');
}) // anyway, show the errror
["catch"](function (err) {
  return console.error(err);
});