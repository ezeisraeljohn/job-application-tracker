const authRoutes = require("./routes/auth.routes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => res.json("App is Running"));

//Auth Routes
app.use("/api/v1/auth", authRoutes);

module.exports = app;
