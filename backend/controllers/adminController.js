const db = require('../config/db');

const getSystemStats = async (req, res) => {
    try {
        const [[{ total_doctors }]] = await db.query('SELECT COUNT(*) as total_doctors FROM doctors');
        const [[{ total_patients }]] = await db.query('SELECT COUNT(*) as total_patients FROM patients');
        const [[{ total_appointments }]] = await db.query('SELECT COUNT(*) as total_appointments FROM appointments');
        
        // Calculate total users in the system (Admins, Doctors, Patients)
        const [[{ total_users }]] = await db.query('SELECT COUNT(*) as total_users FROM users');

        res.status(200).json({
            doctors: total_doctors || 0,
            patients: total_patients || 0,
            appointments: total_appointments || 0,
            users: total_users || 0
        });
    } catch (error) {
        console.error("Get System Stats Error:", error);
        res.status(500).json({ message: "Failed to retrieve system statistics" });
    }
};

module.exports = {
    getSystemStats
};
