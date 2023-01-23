const User = require("../models/user");
const Transaction = require("../models/transaction");

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body.loginData;
  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        res.send({
          userInfo: {
            email: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            userName: user.userName,
            isAdmin: user.isAdmin,
          },
          message: "Login successful!",
          loginStatus: true,
        });
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
  const { userName } = req.params;
  Transaction.find({ user: userName })
    .then((transaction) => {
      res.send(transaction);
    })
    .catch((err) => console.log(err));
};

exports.addTransaction = (req, res, next) => {
  const { user, hotel, room, dateStart, dateEnd, price, payment, status } =
    req.body.bookingData;
  const transaction = new Transaction({
    user,
    hotel,
    room,
    dateStart,
    dateEnd,
    price,
    payment,
    status,
  });
  transaction
    .save()
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
