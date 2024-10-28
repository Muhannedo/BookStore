const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Book = require("../models/book");
const book = require("../models/book");

// Index
router.get("/", async (req, res) => {
  const books = await Book.find({}).populate("owner");
  res.render("books/index.ejs", { books });
  // res.render('books/index.ejs');
});
//new
router.get("/new", async (req, res) => {
  res.render("books/new.ejs");
});
//create
router.post("/", async (req, res) => {
  if (req.body.price > 0 && req.body.price < 10000000000000) {
  req.body.owner = req.session.user._id;
  await Book.create(req.body);
  res.redirect("/books");
  }
  else {
    res.redirect('/books')
  }
});

//show
router.get("/:bookId", async (req, res) => {
  try {
    const populatedBooks = await Book.findById(req.params.bookId).populate(
      "owner"
    );

    res.render("books/show.ejs", { book: populatedBooks });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//edit
// controller to edit the listing
router.get("/:bookId/edit", async (req, res) => {
  try {
      const currentBook = await Book.findById(req.params.bookId);
      res.render("books/edit.ejs", {book: currentBook});
  
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//update
router.put("/:bookId", async (req, res) => {
  try {
    const currentBook = await Book.findById(req.params.bookId);
    if (currentBook.owner.equals(req.session.user._id)) {
      await currentBook.updateOne(req.body);
      res.redirect("/books");
    } else {
     res.redirect("/books");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//delete
router.delete("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (book.owner.equals(req.session.user._id)) {
      await book.deleteOne();
      res.redirect("/books");
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

module.exports = router;
