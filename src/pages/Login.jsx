import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Admin Mock Authentication
    if (email === 'admin@hospital.com' && password === 'admin123') {
      onLogin({ role: 'admin' });
      navigate('/admin/dashboard');
    } 
    // Patient Mock Authentication
    else if (email === 'patient@hospital.com' && password === 'patient123') {
      onLogin({ role: 'patient' });
      navigate('/patient/dashboard');
    } 
    else {
      setError('Invalid credentials. Use admin@ / admin123 or patient@ / patient123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-fade-in">
        <div className="login-brand">
          <div className="brand-logo login-logo">
            <Stethoscope size={32} color="white" />
          </div>
          <h2>Welcome to MedCore</h2>
          <p>Login to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@hospital.com OR patient@hospital.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
