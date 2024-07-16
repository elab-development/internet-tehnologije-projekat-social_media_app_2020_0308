import { Link, useNavigate } from 'react-router-dom';
import { CgFeed } from "react-icons/cg";
import { RiHome4Line } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Navbar.css';

function NavBar({ handleLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleLogoutClick = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      navigate('/');
      handleLogout();
     
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav__title">
          <h1>Drustvena mreza</h1>
        </div>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to='/pocetna'>Pocetna <RiHome4Line /></Link>
          </li>
          {user && user.uloga === 'korisnik' && (
            <>
              <li className="nav__item">
                <Link to='/feed'>Feed <CgFeed /></Link>
              </li>
              <li className="nav__item">
                <Link to='/korisnici'>Korisnici aplikacije <IoMdPeople /></Link>
              </li>
            </>
          )}
          {user && user.uloga === 'admin' && (
            <>
              <li className="nav__item">
                <Link to='/admin'>Statistika <CgFeed /></Link>
              </li>
              <li className="nav__item">
                <Link to='/spisakKorisnika'>Spisak korisnika <IoMdPeople /></Link>
              </li>
            </>
          )}
          {user && (
            <button className="logout-button" onClick={handleLogoutClick}>
              Logout
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
