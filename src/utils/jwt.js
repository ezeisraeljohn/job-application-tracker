const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });
  return token;
};

const generateSalt = (value) => {
  return bcrypt.genSaltSync(value);
};

module.exports = { generateSalt, generateToken };
