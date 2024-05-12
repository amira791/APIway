import { useState, useEffect} from "react";
import API from "../API";
import { useAuthContext } from '../context/authContext';

export default function ManipulateProv() {
  const [providerAPIs, setproviderAPIs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState } = useAuthContext();
  // const {getFournisseur ,fournisseur} = useAuth()

  const getApisByProvider = (provider_id) => {
  
      setLoading(true);
      API.get(`apis/byprovider/${provider_id}/`)
          .then((res) => {
              console.log(res.data);
              setproviderAPIs(res.data);
          })
          .catch((error) => {
              setError(error);
          })
          .finally(() => {
              setLoading(false);
          });
  }

  useEffect(() => {
    getApisByProvider(authState.userId);
    
  }, [authState.userId]);

  return {
    getApisByProvider,
    providerAPIs: providerAPIs || []
  };
}
