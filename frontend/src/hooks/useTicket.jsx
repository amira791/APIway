import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function useTicket() {
    const toast = useToast();
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Initialize error state with null
    const [tickets, setTickets] = useState([]);

    const fetchData = async (url, setter) => {
        setLoading(true);
        setError(null); // Clear any previous error
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setter(result);
        } catch (error) {
            setError(error.message); // Set the actual error message
        } finally {
            setLoading(false);
        }
    };
    
    const getAPITickets = (id) => {
        fetchData(`http://localhost:8000/api_mapi/apis/${id}/tickets/`, setTickets);
    };

    const addNewTicket = (ticket) => {
        fetch('http://localhost:8000/api_mapi/tickets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket),
        })
        .then(() => {
            toast({
                title: 'Discussion ajoutee',
                description: "La discussion a ete ajoutee avec succes",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        })
        .catch((error) => {
            setError(error);
            toast({
                title: 'Une erreur est survenue',
                description: error.message,
                status: 'error',
                duration: 5000,
            });
        });
    };

    return {
        addNewTicket,
        getAPITickets,
        tickets
    };
}
