import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Prijava.css';

const Prijava = ({ onLogin }) => {
  const [username, setUsername] = useState('orie89@example.net');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: username,
        password: password
      });
      const { access_token, user } = response.data;
      sessionStorage.setItem('token', access_token);
      sessionStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } catch (error) {
      setError('Losi kredencijali za prijavu!');
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-data">
        <h2>Prijava</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="loginUsername" className="login-form-label">Korisnicko ime:</label>
        <input
          type="text"
          id="loginUsername"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-form-input"
        />
        <label htmlFor="loginPassword" className="login-form-label">Lozinka:</label>
        <input
          type="password"
          id="loginPassword"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-form-input"
        />
        <button onClick={handleLogin} className="login-form-button">Prijava</button>
        <p style={{ marginTop: '10px', color: 'purple' }}>
          Ako nemate nalog, kliknite <Link to="/registracija" className="link-black">ovde</Link> da se registrujete.
        </p>
      </div>
    </div>
  );
};

export default Prijava;
