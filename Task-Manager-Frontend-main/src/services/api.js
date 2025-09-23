import axios from 'axios';
import { getToken, setToken } from './auth';
import * as mockAuth from './mockAuth';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

// Check if backend is available
let useMockData = false;

const checkBackendAvailability = async () => {
  try {
    await axios.get('http://localhost:8000/health', { timeout: 2000 });
    return true;
  } catch (error) {
    console.log('Backend not available, using mock data');
    return false;
  }
};

// Initialize mock data check
checkBackendAvailability().then(available => {
  useMockData = !available;
});

api.interceptors.request.use(
  (config) => {
    const token = getToken().access;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = getToken().refresh;
        const response = await api.post('/api/token/refresh/', {
          refresh: token,
        });
        const newToken = response.data.access;
        setToken({ access: newToken, refresh: token });
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const signup = async (userData) => {
  if (useMockData) {
    return await mockAuth.mockSignup(userData);
  }
  
  try {
    const response = await api.post('/signup/', userData);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('An error occurred during signup');
  }
};

export const login = async (userData) => {
  if (useMockData) {
    return await mockAuth.mockLogin(userData);
  }
  
  const response = await api.post('/login/', userData);
  return response.data;
};

export const getTasks = async () => {
  if (useMockData) {
    return await mockAuth.mockGetTasks();
  }
  
  const response = await api.get('/tasks/');
  return response.data;
};

export const createTask = async (taskData, token) => {
  if (useMockData) {
    return await mockAuth.mockCreateTask(taskData);
  }
  
  const response = await api.post('/tasks/', taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUsers = async (token) => {
  if (useMockData) {
    return await mockAuth.mockGetUsers();
  }
  
  const response = await api.get('/users/', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTask = async (taskId, taskData, token) => {
  if (useMockData) {
    return await mockAuth.mockUpdateTask(taskId, taskData);
  }
  
  const response = await api.put(`/tasks/${taskId}/`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (taskId, token) => {
  if (useMockData) {
    return await mockAuth.mockDeleteTask(taskId);
  }
  
  await api.delete(`/tasks/${taskId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toggleTaskCompletion = async (taskId, newStatus, token) => {
  if (useMockData) {
    return await mockAuth.mockToggleTaskCompletion(taskId, newStatus);
  }
  
  const response = await api.patch(
    `/tasks/${taskId}/`,
    { status: newStatus },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getTaskSummary = async (token) => {
  if (useMockData) {
    return await mockAuth.mockGetTaskSummary();
  }
  
  try {
    const response = await api.get('/tasks/summary/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error('Failed to fetch task summary');
  }
};

export const getTaskDetail = async (taskId) => {
  if (useMockData) {
    const tasks = await mockAuth.mockGetTasks();
    return tasks.find(t => t.id === taskId);
  }
  
  const response = await api.get(`/tasks/${taskId}/`);
  return response.data;
};
