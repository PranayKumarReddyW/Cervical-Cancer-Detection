require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

// Connect to the database
const dbConnect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    });
};

module.exports = dbConnect;
