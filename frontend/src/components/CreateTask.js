import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Task title cannot be empty');
      return;
    }

    try {
      await axios.post('/api/tasks', { title }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setTitle(''); // Clear the input field
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
