import { useState, useEffect} from "react";

import API from '../API'

export default function ManipulateTypes() {
    const [types, setTypes] = useState([]);

    const [error, setError] = useState(null);
    
    const getTypes = () =>  {
   
      API.get(`/types_param/`).then((res) =>
        {
          console.log(res.data);
          setTypes(res.data);
         
        })
        .catch((error) => {
          setError(error);
         
        });
    };
    useEffect(() => {
        getTypes();
    }, []);
    return {
      types: types || [],
  
      error,
    };
}