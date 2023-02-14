const User = require("../models/user");
const Transaction = require("../models/transaction");
const mongoose = require('mongoose');

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body.loginData;
  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        req.session.isLoggedIn = true;
        req.session.user = {
          user: user.userName,
          isAdmin: user.isAdmin
        };
        res.send({
          userInfo: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            userName: user.userName,
            isAdmin: user.isAdmin,
          },
          message: user.isAdmin === "yes"? "Login successful!": "Only admin can access this page.",
          loginStatus: true,
        })
      } else {
        res.send({ message: "Login failed!", loginStatus: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUser = (req, res, next) => {
  const { userName, password, fullName, phoneNumber, email, isAdmin } =
    req.body.userData;
  User.findOne({ $or: [{ email }, { userName }] })
    .then((user) => {
      if (!user) {
        const user = new User({
          userName,
          password,
          fullName,
          phoneNumber,
          email,
          isAdmin,
        });
        user.save();
        res.send({ message: "Register successful!", forward: true });
      } else {
        res.send({
          message: "User already registered! Please choose another email!",
          forward: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTransaction = (req, res, next) => {
  const { userId } = req.params;
  Transaction.find({ userId })
    .then((transaction) => {
      res.send(transaction);
    })
    .catch((err) => console.log(err));
};

exports.addTransaction = (req, res, next) => {
  const { userId, hotel, room, dateStart, dateEnd, price, payment, status } =
    req.body.bookingData;
  const transaction = new Transaction({
    userId: mongoose.Types.ObjectId(userId),
    hotel,
    room,
    dateStart,
    dateEnd,
    price,
    payment,
    status,
  });

  User.findOne({ _id: mongoose.Types.ObjectId(userId) }).then(user => {
    user.transactions.push(transaction._id);
    user.save();
    transaction
      .save()
  })
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
