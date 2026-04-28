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
        console.log("Updating 'phone_number' column default value...");
        await connection.query("ALTER TABLE users ALTER COLUMN phone_number SET DEFAULT '+251 960648894'");
        console.log("✅ Column 'phone_number' default value updated successfully!");
    } catch (error) {
        console.error("❌ Failed to alter table:", error);
    } finally {
        await connection.end();
        process.exit();
    }
})();
