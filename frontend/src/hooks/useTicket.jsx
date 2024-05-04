import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {BASEURL,fetchData, postData } from './API';

export default function useTicket() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tickets, setTickets] = useState([]);

    const getAPITickets = (id) => {
        fetchData(`${BASEURL}apis/${id}/tickets/`, setTickets, setLoading, setError);
    };

    const addNewTicket = (new_ticket) => {
        postData(`${BASEURL}tickets/`, new_ticket, {
            title: 'Ticket ajoute',
            description: 'Le Ticket a ete ajoute avec succes',
        }, toast, setError);
    };

    return {
        addNewTicket,
        getAPITickets,
        tickets,
        loading,
        error
    };
}
