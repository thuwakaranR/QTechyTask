const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, getById } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(authMiddleware, getTasks)
  .post(authMiddleware, createTask);

router.route('/:id')
.get(authMiddleware,getById)
  .put(authMiddleware,updateTask)
  .delete(authMiddleware,deleteTask);

module.exports = router;
