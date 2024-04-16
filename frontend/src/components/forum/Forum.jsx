import React, { useEffect,useRef,  useState } from 'react';
import { Flex, Spacer ,Input, Box , Button , Heading , Text , HStack ,FormControl,FormLabel,Modal, ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody, ModalCloseButton,useDisclosure 
} from '@chakra-ui/react'
import useTicket from '../../hooks/useTicket';
import useForum from '../../hooks/useForum';
import ThreadList from './ThreadList';

export default function Forum({ forum_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const { addNewThread, getForum,forum , error, loading } = useForum();
  const { addNewTicket } = useTicket();
  const [message,setMessage] = useState()

  useEffect(() => {
    // Fetch forum data when component mounts
    getForum(forum_id);
  }, [forum_id]);


  const handleNewDiscussion = () => {
      const thread = {
       content: message,
       forum: forum_id, 
       creator: 2 // current user 
      }
       addNewThread(thread)
  }

  const handleNewTicket = () => {
    const ticket = {
      issue: "My new issue",
      api_id: 1,
      created_by: 1,
  }
   addNewTicket(ticket)
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
        <div class="product-button">
          <a href="#" data-toggle="modal" data-target="#popup_bid" class="tf-button"> <span class="icon-btn-product"></span>New Discussion</a>
        </div>
          {/* <Button onClick={onOpen}>New Discution</Button> */}
          <Button onClick={handleNewTicket}>  New Ticket </Button>
        </HStack> 
        <Box>
          <ThreadList key={forum_id} forum_id={forum_id}/>
        </Box>
       </Flex>

  {/*************************modal to create new conversation **************************/}
    <div class="modal fade popup" id="popup_bid" tabindex="-1" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body space-y-20 pd-40">
                    <h3>Ajouter une nouvelle discussion</h3>
                    <br /> 
                    <label htmlFor="">Message</label>
                    <input type="text" class="form-control" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value) } />
                      <br />
                    <a onClick={handleNewDiscussion} class="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Save</a>
                </div>
            </div>
        </div>
   </div>
 
      </>
  );
}
