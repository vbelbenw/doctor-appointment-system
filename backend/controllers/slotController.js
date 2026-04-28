const db = require('../config/db');

// Helper to format Date to YYYY-MM-DD
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// @route   POST /api/slots/generate
// @desc    Generate slots based on availability
// @access  Private (DOCTOR or ADMIN)
const generateSlots = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { doctor_id, start_date, end_date } = req.body;
        
        if (!doctor_id || !start_date || !end_date) {
            return res.status(400).json({ message: "Please provide doctor_id, start_date, and end_date" });
        }

        // 1. If DOCTOR, verify they are generating their own slots
        if (req.user.role === 'DOCTOR') {
             const [docs] = await connection.query('SELECT id FROM doctors WHERE user_id = ?', [req.user.id]);
             if (docs.length === 0 || docs[0].id != doctor_id) {
                  connection.release();
                  return res.status(403).json({ message: "You can only generate slots for yourself" });
             }
        }

        const startDateParsed = new Date(start_date);
        const endDateParsed = new Date(end_date);
        
        // Prevent generating for dates before today (midnight)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (endDateParsed < startDateParsed) {
             connection.release();
             return res.status(400).json({ message: "end_date must be after start_date" });
        }

        // 2. Fetch doctor's availability
        const [availabilities] = await connection.query(
            'SELECT * FROM availability WHERE doctor_id = ?', 
            [doctor_id]
        );

        if (availabilities.length === 0) {
            connection.release();
            return res.status(400).json({ message: "No availability found for this doctor" });
        }

        // Group availability by day of week
        const availabilityMap = {};
        availabilities.forEach(avail => {
            if (!availabilityMap[avail.day_of_week]) {
                availabilityMap[avail.day_of_week] = [];
            }
            availabilityMap[avail.day_of_week].push(avail);
        });

        const daysMap = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

        // 3. Get existing slots to avoid duplicates
        const formattedStart = formatDate(startDateParsed);
        const formattedEnd = formatDate(endDateParsed);

        const [existingSlots] = await connection.query(
            'SELECT date, start_time FROM slots WHERE doctor_id = ? AND date >= ? AND date <= ?',
            [doctor_id, formattedStart, formattedEnd]
        );

        // Store existing slots in a Set: "YYYY-MM-DD_HH:MM:SS"
        const existingSet = new Set(
            existingSlots.map(s => {
                // Adjust if date/time serialization varies
                const d = new Date(s.date);
                const dStr = formatDate(d);
                return `${dStr}_${s.start_time}`;
            })
        );

        const newSlotsToInsert = [];
        let currentDate = new Date(startDateParsed);

        // 4. Generate slots
        while (currentDate <= endDateParsed) {
            if (currentDate >= today) {
                const dayOfWeek = daysMap[currentDate.getDay()];
                const dayAvailabilities = availabilityMap[dayOfWeek];

                if (dayAvailabilities) {
                    const currentFormattedDate = formatDate(currentDate);

                    for (const rule of dayAvailabilities) {
                        const startParts = rule.start_time.split(':');
                        const endParts = rule.end_time.split(':');

                        let slotStart = new Date(currentDate);
                        slotStart.setHours(parseInt(startParts[0]), parseInt(startParts[1]), parseInt(startParts[2] || 0));

                        let slotEndLimit = new Date(currentDate);
                        slotEndLimit.setHours(parseInt(endParts[0]), parseInt(endParts[1]), parseInt(endParts[2] || 0));

                        while (slotStart < slotEndLimit) {
                            const slotEnd = new Date(slotStart.getTime() + rule.slot_duration * 60000);

                            if (slotEnd <= slotEndLimit) {
                                // Format time HH:MM:SS
                                const sTime = `${String(slotStart.getHours()).padStart(2, '0')}:${String(slotStart.getMinutes()).padStart(2, '0')}:00`;
                                const eTime = `${String(slotEnd.getHours()).padStart(2, '0')}:${String(slotEnd.getMinutes()).padStart(2, '0')}:00`;

                                const key = `${currentFormattedDate}_${sTime}`;

                                if (!existingSet.has(key)) {
                                    newSlotsToInsert.push([
                                        doctor_id,
                                        currentFormattedDate,
                                        sTime,
                                        eTime,
                                        'AVAILABLE'
                                    ]);
                                    existingSet.add(key); // prevent duplicate in same generation array if overlap exists
                                }
                            }
                            slotStart = slotEnd;
                        }
                    }
                }
            }
            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // 5. Insert new slots into DB
        await connection.beginTransaction();

        let insertedCount = 0;
        if (newSlotsToInsert.length > 0) {
            const [insertResult] = await connection.query(
                'INSERT INTO slots (doctor_id, date, start_time, end_time, status) VALUES ?',
                [newSlotsToInsert]
            );
            insertedCount = insertResult.affectedRows;
        }

        await connection.commit();

        res.status(201).json({
            message: `Successfully generated ${insertedCount} new slots.`,
            generated_slots: insertedCount
        });

    } catch (error) {
        await connection.rollback();
        console.error("Generate Slots Error:", error);
        res.status(500).json({ message: "Failed to generate slots" });
    } finally {
        connection.release();
    }
};

// @route   GET /api/slots/:doctor_id
// @desc    Get available slots for a doctor
// @access  Public or loosely protected
const getAvailableSlots = async (req, res) => {
    try {
        const { doctor_id } = req.params;
        const { all } = req.query;

        const dateFilter = formatDate(new Date());

        let query = 'SELECT * FROM slots WHERE doctor_id = ?';
        let params = [doctor_id];

        if (!all) {
            query += " AND status = 'AVAILABLE' AND date >= ?";
            params.push(dateFilter);
        }

        query += ' ORDER BY date ASC, start_time ASC';

        const [slots] = await db.query(query, params);
        res.status(200).json(slots);

    } catch (error) {
        console.error("Get Available Slots Error:", error);
        res.status(500).json({ message: "Failed to retrieve slots" });
    }
};


module.exports = {
    generateSlots,
    getAvailableSlots
};
