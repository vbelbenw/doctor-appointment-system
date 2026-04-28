const express = require('express');
const router = express.Router();
const { getSystemStats } = require('../controllers/adminController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// GET /api/admin/stats - Only Admin
router.get('/stats', verifyToken, authorizeRoles('ADMIN'), getSystemStats);

module.exports = router;
