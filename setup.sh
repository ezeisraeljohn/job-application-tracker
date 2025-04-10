#!/bin/bash

echo "Creating Project Structure for AI Job Application Tracker..."

mkdir -p src/{config,controllers,models,routes,middlewares,services,utils}

touch .env .gitignore README.md server.js package.json

touch src/app.js

# Config
touch src/config/config.js

# Controllers
touch src/controllers/auth.controller.js
touch src/controllers/job.controller.js
touch src/controllers/resume.controller.js

# Models
touch src/models/index.js
touch src/models/user.model.js
touch src/models/job.model.js

# Routes
touch src/routes/auth.routes.js
touch src/routes/job.routes.js
touch src/routes/resume.routes.js

# Middlewares
touch src/middlewares/auth.middleware.js

# Services
touch src/services/auth.service.js
touch src/services/job.service.js

# Utils
touch src/utils/jwt.js

echo "Project structure created successfully."

echo "Don't forget to run:"
echo "npm init -y"
echo "npm install express sequelize pg pg-hstore jsonwebtoken bcrypt dotenv cors"
echo "npm install --save-dev nodemon"

echo "All set. Let's build something cool!"
