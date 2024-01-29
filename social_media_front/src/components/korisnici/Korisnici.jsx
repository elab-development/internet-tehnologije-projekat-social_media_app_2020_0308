import React, { useState } from 'react';
import useKorisnici from './useKorisnici';
import './Korisnici.css';
import Footer from '../footer/Footer';

function Korisnici() {
  const { korisnici, loading, error } = useKorisnici('http://127.0.0.1:8000/api/users');
  const [kriterijum, setKriterijum] = useState('');
  const [zapraceni, setZapraceni] = useState([]);
  
  const handleSearchChange = (e) => {
    setKriterijum(e.target.value);
  };

  const handlePratiClick = (korisnik) => {
    if (zapraceni.find((item) => item.id === korisnik.id)) {
      setZapraceni(zapraceni.filter(item => item.id !== korisnik.id));
      alert(`Korisnik ${korisnik.name} je otpraćen!`);
    } else {
      setZapraceni([...zapraceni, korisnik]);
      alert(`Korisnik ${korisnik.name} je zapraćen!`);
    }
  };

  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>Greska u dohvatanju korisnika: {error.message}</div>;

  const filtriraniKorisnici = korisnici.filter(korisnik =>
    korisnik.name.toLowerCase().includes(kriterijum.toLowerCase())
  );

  return (
    <>
    <div className='korisnici-page'>
      {/* Korisnici section */}
      <div className='svi-korisnici'>
        <h2 className="korisnici-heading">Korisnici aplikacije</h2>
        <div className='korisnici-search'>
          <input
            type="text"
            placeholder="Pretražite korisnike aplikacije po imenu..."
            value={kriterijum}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <ul className="korisnici-list">
          {filtriraniKorisnici.map((korisnik) => (
            <li key={korisnik.id} className="korisnik-item">
              <p className="korisnik-username">{korisnik.name}</p>
              <button onClick={() => handlePratiClick(korisnik)}>
                {zapraceni.find((item) => item.id === korisnik.id) ? 'Otprati' : 'Prati'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Korisnici;
