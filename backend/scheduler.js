const schedule = require("node-schedule");
const Item = require("./model/Item.js");
const User = require("./model/User.js");
const admin = require("./firebase.js");

const sendExpiryNotification = async (item, user, interval) => {
  await admin.messaging().send({
    token: user.fcmToken,
    notification: {
      title: "Expiry Reminder",
      body: `Your item "${item.name}" is expiring in ${interval} day(s).`,
    },
  });
};

const checkExpiringItems = async () => {
  try {
    const now = new Date();
    const defaultIntervals = [15, 7, 3, 2, 1];

    const expiringItems = await Item.find({
      expiryDate: { $gte: now },
    });

    console.log("Items that don't expire yet:", expiringItems);

    for (const item of expiringItems) {
      const user = await User.findById(item.user);
      if (user && user.fcmToken) {
        const timeRemaining = Math.floor((item.expiryDate - now) / (1000 * 60 * 60 * 24)); // Remaining days
        console.log(`${item.name} time reaming to expire is: ${timeRemaining}`);

        const intervals = item.userNotifyIntervals.length > 0 ? item.userNotifyIntervals : defaultIntervals;

        console.log("Expiring Intervals: ", intervals);
        
        // Check if the remaining days match any of the intervals
        for (const interval of intervals) {
          if (timeRemaining === interval && !item.notifiedIntervals.includes(interval)) {
            // Send notification for the current interval
            await sendExpiryNotification(item, user, interval);

            // Add this interval to notifiedIntervals to avoid resending the same notification
            item.notifiedIntervals.push(interval);
            console.log("Expired intervals: ", item.notifiedIntervals)

            // If it's the third notification (4 days remaining), mark notified as true
            if (interval < 4) {
              if(!item.notified){
                item.notified = true;
              }
            }

            // Save the updated item with the new state
            await item.save(); 
            break;
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
