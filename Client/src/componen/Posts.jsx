// import React from 'react'
// import Post from './Post'
// import { useSelector } from 'react-redux'

// const Posts = () => {
//   const {posts} = useSelector(store=>store.post);
//   return (
//     <div>
//         {
//             posts.map((post) => <Post key={post._id} post={post}/>)
//         }
//     </div>
//   )
// }

// export default Posts

import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const { posts, loading, error } = useSelector((store) => store.post); // Handle loading and error if included in Redux

  // Handle loading state
  if (loading) {
    return <p>Loading posts...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error loading posts: {error}</p>;
  }

  // Handle empty or invalid posts
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div>
      {
        posts
          .filter((post) => post && post._id) // Filter invalid posts
          .map((post) => (
            <Post key={post._id} post={post} />
          ))
      }
    </div>
  );
};

export default Posts;



