const express = require("express");
const JobController = require("../controllers/job.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware); // Apply auth middleware to all routes

router.post("/", JobController.createJob);
router.get("/", JobController.getAllJobs);
router.get("/recommendations", JobController.getRecommendations);
router.get("/:id", JobController.getJob);
router.put("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

module.exports = router;
