import { useState, useEffect } from 'react';
import axios from 'axios';

const useKorisnici = (url) => {
  const [korisnici, setKorisnici] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(url)
      .then(response => {
        setKorisnici(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { korisnici, loading, error, setKorisnici };
};

export default useKorisnici;