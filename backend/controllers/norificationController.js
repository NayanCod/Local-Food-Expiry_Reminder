const Notify = require("../model/Notify");

exports.addNotification = async (req, res) => {
  const { title, message, timestamp } = req.body;
  try {
    const notifcation = new Notify({
      title: title,
      message: message,
      timestamp: timestamp,
      isRead: false,
      user: req.user.id,
    });
    await notifcation.save();
    console.log("Notifcation saved successfully");
    return res.status(201).send("notification saved successfully");
  } catch (error) {
    console.log("Error in saving notifcation", error);
    res.status(500).send({ error: "Failed to save notification" });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res.status(500).send("User not found!");
    }
    const notifications = await Notify.find({ user: user });
    console.log("user's notifications: ", notifications);
    return res.status(200).json({ data: notifications });
  } catch (error) {
    console.log("failed to fetch notifications");
    res.status(500).send({ error: "Failed to fetch notifications" });
  }
};

exports.updateNotification = async (req, res) => {
    const { id } = req.params;
    try {
      // Check if the user exists
      if (!req.user.id) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the notification by user ID and notification ID
      const notification = await Notify.findOne({ user: req.user.id, _id: id });
  
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      // Update the notification's isRead field to true
      notification.isRead = true;
      const updatedNotification = await notification.save(); // Save the updated notification
  
      // Return the updated notification in the response
      return res.status(200).json({
        message: 'Notification updated successfully',
        updatedNotification, // Send the updated notification object
      });
  
    } catch (error) {
      console.error('Error updating notification:', error);
      return res.status(500).json({ message: 'Failed to update notification' });
    }
  };
  
