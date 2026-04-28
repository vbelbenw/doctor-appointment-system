const db = require('./config/db');

async function checkUsers() {
    try {
        const [rows] = await db.query('DESCRIBE users');
        console.log('Users Table Structure:');
        console.table(rows);
        
        const [users] = await db.query('SELECT id, name, email, phone_number, role FROM users LIMIT 5');
        console.log('Last 5 Users:');
        console.table(users);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit();
    }
}

checkUsers();
