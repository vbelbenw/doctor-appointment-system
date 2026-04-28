const db = require('./config/db');

async function check() {
    try {
        const [tables] = await db.query('SHOW TABLES');
        console.log('Tables in DB:', tables);
        
        const [notifications] = await db.query('SELECT * FROM notifications');
        console.log('Notifications count:', notifications.length);
    } catch (err) {
        console.error('DB Check Error:', err);
    } finally {
        process.exit();
    }
}

check();
