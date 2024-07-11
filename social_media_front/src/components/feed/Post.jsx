import React from 'react';
import './Post.css';
import { FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';

function Post({ post, loggedInUser, onDelete, onLike }) {

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric',   
    };
    return dateTime.toLocaleString('en-US', options);
  }

  const formattedDateTime = formatDateTime(post.dateAndTime);

  const handleLike = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/posts/likeAPost/${post.id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onLike(post.id);  
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <p>{post.user.name}</p>
        <p>{formattedDateTime}</p>
        <p>{post.location}</p>
        {loggedInUser && loggedInUser.id === post.user.id && (
          <button onClick={() => onDelete(post.id)} className="delete-button">
            Delete
          </button>
        )}
      </div>
      <p className="post-text">{post.description}</p>
      <div className="likes">
        <button onClick={handleLike} className="like-button">
          <FaThumbsUp /> {post.numberOfLikes}
        </button>
      </div>
    </div>
  );
}

export default Post;
