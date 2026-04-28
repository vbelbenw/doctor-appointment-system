const db = require('./config/db');

async function check() {
    try {
        const [users] = await db.query('SELECT id, email, role FROM users');
        console.log('Users in DB:', users);
        
        const [notifications] = await db.query('SELECT user_id, message FROM notifications');
        console.log('Notifications in DB:', notifications);
    } catch (err) {
        console.error('DB Check Error:', err);
    } finally {
        process.exit();
    }
}

check();
