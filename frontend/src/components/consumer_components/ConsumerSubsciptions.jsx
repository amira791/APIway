import React, { useEffect } from 'react'
import usePayment from '../../hooks/usePayment'
import { useAuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';


export default function ConsumerSubsciptions() {

  const {subscriptions , getConsumerSubscriptions} =usePayment()
  const { authState } = useAuthContext();

  useEffect(() => {
    getConsumerSubscriptions(authState.userId)
  }, [authState.userId])
  
  return (
    <>
     <div className="sidebar sidebar-explore">
     <div className="table-ranking top">
        <div className="title-ranking">
          <div className="col-rankingg"><a href="#">Subscription</a></div>
          <div className="col-rankingg"><a href="#">API</a></div>
          <div className="col-rankingg"><a href="#">API key</a></div>
          <div className="col-rankingg"><a href="#">State</a></div>
        </div>
      </div>
     <div className="table-ranking ">
        {subscriptions.map((subscription, index) => (
           <div className="content-ranking" key={index}>
           <div className="col-rankingg">
             <div className="box-product-favorite">
               <a href="#" className="bookmark">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                   <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9" />
                 </svg>
               </a>
               <Link to="#"  className="name">
                 {subscription.id_subscription}
               </Link>
             </div>
           </div>
           <div className="col-rankingg coin">
             <img src={subscription.api_info?.logo} alt="images" id="circular-image" />
             {subscription.api_info?.api_name}
           </div>
           <div className="col-rankingg">
              <div className="author-pd">
                <a href="#" className="name">{subscription.api_key.substring(0, 20)}</a>
              </div>
            </div>
           <span className={`status-badge status-${subscription?.statut}`}>
             {subscription?.statut}
           </span>
         </div>
        ))}



</div>
     </div>
    </>
  )
}
