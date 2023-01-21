const Transaction = require("../models/transaction");
const User = require("../models/user")

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