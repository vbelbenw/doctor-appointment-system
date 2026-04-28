const db = require('./config/db');

async function checkAppointments() {
    try {
        const [doctors] = await db.query('SELECT * FROM doctors');
        console.log('Doctors:', doctors);

        const [appointments] = await db.query('SELECT * FROM appointments');
        console.log('Appointments:', appointments);

        const [slots] = await db.query('SELECT * FROM slots WHERE id IN (SELECT slot_id FROM appointments)');
        console.log('Slots for appointments:', slots);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit();
    }
}

checkAppointments();
