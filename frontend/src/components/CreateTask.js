import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState('false'); // Default to "false"
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateCompletedStatus = (status) => {
    return status === 'true' || status === 'false';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      toast.error('Task title cannot be empty');
      return;
    }

    if (!validateCompletedStatus(completed)) {
      toast.error('Completed status must be "true" or "false"');
      return;
    }

    try {
      // Convert completed status to boolean
      const completedStatus = completed === 'true';

      await axios.post('/api/tasks', { title, description, completed: completedStatus }, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      // Clear the form and navigate to the dashboard
      setTitle('');
      setDescription('');
      setCompleted('false');
      navigate('/dashboard');
      toast.success('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white shadow-lg rounded-lg p-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Create a New Task</h2>
          <p className="text-center text-gray-500 mt-2">Fill out the form below to create a new task.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Task Title"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Task Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Task Description"
                rows="4"
              />
            </div>
            <div>
              <label htmlFor="completed" className="block text-sm font-medium text-gray-700">Completed Status</label>
              <input
                id="completed"
                name="completed"
                type="text"
                value={completed}
                onChange={(e) => setCompleted(e.target.value.toLowerCase())}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Completed Status (true/false)"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
