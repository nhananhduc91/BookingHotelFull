const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
  },
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }]
});


module.exports = model("User", userSchema);
