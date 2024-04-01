import React, { useEffect } from 'react'
import Post from './Post'
import useForum from '../../hooks/useForum';


export default function Thread({thread_id}) {
  const { getThread , getThreadPosts, thread,posts, error, loading } = useForum();

  
  useEffect(() => {
    getThread(thread_id); 
    setTimeout(5000)
  }, [thread_id]);

  useEffect(() => {
    // Fetch posts for each thread when threads data changes
        getThreadPosts(thread_id);
        setTimeout(5000)
  }, [thread_id]);

  return (
    <div>
    <h2>{thread.content}</h2>
    <p>Created at: {thread.created_at}</p>
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
  )
}
