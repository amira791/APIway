import { CardNumberElement } from '@stripe/react-stripe-js';
import { payementApiClient } from '../API';

export default function usePayment() {
    
    

      const generateStripeToeken = async (stripe, elements, type, holderName) =>
    {
        if (!stripe || ! elements)
        {
          console.log("stripe or elements weren's set properly");
          return
        }

        const cardNumberElement = elements.getElement(CardNumberElement)
        
        const {token, error} =  await stripe.createToken(cardNumberElement,
            {
              name : holderName
            })
            
        if (!token || error)
        {
          throw error || "token creation failed"
        }
        return token
    }


    const subscribe = async (tarificationId, token, method) => {
        let success = false;
        let error = null;
        try {
            const response = await payementApiClient.post("/subscribe", { userId:1,userName:"testing", userEmail: "testing@test.com",tarificationId,token,method});
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
