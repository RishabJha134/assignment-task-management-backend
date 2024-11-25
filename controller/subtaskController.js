const SubTask = require('../models/subtask');
const Task = require('../models/task');
const { createSubTaskValidation } = require('../utils/validation');

exports.createSubTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { error } = createSubTaskValidation({ task_id });
    if (error) {
      return res.status(400).json({ 
        message: error.details[0].message 
      });
    }
    const task = await Task.findOne({ 
      _id: task_id, 
      user: req.user._id, 
      is_deleted: false 
    });
    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }
    const subTask = new SubTask({
      task: task_id,
      user: req.user._id
    });
    await subTask.save();
    // Add subtask reference to main task
    task.sub_tasks.push(subTask._id);
    await task.save();
    res.status(201).json({ 
      message: 'Subtask created successfully', 
      subTask 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating subtask', 
      error: error.message 
    });
  }
};

exports.getAllSubTasks = async (req, res) => {
  try {
    const { task_id } = req.query;
    
    const filter = { 
      user: req.user._id, 
      is_deleted: false 
    };
    if (task_id) filter.task = task_id;
    const subTasks = await SubTask.find(filter)
      .populate('task', 'title');
    res.json({ subTasks });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching subtasks', 
      error: error.message 
    });
  }
};

exports.updateSubTask = async (req, res) => {
  try {
    const { subtask_id } = req.params;
    const { status } = req.body;
    const subTask = await SubTask.findOne({ 
      _id: subtask_id, 
      user: req.user._id, 
      is_deleted: false 
    });
    if (!subTask) {
      return res.status(404).json({ 
        message: 'Subtask not found' 
      });
    }
    if (status !== undefined) {
      subTask.status = status;
    }
    await subTask.save();
    // Check if all subtasks are done
    const allSubTasks = await SubTask.find({ 
      task: subTask.task, 
      is_deleted: false 
    });
    const allDone = allSubTasks.every(st => st.status === 1);
    if (allDone) {
      await Task.findByIdAndUpdate(subTask.task, { 
        status: 'DONE' 
      });
    }
    res.json({ 
      message: 'Subtask updated successfully', 
      subTask 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating subtask', 
      error: error.message 
    });
  }
};

exports.deleteSubTask = async (req, res) => {
  try {
    const { subtask_id } = req.params;

    const subTask = await SubTask.findOne({ 
      _id: subtask_id, 
      user: req.user._id, 
      is_deleted: false 
    });

    if (!subTask) {
      return res.status(404).json({ 
        message: 'Subtask not found' 
      });
    }

    subTask.is_deleted = true;
    await subTask.save();

    // Remove subtask reference from main task
    await Task.findByIdAndUpdate(subTask.task, {
      $pull: { sub_tasks: subtask_id }
    });

    res.json({ 
      message: 'Subtask deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting subtask', 
      error: error.message 
    });
  }
};