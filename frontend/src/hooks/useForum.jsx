import React, { useState } from 'react';
import API from '../API';

export default function useForum() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Initialize error state with null
  const [forum, setForum] = useState([]);
  const [threads, setThreads] = useState([]);
  const [posts, setPosts] = useState([]);
  const [thread, setThread] = useState([]);

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

  const getForum = (id) => {
    fetchData(`http://127.0.0.1:8000/api_mapi/apiforum/${id}/`, setForum);
  };

  const getForumThreads = (id) => {
    fetchData(`http://127.0.0.1:8000/api_mapi/apiforum/${id}/threads/`, setThreads);
  };

  const getThreadPosts = (id) => {
    fetchData(`http://127.0.0.1:8000/api_mapi/threads/${id}/posts/`, setPosts);
  };

  const getThread = (id)=>{
    fetchData(`http://127.0.0.1:8000/api_mapi/threads/${id}/`, setThread);
  };
  

  return {
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
