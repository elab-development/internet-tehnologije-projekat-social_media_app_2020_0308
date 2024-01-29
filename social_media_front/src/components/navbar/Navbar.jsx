import { Link } from 'react-router-dom';
import { CgFeed } from "react-icons/cg";
import { RiHome4Line } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function NavBar({ loggedInUser, handleLogout }) {

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/');
        };

    return (
      <div>
        <nav className="nav">
          <div className="nav__title">
            <h1>Drustvena mreza</h1>
          </div>
          <ul className="nav__list">
            <li className="nav__item">
                Logovan korisnik: {loggedInUser}{' '}
                </li>
                <li className="nav__item">
                  <Link to='/pocetna'> Pocetna <RiHome4Line /> </Link>
                </li>
                <li className="nav__item">
                  <Link to='/feed'>Feed <CgFeed /></Link>
                </li>
                <li className="nav__item">
                  <Link to='/korisnici'>Korisnici aplikacije <IoMdPeople /></Link>
                </li>
                <button className="logout-button" onClick={handleLogoutClick}>
                Logout
              </button>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavBar;