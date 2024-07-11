import React, { useState, useEffect } from 'react';
import usePosts from './usePosts';
import Post from './Post';
import Footer from '../footer/Footer';
import axios from 'axios';
import './Feed.css';

function Feed() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState({ name: '', description: '', image: null });
  const [allPosts, setAllPosts] = useState([]); // State for all posts
  const loggedInUser = JSON.parse(sessionStorage.getItem('user')); // Get the logged-in user from session storage

  const postsPerPage = 5;
  const { posts, loading, error } = usePosts('http://127.0.0.1:8000/api/posts');

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  if (loading) return <div>Učitavanje...</div>;
  if (error) return <div>Greška u dohvatanju postova za feed: {error.message}</div>;

  const filteredPosts = allPosts.filter(post =>
    (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (post.user && post.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (post.location && post.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const displayPosts = filteredPosts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewPost({ ...newPost, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newPost.name);
    formData.append('description', newPost.description);
    formData.append('image', newPost.image);

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const createdPost = response.data; // Assuming the response contains the newly created post
      setAllPosts([createdPost, ...allPosts]); // Update the local posts state
      setNewPost({ name: '', description: '', image: null });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllPosts(allPosts.filter(post => post.id !== postId)); // Update the local posts state
      alert('Post successfully deleted!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      <div className='feed-page'>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pretraži postove..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <form onSubmit={handleSubmit} className="new-post-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newPost.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Share something..."
            value={newPost.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <button type="submit">Post</button>
        </form>
        <div className="feed">
          {displayPosts.map((post) => (
            <Post key={post.id} post={post} loggedInUser={loggedInUser} onDelete={handleDelete} />
          ))}
        </div>
        <div className="pagination">
          <p>Paginacija:</p>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={currentPage === index ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Feed;
