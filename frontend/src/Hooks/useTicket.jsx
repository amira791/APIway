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
    const [responses,setResponses] = useState([]);
    const {authState} = useAuthContext();
    const token = authState.token;

    const getProviderTickets = (id) => {
        fetchData(`${BASEURL}tickets/byprovider/${id}/`, setTickets, setLoading, setError,token);
    };

    const getConsumerTickets = (id) => {
        fetchData(`${BASEURL}tickets/byconsumer/${id}/`, setTickets, setLoading, setError,token);
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

    const changeTicketStatus = (id , status) =>{
        postData(`${BASEURL}tickets/${id}/status/`, {status : status}, {
            title: 'Ticket ajoute',
            description: 'Le Ticket a ete ajoute avec succes',
        }, toast, setError,token);
    }

    const addTicketResponse = (id ,response)=>{
        postData(`${BASEURL}tickets/${id}/responses/`, response, {
            title: 'Ticket ajoute',
            description: 'Le Ticket a ete ajoute avec succes',
        }, toast, setError,token);
    }

    const getTicketResponses = (id) =>{
        fetchData(`${BASEURL}tickets/${id}/responses/`, setResponses, setLoading, setError);
    }
    return {
        addNewTicket,
        closeTicket,
        openTicket,
        changeTicketStatus,
        addTicketResponse,
        getTicketResponses,
        getProviderTickets,
        getConsumerTickets,
        getTickets,
        getTicket,
        ticket,
        allTickets,
        tickets,
        responses,
        loading,
        error
    };
}
