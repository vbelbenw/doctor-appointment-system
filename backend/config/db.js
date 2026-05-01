const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool instead of a single connection
// This allows to reuse connections and improves performance
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection upon initialization
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Successfully connected to the MySQL Database.");
        connection.release();
    } catch (error) {
        console.error("❌ Failed to connect to the MySQL Database:");
        console.error(error.message);
    }
})();

module.exports = pool;
