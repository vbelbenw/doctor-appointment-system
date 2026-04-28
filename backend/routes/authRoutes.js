const express = require('express');
const router = express.Router();
const { registerUser, loginUser, changePassword } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// PUT /api/auth/change-password
router.put('/change-password', verifyToken, changePassword);

module.exports = router;
