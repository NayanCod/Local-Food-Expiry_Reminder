const express = require('express');
const { createItem, getItems, deleteItem, updateItem } = require('../controllers/itemController.js');
const { protect } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/addItem', protect, createItem);
router.delete('/:id', protect, deleteItem);
router.put('/:id', protect, updateItem);
router.get('/getItems', protect, getItems);

module.exports = router;
