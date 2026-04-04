import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ onLogout }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header onLogout={onLogout} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
