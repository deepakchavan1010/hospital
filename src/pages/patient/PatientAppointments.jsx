import { Calendar as CalendarIcon, Clock, LogIn } from 'lucide-react';
import Modal from '../../components/Modal';
import { useState, useEffect } from 'react';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const fetchAppointments = () => {
    fetch('http://localhost:5000/api/appointments')
      .then(res => res.json())
      .then(data => {
        // Filter arbitrarily just to simulate finding "this patient's" records
        setAppointments(data.reverse().slice(0, 5));
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="animate-fade-in dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">My Appointments</h1>
          <p className="page-subtitle">Schedule or review your hospital visits.</p>
        </div>
        <button className="btn" style={{ background: '#05cd99' }} onClick={() => setIsModalOpen(true)}>
           Request New Appointment
        </button>
      </div>

      <div className="card">
        <h3>Visit History</h3>
        
        {loading ? <p>Loading your appointments...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
              {appointments.map((a, i) => (
                <div key={i} style={{ border: '1px solid #edf2f7', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                      <div style={{ background: 'rgba(5, 205, 153, 0.1)', color: '#05cd99', padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <CalendarIcon size={20} style={{marginBottom: '4px'}}/>
                         <span style={{ fontWeight: 700 }}>{a.date.split(' ')[0]}</span>
                      </div>
                      <div>
                         <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{a.type}</h4>
                         <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Assigned: {a.doctor}</p>
                      </div>
                   </div>
                   <div>
                      <span className={`status-badge ${a.status.toLowerCase() === 'upcoming' ? 'recovering' : 'stable'}`}>{a.status}</span>
                   </div>
                </div>
              ))}
            </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select Specialization">
         <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>Choose what kind of doctor you need to see.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
               <button className="btn-secondary">Cardiologist</button>
               <button className="btn-secondary">Neurologist</button>
               <button className="btn-secondary">Pediatrician</button>
               <button className="btn-secondary">Orthopedic</button>
            </div>
            <button className="btn" style={{ marginTop: '32px', width: '100%', background: '#05cd99' }} onClick={() => {
                setIsModalOpen(false);
                alert("Redirecting to Doctor Availability Calendar...");
            }}>Find Availability</button>
         </div>
      </Modal>
    </div>
  );
};

export default PatientAppointments;
