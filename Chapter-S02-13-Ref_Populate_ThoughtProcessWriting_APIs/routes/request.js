const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRoute = express.Router();

requestRoute.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //   Check connection request status
      const allowedStatus = ["ignore", "intrested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type" });
      }

      //   check if user not exist that we send the request
      const isUserExist = await User.findById(toUserId);
      if (!isUserExist) {
        return res.status(400).json({ message: "The user is not exist in DB" });
      }

      //  Check if there is an existing connection request or that user already send the request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request already exist!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: "Connection request send successfuly!",
        data,
      });
    } catch (error) {
      res.status(500).send("ERROR: " + error.message);
    }
  },
);

// Accepted & Rejected
requestRoute.post(
  "/review/request/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const logedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid Status: " + status });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: logedInUser._id,
        status: "intrested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request not found!" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection request " + status, data });
    } catch (error) {
      res.status(500).send("ERROR: " + error.message);
    }
  },
);

module.exports = {
  requestRoute,
};
