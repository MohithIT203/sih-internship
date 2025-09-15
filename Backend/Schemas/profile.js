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
    default: [String],
  },
  Languages: {
    type: Array,
    default: [String],
  },
  Preferred_type: {
    type: String,
    required: true,
  },
  Preferred_state: {
    type: String,
    required: true,
  },
  Preferred_district: {
    type: [String],
    required: true,
    default: [String],
  },
});

module.exports = mongoose.model("Profile", profileSchema);
