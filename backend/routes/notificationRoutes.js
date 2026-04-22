const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
    getUserNotifications,
    markAsRead,
    deleteNotification
} = require('../controllers/notificationController');

router.get('/', verifyToken, getUserNotifications);
router.put('/:id/read', verifyToken, markAsRead);
router.delete('/:id', verifyToken, deleteNotification);

module.exports = router;
