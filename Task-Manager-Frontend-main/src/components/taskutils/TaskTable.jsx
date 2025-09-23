import { motion } from 'framer-motion';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TaskModal from './TaskModal';

const TaskTable = ({ tasks, handleDelete, handleToggleComplete }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTaskId(task.id);
  };

  const handleCloseModal = () => {
    setSelectedTaskId(null);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-900">
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Priority
            </th>
            <th scope="col" className="px-6 py-3">
              Assigned To
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <motion.tr
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {task.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {moment(task.due_date).format('Do MMMM YYYY')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.priority}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {task.assigned_user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {task.status !== 'completed' && (
                  <Link to={`/tasks/create`} state={{ currentTask: task }}>
                    <button className="me-2" title="Edit Task">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                )}
                <button
                  className="me-2"
                  title="Delete Task"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(task.id);
                  }}
                >
                  <i className="fas fa-trash-alt" style={{ color: 'red' }}></i>
                </button>
                <button
                  title={
                    task.status === 'completed'
                      ? 'Undo Complete'
                      : 'Complete Task'
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleComplete(task);
                  }}
                >
                  <i
                    className={`fas ${
                      task.status === 'completed' ? 'fa-undo' : 'fa-check'
                    }`}
                  ></i>
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {selectedTaskId && (
        <TaskModal taskId={selectedTaskId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TaskTable;
