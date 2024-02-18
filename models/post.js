const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    name: String,
    type: String,
  },
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
    ru: { type: String, required: true },
  },
  content: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
    ru: { type: String, required: true },
  },
  category: {
    ar: { type: Array, required: true },
    en: { type: Array, required: true },
    ru: { type: Array, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Articles", postSchema);
