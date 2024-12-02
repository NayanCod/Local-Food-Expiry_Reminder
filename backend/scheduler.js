const schedule = require("node-schedule");
const Item = require("./model/Item.js");
const User = require("./model/User.js");
const admin = require("./firebase.js"); 

const checkExpiringItems = async () => {
  try {
    const now = new Date();
    // const oneMonthLater = new Date();
    // oneMonthLater.setMonth(now.getMonth() + 1);
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000 + 2 * 60 * 1000); // Add 24 hours + 2 minutes

    const expiringItems = await Item.find({
      expiryDate: { $gte: now, $lte: oneDayLater },
      notified: false,
    });

    console.log("Items doesn't expire", expiringItems);
    

    expiringItems.forEach(async (item) => {
      const user = await User.findById(item.user);
      if (user && user.fcmToken) {
        await admin.messaging().send({
          token: user.fcmToken,
          notification: {
            title: "Expiry Reminder",
            body: `Your item "${item.name}" is expiring on ${item.expiryDate.toDateString()}.`,
          },
        });
        item.notified = true;
        await item.save(); 
      }
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

// Schedule the job to run daily at midnight
schedule.scheduleJob("*/2 * * * *", checkExpiringItems);
