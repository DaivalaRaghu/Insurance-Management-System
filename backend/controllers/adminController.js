const User = require("../models/User");
const Insurance = require("../models/Insurance");

/* GET ALL USERS */
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE USER */
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* GET ALL INSURANCES */
const getInsurances = async (req, res) => {
  try {
    const data = await Insurance.find().populate("user", "name email");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* REPORTS */
const getReports = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalInsurances = await Insurance.countDocuments();

    const revenue = await Insurance.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      users: totalUsers,
      insurances: totalInsurances,
      revenue: revenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  getInsurances,
  getReports,
};
