// Define the custom hook in hooks/useUnite

import API from "../API";

export default function APIAjout() {


  const addNewAPI= (formData) => {
    alert(formData.apiName+'\ndesc '+ formData.description+'\n terme of use '+formData.termOfUse+'\n pro id '+ formData.providerId+'\n cat id '+ formData.categoryId+'\n logo '+ formData.logo+'\n visibility '+  formData.visibility+'\n '+ formData.baseURLs);
    API.post(`/apis/`, {
      api_name: formData.apiName,
      description: formData.description,
      terms_of_use: formData.termOfUse,
      logo: formData.logo,
      visibility: formData.visibility,
      base_link:  formData.baseURLs[0],
      provider: formData.providerId,
      category: formData.categoryId
      
    },{
      headers: {
        'Content-Type' : 'application/json',
        'Content-Type': 'multipart/form-data'
  
  }
    })
    
    .then(response => {
      alert(response.status)
    
    })
    .catch(error => {
      console.error('Error:', error.response); // Handle error
    });
    
  
}

 

  return {
    addNewAPI
  };
}
