import Post from './Post';
import './Feed.css';
import React, { useState } from 'react';
import usePosts from './usePosts'; 

function Feed() {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 5; 
  const kriterijum = ''; 

  const { posts, loading, error } = usePosts('http://127.0.0.1:8000/api/posts'); 

  if (loading) return <div>Ucitavanje...</div>;
  if (error) return <div>Greska u dohvatanju postova za feed: {error.message}</div>;

  const filteredPosts = kriterijum
    ? posts.filter((post) =>
        post.username.toLowerCase().includes(kriterijum.toLowerCase())
      )
    : posts;

  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const displayPosts = filteredPosts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
    <div className='feed-page'>
      <div className="feed">
        {displayPosts.map((post) => (
          <Post
            key={post.id}
            post={post} 
          />
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
    </>
  );
}

export default Feed;