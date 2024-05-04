import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuthContext } from './useAuthContext';
import useStorage from './useStorage';
import{BASEURL} from './API'

export default function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();
    const { deleteToken, setToken, setUsername, deleteUsername, setIsFournisseur, setIsConsommateur, deleteIsConsommateur , deleteIsFournisseur , setIsAdmin} = useStorage();
    const { dispatch } = useAuthContext();



    const signUp = (data) => {
        setLoading(true);
        setError(null);
        fetch(`${BASEURL}signup/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((result) => {
            setToken(result.access);
            setUsername(result.user.username);
            setIsFournisseur(result.user_type == 'fournisseur'? true : false );
            setIsConsommateur(result.user_type == 'consommateur'? true : false );
            setIsAdmin(result.user_type == 'admin'? true : false );
            setLoading(false);
            dispatch({
                type: 'LOGIN',
                payload: {
                    token: result.access,
                    username: result.user.username
                }
            });
            toast({
                title: 'User signed up',
                description: "User signed up successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
            toast({
                title: 'An error occurred',
                description: 'Failed to sign up user',
                status: 'error',
                duration: 5000,
            });
        });
    }
    
    const signIn = (data) => {
        setLoading(true);
        setError(null);
        fetch("http://localhost:8000/signin/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((result) => {
            setToken(result.access);
            setUsername(result.user.username);
            // setIsFournisseur(result.user.is_fournisseur);
            // setIsConsommateur(result.user.is_consommateur);
            setLoading(false);
            dispatch({
                type: 'LOGIN',
                payload: {
                    token: result.access,
                    username: result.user.username
                }
            });
            toast({
                title: 'User authenticated',
                description: "User authenticated successfully",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
            toast({
                title: 'An error occurred',
                description: 'Failed to authenticate user',
                status: 'error',
                duration: 5000,
            });
        });
    }
    
    const logOut = () => {
        deleteUsername();
        deleteIsConsommateur();
        deleteIsFournisseur();
        deleteToken();
        dispatch({ type: 'LOGOUT' });
    }

    return {
        signUp,
        signIn,
        logOut,
        error,
        loading
    }
}
