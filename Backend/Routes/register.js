const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Schemas/users.js");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).send({ massage: "All fields are required" });
    }
    const dbuser = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, dbuser.password.toString());
    if (!isMatch) {
      return res.status(404).send({ message: "Email or password is wrong" });
    }
   res.json({
      _id: dbuser._id,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(404).send({ massage: "All fields are required" });
    }
    const dbuser = await User.find({ email: email });
    if (dbuser.length > 0) {
      return res.status(404).send({ message: "User Already Exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.json({
      _id: newUser._id,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
