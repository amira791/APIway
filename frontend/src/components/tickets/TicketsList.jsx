import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import { Button, Flex, Box } from '@chakra-ui/react'; // Assuming Box from Chakra-UI for wrapping individual tickets
import { Link } from 'react-router-dom';
import useTicket from '../../hooks/useTicket';

export default function TicketsList({api_id}) {
  const { getAPITickets, tickets } = useTicket();

  useEffect(() => {
    console.log(api_id);
    getAPITickets(api_id);
  }, [api_id]);

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
