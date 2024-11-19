const express = require('express');
const { register, login, storeFCMToken } = require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/update-token', protect, storeFCMToken);

module.exports = router;
