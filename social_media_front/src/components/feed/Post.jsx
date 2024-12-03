import React, { useState, useEffect } from 'react';
import './Post.css';
import { FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import Comment from './Comment';

function Post({ post, loggedInUser, onDelete, onLike }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/${post.id}/comments`);
        setComments(response.data.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [post.id]);

  const handleCommentAdded = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/posts/${post.id}/comments`);
    setComments(response.data.data);
  };

  const handleLike = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/posts/likeAPost/${post.id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
        <p>{formatDateTime(post.dateAndTime)}</p>
        <p>{post.location}</p>
        {loggedInUser && loggedInUser.id === post.user.id && (
          <button onClick={() => onDelete(post.id)} className="delete-button">Delete</button>
        )}
      </div>
      <p className="post-text">{post.description}</p>
      {post.image && (
        <div className="post-image">
          <img src={post.image} alt={post.name} />
        </div>
      )}
      <div className="likes">
        <button onClick={handleLike} className="like-button">
          <FaThumbsUp /> {post.numberOfLikes}
        </button>
      </div>
      <Comment postId={post.id} onCommentAdded={handleCommentAdded} />
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            {comment.gif_url && <img src={comment.gif_url} alt="GIF" />}
          </div>
        ))}
      </div>
    </div>
  );
}

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

export default Post;
