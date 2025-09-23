import { useState, useEffect } from 'react';
import { getTaskSummary } from '../services/api';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';

const Dashboard = () => {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!token) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getTaskSummary(token);
        setSummary(data);
      } catch (err) {
        console.error('Failed to fetch task summary', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Data Available</h2>
          <p className="text-gray-600 dark:text-gray-300">No task data found. Create some tasks to see your dashboard.</p>
        </div>
      </div>
    );
  }

  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Overdue'],
    datasets: [
      {
        label: 'Created Tasks',
        data: [
          summary.completed_created_tasks,
          summary.in_progress_created_tasks,
          summary.overdue_created_tasks,
        ],
        backgroundColor: ['#34D399', '#FBBF24', '#F87171'],
      },
      {
        label: 'Assigned Tasks',
        data: [
          summary.completed_assigned_tasks,
          summary.in_progress_assigned_tasks,
          summary.overdue_assigned_tasks,
        ],
        backgroundColor: ['#60A5FA', '#F59E0B', '#EF4444'],
      },
    ],
  };

  const barChartData = {
    labels: ['Total Created Tasks', 'Total Assigned Tasks'],
    datasets: [
      {
        label: 'Tasks',
        data: [summary.total_created_tasks, summary.total_assigned_tasks],
        backgroundColor: ['#4F46E5', '#6366F1'],
      },
    ],
  };

  const taskDetails = [
    {
      label: 'Total Created Tasks',
      value: summary.total_created_tasks,
      color: 'bg-purple-500',
    },
    {
      label: 'Total Assigned Tasks',
      value: summary.total_assigned_tasks,
      color: 'bg-indigo-500',
    },
    {
      label: 'Completed Created Tasks',
      value: summary.completed_created_tasks,
      color: 'bg-green-500',
    },
    {
      label: 'Completed Assigned Tasks',
      value: summary.completed_assigned_tasks,
      color: 'bg-blue-500',
    },
    {
      label: 'In Progress Created Tasks',
      value: summary.in_progress_created_tasks,
      color: 'bg-yellow-500',
    },
    {
      label: 'In Progress Assigned Tasks',
      value: summary.in_progress_assigned_tasks,
      color: 'bg-orange-500',
    },
    {
      label: 'Overdue Created Tasks',
      value: summary.overdue_created_tasks,
      color: 'bg-red-500',
    },
    {
      label: 'Overdue Assigned Tasks',
      value: summary.overdue_assigned_tasks,
      color: 'bg-pink-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <DarkModeToggle />
      <h2 className="text-2xl font-bold mb-4 mt-4 text-gray-800 dark:text-white">Task Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Task Status Overview</h3>
          <Doughnut data={taskStatusData} />
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Total Tasks</h3>
          <Bar data={barChartData} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mt-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Task Details</h3>
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {taskDetails.map((task, index) => (
            <motion.li
              key={index}
              className={`p-4 rounded-lg shadow-md text-white ${task.color} transition-transform hover:scale-105`}
              variants={cardVariants}
            >
              <h4 className="text-lg font-semibold mb-2">{task.label}</h4>
              <p className="text-2xl font-bold">{task.value}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Dashboard;
