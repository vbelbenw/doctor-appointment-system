import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Placeholder dashboard routes based on user role */}
        <Route path="/patient/dashboard" element={<div className="p-8 text-white min-h-screen bg-slate-950">Patient Dashboard</div>} />
        <Route path="/doctor/dashboard" element={<div className="p-8 text-white min-h-screen bg-slate-950">Doctor Dashboard</div>} />
        <Route path="/admin/dashboard" element={<div className="p-8 text-white min-h-screen bg-slate-950">Admin Dashboard</div>} />
      </Routes>
    </Router>
  );
}

export default App;
