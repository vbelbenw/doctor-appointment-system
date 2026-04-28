require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
    // We create a direct local connection to ensure we can run migrations outside of the server lifecycle
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        console.log("Attempting to add column 'requires_password_change'...");
        await connection.query('ALTER TABLE users ADD COLUMN requires_password_change BOOLEAN DEFAULT FALSE');
        console.log("✅ Column 'requires_password_change' added successfully!");
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log("ℹ️ Column 'requires_password_change' already exists. Skipping.");
        } else {
            console.error("❌ Failed to alter table:", error);
        }
    } finally {
        await connection.end();
        process.exit();
    }
})();
