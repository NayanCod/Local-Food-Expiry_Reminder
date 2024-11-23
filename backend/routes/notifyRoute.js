const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addNotification, getNotifications } = require("../controllers/norificationController");
const router = express.Router();

router.post("/", protect, addNotification);
router.get("/", protect, getNotifications);

module.exports = router;