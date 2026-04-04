import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Stethoscope, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Patients', icon: <Users size={20} />, path: '/patients' },
    { name: 'Appointments', icon: <Calendar size={20} />, path: '/appointments' },
    { name: 'Doctors', icon: <Stethoscope size={20} />, path: '/doctors' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <Stethoscope size={28} color="white" />
        </div>
        <h2 className="brand-title">MedCore</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="system-status">
          <span className="status-dot"></span>
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
