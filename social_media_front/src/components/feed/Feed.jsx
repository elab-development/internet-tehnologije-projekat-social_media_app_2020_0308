import Post from './Post';
import './Feed.css';
import React, { useState } from 'react';
import usePosts from './usePosts'; 
import Footer from '../footer/Footer';

function Feed() {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 5;  

  const { posts, loading, error } = usePosts('http://127.0.0.1:8000/api/posts'); 

  if (loading) return <div>Ucitavanje...</div>;
  if (error) return <div>Greska u dohvatanju postova za feed: {error.message}</div>;


  const pageCount = Math.ceil(posts.length / postsPerPage);
  const displayPosts = posts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);

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
    <Footer/>
    </>
  );
}

export default Feed;