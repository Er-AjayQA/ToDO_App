const mongoose = require("mongoose");

const useSchema = new mongoose.Schema({});

module.exports = mongoose.model("user", useSchema);
