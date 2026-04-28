const db = require('../config/db');
const bcrypt = require('bcryptjs');

// @route   POST /api/doctors
// @desc    Admin creates a doctor profile
// @access  Private/Admin
const createDoctor = async (req, res) => {
    const connection = await db.getConnection();
    
    try {
        const { 
            name, 
            email, 
            password, 
            phone_number,
            specialization, 
            experience_years, 
            consultation_fee 
        } = req.body;

        // 1. Validation
        if (!name || !email || !password || !specialization || !phone_number) {
            return res.status(400).json({ message: "Please provide all required fields (name, email, phone_number, password, specialization)" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        await connection.beginTransaction();

        // 2. Check if email already exists
        const [existingUsers] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            await connection.rollback();
            return res.status(400).json({ message: "A user with this email already exists" });
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create User with DOCTOR role and flag password as temporary
        const [userResult] = await connection.query(
            'INSERT INTO users (name, email, phone_number, password, role, requires_password_change) VALUES (?, ?, ?, ?, "DOCTOR", true)',
            [name, email, phone_number, hashedPassword]
        );

        const userId = userResult.insertId;

        // 5. Create Doctor profile entry
        const [doctorResult] = await connection.query(
            'INSERT INTO doctors (user_id, specialization, experience_years, consultation_fee) VALUES (?, ?, ?, ?)',
            [userId, specialization, experience_years || 0, consultation_fee || 0]
        );

        await connection.commit();

        res.status(201).json({
            message: "Doctor created successfully",
            doctor: {
                id: doctorResult.insertId,
                user_id: userId,
                name,
                email,
                specialization,
                experience_years,
                consultation_fee
            }
        });

    } catch (error) {
        await connection.rollback();
        console.error("Create Doctor Error:", error);
        res.status(500).json({ message: "Failed to create doctor profile" });
    } finally {
        connection.release();
    }
};

const getDoctorProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const [doctors] = await db.query('SELECT * FROM doctors WHERE user_id = ?', [userId]);

        if (doctors.length === 0) {
            return res.status(404).json({ message: "Doctor profile not found" });
        }

        res.status(200).json(doctors[0]);
    } catch (error) {
        console.error("Get Doctor Profile Error:", error);
        res.status(500).json({ message: "Failed to retrieve doctor profile" });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const [doctors] = await db.query(`
            SELECT d.*, u.name, u.email 
            FROM doctors d 
            JOIN users u ON d.user_id = u.id
        `);
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Get All Doctors Error:", error);
        res.status(500).json({ message: "Failed to retrieve doctors" });
    }
};

module.exports = {
    createDoctor,
    getDoctorProfile,
    getAllDoctors
};


