const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ['LOW', 'MEDIUM', 'HIGH'], 
    default: 'MEDIUM' 
  },
  status: { 
    type: String, 
    enum: ['TODO', 'DONE'], 
    default: 'TODO' 
  },
  due_date: { 
    type: Date 
  },
  sub_tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SubTask' 
  }],
  is_deleted: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Task', taskSchema);