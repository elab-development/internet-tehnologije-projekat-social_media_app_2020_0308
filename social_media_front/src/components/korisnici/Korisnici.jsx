import React, { useState } from 'react';
import useKorisnici from './useKorisnici';
import './Korisnici.css';
import Footer from '../footer/Footer';

function Korisnici() {
  const { korisnici, loading, error } = useKorisnici('http://127.0.0.1:8000/api/users');
  const [kriterijum, setKriterijum] = useState('');
  const [zapraceni, setZapraceni] = useState([]);
  const [sortKriterijum, setSortKriterijum] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearchChange = (e) => {
    setKriterijum(e.target.value);
  };

  const handleSortChange = (e) => {
    const newSortKriterijum = e.target.value;
    if (sortKriterijum === newSortKriterijum) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKriterijum(newSortKriterijum);
      setSortDirection('asc');
    }
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
  if (error) return <div>Greška u dohvatanju korisnika: {error.message}</div>;

  const filtriraniKorisnici = korisnici
    .filter(korisnik => korisnik.name.toLowerCase().includes(kriterijum.toLowerCase()))
    .sort((a, b) => {
      if (sortKriterijum === 'name') {
        if (sortDirection === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }
      return 0;
    });

  return (
    <>
      <div className='korisnici-page'>
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
          <div className='korisnici-sort'>
            <label>Sortiraj po:</label>
            <select onChange={handleSortChange} value={sortKriterijum}>
              <option value="">Izaberite kriterijum</option>
              <option value="name">Imenu</option>
            </select>
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
      <Footer />
    </>
  );
}

export default Korisnici;
