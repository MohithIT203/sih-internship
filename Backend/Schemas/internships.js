const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  village: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  zip_code: {
    type: String,
  },
});

const qualificationSchema = mongoose.Schema({
  qualification: { type: String },
  course: { type: String },
  specialization: { type: String },
  skills: {
    type: Array,
    default: [],
  },
  certificates: {
    type: Array,
    default: [],
  },
  specialization: { type: String },
});
const internship = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  location: locationSchema,
  qualification: qualificationSchema,
  total_applied: {
    type: Number,
  },

  field: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("internship", internship);
