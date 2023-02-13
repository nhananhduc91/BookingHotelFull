const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require("./models/user");
const MONGODB_URI = "mongodb+srv://johnny:beaQlXmebavY31mK@cluster0.xtlpwvn.mongodb.net/hotel";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
}

));

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60
    },
  })
);

const userRoute = require("./routes/user");
const hotelRoute = require('./routes/hotel');
const adminRoute = require('./routes/admin');
const { get404 } = require("./controllers/error");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use(userRoute);
app.use(hotelRoute);
app.use('/admin', adminRoute);
app.use(get404);


mongoose
  .connect(
    MONGODB_URI
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
