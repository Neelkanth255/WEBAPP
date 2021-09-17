let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  city: String,
  designation: String,
});

let model = mongoose.model("User",Schema);

module.exports = model;