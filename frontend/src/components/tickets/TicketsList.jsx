import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import { Button, Flex, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useTicket from '../../hooks/useTicket';

export default function TicketsList({ api_id }) {
  const { getTickets ,getAPITickets, tickets,apiTickets, error, loading } = useTicket();

  useEffect(() => {
    // console.log(api_id);
    // getAPITickets(api_id);
    getTickets()
  }, [api_id]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message if an error occurs
  }

  return (
    <div>
      <Flex direction="column">
        {tickets.map((ticket, index) => (
          <Box key={index} border="1px solid #ccc" p="4" mb="4">
            <h3>{ticket.title}</h3>
            {parse(ticket.issue)}
          </Box>
        ))}
      </Flex>
    </div>
  );
}
