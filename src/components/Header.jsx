import React, { useState, useEffect } from 'react';
import { Search, Bell, User, LogOut, Mail, Phone, Shield } from 'lucide-react';
import './Header.css';

const Header = ({ onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/appointments')
      .then(res => res.json())
      .then(data => {
        // Sort by most recent if possible, or just reverse to show latest
        setAppointments(data.reverse());
      })
      .catch(err => console.error("Error fetching appointments for notifications", err));
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };
  return (
    <header className="header">
      <div className="header-search">
        <Search className="search-icon" size={20} />
        <input type="text" placeholder="Search patients, doctors..." className="search-input" />
      </div>

      <div className="header-actions">
        <div className="notification-container" style={{ position: 'relative' }}>
          <button className="action-btn" onClick={toggleNotifications}>
            {appointments.length > 0 && <div className="notification-badge"></div>}
            <Bell size={20} />
          </button>
          
          {isNotificationsOpen && (
            <div className="profile-dropdown" style={{ width: '320px', right: '-10px' }}>
              <div className="dropdown-header" style={{ padding: '16px', background: 'white', borderBottom: '1px solid rgba(0,0,0,0.05)', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1rem' }}>Notifications</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Recent appointment bookings</p>
              </div>
              <div className="dropdown-content" style={{ maxHeight: '320px', overflowY: 'auto', padding: '0', gap: '0' }}>
                {appointments.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No new notifications</div>
                ) : (
                  appointments.slice(0, 5).map((app, index) => (
                    <div key={index} className="info-item" style={{ padding: '16px', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'flex-start', margin: 0, borderRadius: 0 }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', marginTop: '6px', flexShrink: 0 }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{app.patient}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>New appointment with {app.doctor}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-color)', marginTop: '6px', fontWeight: 500 }}>{app.date} at {app.time}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="profile-container">
          <div className="user-profile" onClick={toggleProfile}>
            <div className="avatar">
              <User size={24} color="#2b3674" />
            </div>
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
          
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  <User size={32} color="#2b3674" />
                </div>
                <div className="dropdown-header-info">
                  <h4>Admin User</h4>
                  <p>System Administrator</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-content">
                <div className="info-item">
                  <Mail size={16} className="info-icon" />
                  <span>admin@medcore.com</span>
                </div>
                <div className="info-item">
                  <Phone size={16} className="info-icon" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="info-item">
                  <Shield size={16} className="info-icon" />
                  <span>Full Access Level</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="action-btn" onClick={onLogout} title="Logout" style={{marginLeft: '12px'}}>
          <LogOut size={20} color="var(--danger)" />
        </button>
      </div>
    </header>
  );
};

export default Header;
