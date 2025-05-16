// Imports & Configs
const mongoose = require("mongoose");
require("dotenv").config();

// Config DB
const DBConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL).then((result) => {
      console.log("Connected to DB successfully");
    });
  } catch (error) {
    console.log("Error in DB connection : ", error);
  }
};

// Export DB Connection Function
module.exports = DBConnection;
