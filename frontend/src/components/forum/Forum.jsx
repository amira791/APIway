import React, { useEffect } from 'react'
import Thread from './Thread'

export default function Forum({forum}) {

  return (
        <div>
         <h1>{forum.title}</h1>
         <p>{forum.description}</p>
         
         {
         // fetch the threads of the forum first
         forum.threads.map(thread => (
          <Thread key={thread.id} thread={thread} />
         ))}
      </div>
 
  );
}
