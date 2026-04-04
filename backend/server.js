const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// Get all stats (Dashboard Metrics)
app.get('/api/stats', (req, res) => {
    const stats = {
        totalPatients: "2,845", // Mock aggregated representation
        newAppointments: "124",
        operationsToday: "18",
        availableBeds: "42"
    };
    res.json(stats);
});

// Get all patients
app.get('/api/patients', (req, res) => {
    db.all('SELECT * FROM patients', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Add a new patient
app.post('/api/patients', (req, res) => {
    const { id, name, age, gender, doctor, lastVisit, diagnosis, status, time } = req.body;
    const sql = `INSERT INTO patients (id, name, age, gender, doctor, lastVisit, diagnosis, status, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [id, name, age, gender, doctor, lastVisit, diagnosis, status, time];
    
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: id, name });
    });
});

// Get all appointments
app.get('/api/appointments', (req, res) => {
    db.all('SELECT * FROM appointments', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Add a new appointment
app.post('/api/appointments', (req, res) => {
    const { id, patient, doctor, date, time, type, status } = req.body;
    const sql = `INSERT INTO appointments (id, patient, doctor, date, time, type, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [id, patient, doctor, date, time, type, status];
    
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: id, patient });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
