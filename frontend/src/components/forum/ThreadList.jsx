import React, { useEffect } from 'react'
import useForum from '../../hooks/useForum';
import { NavLink } from 'react-router-dom';
import { Flex, Spacer, Avatar, Box, Text, HStack, Button, LinkBox, LinkOverlay, Divider } from '@chakra-ui/react'
import { TimeIcon, ChatIcon } from '@chakra-ui/icons'
import formatTime from '../../utils/formatTime'

export default function ThreadList({ forum_id }) {

  const { getForumThreads, threads, error, loading } = useForum();

  useEffect(() => {
    getForumThreads(forum_id);
  }, [forum_id]);

  return (
    <>
      <div className='history-filter'>
        <div className='history-content'>
          <div className='inner tf-filter-container'>
            <div className="history-content">
              {threads.map(thread => (
                <div className="history-details tf-loadmore 3d" style={{ width: '100vh' }}>
                  <div className="authorr" style={{ width: '100vh' }}>
                    <div className="avatar">
                      <img src="assets/images/author/history-at5.jpg" alt="images" />
                    </div>
                    <div className="content">
                      <a href="#" className="name">{thread.creator.CNusername}</a>
                      <div className="description">{thread.content}</div>
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
  )
}
