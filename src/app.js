require("dotenv").config();

const express = require("express");
const path = require("path");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Health check endpoint for ECS
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy"
    });
});

// Application routes
app.use("/", taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
