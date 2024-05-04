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
    const [posts, setPosts] = useState([]);
    const [thread, setThread] = useState([]);

    
    const getForum = (id) => {
        fetchData(`${BASEURL}apiforum/${id}/`, setForum, setLoading, setError);
    };

    const getForumThreads = (id) => {
        fetchData(`${BASEURL}apiforum/${id}/threads/`, setThreads, setLoading, setError);
    };

    const getThreadPosts = (id) => {
        fetchData(`${BASEURL}threads/${id}/comments/`, setPosts, setLoading, setError);
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

    const addNewPost = (new_post) => {
        postData(`${BASEURL}comments/`, new_post, {
            title: 'Comment ajoute',
            description: 'Le comment a ete ajoute avec succes',
        }, toast, setError);
    };

    return {
        addNewThread,
        addNewPost,
        getForum,
        getForumThreads,
        getThread,
        getThreadPosts,
        forum,
        threads,
        thread,
        posts,
        error,
        loading,
    };
}
