import './App.css';
import { BrowserRouter,Route,Routes, Navigate  } from 'react-router-dom';
import React, { useState } from 'react';
import Prijava from './components/prijava/Prijava';
import Registracija from './components/registracija/Registracija';
import NavBar from './components/navbar/Navbar';
import Pocetna from './components/pocetna/Pocetna';
import Feed from './components/feed/Feed';
import Korisnici from './components/korisnici/Korisnici';

function App() {

  const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    const handleLogin = (username) => {
        setLoggedInUser(username);
        alert(`Uspesno ste se prijavili. Vas username je: ${username}`);
        console.log(`Uspesna prijava: ${username}`);
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
        return <Navigate to="/" />;
      };

  return (
    <div className="App">
      <BrowserRouter>
    <NavBar loggedInUser={loggedInUser} handleLogout={handleLogout} /> 
            <Routes>
              <Route path="/" element={ loggedInUser ? ( <Navigate to="/pocetna" /> ) 
              : (<Prijava onLogin={handleLogin} users={users} /> ) } 
              />
            <Route path="/registracija" element={<Registracija onRegister={handleRegister}
                   users={users} />} 
               />
            <Route path="/pocetna" element={<Pocetna/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path="/korisnici" element={<Korisnici/>} />
      
            </Routes>
          
        </BrowserRouter>
    </div>
  );
}

export default App;
