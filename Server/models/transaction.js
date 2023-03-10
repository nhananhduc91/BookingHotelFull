const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    require: true,
  },
  room: [{
    type: Number,
    require: true,
  }],
  dateStart: {
    type: String,
    require: true,
  },
  dateEnd: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  payment: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

module.exports = model("Transaction", transactionSchema);
