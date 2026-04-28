const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/register
// @desc    Register a new user (Patient, Doctor, Admin)
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone_number } = req.body;

        // 1. Basic validation
        if (!name || !email || !password || !role || !phone_number) {
            return res.status(400).json({ message: "Please provide all required fields (name, email, phone_number, password, role)" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        // 2. Validate role enum
        const validRoles = ['PATIENT', 'DOCTOR', 'ADMIN'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role specified. Must be PATIENT, DOCTOR, or ADMIN." });
        }

        // 3. Check if the user already exists by email
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "A user with this email already exists" });
        }

        // 4. Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Insert the new user into the database
        const [result] = await db.query(
            'INSERT INTO users (name, email, phone_number, password, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone_number, hashedPassword, role]
        );

        // 6. Return a success response without the password
        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // 2. See if user exists
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = users[0];

        // 3. Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. Create JWT Payload
        const payload = {
            id: user.id,
            role: user.role,
            requires_password_change: user.requires_password_change === 1
        };

        // 5. Sign the Token (Expires in 1 day)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        // 6. Return response (excluding password)
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                role: user.role,
                requires_password_change: user.requires_password_change === 1
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

// @route   PUT /api/auth/change-password
// @desc    Change temporary password for users
// @access  Private
const changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const userId = req.user.id;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update database and remove the requires_password_change flag
        await db.query(
            'UPDATE users SET password = ?, requires_password_change = false WHERE id = ?',
            [hashedPassword, userId]
        );

        res.status(200).json({ message: "Password successfully updated!" });
    } catch (error) {
        console.error("Change Password Error:", error);
        res.status(500).json({ message: "Server error during password update." });
    }
};

module.exports = {
    registerUser,
    loginUser,
    changePassword
};
