const schedule = require("node-schedule");
const Item = require("./model/Item.js");
const User = require("./model/User.js");
const admin = require("./firebase.js");

// Function to send notification
const sendExpiryNotification = async (item, user, interval) => {
  await admin.messaging().send({
    token: user.fcmToken,
    notification: {
      title: "Expiry Reminder",
      body: `Your item "${item.name}" is expiring in ${interval} day(s).`,
    },
  });
};

// Function to check expiring items
const checkExpiringItems = async () => {
  try {
    const now = new Date();
    const intervals = [15, 7, 2, 1]; // Original intervals

    // Find items that are yet to expire, and haven't been fully notified
    const expiringItems = await Item.find({
      expiryDate: { $gte: now },
      notified: false, // Only consider items that haven't been fully notified
    });

    console.log("Items that don't expire yet:", expiringItems);

    // Loop through each item and check expiry intervals
    for (const item of expiringItems) {
      const user = await User.findById(item.user);
      if (user && user.fcmToken) {
        const timeRemaining = Math.floor((item.expiryDate - now) / (1000 * 60 * 60 * 24)); // Remaining days
        console.log(`${item.name} time reaming to expire is: ${timeRemaining}`);

        // Check if the remaining days match any of the intervals
        for (const interval of intervals) {
          if (timeRemaining === interval && !item.notifiedIntervals.includes(interval)) {
            // Send notification for the current interval
            await sendExpiryNotification(item, user, interval);

            // Add this interval to notifiedIntervals to avoid resending the same notification
            item.notifiedIntervals.push(interval);


            // If it's the third notification (4 days remaining), mark notified as true
            if (interval < 4) {
              item.notified = true;
            }

            await item.save(); // Save the updated item with the new state
            break; // Stop processing after sending a notification for this interval
          }
        }
      }
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

// Schedule the job to run every 2 minutes
schedule.scheduleJob("*/2 * * * *", checkExpiringItems);
