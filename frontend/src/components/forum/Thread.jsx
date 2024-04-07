import React, { useEffect, useState } from 'react'
import { Link , Form} from "react-router-dom";
import useForum from '../../hooks/useForum';
import Post from './Post';
import { Flex, Avatar, Button,Input, Text, HStack, VStack,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import formatTime from '../../utils/formatTime';

export default function Thread({ thread_id }) {
  const [message,setMessage]=useState()
  const { addNewPost,getThread, getThreadPosts, thread, posts, error, loading } = useForum();


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


  const handleFormSubmit = (e) => {
    const newPost ={
        message: message,
        thread: thread_id,  
        created_by: 1
     }
    e.preventDefault(); // Prevent default form submission behavior
    addNewPost(newPost)
  };

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
              name={thread.creator?.CNusername}
               //name='Mekki Soumeya'
              />
             
              

            <VStack spacing={0} justifyContent='center'>
              <Text>
                {thread.creator?.CNusername}
              </Text>
              <Text size='sm'>
                {formatTime(thread.created_at)}
              </Text>
            </VStack>
          </HStack>
          <Text>
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae veritatis nobis ut beatae fugit? Fuga alias excepturi id cumque doloremque qui quibusdam! Iure quasi incidunt totam minus facilis corporis soluta.*/}
            {thread.content} 
          </Text>
        </VStack>

        <Text fontWeight='bold'>
         {thread.num_posts}
         </Text>
        <VStack align='flex-start'>
          {posts.map(post => (
            <Post key={post.id_post} post={post} />
          ))}
        </VStack>

        <form onSubmit={handleFormSubmit}>
          <FormControl>
            <FormLabel>Comment</FormLabel>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Enter your comment here'
            />
          </FormControl>
          <Button mt={4} colorScheme='teal' type='submit'>
            Submit
          </Button>
        </form>
      </Flex>
    </>
  )
}
