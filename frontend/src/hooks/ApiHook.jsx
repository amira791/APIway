import { useState, useEffect } from 'react';
import { BASEURL,fetchData, postData } from './API';

export default function useApi() {
    const [APIs, setAPIs] = useState([]);
    const [Api,setAPI] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [functionalities, setFunctionalities] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    
    useEffect(() => {
        fetchData(`${BASEURL}apis/`,setAPIs,setLoading,setError)
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchData(`${BASEURL}functionnalities/`)
            .then(data => {
                setFunctionalities(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const fetchApi =(id)=>{
        fetchData(`${BASEURL}apis/${id}/`,setAPI,setLoading,setError)
    }
    const fetchApiCategories = () => {
        fetchData(`${BASEURL}apicategories/`,setCategories,setLoading,setError)
    };

    const fetchApiSearchResults = (queryParams) => {
        postData(`${BASEURL}api/search/`, queryParams, {}, setSearchResults, setError);
    };

    const fetchAPIVersions = (sortby) => {
        postData(`${BASEURL}api/versions/`, sortby, {}, setSearchResults, setError);
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
        Api,
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
