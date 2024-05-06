import React, { createContext, useReducer, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Define the initial state
const initialState = {
  token: localStorage.getItem('token') || null,
  username: localStorage.getItem('username') || null,
  userId: localStorage.getItem('userId') || null,
  isFournisseur: localStorage.getItem('isFournisseur') === 'true',
  isConsommateur: localStorage.getItem('isConsommateur') === 'true',
  isAdmin: localStorage.getItem('isAdmin') === 'true'
};

// Define the reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH_INFO':
      const { user_type, user,access , refresh} = action.payload;
      return {
        ...state,
        token: access,
        username: user.username,
        userId : user.id,
        isFournisseur: user_type === 'fournisseur',
        isConsommateur: user_type === 'consommateur',
        isAdmin: user_type === 'admin'
      };
    case 'LOGOUT':
      return {
        ...initialState,
        token: null,
        username: null,
        userId:null
      };
    default:
      return state;
  }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Effect to update local storage when authState changes
  useEffect(() => {
    localStorage.setItem('token', authState.token);
    localStorage.setItem('username', authState.username);
    localStorage.setItem('userId', authState.userId);
    localStorage.setItem('isFournisseur', authState.isFournisseur);
    localStorage.setItem('isConsommateur', authState.isConsommateur);
    localStorage.setItem('isAdmin', authState.isAdmin);
  }, [authState]);

  // The value prop of the provider will be the current state and the dispatch function
  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  return useContext(AuthContext);
};
