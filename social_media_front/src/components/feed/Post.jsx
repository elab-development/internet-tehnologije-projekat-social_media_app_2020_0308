import React from 'react';
import './Post.css';
import { FaThumbsUp } from 'react-icons/fa';

function Post({ post, loggedInUser, onDelete }) {

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
        <p>
          <FaThumbsUp /> {post.numberOfLikes}
        </p>
      </div>
    </div>
  );
}

export default Post;
