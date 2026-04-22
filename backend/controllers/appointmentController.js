const db = require('../config/db');
const notificationService = require('../services/notificationService');

// @route   POST /api/appointments/book
// @desc    Patient books an available slot
// @access  Private/PATIENT
const bookAppointment = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { slot_id } = req.body;
        const userId = req.user.id;

        if (!slot_id) {
            return res.status(400).json({ message: "Please provide a slot_id" });
        }

        await connection.beginTransaction();

        // 1. Get or Create Patient ID
        let [patients] = await connection.query('SELECT id FROM patients WHERE user_id = ?', [userId]);
        let patientId;

        if (patients.length === 0) {
            const [newPatient] = await connection.query('INSERT INTO patients (user_id) VALUES (?)', [userId]);
            patientId = newPatient.insertId;
        } else {
            patientId = patients[0].id;
        }

        // 2. Lock the Slot record to prevent race conditions
        const [slots] = await connection.query('SELECT * FROM slots WHERE id = ? FOR UPDATE', [slot_id]);

        if (slots.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Slot not found" });
        }

        const slot = slots[0];

        // 3. Validation: Slot must be AVAILABLE
        if (slot.status !== 'AVAILABLE') {
            await connection.rollback();
            return res.status(400).json({ message: "Slot is no longer available" });
        }

        // 4. Validation: Slot Date/Time must not be in the past
        // Create a single Date object for comparison
        const slotDateStr = new Date(slot.date).toISOString().split('T')[0];
        const slotDateTime = new Date(`${slotDateStr}T${slot.start_time}`);
        
        if (slotDateTime < new Date()) {
            await connection.rollback();
            return res.status(400).json({ message: "Cannot book a slot in the past" });
        }

        // 5. Update slot status to BOOKED
        await connection.query('UPDATE slots SET status = "BOOKED" WHERE id = ?', [slot_id]);

        // 6. Create appointment
        const [appointmentResult] = await connection.query(
            'INSERT INTO appointments (patient_id, slot_id, status) VALUES (?, ?, "BOOKED")',
            [patientId, slot_id]
        );

        await connection.commit();

        // Send notifications
        await notificationService.createNotification(userId, "Your appointment has been booked successfully.");
        const [docs] = await connection.query('SELECT user_id FROM doctors WHERE id = ?', [slot.doctor_id]);
        if (docs.length > 0) {
            await notificationService.createNotification(docs[0].user_id, "A new appointment has been booked.");
        }

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment_id: appointmentResult.insertId
        });

    } catch (error) {
        await connection.rollback();
        console.error("Book Appointment Error:", error);
        // Handle unique constraint violation just in case
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "This slot has already been booked" });
        }
        res.status(500).json({ message: "Failed to book appointment" });
    } finally {
        connection.release();
    }
};

// @route   GET /api/appointments/my
// @desc    Patient views their own appointments
// @access  Private/PATIENT
const getMyAppointments = async (req, res) => {
    try {
        const userId = req.user.id;

        const [patients] = await db.query('SELECT id FROM patients WHERE user_id = ?', [userId]);
        if (patients.length === 0) {
            return res.status(200).json([]); // No appointments yet
        }
        const patientId = patients[0].id;

        const [appointments] = await db.query(`
            SELECT 
                a.id AS appointment_id, a.status AS appointment_status, a.created_at,
                s.date, s.start_time, s.end_time,
                d.specialization,
                u.name AS doctor_name
            FROM appointments a
            JOIN slots s ON a.slot_id = s.id
            JOIN doctors d ON s.doctor_id = d.id
            JOIN users u ON d.user_id = u.id
            WHERE a.patient_id = ?
            ORDER BY s.date DESC, s.start_time DESC
        `, [patientId]);

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Get My Appointments Error:", error);
        res.status(500).json({ message: "Failed to retrieve appointments" });
    }
};

// @route   GET /api/appointments/doctor
// @desc    Doctor views their appointments
// @access  Private/DOCTOR
const getDoctorAppointments = async (req, res) => {
    try {
        const userId = req.user.id;

        const [doctors] = await db.query('SELECT id FROM doctors WHERE user_id = ?', [userId]);
        if (doctors.length === 0) {
            return res.status(404).json({ message: "Doctor profile not found" });
        }
        const doctorId = doctors[0].id;

        const [appointments] = await db.query(`
            SELECT 
                a.id AS appointment_id, a.status AS appointment_status, a.created_at,
                s.date, s.start_time, s.end_time,
                u.name AS patient_name, u.email AS patient_email
            FROM appointments a
            JOIN slots s ON a.slot_id = s.id
            JOIN patients p ON a.patient_id = p.id
            JOIN users u ON p.user_id = u.id
            WHERE s.doctor_id = ?
            ORDER BY s.date DESC, s.start_time DESC
        `, [doctorId]);

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Get Doctor Appointments Error:", error);
        res.status(500).json({ message: "Failed to retrieve appointments" });
    }
};

