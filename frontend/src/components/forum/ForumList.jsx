import React, { useEffect, useState } from 'react';
import Forum from './Forum';
import useForum from '../../hooks/useForum';

export default function ForumList() {
  const { getForum, forum, error, loading } = useForum();
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log('Im in list');
    getForum(1);
  }, []);

  return (
    <>
      <h1>Forum</h1>
      <button onClick={() => {
        getForum(1)
        setShow(true)
      }}>Load Forum</button>
      {loading ? <h1>Loading...</h1> : null}
      {error ? <h1>Error: {error.message}</h1> : null}
      {forum && <Forum forum={forum} />}
    </>
  );
}
