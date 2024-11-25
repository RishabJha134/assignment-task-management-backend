const express = require('express');
const router = express.Router();
const subtaskController = require('../controller/subtaskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:task_id', authMiddleware, subtaskController.createSubTask);
router.get('/', authMiddleware, subtaskController.getAllSubTasks);
router.put('/:subtask_id', authMiddleware, subtaskController.updateSubTask);
router.delete('/:subtask_id', authMiddleware, subtaskController.deleteSubTask);

module.exports = router;