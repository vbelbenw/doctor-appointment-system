const express = require('express');
const router = express.Router();
const { 
    bookAppointment, 
    getMyAppointments, 
    getDoctorAppointments, 
    updateAppointmentStatus, 
    cancelAppointment, 
    getAllAppointments 
} = require('../controllers/appointmentController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Book appointment (PATIENT)
router.post('/book', verifyToken, authorizeRoles('PATIENT'), bookAppointment);

// Get Patient's appointments (PATIENT)
router.get('/my', verifyToken, authorizeRoles('PATIENT'), getMyAppointments);

// Get Doctor's appointments (DOCTOR)
router.get('/doctor', verifyToken, authorizeRoles('DOCTOR'), getDoctorAppointments);

// Update status (DOCTOR, ADMIN)
router.put('/:id/status', verifyToken, authorizeRoles('DOCTOR', 'ADMIN'), updateAppointmentStatus);

// Cancel appointment (PATIENT)
router.put('/:id/cancel', verifyToken, authorizeRoles('PATIENT'), cancelAppointment);

// Get all appointments (ADMIN)
router.get('/', verifyToken, authorizeRoles('ADMIN'), getAllAppointments);

module.exports = router;
