import React from 'react';
import { NavLink } from 'react-router-dom'; // Import Link from React Router

const Card = ({ idApi,apiName, description, logo, termsOfUse, website, categoryLabel }) => {
    // Define the URL for the API detail page
    const apiDetailURL = `/ApiDetail/${apiName}`; // Assuming `apiName` uniquely identifies the API

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
                    <div className="product-media" style={{ height: '200px' }}>
                        <img src={logo} alt="API Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
                <div className="bottom">
                    <div className="details-product">
                        <div className="author">
                            <div className="content">
                                <div className="position">Category</div>
                                <div className="name"> <a href="#">{categoryLabel}</a></div>
                            </div>
                        </div>
                        <div className="current-bid">
                            <div className="subtitle">Price</div>
                            <div className="price">
                                <span className="cash">5000 DZA</span><span className="icon"><img src="assets/images/icon/ethe.svg" alt="images" /></span>
                            </div>
                        </div>
                    </div>
                    <div className="product-button">
                        {/* Use Link instead of a regular anchor tag */}
                        <NavLink to={`/ApiDetail/${idApi}`} className="tf-button flex items-center">
                            <span className="fas fa-info-circle" style={{ marginRight: '-15px' }}></span>
                            See Details
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;