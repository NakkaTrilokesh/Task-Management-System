import { useEffect, useState } from 'react';
import { getTasks, deleteTask, toggleTaskCompletion } from '../../services/api';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TaskFilters from './TaskFilters';
import TaskTable from './TaskTable';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../../index.css';

const TaskList = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
        setError('Failed to load tasks. Please try again.');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success('Task deleted successfully');
    } catch (err) {
      console.error('Failed to delete task', err);
      toast.error('Failed to delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const newStatus =
        task.status === 'completed' ? 'in_progress' : 'completed';
      const updatedTask = await toggleTaskCompletion(task.id, newStatus, token);
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
      toast.success(
        `Task ${
          newStatus === 'completed' ? 'completed' : 'marked in progress'
        } successfully`
      );
    } catch (err) {
      console.error('Failed to toggle task completion', err);
      toast.error('Failed to update task status');
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === 'all' || task.status === statusFilter)
  );

  filteredTasks.sort((a, b) => b.id - a.id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Tasks</h2>
          <p className="text-gray-600 mb-4">{error}</p>
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

  return (
    <div className="container">
      <TaskFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Tasks Found</h3>
          <p className="text-gray-600 mb-4">
            {tasks.length === 0 
              ? "You don't have any tasks yet. Create your first task to get started!"
              : "No tasks match your search criteria. Try adjusting your filters."
            }
          </p>
          {tasks.length === 0 && (
            <Link 
              to="/tasks/create" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg inline-block"
            >
              Create First Task
            </Link>
          )}
        </div>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          handleDelete={handleDelete}
          handleToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
};

export default TaskList;
