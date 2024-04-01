import React, { useEffect, useState } from 'react';
import Thread from './Thread';
import useForum from '../../hooks/useForum';

export default function Forum({ forum_id }) {
  const { getForum, getForumThreads,forum ,threads, error, loading } = useForum();

  useEffect(() => {
    // Fetch forum data when component mounts
    getForum(forum_id); // Assuming you want to fetch forum with ID 1
    // Fetch threads data when component mounts
    getForumThreads(forum_id); // Assuming you want to fetch threads for forum with ID 1
    setTimeout(5000)
    console.log(threads)
  }, [forum_id]);



  return (
        <div>
         <h1>{forum.title}</h1>
         <p>{forum.description}</p>
         {threads.map(thread => (
            <Thread key={thread.id_thread} thread_id={thread.id_thread} />
         ))}
      </div>
 
  );
}
