import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = auth.token; 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks. Please try again.');
        toast.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(tasks.filter(task => task._id !== id));
        toast.success('Task deleted successfully');
      } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('Failed to delete task');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="loader border-t-4 border-blue-500 border-solid border-8 rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-lg font-medium text-gray-600 mt-4">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Tasks</h2>
      {tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                {task.description && <p className="text-gray-600 mt-2">{task.description}</p>}
                <p className={`mt-2 text-sm ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                  {task.completed ? 'Completed' : 'Not Completed'}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-2">
                <button
                  onClick={() => navigate(`/update-task/${task._id}`)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
