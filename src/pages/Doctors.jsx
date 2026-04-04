import { Stethoscope, Phone, Mail, Award } from 'lucide-react';

const Doctors = () => {
  const doctorsList = [
    { id: "D-101", name: "Dr. Sarah Jenkins", specialty: "Cardiologist", experience: "15 Years", contact: "+1 (555) 123-4567", email: "s.jenkins@hospital.com", status: "Available" },
    { id: "D-102", name: "Dr. William Smith", specialty: "Neurologist", experience: "12 Years", contact: "+1 (555) 987-6543", email: "w.smith@hospital.com", status: "In Surgery" },
    { id: "D-103", name: "Dr. Emily Chen", specialty: "Pediatrician", experience: "8 Years", contact: "+1 (555) 456-7890", email: "e.chen@hospital.com", status: "Available" },
    { id: "D-104", name: "Dr. Michael Lee", specialty: "Orthopedic", experience: "20 Years", contact: "+1 (555) 789-0123", email: "m.lee@hospital.com", status: "On Leave" },
  ];

  return (
    <div className="animate-fade-in dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Medical Staff</h1>
          <p className="page-subtitle">Directory of active hospital physicians and specialists.</p>
        </div>
        <button className="btn">Add Doctor</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {doctorsList.map((doc, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Stethoscope size={28} color="var(--primary-color)" />
              </div>
              <span className={`status-badge ${doc.status === 'Available' ? 'stable' : doc.status === 'In Surgery' ? 'critical' : 'recovering'}`}>
                {doc.status}
              </span>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '4px' }}>{doc.name}</h3>
              <p style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.9rem' }}>{doc.specialty}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <Award size={16} /> <span>{doc.experience} Experience</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <Phone size={16} /> <span>{doc.contact}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <Mail size={16} /> <span>{doc.email}</span>
              </div>
            </div>

            <button className="btn-secondary" style={{ width: '100%', marginTop: 'auto', padding: '12px' }}>View Schedule</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
