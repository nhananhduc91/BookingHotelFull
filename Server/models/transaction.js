const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  hotel: {
    type: String,
    require: true,
  },
  room: {
    type: Array,
    require: true,
  },
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
