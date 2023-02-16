const User = require("../models/user");
const Transaction = require("../models/transaction");
const Hotel = require("../models/hotel");

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body.loginData;
  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        req.session.isLoggedIn = true;
        req.session.user = {
          user: user.userName,
          isAdmin: user.isAdmin,
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
          userMessage:
            user.isAdmin === "no" ? "Login successful!" : "You are not a user.",
          adminMessage:
            user.isAdmin === "yes"
              ? "Login successful!"
              : "Only admin can access this page.",
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

exports.getLogout = (req, res, next) => {
  req.session.isLoggedIn = false;
  res.end();
};

exports.getTransaction = (req, res, next) => {
  const { userId } = req.params;
  Transaction.find({ user: userId })
    .populate("hotel")
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

exports.checkAvailableRoom = (req, res, next) => {
  const { hotel, startDate, endDate } = req.body.checkRoomData;
  const getTimeStart = new Date(startDate).getTime();
  const getTimeEnd = new Date(endDate).getTime();

  Transaction.find({ hotel })
    .then((transactions) => {
      for (const transaction of transactions) {
        const getTimeTransStart = new Date(transaction.dateStart).getTime();
        const getTimeTransEnd = new Date(transaction.dateEnd).getTime();
        if (
          (getTimeStart <= getTimeTransStart &&
            getTimeEnd >= getTimeTransEnd) ||
          (getTimeStart <= getTimeTransStart &&
            getTimeEnd >= getTimeTransStart) ||
          (getTimeStart <= getTimeTransEnd && getTimeEnd >= getTimeTransEnd)
        ) {
          Hotel.findOne({ _id: hotel })
            .populate("rooms")
            .then((hotel) => {
              const filterRoom = [];
              for (const room of hotel.rooms) {
                let allNum = room.roomNumbers;
                for (bookedNum of transaction.room) {
                  const filterNum = allNum.filter((num) => num !== bookedNum);
                  allNum = filterNum;
                }
                room.roomNumbers = allNum;
                filterRoom.push(room);
              }
              res.json({ rooms: filterRoom, startDate, endDate });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Hotel.findOne({ _id: hotel })
            .populate("rooms")
            .then((hotel) => {
              res.json({ rooms: hotel.rooms, startDate, endDate });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
