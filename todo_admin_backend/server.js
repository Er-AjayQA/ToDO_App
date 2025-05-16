// Imports & Configs
const express = require("express");
const cors = require("cors");
const DBConnection = require("./config/db.config");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Handle Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Listening to Server
app.listen(PORT, (err) => {
  try {
    DBConnection(); // Connecting to DB
    if (!err) {
      console.log(`Server is running at port no :- ${PORT}`);
    }
  } catch (error) {
    console.log(`Server connection error`, err);
  }
});
