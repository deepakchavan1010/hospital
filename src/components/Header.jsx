import { Search, Bell, User, LogOut } from 'lucide-react';
import './Header.css';

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="header-search">
        <Search className="search-icon" size={20} />
        <input type="text" placeholder="Search patients, doctors..." className="search-input" />
      </div>

      <div className="header-actions">
        <button className="action-btn">
          <div className="notification-badge"></div>
          <Bell size={20} />
        </button>
        <div className="user-profile">
          <div className="avatar">
            <User size={24} color="#2b3674" />
          </div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
        <button className="action-btn" onClick={onLogout} title="Logout" style={{marginLeft: '12px'}}>
          <LogOut size={20} color="var(--danger)" />
        </button>
      </div>
    </header>
  );
};

export default Header;
