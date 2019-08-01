// Books Routes Controllers
const booksCtrl = {};

// import file system module
import fs from "fs-extra";

// importing path module
import path from "path";

// importing the Book Model
import Book from "../models/Book";

// getting all books
booksCtrl.getBooks = async (req, res) => {
  // getting all books
  const books = await Book.find().sort({ timestamp: -1 });
  res.render("allBooks", { books });
};

// getting one book
booksCtrl.getOneBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("singleBook", { book });
};

// form to create a book
booksCtrl.formRender = async (req, res) => {
  const books = await Book.find().limit(4).sort({likes: -1 })
  res.render("bookAdd", {books});
};

// creating a book
booksCtrl.createBook = async (req, res) => {
  // obtaining the data from the request
  const { title, description, author } = req.body;
  const imageTempPath = req.file.path;
  const imageName = req.file.filename;
  const targetPath = path.resolve(`src/public/uploads/${imageName}`);

  console.log(req.file);

  // extracting the extension of the image
  const ext = path.extname(req.file.originalname).toLowerCase();

  // verifying if the file is a image

  //   verifying if the book exists
  const book = await Book.findOne({ title: title });

  //   if the book already exists
  if (book) {
    return res.json({ message: "the book already exists!" });
  } else {
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
      await fs.rename(imageTempPath, targetPath);

      // creating the new book
      const newBook = new Book({ title, description, author, imageName });
      // saving it
      await newBook.save();

      res.redirect("/api/books/view");
    } else {
      await fs.unlink(imageTempPath);
      res.status(500).json({ error: "Only images ar allowed" });
    }
  }
};

booksCtrl.addLike = async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });

  if (book) {
    book.likes = book.likes + 1;
    await book.save();
    res.json({ likes: book.likes });
  } else {
    res.status(500).json({ error: "internal error" });
  }
};

booksCtrl.addDislike = async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id });

  if (book) {
    book.dislikes = book.dislikes + 1;
    await book.save();
    res.json({ dislikes: book.dislikes });
  } else {
    res.status(500).json({ error: "internal error" });
  }
};

// deleting a book
booksCtrl.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/api/books/view");
};

export default booksCtrl;
