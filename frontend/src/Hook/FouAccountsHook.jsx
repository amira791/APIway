import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASEURL } from '../hooks/API';

export default function useManageAccountsF() {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFournisseursData();
    }, []);

    const fetchFournisseursData = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await axios.get(`${BASEURL}fournisseurs/`);
            console.log('Fetched Data Fournisseur:', response.data);
            setFournisseurs(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const activateStatus = async (userId) => {
        try {
          const response = await axios.post(`${BASEURL}activate/${userId}/`, {
            type: "F" // Include user type in the request body
          });
          console.log(response.data.message);
          // Refetch data after activating status
          fetchFournisseursData();
        } catch (error) {
          console.error('Error activating status:', error);
        }
      };

      const deactivateStatus = async (userId) => {
        try {
          const response = await axios.post(`${BASEURL}deactivate/${userId}/`, {
            type: "F" // Include user type in the request body
          });
          console.log(response.data.message);
          // Refetch data after deactivating status
          fetchFournisseursData();
        } catch (error) {
          console.error('Error deactivating status:', error);
        }
      };

    return {
        fournisseurs,
        loading,
        error,
        activateStatus,
        deactivateStatus,
        fetchFournisseursData
    };
}
