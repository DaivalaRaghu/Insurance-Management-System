require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* Middleware */

app.use(cors());
app.use(express.json());

/* Routes */

const authRoutes = require("./routes/authRoutes");
const insuranceRoutes = require("./routes/insuranceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);

/* Database */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


/* Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});