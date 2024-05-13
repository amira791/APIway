// Define the custom hook in hooks/useUnite
import { useState, useEffect} from "react";
import API from "../API";

export default function APIAjout() {


  const addNewAPI= (formData) => {
    API.post(`/apis`,{
        "api_name": formData.apiName,
        "description": formData.description,
        "terme_of_use": formData.termOfUse,
        "provider_id": formData.providerId,
        "category_id": formData.categoryId,
      //  "base_link": formData.baseLink,
        "logo": formData.logo,
        "visibility": formData.visibility
    },)
    .then((response) => {
    
      console.log(response);
    
      console.log("Favoris ajoutée avec succés  ");
    } )
    .catch((response) => {
    
      console.log(response);

      console.log("Favoris ajoutée avec succés  ");
    } )
  }

  const updateAPI = (apiId, formData) => {
    const requestData = new FormData();
    requestData.append('description', formData.description);
    requestData.append('website', formData.website);
    requestData.append('terms_of_use', formData.termOfUse);
    requestData.append('category', formData.categoryId);
    requestData.append('visibility', formData.visibility);
    if (formData.logo instanceof File) {
      requestData.append('logo', formData.logo);
    }

    API.put(`/apis/${apiId}/`, requestData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        console.log(response);
        console.log("API updated successfully");
    })
    .catch((error) => {
        console.log(error);
        console.log("Failed to update API");
    });
};

  
  return {
    addNewAPI,
    updateAPI,
  };
}