// @route   PUT /api/appointments/:id/status
// @desc    Update appointment status (CONFIRMED, COMPLETED, CANCELLED)
// @access  Private/(DOCTOR, ADMIN)
const updateAppointmentStatus = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['CONFIRMED', 'COMPLETED', 'CANCELLED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        await connection.beginTransaction();

        const [appointments] = await connection.query(`
            SELECT a.id, a.status as current_status, a.patient_id, a.slot_id, s.doctor_id 
            FROM appointments a
            JOIN slots s ON a.slot_id = s.id
            WHERE a.id = ? FOR UPDATE
        `, [id]);

        if (appointments.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Appointment not found" });
        }

        const appointment = appointments[0];

        // If user is doctor, ensure they own the appointment
        if (req.user.role === 'DOCTOR') {
            const [docs] = await connection.query('SELECT id FROM doctors WHERE user_id = ?', [req.user.id]);
            if (docs.length === 0 || docs[0].id !== appointment.doctor_id) {
                await connection.rollback();
                return res.status(403).json({ message: "You don't have permission to update this appointment" });
            }
        }

        // Validate state transition
        const current = appointment.current_status;
        if (
            (status === 'CONFIRMED' && current !== 'BOOKED') ||
            (status === 'COMPLETED' && current !== 'CONFIRMED') ||
            (status === 'CANCELLED' && current !== 'BOOKED')
        ) {
            await connection.rollback();
            return res.status(400).json({ message: `Invalid transition from ${current} to ${status}` });
        }

        // Apply update
        await connection.query('UPDATE appointments SET status = ? WHERE id = ?', [status, id]);

        // If cancelling, free up the slot
        if (status === 'CANCELLED') {
            await connection.query('UPDATE slots SET status = "AVAILABLE" WHERE id = ?', [appointment.slot_id]);
        }

        await connection.commit();

        // Send Notifications
        const [patients] = await connection.query('SELECT user_id FROM patients WHERE id = ?', [appointment.patient_id]);
        const patientUserId = patients.length > 0 ? patients[0].user_id : null;
        
        const [docs] = await connection.query('SELECT user_id FROM doctors WHERE id = ?', [appointment.doctor_id]);
        const doctorUserId = docs.length > 0 ? docs[0].user_id : null;

        if (status === 'CONFIRMED' && patientUserId) {
            await notificationService.createNotification(patientUserId, "Your appointment has been confirmed.");
        } else if (status === 'CANCELLED') {
            if (patientUserId) await notificationService.createNotification(patientUserId, "Appointment has been cancelled.");
            if (doctorUserId) await notificationService.createNotification(doctorUserId, "Appointment has been cancelled.");
        }

        res.status(200).json({ message: `Appointment status updated to ${status}` });

    } catch (error) {
        await connection.rollback();
        console.error("Update Appointment Error:", error);
        res.status(500).json({ message: "Failed to update appointment status" });
    } finally {
        connection.release();
    }
};

// @route   PUT /api/appointments/:id/cancel
// @desc    Patient cancels their appointment
// @access  Private/PATIENT
const cancelAppointment = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const { id } = req.params;
        const userId = req.user.id;

        await connection.beginTransaction();

        // Verify patient ownership
        const [patients] = await connection.query('SELECT id FROM patients WHERE user_id = ?', [userId]);
        if (patients.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Patient profile not found" });
        }
        const patientId = patients[0].id;

        const [appointments] = await connection.query(`
            SELECT a.id, a.status as current_status, a.patient_id, a.slot_id, s.date, s.start_time, s.doctor_id 
            FROM appointments a
            JOIN slots s ON a.slot_id = s.id
            WHERE a.id = ? FOR UPDATE
        `, [id]);

        if (appointments.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Appointment not found" });
        }

        const appointment = appointments[0];

        if (appointment.patient_id !== patientId) {
            await connection.rollback();
            return res.status(403).json({ message: "You don't have permission to cancel this appointment" });
        }

        if (appointment.current_status !== 'BOOKED') {
            await connection.rollback();
            return res.status(400).json({ message: `Cannot cancel appointment in ${appointment.current_status} state` });
        }

        // Cannot cancel past appointment
        const slotDateStr = new Date(appointment.date).toISOString().split('T')[0];
        const slotDateTime = new Date(`${slotDateStr}T${appointment.start_time}`);

        if (slotDateTime < new Date()) {
            await connection.rollback();
            return res.status(400).json({ message: "Cannot cancel a past appointment" });
        }

        // Update records
        await connection.query('UPDATE appointments SET status = "CANCELLED" WHERE id = ?', [id]);
        await connection.query('UPDATE slots SET status = "AVAILABLE" WHERE id = ?', [appointment.slot_id]);

        await connection.commit();

        // Send Notifications
        await notificationService.createNotification(userId, "Appointment has been cancelled.");
        const [docs] = await connection.query('SELECT user_id FROM doctors WHERE id = ?', [appointment.doctor_id]);
        if (docs.length > 0) {
            await notificationService.createNotification(docs[0].user_id, "Appointment has been cancelled.");
        }

        res.status(200).json({ message: "Appointment cancelled successfully" });

    } catch (error) {
        await connection.rollback();
        console.error("Cancel Appointment Error:", error);
        res.status(500).json({ message: "Failed to cancel appointment" });
    } finally {
        connection.release();
    }
};

// @route   GET /api/appointments
// @desc    Admin views all appointments
// @access  Private/ADMIN
const getAllAppointments = async (req, res) => {
    try {
        const [appointments] = await db.query(`
            SELECT 
                a.id AS appointment_id, a.status AS appointment_status, a.created_at,
                s.date, s.start_time, s.end_time,
                d.specialization,
                ud.name AS doctor_name,
                up.name AS patient_name, up.email AS patient_email
            FROM appointments a
            JOIN slots s ON a.slot_id = s.id
            JOIN doctors d ON s.doctor_id = d.id
            JOIN users ud ON d.user_id = ud.id
            JOIN patients p ON a.patient_id = p.id
            JOIN users up ON p.user_id = up.id
            ORDER BY s.date DESC, s.start_time DESC
        `);

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Get All Appointments Error:", error);
        res.status(500).json({ message: "Failed to retrieve all appointments" });
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    cancelAppointment,
    getAllAppointments
};
