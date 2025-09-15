const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const user = require("../Schemas/users.js");
const intern = require("../Schemas/internships.js");

router.get("/all-internship", async (req, res) => {
  try {
    const internships = await intern.find({});
    res.status(200).send(internships);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/internship/:id", async (req, res) => {
  try {
    const internship = await intern.findById(req.params.id);
    if (!internship) {
      return res.status(404).send({ message: "Internship not found" });
    }
    res.status(200).send(internship);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/internship", async (req, res) => {
    
  try {
    if(!req.body){
        return res.status(404).send({message:"Fill all details"})
    }
    const saveInternship = new intern(req.body);
    await saveInternship.save();
    res.status(200).send({message:"Internship Created",saveInternship});
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/internship/bulk", async (req, res) => {
  try {
    const internships = req.body; // Expecting an array
    if (!Array.isArray(internships) || internships.length === 0) {
      return res.status(400).send({ message: "Provide an array of internships" });
    }
    const result = await intern.insertMany(internships);
    res.status(200).send({ message: "Internships Created", internships: result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;