const express = require('express');
const { createItem, getItems } = require('../controllers/itemController.js');
const { protect } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/', protect, createItem);
router.get('/', protect, getItems);

module.exports = router;
