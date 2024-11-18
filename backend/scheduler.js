const schedule = require("node-schedule");
const Item = require("./models/Item");
const User = require("./models/User");
const admin = require("./firebase"); 

const checkExpiringItems = async () => {
  try {
    const now = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(now.getMonth() + 1);

    const expiringItems = await Item.find({
      expiryDate: { $gte: now, $lte: oneMonthLater },
    });

    expiringItems.forEach(async (item) => {
      const user = await User.findById(item.userId);
      if (user && user.fcmToken) {
        await admin.messaging().send({
          token: user.fcmToken,
          notification: {
            title: "Expiry Reminder",
            body: `Your item "${item.name}" is expiring on ${item.expiryDate.toDateString()}.`,
          },
        });
      }
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

// Schedule the job to run daily at midnight
schedule.scheduleJob("0 0 * * *", checkExpiringItems);