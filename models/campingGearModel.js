const mongoose = require('mongoose');

const campingGearSchema = new mongoose.Schema({
  namaAlat: {
    type: String,
    required: true,
    trim: true
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },

  detail: {
    kapasitas: {
      type: Number,
      required: true
    },
    satuanKapasitas: {
      type: String,
      required: true
    }
  },

  hargaSewaPerHari: {
    type: Number,
    required: true,
    min: 0
  },

  stok: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CampingGear', campingGearSchema);