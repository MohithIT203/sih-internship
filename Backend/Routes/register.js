const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../Schemas/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
     const token = jwt.sign(
      { id: dbuser._id,email: dbuser.email },
      "dummy_jwt_secret_key123",
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });
   res.json({
      _id: dbuser._id,
      username: dbuser.username,
      token: token
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
    
    const token = jwt.sign(
      { id: newUser._id,email: newUser.email },
      "dummy_jwt_secret_key123",
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: newUser._id,
      username: newUser.username,
      token: token
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

router.get('/auth/verify', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ role: decoded.role, email: decoded.email });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
