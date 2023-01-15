const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)


const app = express();
app.use(cors());

mongoose
  .connect('mongodb+srv://johnny:beaQlXmebavY31mK@cluster0.xtlpwvn.mongodb.net/hotel')
  .then(() => {
    app.listen(5000)
  }).catch(err => {
    console.log(err)
  });