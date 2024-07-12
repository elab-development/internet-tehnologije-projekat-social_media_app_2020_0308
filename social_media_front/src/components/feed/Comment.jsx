import React, { useState } from 'react';
import axios from 'axios';

function Comment({ postId, onCommentAdded }) {
  const [text, setText] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [giphySearch, setGiphySearch] = useState('');
  const [giphyResults, setGiphyResults] = useState([]);

  const handleGiphySearch = async () => {
    const apiKey = '5wLnOkJ4USUXRJ25tA31dGdP7i2y2mhB';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${giphySearch}&limit=5`;
    try {
      const response = await axios.get(url);
      setGiphyResults(response.data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:8000/api/comments', {
        text,
        post_id: postId,
        gif_url: gifUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onCommentAdded();
      setText('');
      setGifUrl('');
      setGiphyResults([]); // Clear GIF results after selecting one
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Search for GIFs"
          value={giphySearch}
          onChange={(e) => setGiphySearch(e.target.value)}
        />
        <button type="button" onClick={handleGiphySearch}>Search GIFs</button>
        <div>
          {giphyResults.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              onClick={() => {
                setGifUrl(gif.images.fixed_height.url);
                setGiphyResults([]); // Clear GIF results after selecting one
              }}
              style={{ cursor: 'pointer', margin: '5px' }}
            />
          ))}
        </div>
        {gifUrl && <img src={gifUrl} alt="Selected GIF" />}
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}

export default Comment;
