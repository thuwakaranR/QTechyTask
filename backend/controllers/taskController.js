const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  const { userId, title, description, completed } = req.body;
  const task = new Task({
    userId,
    title,
    description,
    completed,
  });
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed || task.completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
