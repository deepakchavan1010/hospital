import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import Modal from '../components/Modal';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: '', doctor: 'Dr. Sarah Jenkins', type: 'Regular Checkup', status: 'Upcoming'
  });

  const fetchAppointments = () => {
    fetch('http://localhost:5000/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: `A-${Math.floor(Math.random() * 9000) + 1000}`,
      ...formData,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      time: '10:00 AM' // Hardcoded default for mockup
    };

    fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment)
    })
    .then(res => {
      if(!res.ok) throw new Error("Failed to add appointment");
      return res.json();
    })
    .then(() => {
      setIsModalOpen(false);
      setFormData({ patient: '', doctor: 'Dr. Sarah Jenkins', type: 'Regular Checkup', status: 'Upcoming' });
      fetchAppointments();
    })
    .catch(err => alert("Error adding appointment: " + err.message));
  };

  return (
    <div className="animate-fade-in dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">Manage upcoming appointments and schedules.</p>
        </div>
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20}/> New Appointment
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{display: 'flex', gap: '12px'}}>
             <select>
              <option>All Doctors</option>
              <option>Dr. Sarah</option>
              <option>Dr. William</option>
            </select>
            <select>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          {loading ? (
             <p style={{padding: '24px', textAlign: 'center'}}>Loading appointments...</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr key={i}>
                    <td><span className="badge-id">{a.id}</span></td>
                    <td className="font-medium">{a.patient}</td>
                    <td>{a.doctor}</td>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <CalendarIcon size={14} className="text-muted"/>
                        {a.date} at {a.time}
                      </div>
                    </td>
                    <td>{a.type}</td>
                    <td>
                      <span className={`status-badge ${a.status === 'Upcoming' ? 'recovering' : 'stable'}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule New Appointment">
        <form onSubmit={handleAddAppointment} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div>
            <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display:'block'}}>Patient Name</label>
            <input type="text" value={formData.patient} onChange={e => setFormData({...formData, patient: e.target.value})} required style={{width: '100%'}} placeholder="e.g. John Doe" />
          </div>
          
          <div style={{display: 'flex', gap: '16px'}}>
            <div style={{flex: 1}}>
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display:'block'}}>Doctor</label>
              <select value={formData.doctor} onChange={e => setFormData({...formData, doctor: e.target.value})} style={{width: '100%'}}>
                <option>Dr. Sarah Jenkins</option>
                <option>Dr. William Smith</option>
                <option>Dr. Emily Chen</option>
                <option>Dr. Michael Lee</option>
              </select>
            </div>
            <div style={{flex: 1}}>
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display:'block'}}>Appointment Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{width: '100%'}}>
                <option>Regular Checkup</option>
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Emergency</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn" style={{marginTop: '16px'}}>Schedule Appointment</button>
        </form>
      </Modal>
    </div>
  );
};

export default Appointments;
