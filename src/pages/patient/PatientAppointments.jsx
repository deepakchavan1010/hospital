import { Calendar as CalendarIcon, Clock, LogIn, Activity, Brain, Baby, Bone } from 'lucide-react';
import './PatientAppointments.css';
import Modal from '../../components/Modal';
import { useState, useEffect } from 'react';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSpec, setSelectedSpec] = useState(null);
  
  const specializations = [
    { id: 'cardiologist', name: 'Cardiologist', icon: <Activity size={24} /> },
    { id: 'neurologist', name: 'Neurologist', icon: <Brain size={24} /> },
    { id: 'pediatrician', name: 'Pediatrician', icon: <Baby size={24} /> },
    { id: 'orthopedic', name: 'Orthopedic', icon: <Bone size={24} /> },
  ];

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
        <button className="btn btn-emerald" onClick={() => setIsModalOpen(true)}>
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
         <div className="specialization-modal-content">
            <p className="modal-description">Choose the medical specialist you need to consult with.</p>
            
            <div className="specialization-grid">
               {specializations.map((spec) => (
                 <button 
                   key={spec.id}
                   className={`spec-card ${selectedSpec === spec.id ? 'active' : ''}`}
                   onClick={() => setSelectedSpec(spec.id)}
                 >
                   <div className="spec-icon-wrapper">
                     {spec.icon}
                   </div>
                   <span className="spec-name">{spec.name}</span>
                 </button>
               ))}
            </div>
            
            <button 
              className="btn btn-emerald" 
              style={{ marginTop: '32px', width: '100%', padding: '16px', fontSize: '1.05rem' }} 
              disabled={!selectedSpec}
              onClick={() => {
                  setIsModalOpen(false);
                  alert(`Redirecting to Doctor Availability Calendar for ${specializations.find(s=>s.id===selectedSpec)?.name}...`);
              }}
            >
              Continue to Availability
            </button>
         </div>
      </Modal>
    </div>
  );
};

export default PatientAppointments;
