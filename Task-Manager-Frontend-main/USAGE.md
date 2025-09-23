# Task Manager Frontend - Usage Guide

## Overview
This is a fully functional Task Manager application with authentication, dashboard, and task management features.

## Features

### 🔐 Authentication
- **Login Page**: Secure user authentication with validation
- **Signup Page**: User registration with email validation
- **Protected Routes**: Automatic redirection to login for unauthorized users

### 📊 Dashboard
- **Task Summary**: Visual charts showing task statistics
- **Task Overview**: Doughnut and bar charts for task status
- **Real-time Data**: Live updates from the backend API

### 📝 Task Management
- **Task List**: View all tasks with filtering and search
- **Create Tasks**: Add new tasks with full details
- **Edit Tasks**: Update existing tasks
- **Delete Tasks**: Remove tasks with confirmation
- **Task Status**: Toggle between completed/in-progress

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Backend API running on `http://localhost:8000`

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

### 1. Authentication
- **Sign Up**: Create a new account with username, email, and password
- **Login**: Use your credentials to access the dashboard
- **Logout**: Click the logout button in the sidebar

### 2. Dashboard
- View task statistics and charts
- Monitor your productivity
- Get insights into task completion rates

### 3. Task Management
- **View Tasks**: Navigate to the Tasks page to see all your tasks
- **Create Task**: Click "Create First Task" or navigate to Tasks > Create
- **Filter Tasks**: Use the search bar and status filter to find specific tasks
- **Edit Task**: Click on a task to edit its details
- **Complete Task**: Toggle task completion status
- **Delete Task**: Remove tasks you no longer need

## API Endpoints
The application expects the following backend endpoints:
- `POST /signup/` - User registration
- `POST /login/` - User authentication
- `GET /tasks/` - Fetch all tasks
- `POST /tasks/` - Create new task
- `PUT /tasks/{id}/` - Update task
- `DELETE /tasks/{id}/` - Delete task
- `PATCH /tasks/{id}/` - Toggle task status
- `GET /tasks/summary/` - Get task statistics
- `GET /users/` - Get all users

## Error Handling
- **Network Errors**: Graceful handling of connection issues
- **Validation Errors**: Real-time form validation with helpful messages
- **Server Errors**: User-friendly error messages with retry options
- **Error Boundaries**: Catches unexpected errors and provides recovery options

## Responsive Design
- Mobile-first approach
- Responsive sidebar navigation
- Optimized for all screen sizes
- Dark mode support

## Technologies Used
- React 18
- React Router DOM
- Axios for API calls
- Chart.js for data visualization
- Tailwind CSS for styling
- Framer Motion for animations
- React Toastify for notifications

## Troubleshooting

### Common Issues
1. **Login fails**: Check if backend is running and credentials are correct
2. **Tasks not loading**: Verify API endpoints and authentication token
3. **Charts not displaying**: Ensure Chart.js is properly installed

### Development
- Check browser console for error messages
- Verify network requests in Developer Tools
- Ensure all dependencies are installed

## Support
For issues or questions, check the browser console for error messages and ensure the backend API is running properly.
