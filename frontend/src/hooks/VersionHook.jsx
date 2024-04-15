import { useState, useEffect} from "react";
import API from "../API";

export default function ManipulateVersion() {

  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getAPIversions = (apiId) =>  {
    console.log("apiId:",apiId)
    setLoading(true);
    API.get(`/apiversions/`).then((res) =>
      {
        setVersions(res.data.filter(apiversion => apiversion.api === apiId));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const updateVersionState = (versionId, newState) => {
    API.put(`/apiversions/${versionId}/`, { state: newState })
    .then((response) => {
        console.log(response);
        console.log("state updated successfully");
    })
    .catch(error => {
        console.error('Error updating version state:', error);
    });
  };

  return {
    getAPIversions,
    versions,
    updateVersionState
  };
}
