
export default function useStorage() {
 
    const setToken = (token) => {
      localStorage.setItem('jwtToken', token);
    };
     
    const getToken = () => {
      return localStorage.getItem('jwtToken');
    };
  
    const deleteToken = () => {
      localStorage.removeItem('jwtToken');
     
    };
  
    const getUsername = ()=>{
      return localStorage.getItem('username')
    }
  
    const setUsername = (username)=>{
      localStorage.setItem('username' , username)
    }
    const deleteUsername = ()=>{
      localStorage.removeItem('username')
    }
  
  
    const createHeaders = () => {
      const token = getToken();
      if (token) {
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
      }
      return {
        'Content-Type': 'application/json',
      }
    }
    
    return {
      createHeaders,
      setToken,
      getToken,
      deleteToken,
      setUsername,
      getUsername,
      deleteUsername
    };
    
  }