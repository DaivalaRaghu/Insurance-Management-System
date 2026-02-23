const express = require("express");
const router = express.Router();

const Insurance = require("../models/Insurance");
const { protect, admin } = require("../middleware/authMiddleware");


/* ================= CREATE POLICY ================= */
router.post("/", protect, async (req, res) => {
  try {
    const policy = await Insurance.create({
      ...req.body,
      user: req.user._id, // attach logged-in user
    });

    res.status(201).json(policy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/* ================= GET POLICIES ================= */
/* User → Only their policies */
/* Admin → All policies */

router.get("/", protect, async (req, res) => {
  try {
    let data;

    if (req.user.role === "admin") {
      data = await Insurance.find().sort({ createdAt: -1 });
    } else {
      data = await Insurance.find({
        user: req.user._id,
      }).sort({ createdAt: -1 });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ================= UPDATE POLICY ================= */
router.put("/:id", protect, async (req, res) => {
  try {
    const policy = await Insurance.findById(req.params.id);

    if (!policy)
      return res.status(404).json({ message: "Policy not found" });

    // 🔐 Ownership check
    if (
      policy.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Insurance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ================= DELETE POLICY ================= */
router.delete("/:id", protect, async (req, res) => {
  try {
    const policy = await Insurance.findById(req.params.id);

    if (!policy)
      return res.status(404).json({ message: "Policy not found" });

    // 🔐 Ownership check
    if (
      policy.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Insurance.findByIdAndDelete(req.params.id);

    res.json({ message: "Policy deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;