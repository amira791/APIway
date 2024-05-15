import React, { useState } from 'react';
import "./Payment.css";
import { Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Elements } from '@stripe/react-stripe-js';
import usePayment from '../../hooks/usePayment';
import Navbar from '../global_components/navbar'

function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  const [errors, setErrors] = useState({});
  const [activeButton, setActiveButton] = useState(0);
  const methods = { 0: "Dahabia", 1: "CIB", 2: "BaridiMOB" };
  const [holderName, setHolderName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { id } = useParams();

  const {generateStripeToeken, subscribe} = usePayment()
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  const name = params.get('name');
  const price = params.get('price');
  
  const handleDownload = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };
  
  const handleSubmit = async (event) => {
        event.preventDefault();
        
        setIsLoading(true)

        const errors = {}

        try{
          const token = await generateStripeToeken(stripe, elements, activeButton, holderName)


          const {success , error} = await subscribe(id, token, methods[activeButton])
          if(success) {
            setPaymentSuccess(true)
            setSubscribed(success)
          }
          else
            errors["general"] = error
         }
        catch (error)
        {
          console.error(error)
          const map = {
            number : "NumCart",
            expiry : "DateExp",
            cvc :"NumCVC",
          }

          for (let key in map)
          {
            if(error.code?.includes(key))
            {
              errors[map[key]] = error.message
            }
            else {
              errors["general"] = error.message
            }
          }
          
        } finally {
          setErrors(errors)
          console.log(errors);
          setIsLoading(false)
        }
  };

  return (
    <>
    <Navbar/>
      <div className='payment-form'>
        {paymentSuccess ?
          <section className="successful-payment">
            <h1 className="success-payment-title">Paiement réussi <i style={{ color: "var(--primary-color)" }}>&#10003;</i></h1>
            <div className="success-payment-details">
              <p><strong>Offre sélectionnée :</strong> {subscribed.api} </p>
              <p><strong>Date de début d'abonnement : </strong> {subscribed.start_date} </p>
              <p><strong>Date de fin d'abonnement : </strong> {subscribed.end_date} </p>
            </div>
            <div className="receipt-actions">
              <button onClick={() => handleDownload(subscribed.facture.pdf)} >Télécharger la facture &#11015;</button>
              <button onClick={() => navigate(`/details/${subscribed.api}`) } >Page des details  &#128462;</button>
            </div>
          </section>
          :
          <form onSubmit={handleSubmit} className='payment_sub'>
            <div className='payment-section1'>
              <div className='mini-invoice'>
              
                <div>
                  <span>{name}</span> <br />
                  <span>{price}</span>
                </div>
                
              </div>
              <div className='payment-group-col'>
                <label htmlFor="modeP">  Mode de paiement: </label>
                <div className='paiement-mode'>
                  <button className={`paiement-mode-item ${activeButton === 1 ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveButton(1) }} >
                    <img src='../assets/images/payment/cib.png' />
                    <h3>CIB</h3>
                  </button>
                  <button className={`paiement-mode-item ${activeButton === 0 ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveButton(0) }} >
                    <img src='../assets/images/payment/dahabia.png' />
                    <h3>Dahabia</h3>
                  </button>
                </div>
              </div>
              {errors.general && <span className='error-message'>{errors.general}</span>}
              {activeButton !== 2 ?
                <>
                  <div className='payment-group-col'>
                    <label htmlFor="Ncart">  Numéro de carte  :</label>
                    <CardNumberElement
                      id="NumCart"
                      name="NumCart"
                      className={`payment_item_col ${errors.NumCart ? 'error' : ''}`}
                      placeholder='Numéro de carte'
                    />
                    {errors.NumCart && <span className='error-message'>{errors.NumCart}</span>}
                  </div>
                  <div className='payment-group-col'>
                    <label htmlFor="holderName">  Nom du titulaire : </label>
                    <input
                      type="text"
                      id="holderName"
                      name="holdername"
                      className='payment_item_col'
                      value={holderName}
                      onChange={e => setHolderName(e.target.value)}
                      placeholder='Nom du titulaire'
                      required
                    />
                  </div>
                </>
                :
                <>
                  <div className='payment-group-col'>
                    <label htmlFor="userName"> Adresse e-mail :</label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      className='payment_item_col'
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      placeholder='Adresse e-mail'
                      required
                    />
                    {errors.NumCart && <span className='error-message'>{errors.NumCart}</span>}
                  </div>
                  <div className='payment-group-col'>
                    <label htmlFor="password">  Mot de passe :</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className='payment_item_col'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder='Mot de passe'
                      required
                    />
                  </div>
                </>
              }
            </div>
            {activeButton === 2 || 
              <div className='payment-section2'>
                <div className='payment-group'>
                  <label htmlFor="NumCVC"> Numéro CVC2/CVV2 : </label>
                  <CardCvcElement
                    className={`payment_item ${errors.NumCVC ? 'error' : ''}`}
                    id="NumCVC"
                    name="NumCVC"
                  />
                  {errors.NumCVC && <span className='error-message'>{errors.NumCVC}</span>}
                </div>
                <div className='payment-group'>
                  <label htmlFor="DateExp">Date d'expiration :</label>
                  <CardExpiryElement
                    className={`payment_item ${errors.DateExp ? 'error' : ''}`}
                    id="DateExp"
                    name="DateExp"
                  />
                  {errors.DateExp && <span className='error-message'>{errors.DateExp}</span>}
                </div>
              </div>
            }
            <div className='payment-button-container'>
              <button type="submit" className="payment-button">  Payer {isLoading && <i className='loading'></i>}</button>
            </div>
          </form>}
      </div>
    </>
  )
}

export default Payment;
