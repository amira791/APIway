import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Button, Flex, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useTicket from '../../hooks/useTicket';

export default function TicketsList() {
  const { getTickets, getAPITickets, tickets, apiTickets, error, loading } = useTicket();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getTickets();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message if an error occurs
  }

  // Calculate the tickets to display based on the current page
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {currentTickets.map((ticket, index) => (
        <div className="content-ranking" key={index}>
          <div className="col-rankingg">
            <div className="box-product-favorite">
              <a href="#" className="name">{ticket.title}</a>
            </div>
          </div>
          <div className="col-rankingg coin">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.0138 5.65275C15.2277 5.65275 14.5905 6.29113 14.5905 7.07865V8.21954H19.2162V12.5686H14.5193V14.4223C14.5193 17.848 11.7474 20.625 8.32802 20.625C4.90869 20.625 2.13672 17.848 2.13672 14.4223C2.13672 10.9966 4.90869 8.21954 8.32802 8.21954H10.3206V7.07865C10.3206 3.92866 12.8695 1.375 16.0138 1.375H21.3867V5.65275H16.0138ZM10.3203 8.25586V12.5694H14.519V8.25586H10.3203ZM6.40625 14.423C6.40625 13.3598 7.26655 12.498 8.32767 12.498H10.2492V14.423C10.2492 15.4862 9.38889 16.348 8.32767 16.348C7.26655 16.348 6.40625 15.4862 6.40625 14.423Z" fill="#03DB80" />
            </svg>{ticket.api_info?.api_name}
          </div>
          <div className="col-rankingg">
            <div className="author-pd">
              <div className="avatar">
                <img src="assets/images/author/user.png" alt="images" />
              </div>
              <a href="#" className="name">{ticket.user_info?.user.username}</a>
            </div>
          </div>
          <div className="col-rankingg">{ticket.status}</div>
          <div className="dot"><a href="#"><i className="far fa-ellipsis-h"></i></a></div>
        </div>
      ))}

      <div className="pagination-container">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={() => paginate(number)} href="#" className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
