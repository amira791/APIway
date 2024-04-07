import React from 'react'
import { Flex, Spacer, Avatar, Box, Text, HStack, Button, LinkBox, LinkOverlay, Divider } from '@chakra-ui/react'
import { TimeIcon } from '@chakra-ui/icons'
import formatTime from '../../utils/formatTime'

export default function Post({ post }) {
  return (
    <>
      <Flex flexDirection='column' justifyContent='center' >
        <Avatar bg='teal.500' margin='10' size='lg' showBorder name={post.created_by.CNusername} />
        <Box>
          <Text>{post.created_by.CNusername}</Text>
          <Text>{post.message}</Text>
          <HStack>
            <TimeIcon />
            <Text size='sm'>{formatTime(post.created_at)}</Text>
          </HStack>
        </Box>
        <Spacer />
      </Flex>
    </>
  )
}
