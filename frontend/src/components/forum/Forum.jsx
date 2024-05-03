import React, { useEffect,  useState } from 'react';
import {Link} from'react-router-dom'
import { Flex, Box  , Heading , Text , HStack  
} from '@chakra-ui/react'
import useForum from '../../hooks/useForum';
import ThreadList from './ThreadList';

export default function Forum({ forum_id }) {

  const { addNewThread, getForum,forum , error, loading } = useForum();

  const [message,setMessage] = useState()

  useEffect(() => {
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
        <div className="product-button">
          <a href="#" data-toggle="modal" data-target="#popup_bid" className="tf-button"> <span className="icon-btn-product"></span>New Discussion</a>
        </div>
        <div className="product-button">
        <Link to={'/tickets/new'} className="tf-button"><span className="icon-btn-product"></span>New ticket </Link>
        </div>
       
        </HStack> 
        <Box>
          <ThreadList key={forum_id} forum_id={forum_id}/>
        </Box>
       </Flex>

  {/*************************modal to create new conversation **************************/}
    <div className="modal fade popup" id="popup_bid" tabIndex="-1" aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-body space-y-20 pd-40">
                    <h3>Ajouter une nouvelle discussion</h3>
                    <br /> 
                    <label htmlFor="">Message</label>
                    <input type="text" className="form-control" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value) } />
                      <br />
                    <a onClick={handleNewDiscussion} className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Save</a>
                </div>
            </div>
        </div>
   </div>
 
      </>
  );
}
