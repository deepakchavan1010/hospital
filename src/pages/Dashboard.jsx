import { useState, useEffect } from 'react';
import { Users, UserPlus, Activity, BedDouble } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const chartData = [
  { name: 'Jan', patients: 400 },
  { name: 'Feb', patients: 300 },
  { name: 'Mar', patients: 550 },
  { name: 'Apr', patients: 480 },
  { name: 'May', patients: 600 },
  { name: 'Jun', patients: 780 },
];

const Dashboard = () => {
  const [statsData, setStatsData] = useState(null);
  const [recentPatients, setRecentPatients] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => setStatsData(data))
      .catch(console.error);

    fetch('http://localhost:5000/api/patients')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setRecentPatients(data.slice(0, 4));
      })
      .catch(console.error);

    fetch('http://localhost:5000/api/appointments')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setUpcomingAppointments(data.slice(0, 3));
      })
      .catch(console.error);
  }, []);

  const stats = statsData ? [
    { title: "Total Patients", value: statsData.totalPatients, icon: <Users size={24} />, bg: "rgba(67, 24, 255, 0.1)", color: "var(--primary-color)", trend: "+12%" },
    { title: "New Appointments", value: statsData.newAppointments, icon: <UserPlus size={24} />, bg: "rgba(5, 205, 153, 0.1)", color: "var(--success)", trend: "+5%" },
    { title: "Operations Today", value: statsData.operationsToday, icon: <Activity size={24} />, bg: "rgba(255, 206, 32, 0.1)", color: "var(--warning)", trend: "-2%" },
    { title: "Available Beds", value: statsData.availableBeds, icon: <BedDouble size={24} />, bg: "rgba(238, 93, 80, 0.1)", color: "var(--danger)", trend: "-8%" },
  ] : [];

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here is your hospital summary today.</p>
        </div>
        <button className="btn">Generate Report</button>
      </div>

      <div className="stats-grid">
        {!statsData ? <p>Loading stats...</p> : stats.map((stat, i) => (
          <div key={i} className="card stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-title">{stat.title}</span>
              <div className="stat-value-container">
                <span className="stat-value">{stat.value}</span>
                <span className={`stat-trend ${stat.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart Section */}
      <div className="card" style={{height: '350px'}}>
        <div className="card-header">
          <h3>Patient Admissions Pipeline</h3>
        </div>
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf2f7" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="patients" stroke="var(--primary-color)" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-content">
        <div className="card recent-patients-card">
          <div className="card-header">
            <h3>Recent Patients</h3>
            <button className="btn-secondary">View All</button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Diagnosis</th>
                  <th>Status</th>
                  <th>Admit Time</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.length === 0 ? <tr><td colSpan="5">Loading...</td></tr> : recentPatients.map((patient, i) => (
                  <tr key={i}>
                    <td><span className="badge-id">{patient.id}</span></td>
                    <td className="font-medium">{patient.name}</td>
                    <td>{patient.diagnosis}</td>
                    <td>
                      <span className={`status-badge ${patient.status ? patient.status.toLowerCase() : 'stable'}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td>{patient.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card side-panel">
          <h3>Upcoming Appointments</h3>
          <div className="appointment-list">
            {upcomingAppointments.length === 0 ? <p>Loading...</p> : upcomingAppointments.map((appt, i) => (
              <div key={i} className="appointment-item">
                <div className="appt-time">
                  <span className="time">{appt.time.split(' ')[0]}</span>
                  <span className="ampm">{appt.time.split(' ')[1]}</span>
                </div>
                <div className="appt-details">
                  <h4>{appt.patient}</h4>
                  <p>{appt.type} - {appt.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
