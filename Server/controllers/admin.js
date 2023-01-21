const Transaction = require("../models/transaction");
const User = require("../models/user");
const Hotel = require("../models/hotel");

exports.getAllTransactions = (req, res, next) => {
  Transaction.find()
    .then(transactions => {
      res.send(transactions);
    }).catch(err => console.log(err))
}

exports.getAllUsers = (req, res, next) => {
  User.find({ isAdmin: false })
    .then(users => {
      res.send(users);
    }).catch(err => console.log(err))
}

exports.postAddHotel = (req, res, next) => {
  const { name, city, distance, desc, photos, type, address, rating, cheapestPrice, featured, rooms } = req.body.hotelInput;
  const hotel = new Hotel({ name, city, distance, desc, photos, type, address, rating, cheapestPrice, featured, rooms });
  hotel.save();
  res.end();
};