import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTicket from '../../hooks/useTicket';
import { useAuthContext } from '../../context/authContext';

export default function TicketsList({ ticket_id, onTicketClick }) {
  const {  getProviderTickets, tickets, error, loading } = useTicket();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { authState } = useAuthContext();


  useEffect(() => {
    getProviderTickets(authState.userId);
  }, [authState.userId]);

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
              <a href="#" class="bookmark">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9" />
                </svg>
              </a>
              <Link to="#" onClick={() => onTicketClick(ticket.ticket_id)} className="name">
                {ticket.title}
              </Link>
            </div>
          </div>
          <div className="col-rankingg coin">
            <img src={ticket.api_info?.logo} alt="images" id="circular-image"  />
            {ticket.api_info?.api_name}
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
