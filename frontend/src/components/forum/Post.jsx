import React from 'react'
import { Flex, Spacer, Avatar, Box, Text, HStack, Button, LinkBox, LinkOverlay, Divider } from '@chakra-ui/react'
import { TimeIcon } from '@chakra-ui/icons'
import formatTime from '../../utils/formatTime'

export default function Post({ post }) {
  return (
    <>

      <div className='history-filter'>
        <div className='history-content'>
          <div className='inner tf-filter-container'>
            <div className="history-content">

              <div className="history-details tf-loadmore 3d" style={{ width: '100vh' }}>
                <div className="authorr" style={{ width: '100vh' }}>
                    <div className="avatar">
                      <img src="assets/images/author/history-at5.jpg" alt="images" />
                    </div>
                  <div className="content">
                    <a href="#" className="name">{post.created_by.CNusername}</a>
                    <div className="description">{post.message}</div>
                    <div className="date">
                      <span> <TimeIcon /></span>
                      <span className="month">{formatTime(post.created_at)}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}
