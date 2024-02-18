const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require: true,
  },
  image: {
    name: String,
    type: String,
  },
  links: {
    telegram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    gmail: { type: String },
  },
});

module.exports = mongoose.model("Members", memberSchema);
