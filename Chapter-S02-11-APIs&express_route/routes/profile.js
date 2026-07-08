const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRoute = express.Router();

profileRoute.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
});

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("This Field not editable!");
    }
    const logedInUser = req.user;
    Object.keys(req.body).forEach((key) => (logedInUser[key] = req.body[key]));
    console.log(logedInUser);
    await logedInUser.save();
    res.send(`${logedInUser.firstName}, your profile updated successfuly!`);
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
});

module.exports = profileRoute;
