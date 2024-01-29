import { useState, useEffect } from 'react';
import axios from 'axios';

const usePosts = (url) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get(url)
      .then(response => {
        setPosts(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { posts, loading, error, setPosts };
};

export default usePosts;