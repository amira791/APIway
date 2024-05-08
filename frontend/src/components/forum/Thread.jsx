import React, { useEffect, useState } from 'react'
import { NavLink , useNavigate} from 'react-router-dom';
import useForum from '../../../src/Hooks/useForum';
import Comment from './Comment';
import {
  Flex, Avatar, Button, Input, Text, HStack, VStack,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { ChevronLeftIcon, TimeIcon } from '@chakra-ui/icons'
import formatTime from '../../utils/formatTime';

export default function Thread({ thread_id }) {
  const navigate = useNavigate()
  const [message, setMessage] = useState()
  const { addNewComment, getThread, getThreadComments, thread, comments, error, loading } = useForum();


  useEffect(() => {
    getThread(thread_id);
  }, [thread_id]);

  useEffect(() => {
    getThreadComments(thread_id);
  }, [thread_id]);


  const handleFormSubmit = (e) => {
    const newPost = {
      message: message,
      thread: thread_id,
      created_by: 1
    }
    e.preventDefault(); // Prevent default form submission behavior
    addNewComment(newPost)
    navigate(`/forum/threads/${thread_id}`)
  };

  return (
    <>
      <Flex flexDirection='column' justifyContent='flex-start' m={30}>

        <NavLink
          to='/forum'
          display="list-item"
          place-items="center"
          padding-left="1px"
          margin="10px"
        > <ChevronLeftIcon /> Back to all threads</NavLink>

        <br />

        <div className='history-filter'>
          <div className='history-content'>
            <div className='inner tf-filter-container'>
              <div className="history-content"></div>                <div className="history-details tf-loadmore 3d" style={{ width: '100vh' }}>
                <div className="authorr" style={{ width: '100vh' }}>
                  <div className="avatar">
                    <img src="assets/images/author/history-at5.jpg" alt="images" />
                  </div>
                  <div className="content">
                    <a href="#" className="name">{thread.creator?.CNusername}</a>
                    <div className="description"> {thread.content}</div>
                    <div className="date">
                      <span> <TimeIcon /></span>
                      <span className="month"> {formatTime(thread.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h5 className="heading">{thread.num_posts} Comments</h5>


        <div className='history-filter'>
          <div className='history-content'>
            <div className='inner tf-filter-container'>
              <div className="history-content">
                {comments.map(comment => (
                  <Comment key={comment.id_comment} comment={comment} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div id="comments">
          <h5 className="heading">Add A Comment</h5>
          <form onSubmit={handleFormSubmit} method="post" id="commentform" className="comment-form">
            <fieldset className="message">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="message" name="message" rows="4" placeholder="Message" tabIndex="4" aria-required="true" required="" />
            </fieldset>
            <div className="btn-submit"><button className="tf-button" type="submit">Send comment</button></div>
          </form>
        </div>

      </Flex>
    </>
  )
}
