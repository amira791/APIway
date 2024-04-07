import React from 'react'
import Thread from '../forum/Thread';
import { useParams } from 'react-router-dom';

export default function ThreadPage() {
    const { thread_id } = useParams();
    console.log(thread_id)

    return(
     <>
        <div className='is_dark'>
         <Thread key={thread_id} thread_id={thread_id} />
        </div>
     </>
    );
     
}
