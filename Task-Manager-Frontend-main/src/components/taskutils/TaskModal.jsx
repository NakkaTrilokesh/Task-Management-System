import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTaskDetail } from '../../services/api';

const TaskModal = ({ taskId, onClose }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetail = async () => {
      try {
        const taskDetail = await getTaskDetail(taskId);
        setTask(taskDetail);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetail();
  }, [taskId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        Error: {error.message}
      </div>
    );
  }

  if (!task) {
    return null;
  }

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      id="static-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {task.title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="relative p-4 md:p-5 space-y-4">
            <span
              className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold text-white rounded ${getPriorityBadgeColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
              {task.description}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Due Date: {task.due_date}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Status: {task.status}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Assigned to: {task.assigned_user.username}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskModal;
