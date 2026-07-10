const taskModel = require("../models/taskModel");

// Display all tasks
async function getTasks(req, res) {
  const tasks = await taskModel.getAllTasks();
  res.render("index", { tasks });
}

// Show add task page
function showAddTask(req, res) {
  res.render("add-task");
}

// Create a new task
async function addTask(req, res) {
  const { title } = req.body;
  await taskModel.createTask(title);
  res.redirect("/");
}

// Show edit task page
async function showEditTask(req, res) {
  const task = await taskModel.getTaskById(req.params.id);
  res.render("edit-task", { task });
}

// Update a task
async function updateTask(req, res) {
  const { title, status } = req.body;
  await taskModel.updateTask(req.params.id, title, status);
  res.redirect("/");
}

// Delete a task
async function deleteTask(req, res) {
  await taskModel.deleteTask(req.params.id);
  res.redirect("/");
}

module.exports = {
  getTasks,
  showAddTask,
  addTask,
  showEditTask,
  updateTask,
  deleteTask,
};
