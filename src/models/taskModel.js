const pool = require("../config/db");

// Get all tasks
async function getAllTasks() {
  const result = await pool.query(
    "SELECT * FROM tasks ORDER BY id ASC"
  );
  return result.rows;
}

// Add a new task
async function createTask(title) {
  await pool.query(
    "INSERT INTO tasks (title) VALUES ($1)",
    [title]
  );
}

// Get one task by ID
async function getTaskById(id) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Update a task
async function updateTask(id, title, status) {
  await pool.query(
    "UPDATE tasks SET title = $1, status = $2 WHERE id = $3",
    [title, status, id]
  );
}

// Delete a task
async function deleteTask(id) {
  await pool.query(
    "DELETE FROM tasks WHERE id = $1",
    [id]
  );
}

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
