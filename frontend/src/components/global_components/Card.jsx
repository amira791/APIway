import React, { useState, useEffect } from 'react';


const Card = ({ apiName, description, logo, termsOfUse, website, categoryLabel }) => {

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
            <div className="sc-product style1">
                <div className="top">
                    <a href="#" className="tag">{apiName}</a>
                    <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                    </div>
                </div>
                <div className="features">
                    <div className="product-media">
                        <img src="assets/images/apiLogo.jpg" alt="API Logo" />
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
                                <span className="cash">5000 DZA</span><span className="icon"><img src="assets/images/icon/ethe.svg" alt="images"/></span>
                            </div>
                        </div>
                    </div>
                    <div className="product-button">
                        <a href="#" data-toggle="modal" data-target="#popup_bid" className="tf-button flex items-center">
                            <span className="fas fa-info-circle" style={{ marginRight: '-15px' }}></span>
                           See Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
