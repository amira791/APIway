import React, { useEffect, useState } from 'react';
import { NavLink , useParams } from 'react-router-dom';
import useTicket from '../../hooks/useTicket';
import parse from 'html-react-parser';
import formatTime from '../../utils/formatTime';
import { Flex } from '@chakra-ui/react'
import { ChevronLeftIcon, TimeIcon } from '@chakra-ui/icons'

export default function Ticket({ ticket_id, onTicketClick }) {
    // const { ticket_id } = useParams();
    const { getTicket, ticket, error, loading } = useTicket();

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
    const [message, setMessage] = useState();

    const handleFormSubmit = (e) => {


        e.preventDefault(); // Prevent default form submission behavior

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
                > <ChevronLeftIcon /> Back to all tickets</NavLink>

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
                                        </div>

                                    </div>
                                </div>

                                <div className="content-inner">
                                    {parse(issueContent)}
                                </div>



                                <div className="content-bottom">
                                    <div className="widget widget-socical">
                                        <h6 className="widget-title">Share:</h6>
                                        <ul>
                                            <li><a href="#" className="icon-fl-mess"></a></li>
                                            <li><a href="#" className="icon-fl-coolicon"></a></li>
                                            <li><a href="#" className="icon-fl-facebook"></a></li>
                                        </ul>

                                    </div>
                                    <div className="widget widget-tag">
                                        <h6 className="widget-title">Tags:</h6>
                                        <ul>
                                            <li><a href="#" >Bitcoin,</a></li>
                                            <li><a href="#" >Token,</a></li>
                                            <li><a href="#" >Wallet</a></li>
                                        </ul>
                                    </div>
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
                                        <div className="btn-submit"><button className="tf-button" type="submit">Send comment</button></div>
                                    </form>
                                </div>
                            </div>
                            <div className="side-bar">
                                <div className="widget widget-recent-post">
                                    <h6 className="widget-title">Recent Post</h6>
                                    <ul>
                                        <li>
                                            <div className="post-img">
                                                <img src="assets/images/blog/recent-post-5.jpg" alt="Post New" />
                                            </div>
                                            <div className="post-content">
                                                <h6 className="title"><a href="blog-details.html">6 Make Mobile Website Faster </a></h6>
                                                <div className="post-meta">
                                                    <span>Lorem ipsum dolor sit amer....</span>
                                                    <span>August 10, 2021</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="post-img">
                                                <img src="assets/images/blog/recent-post-6.jpg" alt="Post New" />
                                            </div>
                                            <div className="post-content">
                                                <h6 className="title"><a href="blog-details.html">6 Make Mobile Website Faster </a></h6>
                                                <div className="post-meta">
                                                    <span>Lorem ipsum dolor sit amer....</span>
                                                    <span>August 10, 2021</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="post-img">
                                                <img src="assets/images/blog/recent-post-7.jpg" alt="Post New" />
                                            </div>
                                            <div className="post-content">
                                                <h6 className="title"><a href="blog-details.html">6 Make Mobile Website Faster </a></h6>
                                                <div className="post-meta">
                                                    <span>Lorem ipsum dolor sit amer....</span>
                                                    <span>August 10, 2021</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="post-img">
                                                <img src="assets/images/blog/recent-post-8.jpg" alt="Post New" />
                                            </div>
                                            <div className="post-content">
                                                <h6 className="title"><a href="blog-details.html">6 Make Mobile Website Faster </a></h6>
                                                <div className="post-meta">
                                                    <span>Lorem ipsum dolor sit amer....</span>
                                                    <span>August 10, 2021</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget widget-tag ">
                                    <h6 className="widget-title">Popular Tag</h6>
                                    <ul>
                                        <li><a href="#">Bitcoin</a></li>
                                        <li><a href="#">NFT</a></li>
                                        <li><a href="#">Bids</a></li>
                                        <li><a href="#">Digital</a></li>
                                        <li><a href="#">Arts</a></li>
                                        <li><a href="#">Maketplace</a></li>
                                        <li><a href="#">Token</a></li>
                                        <li><a href="#">Wallet</a></li>
                                        <li><a href="#">Crypto</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </Flex>
        </>
    );
}
