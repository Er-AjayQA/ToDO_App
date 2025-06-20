// Imports & Configs
const express = require("express");
const cors = require("cors");
const DBConnection = require("./config/db.config");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes Imports
const companyRoutes = require("./api/CompanyManagement/Router/company.router");
const userRoutes = require("./api/UserManagement/Router/user.router");
const projectRoutes = require("./api/ProjectManagement/Projects/Router/projects.router");
const folderRoutes = require("./api/ProjectManagement/Folder/Router/folder.router");
const taskRoutes = require("./api/ProjectManagement/Tasks/Router/tasks.router");

// Routes Middleware
app.use("/api/v1/admin/company", companyRoutes);
app.use("/api/v1/admin/users", userRoutes);
app.use("/api/v1/admin", projectRoutes);
app.use("/api/v1/admin/", folderRoutes);
app.use("/api/v1/admin/", taskRoutes);

// Listening to Server
app.listen(PORT, (err) => {
  try {
    DBConnection(); // Connecting to DB
    if (!err) {
      console.log(`Server is running at port no :- ${PORT}`);
    }
  } catch (error) {
    console.log(`Server connection error`, err);
  }
});
