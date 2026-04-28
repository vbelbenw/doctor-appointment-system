const express = require('express');
const router = express.Router();
const { createDoctor, getDoctorProfile, getAllDoctors } = require('../controllers/doctorController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// GET /api/doctors - Public or Patient view
router.get('/', verifyToken, getAllDoctors);

// GET /api/doctors/me - Get logged-in doctor profile
router.get('/me', verifyToken, authorizeRoles('DOCTOR'), getDoctorProfile);

// POST /api/doctors - Only Admin can create doctors
router.post('/', verifyToken, authorizeRoles('ADMIN'), createDoctor);

module.exports = router;


