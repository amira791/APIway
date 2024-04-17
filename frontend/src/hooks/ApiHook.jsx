import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApi() {
    const [APIs, setAPIs] = useState([]);
    const [Api, setApi] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [functionalities, setFunctionalities] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

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

    useEffect(() => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/functionnalities/')
            .then(response => {
                setFunctionalities(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    
    
    const fetchApi = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/apis/${id}/`);
            console.log('Fetched Data:', response.data);
            setApi(response.data);
            console.log('Api:', Api);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        }
    };
    

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

    const fetchApiSearchResults = (queryParams) => {
    axios.post('http://127.0.0.1:8000/api/search/', queryParams)
        .then(response => {
            console.log('QueryParams:', queryParams);
            console.log('Fetched Searched APIs:', response.data);
            setSearchResults(response.data);
        })

        .catch(error => {
            console.error('Error fetching search results:', error);
            setError(error);
        });
};
    const fetchAPIVersions =  (sortby) => {
        axios.post('http://127.0.0.1:8000/api/versions/', sortby )

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
    const fetchApiSuggestions = (query, suggestionType) => {
        let filteredSuggestions = [];
        console.log("Query",query);
        console.log("suggestionType",suggestionType);
        console.log("APIs",APIs);
        switch (suggestionType) {
            case 'Name':
                
                filteredSuggestions = APIs.filter(api => api.api_name.toLowerCase().includes(query.toLowerCase()));
                console.log("filteredSuggestions",filteredSuggestions);
                break;
            case 'Description':
                filteredSuggestions = APIs.filter(api => api.description.toLowerCase().includes(query.toLowerCase()));
                console.log("filteredSuggestions",filteredSuggestions);
                break;
            case 'Functionalities':
                filteredSuggestions = functionalities.filter(func => func.functName.toLowerCase().includes(query.toLowerCase()));
                console.log("filteredSuggestions",filteredSuggestions);
                break;
            default:
                break;
        }

        setSuggestions(filteredSuggestions);
};


    return {
        searchResults,
        Categories,
        Api,
        APIs,
        functionalities,
        suggestions,
        fetchApi,
        setSearchResults,
        fetchApiCategories,
        fetchApiSearchResults,
        fetchAPIVersions,
        fetchApiSuggestions
    };
}
