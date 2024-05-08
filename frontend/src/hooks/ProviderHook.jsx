import { useState, useEffect} from "react";
import API from "../API";
import useManageAccountsF from './FouAccountsHook'
import { useAuthContext } from '../context/authContext';
export default function ManipulateProv() {
  const [providerAPIs, setproviderAPIs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState } = useAuthContext();
  const {getFournisseur ,fournisseur} = useManageAccountsF()

  const getApisByProvider = (provider_id) => {
    console.log("provider id :")
    console.log(provider_id)
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
    getFournisseur(authState.userId)
    console.log()
    getApisByProvider(4);
    
  }, [authState.userId]);

  return {
      providerAPIs: providerAPIs || []
  };
}
