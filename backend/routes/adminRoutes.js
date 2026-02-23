const router = require("express").Router();
const User = require("../models/User");
const Insurance = require("../models/Insurance");
const { protect, adminOnly } = require("../middleware/auth");

/* Get all users */
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/* Delete user */
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

/* Get all insurances */
router.get("/insurances", protect, adminOnly, async (req, res) => {
  const data = await Insurance.find();
  res.json(data);
});

module.exports = router;
