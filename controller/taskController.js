const Task = require('../models/task');
const SubTask = require('../models/subtask');
const { createTaskValidation } = require('../utils/validation');

exports.createTask = async (req, res) => {
  try {
    const { error } = createTaskValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, due_date, priority } = req.body;
    
    const task = new Task({
      title,
      description,
      user: req.user._id,
      due_date,
      priority
    });

    await task.save();

    res.status(201).json({ 
      message: 'Task created successfully', 
      task 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating task', 
      error: error.message 
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { priority, due_date, page = 1, limit = 10 } = req.query;
    
    const filter = { 
      user: req.user._id, 
      is_deleted: false 
    };

    if (priority) filter.priority = priority;
    if (due_date) filter.due_date = { $lte: new Date(due_date) };

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      total_pages: Math.ceil(total / limit),
      current_page: page
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching tasks', 
      error: error.message 
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { due_date, status } = req.body;

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

    if (due_date) task.due_date = due_date;
    if (status) task.status = status;

    // Update all associated subtasks if task status changes
    if (status) {
      await SubTask.updateMany(
        { task: task_id, is_deleted: false },
        { status: status === 'DONE' ? 1 : 0 }
      );
    }

    await task.save();

    res.json({ 
      message: 'Task updated successfully', 
      task 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating task', 
      error: error.message 
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { task_id } = req.params;

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

    task.is_deleted = true;
    await task.save();

    // Soft delete associated subtasks
    await SubTask.updateMany(
      { task: task_id },
      { is_deleted: true }
    );

    res.json({ 
      message: 'Task deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting task', 
      error: error.message 
    });
  }
};