import { useState, useEffect} from "react";
import API from "../API";
export default function ManipulateProv() {
  const [providerAPIs, setproviderAPIs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getApisByProvider = (provider_id) => {
      setLoading(true);
      API.get(`/apis/`)
          .then((res) => {
              console.log(res.data);
              setproviderAPIs(res.data.filter(api => api.provider === provider_id));
          })
          .catch((error) => {
              setError(error);
          })
          .finally(() => {
              setLoading(false);
          });
  }

  useEffect(() => {
      getApisByProvider(1);
  }, []);

  return {
      providerAPIs: providerAPIs || [],

  };
}
