const express = require("express");
const router = express.Router();
const ResumeController = require("../controllers/resume.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/feedback", authMiddleware, ResumeController.getFeedback);

module.exports = router;
