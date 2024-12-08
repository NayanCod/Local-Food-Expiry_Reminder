const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notified: { type: Boolean, default: false },
  notifiedIntervals: { type: [Number], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);
