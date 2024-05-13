import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Box, Heading, Text, HStack } from '@chakra-ui/react';
import useForum from '../../hooks/useForum';
import ThreadList from './ThreadList';
import { useAuthContext } from '../../context/authContext';
import useManageAccountsC from '../../hooks/ConsomAccountsHook';

export default function Forum({ forum_id }) {
  const { addNewThread, getForum, forum, error: forumError, loading: forumLoading } = useForum();
  const { authState } = useAuthContext();
  const user_id = authState.userId;
  const [message, setMessage] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // State to control login prompt
  const [loading, setLoading] = useState(true); // Component-level loading state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        await getForum(forum_id);
        setLoading(false); // Set loading to false after data fetching is complete
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state here
      }
    }

    fetchData();
  }, [forum_id]);

  const handleNewDiscussion = () => {
    if (authState.isAuth) {
      const thread = {
        content: message,
        forum: forum_id,
        creator: user_id,
      };
      console.log(thread)
      addNewThread(thread);
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  if (forumError) {
    return <div>Error: {forumError}</div>; // Display error message if an error occurs
  }

  return (
    <>
      <Flex margin={50} flexDirection={'column'}>
        <Box>
          <Heading>{forum.title}</Heading>
          <Text>{forum.description}</Text>
        </Box>
        {authState.isConsommateur && ( <HStack alignSelf={'flex-end'}>
          <div className="product-button">
            <a href="#" data-toggle="modal" data-target="#popup_bid" className="tf-button">
              <span className="icon-btn-product"></span>New Discussion
            </a>
          </div>
          <div className="product-button">
          {authState.isAuth ? (
              <Link to={'/tickets/new'} className="tf-button">
                <span className="icon-btn-product"></span>New ticket
              </Link>
            ) : (
              <a
                href="#"
                data-toggle="modal"
                data-target="#login_modal"
                className="tf-button"
                onClick={() => setShowLoginPrompt(true)}
              >
                <span className="icon-btn-product"></span>New ticket
              </a>
            )}
          </div>
        </HStack>
        )}
        <Box>
          <ThreadList key={forum.id_forum} forum_id={forum_id} />
        </Box>
      </Flex>

      {/* Modal for new discussion */}
      <div className="modal fade popup" id="popup_bid" tabIndex="-1" aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body space-y-20 pd-40">
              <h3>Ajouter une nouvelle discussion</h3>
              <br />
              <label htmlFor="">Message</label>
              <input
                type="text"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <br />
              {authState.isAuth ? (
                <a
                  onClick={handleNewDiscussion}
                  className="button-popup"
                  data-toggle="modal"
                  data-target="#popup_bid_success"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Save
                </a>
              ) : (
                <a href="#" data-toggle="modal" data-target="#login_modal" className="button-popup">
                  Save
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for login */}
      <div className="modal fade popup" id="login_modal" tabIndex="-1" aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body space-y-20 pd-40">
              {showLoginPrompt && (
                <>
                  <h3>Oops!</h3>
                  <p className="text-center sub-heading">
                    You must log in <span className="price color-popup">to purchase</span>
                  </p>
                  <a className="button-popup" onClick={handleLoginRedirect}>
                    Log In
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
