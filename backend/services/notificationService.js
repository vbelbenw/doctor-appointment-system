const db = require('../config/db');

const createNotification = async (user_id, message) => {
    try {
        await db.query(
            'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
            [user_id, message]
        );
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

module.exports = {
    createNotification
};
