const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: {
        values: ["ignore", "intrested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type.`,
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send connection request to yourself!");
  }
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequest;
