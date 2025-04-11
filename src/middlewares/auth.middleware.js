const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models");
const { sendFailure } = require("../utils/responses");
dotenv.config();

module.exports = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return sendFailure(res, 401, "Invalid token");
      }

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return sendFailure(res, 401, "Invalid token");
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    sendFailure(res, 500, "Server Error");
  }
};
