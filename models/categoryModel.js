const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  namaKategori: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  deskripsi: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);