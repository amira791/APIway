import React from 'react';
import Forum from '../forum/Forum';

export default function ForumPage() {
  const forum_id = 1;
  return (
    <>
       <h1>Forum</h1>
       <Forum key={forum_id} forum_id={forum_id}  />
    </>
  );
}
