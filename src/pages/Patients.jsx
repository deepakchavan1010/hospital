import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import '../components/Header.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', doctor: 'Dr. Sarah Jenkins', diagnosis: '', status: 'Stable'
  });

  const fetchPatients = () => {
    fetch('http://localhost:5000/api/patients')
      .then(res => {
        if(!res.ok) throw new Error('Failed to fetch patients');
        return res.json();
      })
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: `P-${Math.floor(Math.random() * 9000) + 1000}`,
      ...formData,
      lastVisit: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    fetch('http://localhost:5000/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPatient)
    })
    .then(res => {
      if(!res.ok) throw new Error("Failed to add");
      return res.json();
    })
    .then(() => {
      setIsModalOpen(false);
      setFormData({ name: '', age: '', gender: 'Male', doctor: 'Dr. Sarah Jenkins', diagnosis: '', status: 'Stable' });
      fetchPatients(); // Refetch Data dynamically!
    })
    .catch(err => alert("Error adding patient: " + err.message));
  };

  return (
    <div className="animate-fade-in dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Patient Directory</h1>
          <p className="page-subtitle">View and manage all patient records.</p>
        </div>
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20}/> Add Patient
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="header-search" style={{width: '300px'}}>
            <Search className="search-icon" size={20} />
            <input type="text" placeholder="Search by name or ID..." className="search-input" />
          </div>
        </div>

        <div className="table-responsive">
          {loading ? (
             <p style={{padding: '24px', textAlign: 'center'}}>Loading patient data...</p>
          ) : error ? (
             <p style={{padding: '24px', textAlign: 'center', color: 'red'}}>{error}. Ensure backend is running.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Age / Gender</th>
                  <th>Assigned Doctor</th>
                  <th>Last Visit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, i) => (
                  <tr key={i}>
                    <td><span className="badge-id">{p.id}</span></td>
                    <td className="font-medium">{p.name}</td>
                    <td>{p.age} / {p.gender}</td>
                    <td>{p.doctor}</td>
                    <td>{p.lastVisit}</td>
                    <td>
                      <button className="btn-secondary" style={{padding: '6px 12px', fontSize: '0.8rem'}}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Reusable Modal specifically triggering AddPatient Logic */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Patient">
        <form onSubmit={handleAddPatient} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div style={{display: 'flex', gap: '16px'}}>
            <div style={{flex: 1}}>
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display:'block'}}>Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{width: '100%'}} />
            </div>
            <div style={{flex: 0.5}}>
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display:'block'}}>Age</label>
              <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required style={{width: '100%'}} />
            </div>
          </div>
          
          <div style={{display: 'flex', gap: '16px'}}>
            <div style={{flex: 1}}>
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display:'block'}}>Gender</label>
              <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} style={{width: '100%'}}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{flex: 1}}>
              <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display:'block'}}>Doctor Assigned</label>
              <select value={formData.doctor} onChange={e => setFormData({...formData, doctor: e.target.value})} style={{width: '100%'}}>
                <option>Dr. Sarah Jenkins</option>
                <option>Dr. William Smith</option>
                <option>Dr. Emily Chen</option>
              </select>
            </div>
          </div>

          <div>
             <label style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display:'block'}}>Diagnosis Reason</label>
             <input type="text" value={formData.diagnosis} onChange={e => setFormData({...formData, diagnosis: e.target.value})} required style={{width: '100%'}} />
          </div>

          <button type="submit" className="btn" style={{marginTop: '16px'}}>Save Patient Record</button>
        </form>
      </Modal>
    </div>
  );
};

export default Patients;
