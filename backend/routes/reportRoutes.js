const router = require("express").Router();
const Insurance = require("../models/Insurance");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", protect, admin, async (req, res) => {
  const total = await Insurance.countDocuments();

  const revenue = await Insurance.aggregate([
    { $group: { _id: null, sum: { $sum: "$price" } } },
  ]);

  res.json({ total, revenue: revenue[0]?.sum || 0 });
});

module.exports = router;
