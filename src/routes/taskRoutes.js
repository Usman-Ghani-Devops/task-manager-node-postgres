const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// Home page
router.get("/", taskController.getTasks);

// Add task
router.get("/add", taskController.showAddTask);
router.post("/add", taskController.addTask);

// Edit task
router.get("/edit/:id", taskController.showEditTask);
router.post("/edit/:id", taskController.updateTask);

// Delete task
router.get("/delete/:id", taskController.deleteTask);

module.exports = router;
