const { Schema, model } = require('mongoose');

const hotelSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  distance: {
    type: Number,
    require: true
  },
  photos: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  rating: {
    type: Number,
    require: true
  },
  featured: {
    type: String,
    require: true
  },
  rooms: {
    type: String,
    require: true
  }
});

module.exports = model('Hotel', hotelSchema);