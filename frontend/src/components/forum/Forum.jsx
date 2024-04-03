import React, { useEffect, useState } from 'react';
import ThreadList from './ThreadList';
import useForum from '../../hooks/useForum';
import { Flex, Spacer , Box , Button , Heading , Text , HStack} from '@chakra-ui/react'

export default function Forum({ forum_id }) {
  const { getForum,forum , error, loading } = useForum();

  useEffect(() => {
    // Fetch forum data when component mounts
    getForum(forum_id);
    setTimeout(5000)
  }, [forum_id]);
  return (
    <>
      <Flex
        margin={50}
        flexDirection={'column'}
      >
        <Box>
          <Heading>{forum.title}</Heading>
          <Text>{forum.description}</Text>
        </Box>
        <HStack alignSelf={'flex-end'} >
          <Button> New Discution</Button>
          <Button>  New Ticket </Button>
        </HStack> 
        <Box>
          <ThreadList key={forum_id} forum_id={forum_id}/>
        </Box>
         
       </Flex>
    
        
      </>
  );
}
