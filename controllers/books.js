const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Book = require('../models/book');

// Index
router.get('/', async (req, res) => {
  const books = await Book.find({}).populate('owner');
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
//show
router.get('/:bookId', async (req , res)=>{
  const book = await Book.findById(req.params.bookId);
  
  res.render('books/show.ejs', {book});
});

//edit
// controller to edit the listing
router.get('/:bookId/edit', async (req, res) => {
  try {
    const currentBook = await Book.findById(req.params.bookId);
    res.render('books/edit.ejs', {
      book: currentBook,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});





module.exports = router;