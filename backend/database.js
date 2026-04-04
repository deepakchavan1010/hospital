const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database (will create hospital.db in backend folder)
const dbPath = path.resolve(__dirname, 'hospital.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Initialize database schema and data
db.serialize(() => {
    // 1. Create Patients Table
    db.run(`CREATE TABLE IF NOT EXISTS patients (
        id TEXT PRIMARY KEY,
        name TEXT,
        age INTEGER,
        gender TEXT,
        doctor TEXT,
        lastVisit TEXT,
        diagnosis TEXT,
        status TEXT,
        time TEXT
    )`);

    // 2. Create Appointments Table
    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id TEXT PRIMARY KEY,
        patient TEXT,
        doctor TEXT,
        date TEXT,
        time TEXT,
        type TEXT,
        status TEXT
    )`);

    // Check if tables are empty, then seed them
    db.get('SELECT COUNT(*) as count FROM patients', (err, row) => {
        if (row && row.count === 0) {
            console.log('Seeding initial patients...');
            const stmt = db.prepare('INSERT INTO patients VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
            const dummyPatients = [
                ["P-4923", "Eleanor Pena", 45, "Female", "Dr. Sarah Jenkins", "Oct 12, 2023", "Hypertension", "Stable", "10:30 AM"],
                ["P-2193", "Jacob Jones", 32, "Male", "Dr. William Smith", "Oct 14, 2023", "Fever", "Critical", "11:15 AM"],
                ["P-5382", "Wade Warren", 58, "Male", "Dr. Emily Chen", "Oct 20, 2023", "Fracture", "Recovering", "01:00 PM"],
                ["P-7182", "Cameron Williamson", 29, "Female", "Dr. Sarah Jenkins", "Oct 22, 2023", "Diabetes", "Stable", "02:45 PM"],
                ["P-8212", "Esther Howard", 61, "Female", "Dr. Michael Lee", "Oct 25, 2023", "Arthritis", "Stable", "09:00 AM"]
            ];
            dummyPatients.forEach(p => stmt.run(p));
            stmt.finalize();
        }
    });

    db.get('SELECT COUNT(*) as count FROM appointments', (err, row) => {
        if (row && row.count === 0) {
            console.log('Seeding initial appointments...');
            const stmt = db.prepare('INSERT INTO appointments VALUES (?, ?, ?, ?, ?, ?, ?)');
            const dummyAppointments = [
                ["A-1234", "Esther Howard", "Dr. Sarah Jenkins", "Nov 02, 2023", "10:00 AM", "Regular Checkup", "Upcoming"],
                ["A-1235", "Cameron Williamson", "Dr. Michael Lee", "Nov 02, 2023", "11:30 AM", "Consultation", "Upcoming"],
                ["A-1236", "Brooklyn Simmons", "Dr. William Smith", "Nov 02, 2023", "02:00 PM", "Follow-up", "Completed"],
            ];
            dummyAppointments.forEach(a => stmt.run(a));
            stmt.finalize();
        }
    });
});

module.exports = db;
