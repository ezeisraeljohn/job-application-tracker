const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { sendSuccess, sendFailure } = require("../utils/responses");
const { generateSalt, generateToken } = require("../utils/jwt");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return sendFailure(res, 400, "User already exists");
      const salt = generateSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password: hashedPassword });
      sendSuccess(res, 201, "User created successfully");
    } catch {
      sendFailure(res, 500, "Server Error");
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return sendFailure(res, 400, "Invalid Credentials");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return sendFailure(res, 400, "Invalid Credentials");
      const token = generateToken({ id: user.id, email: user.email });
      const userWithoutPassword = {
        ...user.toJSON(),
        password: undefined,
      };
      sendSuccess(res, 200, "User logged in successfully", {
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error(error);
      sendFailure(res, 500, `Server Error: ${error.message}`);
    }
  },
};
