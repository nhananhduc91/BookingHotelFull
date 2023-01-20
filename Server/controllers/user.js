const User = require("../models/user");
const Transaction = require("../models/transaction");

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUser = (req, res, next) => {
  const { userName, password, fullName, phoneNumber, email, isAdmin } =
    req.body.userData;
  const user = new User({
    userName,
    password,
    fullName,
    phoneNumber,
    email,
    isAdmin,
  });
  user
    .save()
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postTransaction = (req, res, next) => {
  const { user, hotel, room, dateStart, dateEnd, price, payment, status } = req.body.bookingData;
  const transaction = new Transaction({ user, hotel, room, dateStart, dateEnd, price, payment, status });
  transaction
    .save()
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
}
