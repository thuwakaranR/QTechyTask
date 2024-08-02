import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import TaskList from './TaskList';

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = auth.token;

  useEffect(() => {
    // Redirect to login if no token is present
    if (!token) {
      navigate('/');
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout'); // Ensure your backend endpoint handles logout
      logout(navigate); // Use logout function from context and pass navigate
      toast.success('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const handleCreateTask = () => {
    navigate('/create-task');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome To Task Board {auth.user?.username || auth.user?.email}
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={handleCreateTask}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
          >
            Create Task
          </button>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
