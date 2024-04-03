import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import useForum from '../../hooks/useForum';
import Post from './Post';
import { Flex, Avatar, Box, Text, HStack, VStack } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import formatTime from '../../utils/formatTime';

export default function Thread({ thread_id }) {
  const { getThread, getThreadPosts, thread, posts, error, loading } = useForum();


  useEffect(() => {
    getThread(thread_id);
    setTimeout(5000)
    console.log(thread)
  }, [thread_id]);

  useEffect(() => {
    // Fetch posts for each thread when threads data changes
    getThreadPosts(thread_id);
    setTimeout(5000)
  }, [thread_id]);

  return (
    <>
      <Flex flexDirection='column' justifyContent='flex-start' m={30}>
        <HStack>
          <ChevronLeftIcon />
          <Link to={`/forum`}>Back to all threads</Link>
        </HStack>

        <VStack align='flex-start'>
          <HStack>
            <Avatar bg='teal.500' margin='10' size='lg' showBorder
              // name={thread.creator?.CNusername}/>
              name='Mekki Soumeya' />

            <VStack spacing={0} justifyContent='center'>
              <Text>
                {/* {thread.creator?.CNusername} */}
                Soumi
              </Text>
              <Text size='sm'>
                {/* {formatTime(thread.created_at)} */}
                2 days ago
              </Text>
            </VStack>
          </HStack>
          <Text>
            Bla kfhkjfhwkjfhwkjfhw
            fjhgfjhgfkwgfhwfjhwgfjwhgfjgwfjwgjhw
            wfjwhgfkwgfhjqgjwgfjwfgwjfgwjfgwjhfgwjfgwfjhw
            {/* {thread.content} */}
          </Text>
        </VStack>

        <Text fontWeight='bold'>
          {/* {thread.num_posts} */}
          10  Comments</Text>
        <VStack align='flex-start'>
          {posts.map(post => (
            <Post key={post.id_post} post={post} />
          ))}
        </VStack>

      </Flex>
    </>
  )
}
