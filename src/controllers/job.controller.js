const { Job } = require("../models");
const { sendFailure, sendSuccess } = require("../utils/responses");
const {
  RECOMMENDATION,
} = require("../constants/feedbackSuggestionsAndRecommendation");

module.exports = {
  /**
   * @description - Create a new Job application
   *  @route POST /api/v1/jobs
   * @access Private
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   */
  createJob: async (req, res) => {
    const { title, company, status, applitedDate, notes } = req.body;
    try {
      const job = await Job.create({
        title,
        company,
        status,
        applitedDate,
        notes,
        userId: req.user.id, // Get the user ID from the request object
      });
      return sendSuccess(res, 201, "Job created successfully", job);
    } catch (error) {
      console.error(error);
      return sendFailure(res, 500, "Server Error");
    }
  },
  /**
   * @description - Get all Job applications
   * @route GET /api/v1/jobs
   * @access Private
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   */
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.findAll({
        where: { userId: req.user.id }, // Get the user ID from the request object
      });
      return sendSuccess(res, 200, "Jobs retrieved successfully", jobs);
    } catch (error) {
      console.error(error);
      return sendFailure(res, 500, "Server Error");
    }
  },

  /**
   * @description - Get a single Job application
   * @route GET /api/v1/jobs/:id
   * @access Private
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   */
  getJob: async (req, res) => {
    const { id } = req.params;
    try {
      const job = await Job.findOne({
        where: { id, userId: req.user.id }, // Get the user ID from the request object
      });
      if (!job) return sendFailure(res, 404, "Job not found");
      return sendSuccess(res, 200, "Job retrieved successfully", job);
    } catch (error) {
      console.error(error);
      return sendFailure(res, 500, "Server Error");
    }
  },

  /**
   * @description - Update a Job application
   * @route PUT /api/v1/jobs/:id
   * @access Private
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   */
  updateJob: async (req, res) => {
    const { id } = req.params;
    const { title, company, status, applitedDate, notes } = req.body;
    try {
      const job = await Job.findOne({
        where: { id, userId: req.user.id }, // Get the user ID from the request object
      });
      if (!job) return sendFailure(res, 404, "Job not found");
      await job.update({ title, company, status, applitedDate, notes });
      return sendSuccess(res, 200, "Job updated successfully", job);
    } catch (error) {
      console.error(error);
      return sendFailure(res, 500, "Server Error");
    }
  },
  /**
   * @description - Delete a Job application
   * @route DELETE /api/v1/jobs/:id
   * @access Private
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   */
  deleteJob: async (req, res) => {
    const { id } = req.params;
    try {
      const job = await Job.findOne({
        where: { id, userId: req.user.id }, // Get the user ID from the request object
      });
      if (!job) return sendFailure(res, 404, "Job not found");
      await job.destroy();
      return sendSuccess(res, 200, "Job deleted successfully");
    } catch (error) {
      console.error(error);
      return sendFailure(res, 500, "Server Error");
    }
  },

  /**
   * @description Get feedback on a resume
   * @route POST /api/v1/resume/feedback
   * @access Private
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   */
  getRecommendations: async (req, res) => {
    sendSuccess(
      res,
      200,
      "Reccomendations retrieved successfully",
      RECOMMENDATION
    );
  },
};
