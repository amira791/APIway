import React, { useEffect } from 'react';
import useForum from '../../hooks/useForum';

import { NavLink } from 'react-router-dom';
import { TimeIcon, ChatIcon } from '@chakra-ui/icons';
import formatTime from '../../utils/formatTime';

export default function ThreadList({ forum_id }) {
  const { getForumThreads, threads, error, loading } = useForum();

  useEffect(() => {
    getForumThreads(forum_id);
  }, [forum_id]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message if an error occurs
  }

  return (
    <>
      <div className='history-filter'>
        <div className='history-content'>
          <div className='inner tf-filter-container'>
            <div className="history-content">
              {threads.map(thread => (
                <div key={thread.id_thread} className="history-details tf-loadmore 3d" style={{ width: '100vh' }}>
                  <div className="authorr" style={{ width: '100vh' }}>
                    <div className="avatar">
                      <img src="assets/images/author/history-at5.jpg" alt="images" />
                    </div>
                    <div className="content">
                      <a href="#" className="name">{thread.creator.CNusername}</a>
                      <div className="description">{thread.content.substring(0, 70)}</div>
                      <div className="date">
                        <span> <TimeIcon mr={5} /></span>
                        <span className="month">{formatTime(thread.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  <NavLink to={`/forum/threads/${thread.id_thread}`}>
                    <div className="category-filter">
                      <ChatIcon mr={2} />
                      {thread.num_posts} Comments
                    </div>
                  </NavLink>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
