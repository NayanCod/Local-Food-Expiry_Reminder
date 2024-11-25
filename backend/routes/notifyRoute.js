const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addNotification, getNotifications, updateNotification } = require("../controllers/norificationController.js");
const router = express.Router();

router.post("/", protect, addNotification);
router.get("/", protect, getNotifications);
router.put("/:id", protect, updateNotification);

module.exports = router;