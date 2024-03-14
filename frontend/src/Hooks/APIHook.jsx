// Define the custom hook in hooks/useUnite
import { useState } from "react";
import useStorage from "./useStorage";
import API from "../API";

export default function useUnite() {
  const [unite, setUnit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { createHeaders } = useStorage();

  const toast = useToast();

  const addNewAPI= () => {
    API.post(`/api/api`,{
        "api_name": profile_account.userId,
       "description": id,
       "terme_of_use": profile_account.userId,
       "provider_id": id,
       "category_id": profile_account.userId,
       "base_link": profile_account.userId,
       "logo": profile_account.userId,
       "visibility": profile_account.userId,
},)
  .then((response) => {
   
    console.log(response);
  
    toast.success("Favoris ajoutée avec succés  ");
 } )}

  const updateUnite = (data) => {
    fetch(`http://localhost:8089/Unite/UpdateUnite/${data.id}`, {
      method: "PUT",
      headers: createHeaders(),
      body: JSON.stringify(data),
    })
      .then(() => {
        toast({
          title: "Unite modifiee",
          description: "L'unite a ete modifiee avec succes",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setError(error);
        toast({
          title: "Une erreur est survenue",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      });
  };

  const deleteUnite = (id) => {
    fetch(`http://localhost:8089/Unite/DeleteUnite/${id}`, {
      method: "DELETE",
      headers: createHeaders(),
    })
      .then(() => {
        toast({
          title: "Unite supprimee",
          description: "L'Unite a ete suprimee avec succes",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setError(error);
        toast({
          title: "Une erreur est survenue",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      });
  };

  return {
    unite,
    loading,
    error,
    updateUnite,
    deleteUnite,
    addNewUnite,
  };
}
