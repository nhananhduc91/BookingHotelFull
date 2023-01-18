const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(
  path.dirname(require.main.filename),
  "data",
  "hotels.json"
);

exports.getHotelByRegion = (req, res, next) => {
  const hotels = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  res.send(hotels);
};
