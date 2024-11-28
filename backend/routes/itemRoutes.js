const express = require('express');
const { createItem, getItems, deleteItem } = require('../controllers/itemController.js');
const { protect } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/addItem', protect, createItem);
router.delete('/:id', protect, deleteItem);
router.get('/getItems', protect, getItems);

module.exports = router;
