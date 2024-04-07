import React, { useEffect,useRef,  useState } from 'react';
import ThreadList from './ThreadList';
import useForum from '../../hooks/useForum';
import { Flex, Spacer ,Input, Box , Button , Heading , Text , HStack ,FormControl,FormLabel,Modal, ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody, ModalCloseButton,useDisclosure 
} from '@chakra-ui/react'

export default function Forum({ forum_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const { addNewThread, getForum,forum , error, loading } = useForum();
  const [message,setMessage] = useState()

  useEffect(() => {
    // Fetch forum data when component mounts
    getForum(forum_id);
    setTimeout(5000)
  }, [forum_id]);


  const handleNewDiscussion = () => {
      const thread = {
       content: message,
       forum: forum_id, 
       creator: 2 // current user 
      }
       addNewThread(thread)
  }
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
          <Button onClick={onOpen}>New Discution</Button>
          <Button>  New Ticket </Button>
        </HStack> 
        <Box>
          <ThreadList key={forum_id} forum_id={forum_id}/>
        </Box>
       </Flex>
    
    <Box>
    <Modal
        size="md"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Ajouter une nouvelle discussion </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl isRequired >
              <FormLabel>Message</FormLabel>
              <Input 
                   value={message} 
                   onChange={(e) => setMessage(e.target.value) }
                   placeholder='Message' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleNewDiscussion}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
      
      </>
  );
}
