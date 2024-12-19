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
  notified: { 
    type: Boolean, 
    default: false 
  },
  notifiedIntervals: {
    type: [Number], 
    default: [] 
  },
  userNotifyIntervals: {
    type: [Number],
    default: []
  }
}, { timestamps: true });

ItemSchema.methods.validateIntervals = function() {
  const now = new Date(); // Current time
  const expiryDate = new Date(this.expiryDate);
  
  // Ensure the userNotifyIntervals are in future and valid
  this.userNotifyIntervals = this.userNotifyIntervals.filter(interval => {
    // Calculate the notification time for each interval (in days, convert to milliseconds)
    const notificationTime = new Date(expiryDate.getTime() - interval * 24 * 60 * 60 * 1000); // interval in days (convert days to milliseconds)
    
    // Check if the notification time is in the future (greater than current time)
    return notificationTime > now && notificationTime < expiryDate;
  });
  
  // Ensure that there are still valid intervals left
  if (this.userNotifyIntervals.length === 0) {
    // If no valid intervals, you might want to add a default or notify the user
    console.log("No valid intervals, setting default intervals.");
    this.userNotifyIntervals = [15, 7, 2, 1]; // Fallback to default intervals
  }
};


module.exports = mongoose.model("Item", ItemSchema);
