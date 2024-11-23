const Notify = require("../model/Notify");

exports.addNotification = async(req, res) => {
    const {title, message, timestamp} = req.body;
    try {
        const notifcation = new Notify({title: title, message: message, timestamp: timestamp, isRead: false, user: req.user.id});
        await notifcation.save();
        console.log("Notifcation saved successfully");
    } catch (error) {
        console.log("Error in saving notifcation", error);
        res.status(500).send({ error: 'Failed to save notification' });
    }
};

exports.getNotifications = async(req, res) => {
    console.log("hello");
    
}