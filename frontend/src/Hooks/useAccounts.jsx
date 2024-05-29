import  { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {BASEURL,fetchData, postData } from './API';
import { useAuthContext } from '../context/authContext';

export default function useAccounts() {
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [consumer , setConsumer] = useState([]);
    const [provider,setProvider] = useState([]);
    const {authState} = useAuthContext();
    const token = authState.token;

    const getConsumerInfos = (id) => {
        fetchData(`${BASEURL}consommateurs/${id}/`, setConsumer, setLoading, setError);
    };

    const getProviderInfos = (id) => {
      fetchData(`${BASEURL}fournisseurs/${id}/`, setProvider, setLoading, setError);
    };

    const modifyUserInfos = (id,infos) => {
      postData(`${BASEURL}user/update/${id}/`, infos, {
        title: 'User modifie',
        description: 'Le User a ete modifie avec succes',
    }, toast, setError,token);
    }

  return {
    consumer,
    getConsumerInfos,
    provider,
    getProviderInfos,
    modifyUserInfos,
    error,
    loading
  }
}
