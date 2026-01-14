const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isExpired: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("session", sessionSchema);
