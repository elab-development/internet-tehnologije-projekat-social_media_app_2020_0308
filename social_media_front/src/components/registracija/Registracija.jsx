import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registracija.css';

const Registracija = ({ onRegister }) => {
  const [username, setUsername] = useState('proba@gmail.com');
  const [password, setPassword] = useState('password');
  const [email, setEmail] = useState('proba@gmail.com');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: username,
        email: email,
        password: password
      });
      const { token, user } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      onRegister(user);
      navigate('/');
    } catch (error) {
      setError('Error while registering. Please try again.');
    }
  };

  return (
    <div className="register-form">
      <div className="register-form-data">
        <h2>Registracija</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="registerUsername" className="register-form-label">Korisnicko ime:</label>
        <input
          type="text"
          id="registerUsername"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-form-input"
        />
        <label htmlFor="registerEmail" className="register-form-label">Email:</label>
        <input
          type="email"
          id="registerEmail"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
