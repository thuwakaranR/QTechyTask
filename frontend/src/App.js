import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route from react-router-dom
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateTask from './components/CreateTask';
import UpdateTask from './components/UpdateTask'; // Import UpdateTask component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}



export default App;
