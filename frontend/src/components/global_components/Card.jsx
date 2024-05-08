import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Card = ({ idApi ,apiName, description, logo, termsOfUse, website, categoryLabel, token }) => {
    const navigate = useNavigate();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const handlePurchase = () => {
        if (!token) {
            setShowLoginPrompt(true);
        } else {
            // Proceed with the purchase
        }
    };
    const handleLoginRedirect = () => {
        setShowLoginPrompt(false);
        navigate('/login');
        window.location.reload();
    };
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
            <div className="sc-product style1">
                <div className="top">
                    <a href="#" className="tag">{apiName}</a>
                    <div className="wish-list" >
                        <a href="#" className="heart-icon"></a>
                    </div>
                    <div className="product-button">
                        <a href="#" data-toggle="modal" data-target="#popup_bid" className="tf-button" onClick={handlePurchase} style={{ padding: '10px 20px', fontSize: '16px' }}> Purchase</a>
                    </div>
                </div>
                <div className="features">
                    <div className="product-media" style={{height:'200px'}}>
                        <img src={logo} alt="API Logo" style={{height:'100%', width:'100%', objectFit:'cover'}} />
                    </div>
                </div>
                <div className="bottom">
                    <div className="details-product">
                        <div className="author">
                            <div className="content">
                              {/*  <div className="position">Terms Of Use</div>
                                <div className="name"> <a href="#">{termsOfUse}</a></div>*/}
                                <div className="position">Category</div>
                                <div className="name"> <a href="#">{categoryLabel}</a></div>
                                
                            </div>
                        </div>
                        <div className="current-bid">
                            <div className="subtitle">Price</div>
                            <div className="price">
                                <span className="cash">5000 DZA</span><span className="icon"><img src="/assets/images/icon/ethe.svg" alt="images"/></span>
                            </div>
                        </div>
                    </div>
                    <div className="product-button">
                        <Link className='tf-button flex items-center' to={`/details/${idApi}`}>
                          <span className="fas fa-info-circle" style={{ marginRight: '-15px' }}></span>
                           See Details
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="modal fade popup" id="popup_bid" tabIndex="-1" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body space-y-20 pd-40">
                            {showLoginPrompt && (
                                 <>
                                    <h3>Oops!</h3>
                                    <p className="text-center sub-heading">You must log in <span className="price color-popup">to purchase</span></p>
                                    <a  className="button-popup" onClick={handleLoginRedirect}>Log In</a>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;