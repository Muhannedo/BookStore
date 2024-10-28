
const mongoose = require('mongoose');
const User = require('./user');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Date , 
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Book', bookSchema);
