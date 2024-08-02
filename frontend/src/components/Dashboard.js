import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [auth.token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setAuth({}); // Clear the authentication context
      toast.success('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {auth.user?.email}</h1>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium text-gray-900">{task.title}</h3>
                {task.description && <p className="text-gray-700 mt-2">{task.description}</p>}
                <p className={`mt-2 ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
