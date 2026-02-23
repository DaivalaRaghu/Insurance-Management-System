exports.getAllInsurance = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await Insurance.countDocuments();

    const data = await Insurance.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      data,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
