import  { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { BASEURL ,fetchData, postData } from './API';
import { useAuthContext } from '../context/authContext';

export default function useForum() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [forum, setForum] = useState([]);
    const [threads, setThreads] = useState([]);
    const [comments, setComments] = useState([]);
    const [thread, setThread] = useState([]);
    const {authState} = useAuthContext();
    const token = authState.token;
    
    const getForum = (id) => {
        fetchData(`${BASEURL}apiforum/${id}/`, setForum, setLoading, setError,token);
    };

    const getForumThreads = (id) => {
        fetchData(`${BASEURL}apiforum/${id}/threads/`, setThreads, setLoading, setError,token);
    };

    const getThreadComments = (id) => {
        fetchData(`${BASEURL}threads/${id}/comments/`, setComments, setLoading, setError,token);
    };

    const getThread = (id) => {
        fetchData(`${BASEURL}threads/${id}/`, setThread, setLoading, setError,token);
    };

    const addNewThread = (new_thread) => {
        postData(`${BASEURL}threads/`, new_thread, {
            title: 'Discussion ajoutee',
            description: 'La discussion a ete ajoutee avec succes',
        }, toast, setError,token);
    };

    const addNewComment = (new_comment) => {
        postData(`${BASEURL}comments/`, new_comment, {
            title: 'Comment ajoute',
            description: 'Le comment a ete ajoute avec succes',
        }, toast, setError,token);
    };

    return {
        addNewThread,
        addNewComment,
        getForum,
        getForumThreads,
        getThread,
        getThreadComments,
        forum,
        threads,
        thread,
        comments,
        error,
        loading,
    };
}
