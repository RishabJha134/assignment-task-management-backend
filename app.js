const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const subtaskRoutes = require('./routes/subtaskRoutes');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/subtasks', subtaskRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: err.message 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;