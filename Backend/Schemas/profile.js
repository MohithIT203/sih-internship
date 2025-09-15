const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  Education: { type: String, required: true },
  Skills: {
    type: Array,
    default: [],
  },
  Languages: {
    type: Array,
    default: [],
  },
  Preferred_type: {
    type: String,
    required: true,
  },
  Preferred_location: {
    type: String,
    required: true,
  },
  percent_10: {
    type: Number,
    required: true,
  },
  percent_12: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
