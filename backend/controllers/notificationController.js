const db = require('../config/db');

// @route   GET /api/notifications
// @desc    Get user notifications
// @access  Private
const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const [notifications] = await db.query(
            'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Get Notifications Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const [notifications] = await db.query(
            'SELECT * FROM notifications WHERE id = ?',
            [id]
        );

        if (notifications.length === 0) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if (notifications[0].user_id !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await db.query(
            'UPDATE notifications SET is_read = true WHERE id = ?',
            [id]
        );

        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Mark Notification Read Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @route   DELETE /api/notifications/:id
// @desc    Delete notification
// @access  Private
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const [notifications] = await db.query(
            'SELECT * FROM notifications WHERE id = ?',
            [id]
        );

        if (notifications.length === 0) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if (notifications[0].user_id !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await db.query(
            'DELETE FROM notifications WHERE id = ?',
            [id]
        );

        res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
        console.error("Delete Notification Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getUserNotifications,
    markAsRead,
    deleteNotification
};
