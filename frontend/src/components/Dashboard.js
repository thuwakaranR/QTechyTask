import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
      return; // Ensure that no further code is executed if the user is not authenticated
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
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchTasks();
  }, [auth.token, navigate]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Welcome, {auth.user?.email}</h1>
      <div>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task._id} className="task-item">
              {task.title}
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
