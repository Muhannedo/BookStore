const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Book = require('../models/book');

// Index
router.get('/', async (req, res) => {
  const books = await Book.find({});
  // res.render('bookis/ndex.ejs', { books });
  res.render('books/index.ejs');

});
//new 
router.get('/new', async (req, res) => {
  res.render('books/new.ejs');
});






module.exports = router;