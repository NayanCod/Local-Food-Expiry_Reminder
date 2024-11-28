const Item = require("../model/Item.js");

// Create Items
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item({ ...req.body, user: req.user.id });
    await newItem.save();
    console.log("New item created", newItem);
    res.status(200).json({ data: newItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Items
exports.getItems = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res.status(500).send("User not found!");
    }
    const items = await Item.find({ user: user }).sort({ createdAt: -1 });
    console.log("user's items: ", items);
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
