import { useState , useEffect} from 'react';
import axios from 'axios';
import { BASEURL ,fetchData } from './API'

export default function useManageAccountsC() {
    const [consommateurs, setConsommateurs] = useState([]);
    const [consommateur, setConsommateur] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASEURL}consommateurs/`)
            .then(response => {
                setConsommateurs(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    
    const activateStatus = async (userId) => {
        try {
          const response = await axios.post(`${BASEURL}/activate/${userId}/`, {
            type: "C" // Include user type in the request body
          });
          console.log(response.data.message);
    
          fetchConsomsData();
        } catch (error) {
          console.error('Error activating status:', error);
          setError(error); // Update error state for UI display
        }
    };
    
    const deactivateStatus = async (userId) => {
        try {
          const response = await axios.post(`${BASEURL}deactivate/${userId}/`, {
            type: "C" // Include user type in the request body
          });
           console.log(response.data.message);
    
           fetchConsomsData();
        } catch (error) {
          console.error('Error deactivating status:', error);
          setError(error); // Update error state for UI display
        }
    };



    const fetchConsomsData = () => {
        axios.get(`${BASEURL}consommateurs/`)
            .then(response => {
                console.log('Fetched Data:', response.data);
                setConsommateurs(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
            });
    };

    const getConsommateur = (id) => {
      fetchData(`${BASEURL}consommateurs/byuser/${id}/`, setConsommateur, setLoading, setError);
  };

    return {
        consommateurs,
        consommateur,
        loading,
        error,
        activateStatus,
        deactivateStatus,
        fetchConsomsData,
        getConsommateur
    };
}
