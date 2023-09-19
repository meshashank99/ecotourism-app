const mongoose = require("mongoose");

const destinationSchema = mongoose.Schema({
  image_url: String,
  destination_title: String,
  location: String,
  grade: Number,
  fees: Number,
  description: String,
  id: Number,
});

const DestinationModel = mongoose.model("destination", destinationSchema);

module.exports = {
  DestinationModel,
};
