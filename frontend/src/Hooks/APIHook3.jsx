import { useState, useEffect } from 'react';
import { BASEURL,ConsumerBASEURL,fetchData, postData } from './API';
import axios from 'axios';
import { useAuthContext } from '../context/authContext';


export default function useApi() {
    const [APIs, setAPIs] = useState([]);
    const [Api, setApi] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [functionalities, setFunctionalities] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const {authState} = useAuthContext();
    const token = authState.token;

    useEffect(() => {
        fetchData(`${BASEURL}apis/`,setAPIs,setLoading,setError)
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchData(`${BASEURL}functionnalities/`,setFunctionalities,setLoading,setError)
    }, []);

    
    
    const fetchApi = async (id) => {
        try {
            const response = await axios.get(`${BASEURL}apis/${id}/`);
            console.log('Fetched Data:', response.data);
            setApi(response.data);
            console.log('Api:', Api);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        }
    };
    
    const fetchApis = () => {
        axios.get(`${BASEURL}apis/`)
            .then(response => {
                const visibleAPIs = response.data.filter(api => api.visibility === true);
                console.log('Fetched Data:', visibleAPIs);
                setAPIs(visibleAPIs);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            });
    };
    
    
    const fetchApiCategories = () => {
        axios.get(`${BASEURL}apicategories/`)
            .then(response => {
                console.log('Fetched Data:', response.data);
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            });
    };

    const fetchApiSearchResults = (queryParams) => {
        axios.post(`${ConsumerBASEURL}api/search/`, queryParams)
            .then(response => {
                const visibleAPIs = response.data.filter(api => api.visibility === true);
                console.log('QueryParams:', queryParams);
                console.log('Fetched Searched APIs:', response.data);
                setSearchResults(visibleAPIs);
            })
    
            .catch(error => {
                console.error('Error fetching search results:', error);
                setError(error);
            });
    };
        const fetchAPIVersions =  (sortby) => {
            axios.post(`${BASEURL}api/versions/`, sortby )
    
                .then(response => {
                    console.log('sortBy:', sortby);
                    console.log('Fetched Searched APIs:', response.data);
                    setSearchResults(response.data);
                })
        
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setError(error);
                });
               
    };

    const fetchApiFunctions = async (apiId) => {
        try {
            const response = await fetch(`${BASEURL}api/functions/${apiId}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch API functions');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching API functions:', error.message);
            return null;
        }
    };

    const fetchApiSuggestions = (query, suggestionType) => {
        let filteredSuggestions = [];
        switch (suggestionType) {
            case 'Name':
                filteredSuggestions = APIs.filter(api => api.api_name.toLowerCase().includes(query.toLowerCase()));
                break;
            case 'Description':
                filteredSuggestions = APIs.filter(api => api.description.toLowerCase().includes(query.toLowerCase()));
                break;
            case 'Functionalities':
                filteredSuggestions = functionalities.filter(func => func.functName.toLowerCase().includes(query.toLowerCase()));
                break;
            default:
                break;
        }

        setSuggestions(filteredSuggestions);
    };

    return {
        searchResults,
        Categories,
        APIs,
        functionalities,
        suggestions,
        fetchApis,
        setSearchResults,
        fetchApiCategories,
        fetchApiSearchResults,
        fetchAPIVersions,
        fetchApiSuggestions,
        fetchApiFunctions
    };
}