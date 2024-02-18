const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  image: {
    name: String,
    type: String,
  },
  link:{
    type:String,
    required: true
  },
  name:{
    type:String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Partners", partnerSchema);
