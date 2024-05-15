import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {useAuthContext} from '../context/authContext'
import{BASEURL , fetchData} from './API'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fournisseur , setFournisseur] = useState([]);
    // const toast = useToast();
    const { dispatch } = useAuthContext();


    const getFournisseur = (id) => {
        fetchData(`${BASEURL}fournisseurs/byuser/${id}/`, setFournisseur, setLoading, setError);
    };

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
            
            dispatch({
                type: 'SIGNUP',
                payload: result
              });
            
            // toast({
            //     title: 'User signed up',
            //     description: "User signed up successfully",
            //     status: 'success',
            //     duration: 5000,
            //     isClosable: true,
            // });
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
           
           
            // toast({
            //     title: 'An error occurred',
            //     description: 'Failed to sign up user',
            //     status: 'error',
            //     duration: 5000,
            // });
        });
    }
    
    const signIn = (data) => {
        setLoading(true);
        setError(null);
        fetch(`${BASEURL}signin/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((result) => {
            setLoading(false);
            dispatch({
                type: 'SET_AUTH_INFO',
                payload: result
              });
            
            // toast({
            //     title: 'User authenticated',
            //     description: "User authenticated successfully",
            //     status: 'success',
            //     duration: 5000,
            //     isClosable: true,
            // });
        })
        .catch((error) => {
            setError(error);
            setLoading(false);

            // toast({
            //     title: 'An error occurred',
            //     description: 'Failed to authenticate user',
            //     status: 'error',
            //     duration: 5000,
            // });
        });
    }
    
    const logOut = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.clear();
    }

    return {
        getFournisseur,
        fournisseur,
        signUp,
        signIn,
        logOut,
        error,
        loading
    }
}
