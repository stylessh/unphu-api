// requirements
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import exphbs from "express-handlebars";
import multer from 'multer';
const app = express();

// importing routes
import indexRoutes from "./routes/index";
import booksRoutes from "./routes/books";

// setting the enviorement variables

dotenv.config();

// settings

// setting up the port
app.set("port", process.env.PORT || 3000);

// setting up the views
app.set("views", path.join(__dirname, "views"));

// setting up the view engine
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
  })
);

// setting up the view engine
app.set("view engine", ".hbs");

// middlewares

// setting  up the morgan module
app.use(morgan("dev"));

// setting up the express json module
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// setting up the multer module

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({ storage }).single("image"));

// routes
app.use(indexRoutes);
app.use("/api/books", booksRoutes);

// static files
app.use('/public', express.static(path.join(__dirname, 'public')))

export default app;
