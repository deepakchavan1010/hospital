import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Admin Core
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Settings from './pages/Settings';

// Patient Core
import PatientLayout from './components/patient/PatientLayout';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';

// Public Core
import Login from './pages/Login';
import './App.css';

function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('authObj');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('authObj', JSON.stringify(auth));
  }, [auth]);

  const handleLogout = () => setAuth(null);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route 
          path="/login" 
          element={!auth ? <Login onLogin={setAuth} /> : <Navigate to={`/${auth.role}/dashboard`} replace />} 
        />

        {/* Global Root Redirect */}
        <Route 
          path="/" 
          element={<Navigate to={auth ? `/${auth.role}/dashboard` : "/login"} replace />} 
        />

        {/* --- ADMIN ROUTES --- */}
        <Route 
          path="/admin" 
          element={auth?.role === 'admin' ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* --- PATIENT ROUTES --- */}
        <Route 
          path="/patient" 
          element={auth?.role === 'patient' ? <PatientLayout onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientAppointments />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
