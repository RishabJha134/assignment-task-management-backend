# Task Management Backend

## Prerequisites
- Node.js
- MongoDB
  

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with:
   - `PORT=3000`
   - `MONGODB_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_secret_key`

## Running the Application
- Development: `npm run dev`
- Production: `npm start`

## Key Features and Requirements

### Authentication
- JWT-based authentication using https://jwt.io/
- User authentication for all API calls
- Secure token generation and validation
- Cookie-based token storage

### Validation
- Comprehensive input validation for all endpoints
- Joi schema validation for task and subtask creation
- Validation of user inputs before processing
- Preventing invalid or malicious data submissions

### Error Handling
- Detailed and user-friendly error messages
- Consistent error response structure
- Handling of authentication, validation, and processing errors
- Descriptive error details for debugging

### Task Model
- Supports task creation with:
  - Title
  - Description
  - Due Date
- Priority Levels:
  - `LOW`
  - `MEDIUM`
  - `HIGH`
- Status Options:
  - `TODO`
  - `DONE`

### Subtask Management
- Dynamic subtask creation and tracking
- Automatic subtask status updates
- Cascading updates during task modifications

## API Endpoints

### Authentication (JWT)
- Include token in cookie for authenticated routes

### Tasks
- `POST /api/tasks`: Create task
  - Validate input
  - Set priority and status
- `GET /api/tasks`: Get all tasks
  - Support filtering
  - Pagination
- `PUT /api/tasks/:task_id`: Update task
  - Modify due date
  - Change status
- `DELETE /api/tasks/:task_id`: Delete task (Soft deletion)
  - Remove associated subtasks

### Subtasks
- `POST /api/subtasks/:task_id`: Create subtask
- `GET /api/subtasks`: Get all subtasks
  - Filter by task
- `PUT /api/subtasks/:subtask_id`: Update subtask status
- `DELETE /api/subtasks/:subtask_id`: Delete subtask (Soft deletion)

## API Testing
- Comprehensive test coverage for all endpoints
- Validate authentication, validation, and error handling

## Security Considerations
- JWT token authentication
- Password hashing
- Input validation
- Error handling without exposing sensitive information

## Recommended Tools
- MongoDB Compass
- Node.js debug tools
