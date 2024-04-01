import React , {useEffect} from 'react'
import useForum from '../../hooks/useForum';
import { Flex, Spacer , Avatar , Box , Text , HStack , Button,LinkBox , LinkOverlay} from '@chakra-ui/react'
import { TimeIcon , ChatIcon } from '@chakra-ui/icons'

export default function ThreadList({forum_id}) {

  const { getForumThreads ,threads, error, loading } = useForum();

  useEffect(() => {
    getForumThreads(forum_id); 
    setTimeout(5000)
    console.log(threads)
  }, [forum_id]);

  return (
   <>  
       {threads.map(thread => (
        <LinkBox borderWidth='1px' rounded='md'>
             <Flex margin={40} key={thread.id_thread} onClick={console.log('clicked')}>
              <Avatar   bg='teal.500' margin='10' size='lg' showBorder  name='Oshigaki Kisame'/>
              <Box margin={20}>
                <Text>Username</Text> 
             
               <LinkOverlay href='forum/thread'>
                <Text>{thread.content}</Text>
               </LinkOverlay>
                <HStack>
                  <TimeIcon />
                  <Text size='sm'>{thread.created_at} </Text>
                </HStack> 
              </Box>
              <Spacer />
              <HStack alignItems='center' >
                <ChatIcon/>
                <Text>{10} comments</Text>
              </HStack>
           </Flex>
        </LinkBox>
       ))}
   </>
  )
}
