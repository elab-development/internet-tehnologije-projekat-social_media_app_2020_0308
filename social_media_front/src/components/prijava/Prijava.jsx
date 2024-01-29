import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import './Prijava.css';

const Prijava = ({ onLogin, users }) => {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      onLogin(username);
    } else {
      alert('Losi kredencijali za prijavu!');
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-data">
        <h2>Prijava</h2>
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

        <p style={{ marginTop: '10px' , color: 'purple'}}>Ako nemate nalog, kliknite <Link to="/registracija"> ovde </Link> 
             da se registrujete.</p>
      </div>
    </div>
  );
};

export default Prijava;