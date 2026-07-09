const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRoute = express.Router();

userRoute.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const logedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: logedInUser._id,
      status: "intrested",
    }).populate("fromUserId", "firstName lastName gender about photoURL skill"); // you can write like this also populate("fromUserId", ["firstName", "lastName", "gender", "about", "photoURL", "skill"])

    res.json({ message: "Data fetched successfuly!", data: connectionRequest });
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
});

module.exports = {
  userRoute,
};
