import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useTicket from '../../hooks/useTicket';
import parse from 'html-react-parser';
import formatTime from '../../utils/formatTime';
import { Flex } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';


export default function Ticket({ ticket_id, onTicketClick }) {
    const { openTicket ,closeTicket ,getTicket, ticket, error, loading } = useTicket();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getTicket(ticket_id);
            } catch (error) {
                console.error("Error fetching Ticket details:", error);
            }
        };
        fetchData();
    }, [ticket_id]);

    const [message, setMessage] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault(); 
    };

    const handleToggleStatus = async (e) => {
        e.preventDefault();
        if (ticket.status === 'open') {
            await closeTicket(ticket_id);
        } else {
            await openTicket(ticket_id);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message if an error occurs
    }

    // Ensure ticket.issue is a string before parsing it
    const issueContent = ticket?.issue ? ticket.issue : '';

    return (
        <>
            <Flex flexDirection='column' justifyContent='flex-start' m={30}>
                <NavLink
                    to="#"
                    onClick={() => onTicketClick(null)}
                    display="list-item"
                    place-items="center"
                    padding-left="1px"
                    margin="10px"
                >
                    <ChevronLeftIcon /> Back to all tickets
                </NavLink>

                <section className="tf-blog">
                    <div className="tf-container">
                        <div className="detail-wrap">
                            <div className="detail-inner">
                                <div className="content-top">
                                    <Flex alignItems="center">
                                        <h4 className="title">{ticket?.title}</h4>
                                        
                                    </Flex>

                                    <div className="meta-blog">
                                        <div className="meta">
                                            <h6>API</h6>
                                            <p>{ticket.api_info?.api_name}</p>
                                            
                                        </div>
                                      
                                        <div className="meta meta-right">
                                            <div className="meta-inner">
                                                <h6>WRITER</h6>
                                                <p>{ticket.user_info?.user.last_name} {ticket.user_info?.user.first_name}</p>
                                            </div>
                                            <div className="meta-inner">
                                                <h6>DATE</h6>
                                                <p>{formatTime(ticket.created_at)}</p>
                                            </div>
                                            <div className="meta-inner">
                                                <span className={`status-badge status-${ticket?.status}`}>
                                                {ticket?.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="content-inner">
                                    {parse(issueContent)}
                                </div>
                                
                                <div id="comments">
                                    <h5 className="heading">Leave A Comment</h5>
                                    <form onSubmit={handleFormSubmit} method="post" id="commentform" className="comment-form">
                                        <fieldset className="message">
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                id="message" name="message" rows="4" placeholder="Message" tabIndex="4" aria-required="true" required="" />
                                        </fieldset>
                                        <div className="btn-submit">
                                            <button className="tf-button" type="submit">Send comment</button>
                                        </div>
                                    </form>
                                </div> 
                            </div>
                            <div className="side-bar">
                                <div className="widget widget-recent-post">
                                <button className="tf-button" onClick={handleToggleStatus}>
                                            {ticket.status === 'open' ? 'Close Ticket' : 'Open Ticket'}
                                </button>
                                </div>
                              
                    </div>
                        </div>
                    </div>
                 

                </section>
            </Flex>
        </>
    );
}
