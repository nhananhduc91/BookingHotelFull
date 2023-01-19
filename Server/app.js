const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const User = require("./models/user");

const app = express();
app.use(cors());
const userRoute = require("./routes/user");
const hotelRoute = require('./routes/hotel');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findById("63c77569049403269750ba88")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(userRoute);
app.use(hotelRoute);

mongoose
  .connect(
    "mongodb+srv://johnny:beaQlXmebavY31mK@cluster0.xtlpwvn.mongodb.net/hotel"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          userName: "Johnny",
          password: "12345678",
          fullName: "Nhan Anh Duc",
          phoneNumber: "12345678",
          email: "duc@admin.com",
          isAdmin: true,
        });
        user.save();
      }
    });
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
