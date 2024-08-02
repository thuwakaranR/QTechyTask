import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const UpdateTask = () => {
  const { id } = useParams(); // Get task ID from URL parameters
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        setTitle(response.data.title);
        setDescription(response.data.description || '');
      } catch (error) {
        console.error('Error fetching task:', error);
        toast.error('Failed to fetch task');
        setError('Failed to fetch task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, auth.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Task title cannot be empty');
      return;
    }

    try {
      await axios.put(`/api/tasks/${id}`, { title, description }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      navigate('/dashboard');
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="loader border-t-4 border-blue-500 border-solid border-8 rounded-full w-12 h-12 animate-spin"></div> {/* Add a spinner */}
          <p className="text-lg font-medium text-gray-600 mt-4">Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Update Task</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
