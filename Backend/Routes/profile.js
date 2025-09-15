const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const user = require("../Schemas/users.js");
const profile = require("../Schemas/internships.js");

router.post("/profile/:id", async (req, res) => {
  const {course,branch,skills,languages,sector,state,district}=req.body;
  const {id}=req.params;
  try {
    const response = await profile.findone 
  }
  catch(err){
    return res.status(500).send({message:"An error occurred"})
  }
});



module.exports = router;