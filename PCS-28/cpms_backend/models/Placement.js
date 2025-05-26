const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  eligibilityCriteria: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PlacementForm", placementSchema);
