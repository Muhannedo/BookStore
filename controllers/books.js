const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Book = require('../models/book');

// Index
router.get('/', async (req, res) => {
  const books = await Book.find({});
  res.render('books/index.ejs', { books });
  // res.render('books/index.ejs');

});
//new 
router.get('/new', async (req, res) => {
  res.render('books/new.ejs');
});
//create
 router.post('/', async (req, res) => {
  req.body.owner= req.session.user._id;
  await Book.create(req.body);
  res.redirect('/books');
});






module.exports = router;