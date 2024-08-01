import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const UpdateTask = () => {
  const { id } = useParams(); // Get task ID from URL parameters
  const [title, setTitle] = useState('');
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
      } catch (error) {
        console.error('Error fetching task:', error);
        toast.error('Failed to fetch task');
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
      await axios.put(`/api/tasks/${id}`, { title }, {
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
    return <p>Loading task...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Task</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="p-2 border rounded w-full"
        required
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Update Task
      </button>
    </form>
  );
};

export default UpdateTask;
