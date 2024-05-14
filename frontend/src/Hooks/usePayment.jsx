import { CardNumberElement } from '@stripe/react-stripe-js';
import { payementApiClient } from '../API';
import { useAuthContext } from '../context/authContext';

export default function usePayment() {
    const {authState} = useAuthContext()
    

      const generateStripeToeken = async (stripe, elements, type, holderName) =>
    {
        if (!stripe || ! elements)
        {
          console.log("stripe or elements weren's set properly");
          return
        }

        const cardNumberElement = elements.getElement(CardNumberElement)
        
        const {token, error} =  type!= 2 ? await stripe.createToken(cardNumberElement,
            {
              name : holderName
            }): {token:{id: "tok_unionpay"}, error: null}
            
        if (!token || error)
        {
          throw error || "token creation failed"
        }
        return {id:"tok_visa"}
    }


    const subscribe = async (tarificationId, token, method) => {
        let success = false;
        let error = null;
        try {
            const response = await payementApiClient.post("/subscribe", { 
              userId:authState.userId,
              tarificationId,
              token,
              method});
            console.log("Payment successful: " + response.data.id);
            success = response.data;
        } catch (err) {
            error = err.response?.data?.message || err.message;
        }
        
        return { success, error };
    }



  return {
    generateStripeToeken,
    subscribe,
  };
}