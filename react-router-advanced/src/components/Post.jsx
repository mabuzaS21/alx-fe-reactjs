import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Post ID: {id}</h2>
      <p>This is a dynamic page for post {id}.</p>
    </div>
  );
};

export default Post;
