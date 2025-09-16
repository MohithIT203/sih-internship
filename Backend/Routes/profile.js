const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const user = require("../Schemas/users.js");
const profile = require("../Schemas/profile.js");

router.post("/profile/:userId", async (req, res) => {
  const { course, branch, skills, languages, sector, state, districts } = req.body;
  const { userId } = req.params;

  try {
    let response = await profile.findOne({ userid: userId });

    if (!response) {
      const newProfile = new profile({
        userid: userId,
        Branch: branch,
        Course: course,
        Skills: skills,
        Languages: languages,
        Preferred_type: sector,
        Preferred_state: state,
        Preferred_district: districts
      });
      await newProfile.save();
      return res.status(201).json({ message: "Profile Created", profile: newProfile });
    }

    return res.status(200).json({ message: "Profile already exists", profile: response });
  } catch (err) {
    return res.status(500).json({ message: "Error", error: err.message });
  }
});

router.put("/profile/:userId", async (req, res) => {
  const { course, branch, skills, languages, sector, state, districts } = req.body;
  const { userId } = req.params;
  console.log(req.body);
  try {
    let updatedProfile = await profile.findOneAndUpdate(
      { userid: userId }, 
      {
        Branch: branch,
        Course: course,
        Skills: skills,
        Languages: languages,
        Preferred_type: sector,
        Preferred_state: state,
        Preferred_district: districts,
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: "Profile updated", profile: updatedProfile });
  } catch (err) {
    return res.status(500).json({ message: "Error updating profile", error: err.message });
  }
});


router.get("/profile/:userId", async (req, res) => {
  try {
    const user_profile = await profile.findOne({ userid: req.params.userId });
    if (!user_profile) return res.status(404).json({ error: "Profile not found" });
    res.json(user_profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;