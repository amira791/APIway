import React from 'react'
import Post from './Post'

export default function Thread({thread}) {
  return (
    <div>
    <h2>{thread.content}</h2>
    <p>Created at: {thread.created_at}</p>
    {thread.posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
  )
}
