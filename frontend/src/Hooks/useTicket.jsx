import  { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {BASEURL,fetchData, postData } from './API';
import { useAuthContext } from '../context/authContext';

export default function useTicket() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [apiTickets,setAPITickets] = useState([])
    const {authState} = useAuthContext();
    const token = authState.token;

    const getAPITickets = (id) => {
        fetchData(`${BASEURL}apis/${id}/tickets/`, setAPITickets, setLoading, setError,token);
    };

    const getTickets = () => {
        fetchData(`${BASEURL}tickets/`, setTickets, setLoading, setError);
    };

    const getTicket = (id) => {
        fetchData(`${BASEURL}tickets/${id}/`, setTicket, setLoading, setError);
    };

    const addNewTicket = (new_ticket) => {
        postData(`${BASEURL}tickets/`, new_ticket, {
            title: 'Ticket ajoute',
            description: 'Le Ticket a ete ajoute avec succes',
        }, toast, setError,token);
    };

    return {
        addNewTicket,
        getAPITickets,
        getTickets,
        getTicket,
        ticket,
        tickets,
        apiTickets,
        loading,
        error
    };
}
