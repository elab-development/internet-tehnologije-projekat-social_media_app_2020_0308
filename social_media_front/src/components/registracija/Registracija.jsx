import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Registracija.css'; 

const Registracija = ({ onRegister, users }) => {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleRegister = () => {

    if (users.some((user) => user.username === username)) {
      alert('Ne mozete to korisnicko ime, izaberite drugo');
      return;
    }
    const newUser = { username, password };
    onRegister(newUser);
    navigate('/');

  };

  return (
    <div className="register-form">
      <div className="register-form-data">
        <h2>Registracija</h2>
        <label htmlFor="registerUsername" className="register-form-label">Korisnicko ime:</label>
        <input
          type="text"
          id="registerUsername"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-form-input"
        />
        <label htmlFor="registerPassword" className="register-form-label">Lozinka:</label>
        <input
          type="password"
          id="registerPassword"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-form-input"
        />
        <button onClick={handleRegister} className="register-form-button">Registruj se</button>
      </div>
    </div>
  );
};

export default Registracija;