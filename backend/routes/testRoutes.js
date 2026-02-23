const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// user protected route
router.get("/user", protect, (req, res) => {
  res.json({ message: "Welcome User", user: req.user });
});

// admin protected route
router.get("/admin", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;

