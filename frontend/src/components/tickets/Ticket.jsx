import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useTicket from '../../hooks/useTicket';
import parse from 'html-react-parser';
import formatTime from '../../utils/formatTime';
import { Flex } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuthContext } from '../../context/authContext';
import Response from './Response';


export default function Ticket({ ticket_id, onTicketClick }) {
    const { getTicketResponses, addTicketResponse, openTicket, closeTicket, getTicket, responses, ticket, error, loading } = useTicket();
    const [response, setResponse] = useState('');
    const { authState } = useAuthContext()


    useEffect(() => {
        const fetchData = async () => {
            try {
                await getTicket(ticket_id);
                await getTicketResponses(ticket_id);
            } catch (error) {
                console.error("Error fetching Ticket details:", error);
            }
        };
        fetchData();
    }, [ticket_id]);


    const handleResponseChange = (value) => {
        setResponse(value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const ticketResponse = {
            ticket: ticket_id,
            created_by: authState.userId,
            response_text: response
        };

        try {
            await addTicketResponse(ticket_id, ticketResponse);
        } catch (error) {
            console.error('Error submitting ticket:', error);

        }
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
                                    <h4 className="title">{ticket?.title}</h4>
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
                                    <h6 className="widget-title">{ticket.num_responses} Responses</h6>
                                    <div className='history-filter'>
                                        <div className='history-content'>
                                            <div className='inner tf-filter-container'>
                                                <div className="history-content">

                                                    <div className='history-filter'>
                                                        <div className='history-content'>
                                                            <div className='inner tf-filter-container'>
                                                                <div className="history-content">
                                                                    

                                                                    {responses.map(res => (
                                                                        <Response key={res.id} response={res} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div id="comments">
                                    <h5 className="heading">Add a response</h5>
                                    <form onSubmit={handleFormSubmit}
                                        id="commentform" className="comment-form">
                                        <fieldset className="message">
                                            <ReactQuill
                                                theme='snow'
                                                placeholder="Enter your response"
                                                value={response}
                                                onChange={handleResponseChange}
                                            />  </fieldset>
                                        <div className="btn-submit mg-t-36"><button className="tf-button" type="submit">Send comment</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                            <div className="side-bar">
                                <div className="widget widget-tag ">
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
