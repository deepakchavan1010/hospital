import { Heart, Activity, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

const PatientDashboard = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [medLoading, setMedLoading] = useState(true);

  // In a real app we'd get the patient name from auth. Defaulting to our dummy patient "Eleanor Pena" or similar
  const activePatientName = "Eleanor Pena"; 

  useEffect(() => {
    fetch(`http://localhost:5000/api/prescriptions?patient=${activePatientName}`)
      .then(res => res.json())
      .then(data => {
        // Fallback to empty array if error or undefined
        setPrescriptions(Array.isArray(data) ? data : []);
        setMedLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMedLoading(false);
      });
  }, [activePatientName]);

  return (
    <div className="animate-fade-in dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Personal Health Status</h1>
          <p className="page-subtitle">Welcome back, Emily. Here is your medical overview.</p>
        </div>
      </div>

      <div className="card" style={{ background: '#05cd99', color: 'white' }}>
        <h2 style={{ fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '12px' }}>Next Upcoming Visit</h2>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div>
             <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Nov 02, 2023 at 10:00 AM</h3>
             <p style={{ opacity: 0.9, marginTop: '4px' }}>Regular Checkup with Dr. Sarah Jenkins</p>
           </div>
           <button style={{ padding: '10px 20px', background: 'white', color: '#05cd99', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Prepare Form</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '24px', marginTop: '24px' }}>
        <div className="card">
           <div className="card-header">
             <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Activity color="var(--primary-color)" /> <h3 style={{fontSize: '1.1rem'}}>Recent Diagnoses</h3>
             </div>
           </div>
           <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <li style={{ borderBottom: '1px solid #edf2f7', paddingBottom: '12px' }}>
                <strong>Hypertension Level 1</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Diagnosed Oct 12, 2023 by Dr. Jenkins</p>
             </li>
             <li>
                <strong>Seasonal Allergies</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Diagnosed Apr 04, 2023 by Dr. Smith</p>
             </li>
           </ul>
        </div>

        <div className="card">
           <div className="card-header">
             <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <FileText color="var(--secondary-color)" /> <h3 style={{fontSize: '1.1rem'}}>Prescriptions & Meds</h3>
             </div>
           </div>
           {medLoading ? (
             <p style={{ color: 'var(--text-muted)' }}>Loading records...</p>
           ) : prescriptions.length === 0 ? (
             <p style={{ color: 'var(--text-muted)' }}>No current prescriptions found.</p>
           ) : (
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {prescriptions.map((rx, idx) => (
                 <li key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
                    <strong>{rx.medicineName} ({rx.dosage})</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{rx.instructions}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--primary-color)', marginTop: '4px' }}>Prescribed by {rx.prescribedBy} on {rx.date}</p>
                 </li>
               ))}
             </ul>
           )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
