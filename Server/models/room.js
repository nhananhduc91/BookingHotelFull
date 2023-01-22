const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true
  },
  maxPeople: {
    type: Number,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  roomNumbers: {
    type: Number,
    require: true
  },
});

module.exports = model('Room', roomSchema);