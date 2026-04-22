const express = require('express');
const router = express.Router();
const { generateSlots, getAvailableSlots } = require('../controllers/slotController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// POST /api/slots/generate - DOCTOR or ADMIN
router.post('/generate', verifyToken, authorizeRoles('ADMIN', 'DOCTOR'), generateSlots);

// GET /api/slots/:doctor_id - Open to fetch available slots (or protected as needed, assuming public for patients to view)
router.get('/:doctor_id', getAvailableSlots);

module.exports = router;
