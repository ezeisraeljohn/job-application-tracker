// This file contains the database configuration for different environments
// such as development, test, and production.

const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DB_PROD_URL",
    username: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        ca: fs
          .readFileSync(path.resolve(__dirname, "../cert/ca.pem"))
          .toString(),
        rejectUnauthorized: false, // Set this true for Aiven's signed cert
      },
    },
    logging: false,
  },
};
