import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Prijava from './components/prijava/Prijava';
import Registracija from './components/registracija/Registracija';
import NavBar from './components/navbar/Navbar';
import Pocetna from './components/pocetna/Pocetna';
import Feed from './components/feed/Feed';
import Korisnici from './components/korisnici/Korisnici';
import Statistics from './components/admin/Statistics';
import SpisakKorisnika from './components/admin/SpisakKorisnika';

function App() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogin = (user) => {
    setLoggedInUser(user);
    console.log(user)
    window.location.reload();
  };

  const handleRegister = (newUser) => {
    if (users.some((user) => user.username === newUser.username)) {
      alert('Ovaj username vec postoji, unesite drugi!');
      return;
    }
    setUsers((prevUsers) => [...prevUsers, newUser]);
    alert('Uspesna registracija!');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar loggedInUser={loggedInUser} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={loggedInUser ? (<Navigate to="/pocetna" />) : (<Prijava onLogin={handleLogin} users={users} />)} />
          <Route path="/registracija" element={<Registracija onRegister={handleRegister} users={users} />} />
          <Route path="/pocetna" element={<Pocetna />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/korisnici" element={<Korisnici />} />
          <Route path="/admin" element={<Statistics />} />
          <Route path="/spisakKorisnika" element={<SpisakKorisnika />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
