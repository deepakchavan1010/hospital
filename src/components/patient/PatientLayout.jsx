import { Outlet } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';
import Header from '../Header'; // Reusing the same header but we'll override some props contextually if needed

const PatientLayout = ({ onLogout }) => {
  return (
    <div className="app-container">
      <PatientSidebar />
      <div className="main-content">
        {/* We can pass a custom name or logic to the Header if we want to change who is "logged in" */}
        <Header onLogout={onLogout} />
        <main className="page-content" style={{ backgroundColor: '#f1f5f9' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
