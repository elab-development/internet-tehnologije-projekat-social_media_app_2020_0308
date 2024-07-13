import './App.css';
import { BrowserRouter,Route,Routes, Navigate  } from 'react-router-dom';
import React, { useState } from 'react';
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
    
    const handleLogin = (username) => {
        setLoggedInUser(username); 
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
      {/* za neulogovanog */}
            <Routes>
              <Route path="/" element={ loggedInUser ? ( <Navigate to="/pocetna" /> ) 
              : (<Prijava onLogin={handleLogin} users={users} /> ) } 
              />
            <Route path="/registracija" element={<Registracija onRegister={handleRegister}
                   users={users} />} 
               />

                 {/* za korisnika */}
            <Route path="/pocetna" element={<Pocetna/>} />
            <Route path="/feed" element={<Feed/>} />
            <Route path="/korisnici" element={<Korisnici/>} />
      
                  {/* za admina */}
            <Route path="/admin" element={<Statistics/>} />
            <Route path="/spisakKorisnika" element={<SpisakKorisnika/>} />

            </Routes>
          
        </BrowserRouter>
    </div>
  );
}

export default App;
