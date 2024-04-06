import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApi() {
    const [APIs, setAPIs] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/apis/')
            .then(response => {
                setAPIs(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const fetchApiCategories = () => {
        axios.get('http://127.0.0.1:8000/apicategories/')
            .then(response => {
                console.log('Fetched Data:', response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            });
    };

    const fetchApiSearchResults =  (queryParams) => {
       
        axios.post('http://127.0.0.1:8000/api/search/', queryParams)
        .then(response => {
            console.log('Fetched Searched APIs:', response.data);
            setSearchResults(response.data);
        })
            
        .catch(error => {
            console.error('Error fetching search results:', error);
            setError(error);
        });
    };
   

    return {
        searchResults,
        Categories,
        APIs,
        setSearchResults,
        fetchApiCategories,
        fetchApiSearchResults
    };
}
