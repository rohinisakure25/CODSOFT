require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");

const app = express();

/* -------------------- DATABASE -------------------- */
connectDB();

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://job-board-igickea4s-rohini-sakures-projects.vercel.app',
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- STATIC FILES -------------------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.json({ message: "Job Board API is running" });
});

/* -------------------- ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
