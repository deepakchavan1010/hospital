import { NavLink } from 'react-router-dom';
import { HeartPulse, Calendar, Activity } from 'lucide-react';
import '../Sidebar.css';

const PatientSidebar = () => {
  const menuItems = [
    { name: 'My Health', icon: <HeartPulse size={20} />, path: '/patient/dashboard' },
    { name: 'Appointments', icon: <Calendar size={20} />, path: '/patient/appointments' }
  ];

  return (
    <aside className="sidebar" style={{ backgroundColor: '#0f172a' }}> {/* Slightly different navy for patient view */}
      <div className="sidebar-brand">
        <div className="brand-logo" style={{ background: 'linear-gradient(135deg, #05cd99, #00b5d8)' }}>
          <Activity size={28} color="white" />
        </div>
        <h2 className="brand-title">MedCore Portal</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                style={({ isActive }) => ({ background: isActive ? '#05cd99' : 'transparent' })}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default PatientSidebar;
