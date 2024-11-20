const express = require('express');
const { createItem, getItems } = require('../controllers/itemController.js');
const { protect } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/addItem', protect, createItem);
router.get('/getItems', protect, getItems);

module.exports = router;
