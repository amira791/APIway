// Define the custom hook in hooks/useUnite

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

 

  return {
    addNewAPI
  };
}
