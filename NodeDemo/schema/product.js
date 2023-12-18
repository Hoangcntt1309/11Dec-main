const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, min: 10, max: 80 },
  description: { type: String, min: 10, max: 80 },
  image: { type: String, validate: mongooseUrlValidator.isValid },
  price: Number,
});

module.exports = mongoose.model(
  // Use a more descriptive model name
  "Product",
  schema
);
