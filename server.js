const app = require("./src/app");
const { sequelize } = require("./src/models");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database Connected...");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
