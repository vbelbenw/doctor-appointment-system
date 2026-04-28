const db = require('./config/db');

async function testQuery() {
    try {
        const [doctors] = await db.query('SELECT * FROM doctors');
        if(doctors.length === 0) return console.log('No doctors');
        
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

        console.log('Appointments for doctor 1:', appointments);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit();
    }
}

testQuery();
