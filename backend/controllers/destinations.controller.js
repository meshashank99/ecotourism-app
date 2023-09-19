const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { DestinationModel } = require("../models/destinations.model");

const destinationController = express.Router();

destinationController.get("/", authentication, async (req, res) => {
  let destinations = await DestinationModel.find();

  const queries = req.query;
  console.log(queries);
  if (queries.q) {
    destinations = await DestinationModel.find({
      location: { $regex: queries.q },
    });
  }
  if (queries.sort) {
    destinations = await DestinationModel.find();
    if (queries.order === "asc") {
      destinations.sort((a, b) => {
        return Number(a.fees) - Number(b.fees);
      });
    }
    if (queries.order === "desc") {
      destinations.sort((a, b) => {
        return Number(b.fees) - Number(a.fees);
      });
    }
  }

  if (queries.rating) {
    destinations = await DestinationModel.find();
    const filtered_data = destinations.filter((e) => {
      // console.log(queries.rating, e.grade)
      return Number(e.grade) === Number(queries.rating);
    });
    console.log(filtered_data)
  } 
  

  res.send({ data: destinations });
});

destinationController.get(
  "/:destinationId",
  authentication,
  async (req, res) => {
    const { destinationId } = req.params;
    const destination = await DestinationModel.find({ _id: destinationId });
    res.send(destination);
  }
);

module.exports = {
  destinationController,
};
