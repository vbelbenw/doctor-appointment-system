const db = require('../config/db');

// @route   POST /api/availability
// @desc    Doctor sets their availability
// @access  Private/Doctor
const setAvailability = async (req, res) => {
    try {
        const { day_of_week, start_time, end_time, slot_duration } = req.body;
        const userId = req.user.id;

        // 1. Validate inputs
        if (!day_of_week || !start_time || !end_time || !slot_duration) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        if (slot_duration <= 0) {
            return res.status(400).json({ message: "Slot duration must be greater than 0" });
        }

        // Compare times (simple string comparison works for HH:MM format)
        if (start_time >= end_time) {
            return res.status(400).json({ message: "Start time must be before end time" });
        }

        // 2. Find the doctor's profile ID based on the authenticated user's ID
        const [doctors] = await db.query('SELECT id FROM doctors WHERE user_id = ?', [userId]);
        
        if (doctors.length === 0) {
            return res.status(404).json({ message: "Doctor profile not found for this user" });
        }
        
        const doctorId = doctors[0].id;

        // 3. Optional: check for existing availability on the same day and prevent overlaps, 
        // but for now, we'll insert a new record or update if there's a unique constraint.
        // Assuming we just insert new availability rules.
        const [result] = await db.query(
            'INSERT INTO availability (doctor_id, day_of_week, start_time, end_time, slot_duration) VALUES (?, ?, ?, ?, ?)',
            [doctorId, day_of_week.toUpperCase(), start_time, end_time, slot_duration]
        );

        res.status(201).json({
            message: "Availability added successfully",
            availability: {
                id: result.insertId,
                doctor_id: doctorId,
                day_of_week: day_of_week.toUpperCase(),
                start_time,
                end_time,
                slot_duration
            }
        });

    } catch (error) {
        console.error("Set Availability Error:", error);
        res.status(500).json({ message: "Failed to set availability" });
    }
};

module.exports = {
    setAvailability
};
