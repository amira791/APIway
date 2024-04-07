import React, { useEffect } from 'react'
import useForum from '../../hooks/useForum';
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
      {threads.map(thread => (
        <LinkBox key={thread.id_thread}borderWidth='1px' rounded='md'>
          <Flex margin={40}  >
            <Avatar bg='teal.500' margin='10' size='lg' showBorder name={thread.creator.CNusername} />
            <Box margin={20}>
              <Text>{thread.creator.CNusername}</Text>
              <Text>{thread.content}</Text>
              <HStack>
                <TimeIcon />
                <Text size='sm'>{formatTime(thread.created_at)}</Text>
              </HStack>
            </Box>
            <Spacer />
            <LinkOverlay href={`forum/threads/${thread.id_thread}`}>
              <HStack alignItems='center' >

                <ChatIcon />
                <Text>{thread.num_posts} comments</Text>

              </HStack>
            </LinkOverlay>
          </Flex>
          <Divider />
        </LinkBox>
      ))}
    </>
  )
}
