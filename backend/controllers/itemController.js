const Item = require("../model/Item.js");

// Create Items
exports.createItem = async (req, res) => {
  try {
    const item = new Item({ ...req.body, user: req.user.id });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
