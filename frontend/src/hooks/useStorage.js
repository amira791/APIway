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

  const setUsername = (username) => {
    localStorage.setItem('username', username);
  };

  const getUsername = () => {
    return localStorage.getItem('username');
  };

  const deleteUsername = () => {
    localStorage.removeItem('username');
  };

  const setIsFournisseur = (isFournisseur) => {
    localStorage.setItem('isFournisseur', isFournisseur);
  };

  const getIsFournisseur = () => {
    return localStorage.getItem('isFournisseur');
  };

  const deleteIsFournisseur = () => {
    localStorage.removeItem('isFournisseur');
  };

  const setIsConsommateur = (isConsommateur) => {
    localStorage.setItem('isConsommateur', isConsommateur);
  };

  const getIsConsommateur = () => {
    return localStorage.getItem('isConsommateur');
  };

  const deleteIsConsommateur = () => {
    localStorage.removeItem('isConsommateur');
  };

  const setIsAdmin = (isAdmin) => {
    localStorage.setItem('isAdmin', isAdmin);
  };

  const getIsAdmin = () => {
    return JSON.parse(localStorage.getItem('isAdmin'));
  };

  const deleteIsAdmin = () => {
    localStorage.removeItem('isAdmin');
  };
  
  
  return {
    setToken,
    getToken,
    deleteToken,
    setUsername,
    getUsername,
    deleteUsername,
    setIsFournisseur,
    getIsFournisseur,
    deleteIsFournisseur,
    setIsConsommateur,
    getIsConsommateur,
    deleteIsConsommateur,
    setIsAdmin,
    getIsAdmin,
    deleteIsAdmin
  };
}
