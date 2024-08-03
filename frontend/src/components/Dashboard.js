
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
    if (!token) {
      navigate('/');
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setTasks(response.data);
        } else {
          throw new Error('Unexpected response status');
        }
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
      // Call backend to handle server-side logout if needed
      //await axios.post('/api/logout'); 
      // Call logout function from AuthContext to update frontend state
      logout(navigate); // This should handle clearing the token from local storage and updating the context
  
      // Display success message
      toast.success('Logout successful');
  
    } catch (error) {
      console.error('Error logging out:', error);
  
      // Display error message
      toast.error('Failed to log out');
    }
  };

  const handleCreateTask = () => {
    navigate('/create-task');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">Loading tasks...</p>
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome to Task Board, {auth.user?.username || auth.user?.email}
            </h1>
          </div>
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <button
              onClick={handleCreateTask}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Task
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          <div className="px-4 py-5 sm:px-6">
            {tasks.length === 0 ? (
              <p className="text-lg font-medium text-gray-600 text-center">No tasks available.</p>
            ) : (
              <TaskList tasks={tasks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
