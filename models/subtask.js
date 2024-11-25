const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
  task: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: Number, 
    enum: [0, 1], 
    default: 0 
  },
  is_deleted: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('SubTask', subTaskSchema);