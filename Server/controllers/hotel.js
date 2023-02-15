const Hotel = require('../models/hotel');
const transaction = require('../models/transaction');
const Transaction = require("../models/transaction");

exports.getHotelByRegion = (req, res, next) => {
  Hotel.find()
    .then(hotels => {
      res.json(hotels);
    }).catch(err => {
      console.log(err);
    });
};

exports.postSearchHotel = (req, res, next) => {
  const { destination, checkIn, checkOut, room } = req.body.searchInput;
  const getTimeStart = new Date(checkIn).getTime();
  const getTimeEnd = new Date(checkOut).getTime();
  Hotel.find()
    .then(hotels => {
      let searchHotels = hotels?.filter(hotel => hotel.city.toLowerCase().includes(destination?.toLowerCase()) && hotel.rooms.length >= Number(room));
      let filterHotels;
      Transaction.find()
        .then(transactions => {
          for (const transaction of transactions) {
            const getTimeTransStart = new Date(transaction.dateStart).getTime();
            const getTimeTransEnd = new Date(transaction.dateEnd).getTime();
            if ((getTimeStart <= getTimeTransStart && getTimeEnd >= getTimeTransEnd)
              || (getTimeStart <= getTimeTransStart && getTimeEnd >= getTimeTransStart)
              || (getTimeStart <= getTimeTransEnd && getTimeEnd >= getTimeTransEnd)) {
              filterHotels = searchHotels.filter(hotel => hotel._id.toString() !== transaction.hotel.toString());
              searchHotels = filterHotels;
            }
          }
          res.json(searchHotels);
        })
    }).catch(err => {
      console.log(err);
    });
};

exports.getHotelDetail = (req, res, next) => {
  const { hotelId } = req.params;
  Hotel.findOne({ _id: hotelId }).populate('rooms')
    .then(hotel => {
      res.json(hotel);
    }).catch(err => {
      console.log(err);
    });
};


