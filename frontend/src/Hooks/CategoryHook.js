import { useState, useEffect} from "react";

import API from '../API'

export default function ManipulateCat() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const getCategories = () =>  {
      setLoading(true);
      API.get(`/apicategories/`).then((res) =>
        {
          console.log(res.data);
          setCategories(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };
    useEffect(() => {
        getCategories();
    }, []);
    return {
      categories: categories || [],
      loading,
      error,
    };
}