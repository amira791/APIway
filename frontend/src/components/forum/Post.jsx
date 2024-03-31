import React from 'react'

export default function Post({post}) {
  return (
    <div>
      <p>{post.message}</p>
      <p>Created at: {post.created_at}</p>
    </div>
  )
}
