const resumeRoutes = require("./routes/resume.routes");
const jobRoutes = require("./routes/job.routes");
const authRoutes = require("./routes/auth.routes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => res.json("Job Tracker API"));
app.get("/api/v1", (req, res) => res.json("Job Tracker API v1"));
app.get("/api/v1/health", (req, res) => res.json("Job Tracker API is healthy"));
app.get("/api/v1/status", (req, res) => res.json("Job Tracker API is running"));

//Auth Route
app.use("/api/v1/auth", authRoutes);

// Other Routes
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/resume", resumeRoutes);

module.exports = app;
