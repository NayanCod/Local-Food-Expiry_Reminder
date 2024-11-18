const User = require("../model/User.js");
const jwt = require("jsonwebtoken");

// Signup
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400).json({ error: "User already exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log("New user created", newUser);
    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ token: token, user: newUser.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "User Not Found!" });
    }

    const matchUser = await user.matchPassword(password);
    if (!matchUser) {
      res.status(400).json({ error: "Invalid credentials!" });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    
    console.log("logges in successfull", user);
    res.status(201).json({ token: token, user: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.storeFCMToken = async(req, res) => {
  try {
    const { fcmToken } = req.body;
    const userId = req.user.id; // Extracted from JWT token

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.fcmToken = fcmToken;
    await user.save();

    res.status(201).send("FCM token updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating FCM token");
  }
}
