import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { fetchData, postData } from './API';
import{BASEURL} from './API'

export default function useForum() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [forum, setForum] = useState([]);
    const [threads, setThreads] = useState([]);
    const [comments, setComments] = useState([]);
    const [thread, setThread] = useState([]);

    
    const getForum = (id) => {
        fetchData(`${BASEURL}apis/${id}/forum/`, setForum, setLoading, setError);
    };

    const getForumThreads = (id) => {
        fetchData(`${BASEURL}apiforum/${id}/threads/`, setThreads, setLoading, setError);
    };

    const getThreadComments = (id) => {
        fetchData(`${BASEURL}threads/${id}/comments/`, setComments, setLoading, setError);
    };

    const getThread = (id) => {
        fetchData(`${BASEURL}threads/${id}/`, setThread, setLoading, setError);
    };

    const addNewThread = (new_thread) => {
        postData(`${BASEURL}threads/`, new_thread, {
            title: 'Discussion ajoutee',
            description: 'La discussion a ete ajoutee avec succes',
        }, toast, setError);
    };

    const addNewComment = (new_comment) => {
        postData(`${BASEURL}comments/`, new_comment, {
            title: 'Comment ajoute',
            description: 'Le comment a ete ajoute avec succes',
        }, toast, setError);
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
