import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorList from './pages/patient/DoctorList';
import SlotBooking from './pages/patient/SlotBooking';
import MyAppointments from './pages/patient/MyAppointments';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AvailabilityForm from './pages/doctor/AvailabilityForm';
import SlotGeneration from './pages/doctor/SlotGeneration';
import SlotList from './pages/doctor/SlotList';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateDoctor from './pages/admin/CreateDoctor';
import ManageDoctors from './pages/admin/ManageDoctors';
import SystemLogs from './pages/admin/SystemLogs';
import ForceChangePassword from './pages/auth/ForceChangePassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['PATIENT']} />}>
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/doctors" element={<DoctorList />} />
            <Route path="/patient/book/:doctor_id" element={<SlotBooking />} />
            <Route path="/patient/appointments" element={<MyAppointments />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['DOCTOR']} />}>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/availability" element={<AvailabilityForm />} />
            <Route path="/doctor/generate-slots" element={<SlotGeneration />} />
            <Route path="/doctor/slots" element={<SlotList />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/force-password-change" element={<ForceChangePassword />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-doctor" element={<CreateDoctor />} />
            <Route path="/admin/doctors" element={<ManageDoctors />} />
            <Route path="/admin/logs" element={<SystemLogs />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
