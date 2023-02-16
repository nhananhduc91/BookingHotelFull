const Transaction = require("../models/transaction");
const User = require("../models/user");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const { Types } = require("mongoose");
const pagination = require("../utils/paging");
const ObjectId = Types.ObjectId;

exports.getAllTransactions = (req, res, next) => {
  Transaction.find()
    .then((transactions) => {
      res.send(transactions);
    })
    .catch((err) => console.log(err));
};

exports.getPaginationTransactions = (req, res, next) => {
  const currentPage = Number(req.params.page);
  Transaction.find()
    .then((transactions) => {
      res.send(pagination(currentPage, transactions));
    })
    .catch((err) => console.log(err));
};

exports.getAllUsers = (req, res, next) => {
  User.find({ isAdmin: "no" })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.log(err));
};

exports.getAllHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.send(hotels);
    })
    .catch((err) => console.log(err));
};

exports.getAllRooms = (req, res, next) => {
  Room.find()
    .then((rooms) => {
      res.send(rooms);
    })
    .catch((err) => console.log(err));
};

exports.postAddHotel = (req, res, next) => {
  const {
    name,
    city,
    distance,
    desc,
    photos,
    type,
    address,
    rating,
    cheapestPrice,
    featured,
    rooms,
  } = req.body.hotelInput;
  const hotel = new Hotel({
    name,
    city,
    distance,
    desc,
    photos,
    type,
    address,
    rating,
    cheapestPrice,
    featured,
    rooms,
  });
  hotel.save();
  res.end();
};

exports.postAddRoom = (req, res, next) => {
  const { title, price, maxPeople, desc, roomNumbers } = req.body.roomInput;
  const room = new Room({ title, price, maxPeople, desc, roomNumbers });
  room.save();
  res.end();
};

exports.postDeleteHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;
  Transaction.find()
    .then((transactions) => {
      for (const transaction of transactions) {
        if (transaction.hotel.toString() === hotelId) {
          return res.json({
            message:
              "You can't delete this hotel because there's a transaction with it.",
          });
        }
      }
      Hotel.findByIdAndRemove(hotelId)
        .then(() => {
          return res.json({ message: "Delete hotel successful." });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postDeleteRoom = (req, res, next) => {
  const roomId = req.body.roomId;
  Transaction.find()
    .then((transactions) => {
      const roomNumber = [];
      for (const transaction of transactions) {
        roomNumber.push(...transaction.room);
      }
      return roomNumber;
    })
    .then((roomNumber) => {
      let checkBoolean = [];
      Room.findById(roomId).then((room) => {
        for (const number of room.roomNumbers) {
          const checkRoom = roomNumber.includes(number);
          checkBoolean.push(checkRoom);
        }
        if (checkBoolean.includes(true)) {
          return res.json({
            message:
              "You can't delete this hotel because there's a transaction with it.",
          });
        } else {
          Room.findByIdAndRemove(roomId)
            .then(() => {
              return res.json({ message: "Delete room successful." });
            })
            .catch((err) => console.log(err));
        }
      });
    })
    .catch((err) => console.log(err));
};

exports.getHotelDetail = (req, res, next) => {
  const { hotelId } = req.params;
  Hotel.findOne({ _id: ObjectId(hotelId) })
    .then((hotel) => {
      res.send(hotel);
    })
    .catch((err) => console.log(err));
};

exports.postUpdateHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;
  const {
    name,
    city,
    distance,
    desc,
    photos,
    type,
    address,
    rating,
    cheapestPrice,
    featured,
    rooms,
  } = req.body.hotelInput;
  Hotel.findById(hotelId)
    .then((hotel) => {
      hotel.name = name;
      hotel.city = city;
      hotel.distance = distance;
      hotel.desc = desc;
      hotel.photos = photos;
      hotel.type = type;
      hotel.address = address;
      hotel.rating = rating;
      hotel.cheapestPrice = cheapestPrice;
      hotel.featured = featured;
      hotel.rooms = rooms;
      return hotel.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.getRoomDetail = (req, res, next) => {
  const { roomId } = req.params;
  Room.findOne({ _id: ObjectId(roomId) })
    .then((room) => {
      res.send(room);
    })
    .catch((err) => console.log(err));
};

exports.postUpdateRoom = (req, res, next) => {
  const roomId = req.body.roomId;
  const { title, price, maxPeople, desc, roomNumbers } = req.body.roomInput;
  Room.findById(roomId)
    .then((room) => {
      room.title = title;
      room.price = price;
      room.maxPeople = maxPeople;
      room.desc = desc;
      room.roomNumbers = roomNumbers;
      return room.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};
