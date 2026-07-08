const express = require("express");
const { validationSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRoutes = express.Router();

authRoutes.post("/signup", async (req, res) => {
  try {
    validationSignupData(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("Signup Successful!");
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email not valid");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfully!");
    }
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
});

authRoutes.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfuly");
});

module.exports = authRoutes;
