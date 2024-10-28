const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Book = require('../models/book');

// Index
router.get('/', async (req, res) => {
  const books = await Book.find({});
  // res.render('bookis/ndex.ejs', { books });
  res.render('books/index.ejs');
  // res.send("the route is working fine");
}); 








module.exports = router;