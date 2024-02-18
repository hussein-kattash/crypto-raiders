const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
  image: {
    name: String,
    type: String,
  },
  link:{
    type:String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ads", adsSchema);
