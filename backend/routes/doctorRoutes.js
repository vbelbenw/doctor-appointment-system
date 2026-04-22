const express = require('express');
const router = express.Router();
const { createDoctor } = require('../controllers/doctorController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// POST /api/doctors - Only Admin can create doctors
router.post('/', verifyToken, authorizeRoles('ADMIN'), createDoctor);

module.exports = router;
