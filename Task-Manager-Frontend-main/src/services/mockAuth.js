// Mock authentication service for testing without backend
const MOCK_USERS = [
  {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  },
  {
    id: 2,
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123'
  },
  {
    id: 3,
    username: 'demo',
    email: 'demo@example.com',
    password: 'demo123'
  }
];

const MOCK_TASKS = [
  {
    id: 1,
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the task manager project',
    status: 'completed',
    priority: 'high',
    due_date: '2024-01-15',
    created_at: '2024-01-10T10:00:00Z',
    assigned_user: { id: 1, username: 'testuser' }
  },
  {
    id: 2,
    title: 'Review code changes',
    description: 'Review all pending code changes and provide feedback',
    status: 'in_progress',
    priority: 'medium',
    due_date: '2024-01-20',
    created_at: '2024-01-12T14:30:00Z',
    assigned_user: { id: 1, username: 'testuser' }
  },
  {
    id: 3,
    title: 'Update user interface',
    description: 'Improve the user interface based on feedback',
    status: 'open',
    priority: 'low',
    due_date: '2024-01-25',
    created_at: '2024-01-14T09:15:00Z',
    assigned_user: { id: 2, username: 'admin' }
  },
  {
    id: 4,
    title: 'Fix authentication bug',
    description: 'Resolve the login issue reported by users',
    status: 'completed',
    priority: 'high',
    due_date: '2024-01-18',
    created_at: '2024-01-16T11:45:00Z',
    assigned_user: { id: 1, username: 'testuser' }
  },
  {
    id: 5,
    title: 'Add new features',
    description: 'Implement the requested new features for better user experience',
    status: 'in_progress',
    priority: 'medium',
    due_date: '2024-01-30',
    created_at: '2024-01-17T16:20:00Z',
    assigned_user: { id: 3, username: 'demo' }
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockSignup = async (userData) => {
  await delay(1000); // Simulate network delay
  
  const { username, email, password } = userData;
  
  // Check if user already exists
  const existingUser = MOCK_USERS.find(user => 
    user.username === username || user.email === email
  );
  
  if (existingUser) {
    throw new Error('Username or email already exists');
  }
  
  // Create new user
  const newUser = {
    id: MOCK_USERS.length + 1,
    username,
    email,
    password
  };
  
  MOCK_USERS.push(newUser);
  
  return {
    message: 'User created successfully',
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }
  };
};

export const mockLogin = async (userData) => {
  await delay(1000); // Simulate network delay
  
  const { username, password } = userData;
  
  // Find user
  const user = MOCK_USERS.find(u => u.username === username && u.password === password);
  
  if (!user) {
    throw new Error('Invalid username or password');
  }
  
  // Generate mock tokens
  const accessToken = `mock_access_token_${user.id}_${Date.now()}`;
  const refreshToken = `mock_refresh_token_${user.id}_${Date.now()}`;
  
  return {
    access: accessToken,
    refresh: refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  };
};

export const mockGetTasks = async () => {
  await delay(800); // Simulate network delay
  return MOCK_TASKS;
};

export const mockCreateTask = async (taskData) => {
  await delay(1000);
  
  const newTask = {
    id: MOCK_TASKS.length + 1,
    ...taskData,
    created_at: new Date().toISOString(),
    assigned_user: MOCK_USERS.find(u => u.id === taskData.assigned_user_id) || MOCK_USERS[0]
  };
  
  MOCK_TASKS.push(newTask);
  return newTask;
};

export const mockUpdateTask = async (taskId, taskData) => {
  await delay(800);
  
  const taskIndex = MOCK_TASKS.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  MOCK_TASKS[taskIndex] = {
    ...MOCK_TASKS[taskIndex],
    ...taskData,
    assigned_user: MOCK_USERS.find(u => u.id === taskData.assigned_user_id) || MOCK_TASKS[taskIndex].assigned_user
  };
  
  return MOCK_TASKS[taskIndex];
};

export const mockDeleteTask = async (taskId) => {
  await delay(500);
  
  const taskIndex = MOCK_TASKS.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  MOCK_TASKS.splice(taskIndex, 1);
  return { message: 'Task deleted successfully' };
};

export const mockToggleTaskCompletion = async (taskId, newStatus) => {
  await delay(500);
  
  const task = MOCK_TASKS.find(t => t.id === taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  
  task.status = newStatus;
  return task;
};

export const mockGetUsers = async () => {
  await delay(500);
  return MOCK_USERS.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email
  }));
};

export const mockGetTaskSummary = async () => {
  await delay(800);
  
  const completedCreated = MOCK_TASKS.filter(t => t.status === 'completed' && t.assigned_user.id === 1).length;
  const inProgressCreated = MOCK_TASKS.filter(t => t.status === 'in_progress' && t.assigned_user.id === 1).length;
  const overdueCreated = MOCK_TASKS.filter(t => t.status === 'open' && new Date(t.due_date) < new Date()).length;
  
  const completedAssigned = MOCK_TASKS.filter(t => t.status === 'completed' && t.assigned_user.id !== 1).length;
  const inProgressAssigned = MOCK_TASKS.filter(t => t.status === 'in_progress' && t.assigned_user.id !== 1).length;
  const overdueAssigned = MOCK_TASKS.filter(t => t.status === 'open' && t.assigned_user.id !== 1 && new Date(t.due_date) < new Date()).length;
  
  return {
    total_created_tasks: completedCreated + inProgressCreated + overdueCreated,
    total_assigned_tasks: completedAssigned + inProgressAssigned + overdueAssigned,
    completed_created_tasks: completedCreated,
    in_progress_created_tasks: inProgressCreated,
    overdue_created_tasks: overdueCreated,
    completed_assigned_tasks: completedAssigned,
    in_progress_assigned_tasks: inProgressAssigned,
    overdue_assigned_tasks: overdueAssigned
  };
};
