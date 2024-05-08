import React, { useEffect, useState } from 'react'
import "./Subscrib.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
function Subscrib() {

    //const [offers,setOffers] = useState([])
  const [current, setCurrent] = useState(null)
 // var valid = true

 
  const [valid, setValid] = useState(true);
 
  const offersData = [
    {
      id: 1,
      title: 'Offre 1',
      price: '1000 DZD/mois',
      features: [
        'Consultation de tous les textes législatifs',
        'Recevoir toutes les mises à jour',
        'Recevoir des notifications liées aux mises à jour'
      ]
    },
    {
      id: 2,
      title: 'Offre 2',
      price: '1000 DZD/mois',
      features: [
        'Consultation de tous les textes législatifs',
        'Recevoir toutes les mises à jour',
        'Recevoir des notifications liées aux mises à jour'
      ]
    },
    {
      id: 3,
      title: 'Offre 3',
      price: '1000 DZD/mois',
      features: [
        'Consultation de tous les textes législatifs',
        'Recevoir toutes les mises à jour',
        'Recevoir des notifications liées aux mises à jour'
      ]
    }
  ];

  const handleSubscription = (offerId, offerTitle, offerPrice) => {
    // Ici, vous pouvez ajouter la logique pour le processus d'abonnement
    // Par exemple, rediriger l'utilisateur vers la page de paiement avec les détails de l'offre
    console.log(`Abonnement à l'offre ${offerTitle} au prix de ${offerPrice} DZD`);
  };
  return (
    <>
   
    {/* <div className='sub_container'> 
        <p className='offre_title'>إختاروا العرض الذي يناسبكم</p>
        <div className='sub_offers'>
            { offers.map((offer, index) => {
              if(offer.id === current) valid = false

              return(
              <div className= {'offre' + (offer.id === current ? ' actif' : '')} key={index}>
                <p className='offre_title'>{offer.title}</p>
                <h4>{offer.price}</h4>
                <img className="offer_icon" src="./images/echelledejusticeB.png"/>
                <div className="payment-bottom">
                  <div>
                      <p className='list_offers'>: ميزات العرض</p>
                      <ul>
                        {offer.features.map((feature, index) => (
                          <li key={index}>{feature.nom}</li>
                        ))}
                      </ul>
                  </div>
                  {
                    (offer.id === current)?
                      <h2 style= {{color: "var(--primary-color)"}}   >الاشتراك الحالي</h2>
                    : valid &&
                      <Link to={`/payment/${offer.priceId}?name=${offer.title}&price=${offer.price}`} className='btn_sub'>
                           {current?  "تطوير" : "اشتراك" } <ShoppingCartIcon sx={{ width: '20px', height: '20px',marginLeft:'5px' }}/>
                      </Link>
                  }
                </div>
                
              </div>)})}
        </div>
    </div>*/}

<div className='sub_container'>
      <p className='offre_title'>Choisissez l'offre qui vous convient</p>
      <div className='sub_offers'>
        {offersData.map((offer, index) => {
          if (offer.id === current) setValid(false);

          return (
            <div className={'offre' + (offer.id === current ? ' actif' : '')} key={index}>
              <p className='offre_title'>{offer.title}</p>
              <h4>{offer.price}</h4>
              <img className="offer_icon" src="./images/echelledejusticeB.png" alt="icon" />
              <div className="payment-bottom">
                <div>
                  <p className='list_offers'> Caractéristiques de l'offre :</p>
                  <ul>
                    {offer.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                {(offer.id === current) ?
                  <h2 style={{ color: "var(--primary-color)" }}>Abonnement actuel</h2>
                  : valid &&
                  <button onClick={() => handleSubscription(offer.id, offer.title, offer.price)} className='btn_sub'>
                    {current ? "Mise à niveau" : "Abonnement"} <ShoppingCartIcon sx={{ width: '20px', height: '20px', marginLeft: '5px' }} />
                  </button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
    </>
  )
}

export default Subscrib