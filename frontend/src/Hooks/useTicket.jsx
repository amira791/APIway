import  { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {BASEURL,fetchData, postData } from './API';
import { useAuthContext } from '../context/authContext';

export default function useTicket() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [allTickets,setAllTickets] = useState([]);
    const [ticket, setTicket] = useState([]);
    const {authState} = useAuthContext();
    const token = authState.token;

    const getProviderTickets = (id) => {
        fetchData(`${BASEURL}tickets/byprovider/${id}/`, setTickets, setLoading, setError,token);
    };

    const getTickets = () => {
        fetchData(`${BASEURL}tickets/`, setAllTickets, setLoading, setError);
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
    const closeTicket = (id)=>{
        postData(`${BASEURL}tickets/close/${id}/`, null, {
            title: 'Ticket ajoute',
            description: 'Le Ticket a ete ajoute avec succes',
        }, toast, setError,token);
    }

    const openTicket = (id) =>{
        postData(`${BASEURL}tickets/open/${id}/`, null, {
            title: 'Ticket ajoute',
            description: 'Le Ticket a ete ajoute avec succes',
        }, toast, setError,token);
    }

    return {
        addNewTicket,
        closeTicket,
        openTicket,
        getProviderTickets,
        getTickets,
        getTicket,
        ticket,
        allTickets,
        tickets,
        loading,
        error
    };
}
