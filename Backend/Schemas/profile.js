const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  Course: { type: String, required: true },
  Branch:{
    type:String,
    required:true
  },
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
});

module.exports = mongoose.model("Profile", profileSchema);
