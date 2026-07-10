const express = require("express");
const path = require("path");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set views folder
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", taskRoutes);

module.exports = app;
