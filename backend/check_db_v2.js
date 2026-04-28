const db = require('./config/db');

async function check() {
    try {
        const [desc] = await db.query('DESCRIBE notifications');
        console.log('Notifications Schema:', desc);
        
        const [notifications] = await db.query('SELECT * FROM notifications LIMIT 1');
        console.log('Sample Notification:', notifications[0]);
    } catch (err) {
        console.error('DB Check Error:', err);
    } finally {
        process.exit();
    }
}

check();
