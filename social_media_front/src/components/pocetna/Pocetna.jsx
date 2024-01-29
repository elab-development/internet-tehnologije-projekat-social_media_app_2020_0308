import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pocetna.css';
import Footer from '../footer/Footer';

const Pocetna = () => {
  const [citat, setCitat] = useState(null);

  useEffect(() => {
    const fetchCitati = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random?tags=Friendship');
        setCitat(response.data);
      } catch (error) {
        console.error('Došlo je do greške prilikom dohvatanja citata:', error);
      }
    };

    fetchCitati();
  }, []);

  return (
    <>
    <div className='pocetna-stranica'>
    <div className="pocetna-tekst">
      <h1>Dobrodošli na našu društvenu mrežu!</h1>
      <p>Ovde možete deliti svoje misli, pregledati postove drugih korisnika i pronaći nove prijatelje.</p>
      
      <div className='citat'>
      <h2>Neki od naših omiljenih citata o prijateljstvu:</h2>
      {citat && (
        <blockquote>
          <p>"{citat.content}"</p>
          <footer>- {citat.author}</footer>
        </blockquote>
      )}
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Pocetna;