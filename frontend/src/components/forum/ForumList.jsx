import React from 'react';
import Forum from './Forum';
import useForum from '../../hooks/useForum';

export default function ForumList() {
  return (
    <>
      <h1>Forum</h1>
       <Forum forum_id={1}  />
    </>
  );
}
