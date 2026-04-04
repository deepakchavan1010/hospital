import { User, Bell, Lock, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="animate-fade-in dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage hospital preferences and your administrative account.</p>
        </div>
        <button className="btn">Save Changes</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '32px' }}>
        
        {/* Settings Navigation Sidebar */}
        <div className="card" style={{ padding: '16px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                <User size={18} /> General Profile
              </button>
            </li>
            <li>
              <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                <Lock size={18} /> Security
              </button>
            </li>
            <li>
              <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                <Bell size={18} /> Notifications
              </button>
            </li>
            <li>
              <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                <Globe size={18} /> System Preferences
              </button>
            </li>
          </ul>
        </div>

        {/* Settings Content Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', borderBottom: '1px solid #edf2f7', paddingBottom: '16px' }}>Profile Information</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <User size={40} color="#a0aec0" />
            </div>
            <div>
               <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Admin User</h3>
               <div style={{ display: 'flex', gap: '12px' }}>
                 <button className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Change Photo</button>
                 <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Remove</button>
               </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
               <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>First Name</label>
               <input type="text" defaultValue="Admin" style={{ width: '100%' }} />
            </div>
            <div>
               <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Last Name</label>
               <input type="text" defaultValue="User" style={{ width: '100%' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
               <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Email Address</label>
               <input type="email" defaultValue="admin@hospital.com" style={{ width: '100%' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
               <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-main)' }}>Role / Title</label>
               <input type="text" defaultValue="System Administrator" style={{ width: '100%' }} disabled />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
