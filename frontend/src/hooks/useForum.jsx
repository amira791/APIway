import { useState } from 'react';
import API from '../API';

export default function useForum() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [forum, setForum] = useState(null);
  const [threads, setThreads] = useState(null);

  const getForum = (id) => {
    setLoading(true);
    setError(false);
  
    fetch(`http://127.0.0.1:8000/api_mapi/apiforum/` + id + '/', {method: 'GET'})
      .then((response) => response.json())
      .then((result) => {
        setForum(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const getForumThreads = (id) => {
    setLoading(true);
    setError(false);
  
    fetch(`http://127.0.0.1:8000/api_mapi/apiforum/thread/` + id + '/', {method: 'GET'})
      .then((response) => response.json())
      .then((result) => {
        setThreads(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    getForum,
    getForumThreads,
    forum,
    threads,
    error,
    loading,
  };
}
