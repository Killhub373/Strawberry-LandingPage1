import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/AdminLogin.css';

const AdminLogin = ({ setAdminAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'AdminStrawberry@strawberry.id' && password === 'strawberrypagedatabase') {
      setAdminAuthenticated(true);
      navigate('/admin');
    } else {
      alert('Email atau kata sandi salah');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-form">
        <h2>Login Administrator</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Kata Sandi:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
