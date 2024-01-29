import './App.css';
import { BrowserRouter,Route,Routes, Navigate  } from 'react-router-dom';
import React, { useState } from 'react';
import Prijava from './components/prijava/Prijava';
import Registracija from './components/registracija/Registracija';
import NavBar from './components/navbar/Navbar';
import Pocetna from './components/pocetna/Pocetna';
import Feed from './components/feed/Feed';

function App() {

  const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    const handleLogin = (username) => {
        setLoggedInUser(username);
        alert(`Logged in as ${username}`);
        console.log(`Logged in as ${username}`);
      };
    
    const handleRegister = (newUser) => {
        if (users.some((user) => user.username === newUser.username)) {
          alert('Username already exists. Please choose a different one.');
          return;
        }
    setUsers((prevUsers) => [...prevUsers, newUser]);
        alert('Registration successful!');
      };

      const handleLogout = () => {
        setLoggedInUser(null);
        return <Navigate to="/" />;
      };

  return (
    <div className="App">
      <BrowserRouter>
      {loggedInUser && <NavBar loggedInUser={loggedInUser} handleLogout={handleLogout} />}
            <Routes>
              <Route path="/" element={ loggedInUser ? ( <Navigate to="/pocetna" /> ) 
              : (<Prijava onLogin={handleLogin} users={users} /> ) } 
              />
            <Route path="/registracija" element={<Registracija onRegister={handleRegister}
                   users={users} />} 
               />
            <Route path="/pocetna" element={<Pocetna/>} />
            <Route path="/feed" element={<Feed/>} />
      
            </Routes>
          
        </BrowserRouter>
    </div>
  );
}

export default App;
