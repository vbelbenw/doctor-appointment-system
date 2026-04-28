require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log("Attempting to add column 'phone_number' to 'users' table...");
        await connection.query('ALTER TABLE users ADD COLUMN phone_number VARCHAR(20) AFTER email');
        console.log("✅ Column 'phone_number' added successfully!");
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log("ℹ️ Column 'phone_number' already exists. Skipping.");
        } else {
            console.error("❌ Failed to alter table:", error);
        }
    } finally {
        await connection.end();
        process.exit();
    }
})();
