const Item = require("../model/Item.js");

// Create Items
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item({ ...req.body, user: req.user.id });
    await newItem.save();
    console.log("New item created", newItem);
    res.status(200).json({data: newItem});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id });
    console.log("user's items: ", items);
    res.status(200).json({data: items});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
