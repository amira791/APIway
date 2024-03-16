// Define the custom hook in hooks/useUnite

import API from "../API";

export default function APIAjout() {


  const addNewAPI = (formData, functionalities) => {
    let apiId;
  
    // Step 1: Post API data
    API.post(`/apis/`, {
      api_name: formData.apiName,
      description: formData.description,
      terms_of_use: formData.termOfUse,
      logo: formData.logo,
      visibility: formData.visibility,
      base_link: formData.baseURLs[0],
      provider: formData.providerId,
      category: formData.categoryId
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.status === 201) {
        // API data posted successfully
        apiId = response.data.id_api; // Save the ID of the newly created API
  
        // Check if functionalities list is empty
        if (functionalities.length === 0) {
          throw new Error('Functionality list must not be empty');
        }
  
        // Step 2: Post each functionality data individually
        return Promise.all(functionalities.map(functName =>
          API.post(`/functionnalities/`, { functName })
        ));
      } else {
        throw new Error('Failed to post API data');
      }
    })
    .then(responses => {
      // Step 3: Get IDs of all posted functionalities
      const functionalityIds = responses.map(response => response.data.id_funct);
  
      // Step 4: Post API versions data with the API ID and functionality IDs
      const apiVersionsData = {
        num_version: 1,
        state: 'Alpha',
        api: apiId,
        functions: functionalityIds
      };
  
      return API.post(`/apiversions/`, apiVersionsData);
    })
    .then(response => {
      if (response.status === 201) {
        // API versions data posted successfully
        alert('API and functionalities data posted successfully!');
      } else {
        throw new Error('Failed to post API versions data');
      }
    })
    .catch(error => {
      console.error('Error:', error); // Handle error
    });
  };
  
  
  
  


 

  return {
    addNewAPI
  };
}
