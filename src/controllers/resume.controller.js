const {
  SUGGESTIONS,
} = require("../constants/feedbackSuggestionsAndRecommendation");
const { sendSuccess, sendFailure } = require("../utils/responses");

module.exports = {
  /**
   * @description Get feedback on a resume
   * @route POST /api/v1/resume/feedback
   * @access Private
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} - The response object
   */
  getFeedback: (req, res) => {
    try {
      const { resume } = req.body;

      if (!resume) {
        return sendFailure(res, 400, "Resume is required");
      }

      const randomSuggestions = SUGGESTIONS.sort(
        () => 0.5 - Math.random()
      ).slice(0, 3);

      return sendSuccess(
        res,
        200,
        "Feedback retrieved successfully",
        randomSuggestions
      );
    } catch (error) {
      console.error(error);
      return sendFailure(res, 500, "Server Error");
    }
  },
};
