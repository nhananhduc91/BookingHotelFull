const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "hotels.json"
);

const hotels = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

exports.getHotelByRegion = (req, res, next) => {
  res.send(hotels);
};

exports.postSearchHotel = (req, res, next) => {
  const { destination, checkIn, checkOut, minPricePerNight, maxPricePerNight, adult, children, room } = req.body.searchInput;
  const searchHotels = hotels?.filter(hotel => hotel.city.toLowerCase().includes(destination?.toLowerCase()) && hotel.cheapestPrice <= minPricePerNight && hotel.rooms.length >= room);
  res.send(searchHotels);
};
