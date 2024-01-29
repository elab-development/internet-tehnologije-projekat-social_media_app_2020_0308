import Post from './Post';
import './Feed.css';
import React, { useState } from 'react';
import usePosts from './usePosts'; 

function Feed() {

  const { posts, loading, error } = usePosts('http://127.0.0.1:8000/api/posts'); 

  if (loading) return <div>Ucitavanje...</div>;
  if (error) return <div>Greska u dohvatanju postova za feed: {error.message}</div>;



  return (
    <div>
      <div className="feed">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post} 
          />
        ))}
      </div>
      
    </div>
  );
}

export default Feed;