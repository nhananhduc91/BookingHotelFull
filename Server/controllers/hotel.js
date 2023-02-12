const Hotel = require('../models/hotel');

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
  Hotel.find().
    then(hotels => {
      const searchHotels = hotels?.filter(hotel => hotel.city.toLowerCase().includes(destination?.toLowerCase()) && hotel.rooms.length >= Number(room));
      res.json(searchHotels);
    }).catch(err => {
      console.log(err);
    });
};

exports.getHotelDetail = (req, res, next) => {
  const { hotelId } = req.params;
  Hotel.findOne({ _id: hotelId })
    .then(hotel => {
      res.json(hotel);
    }).catch(err => {
      console.log(err);
    });
};


