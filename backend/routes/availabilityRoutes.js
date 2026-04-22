const express = require('express');
const router = express.Router();
const { setAvailability } = require('../controllers/availabilityController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// POST /api/availability - Only Doctor can set availability
router.post('/', verifyToken, authorizeRoles('DOCTOR'), setAvailability);

module.exports = router;
