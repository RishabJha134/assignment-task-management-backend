const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getAllTasks);
router.put('/:task_id', authMiddleware, taskController.updateTask);
router.delete('/:task_id', authMiddleware, taskController.deleteTask);

module.exports = router;