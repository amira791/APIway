import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useApi from '../../hooks/ApiHook';

const Card = ({ apiName, description, logo, termsOfUse, website, categoryLabel, token, searchQuery, idApi,searchFilter }) => {
    const navigate = useNavigate();
    const [functions, setFunctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const { fetchApiFunctions } = useApi();

    
    
    useEffect(() => {
        const fetchAPIFunctions = async () => {
            try {
                const response = await fetchApiFunctions(idApi);
                setFunctions(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching API functions:', error);
                setLoading(false);
            }
        };

        fetchAPIFunctions();
    }, [idApi]);

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

    const highlightSearchQuery = (text, query) => {
        if (!query || query.trim() === '') {
          return text;
        }
    
        const queryWords = query.trim().toLowerCase().split(/\s+/);
        const highlightedText = [];
    
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          let isWordHighlighted = false;
    
          queryWords.forEach((word) => {
            const lowerCaseWord = word.toLowerCase();
            if (text.substr(i, lowerCaseWord.length).toLowerCase() === lowerCaseWord) {
              highlightedText.push(<span key={i} className="highlight">{word}</span>);
              i += lowerCaseWord.length - 1;
              isWordHighlighted = true;
            }
          });
    
          if (!isWordHighlighted) {
            highlightedText.push(char);
          }
        }
    
        return <>{highlightedText}</>;
      };
    

    // Function to truncate text after a certain number of characters
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
            <div className="sc-product style1">
                <div className="top">
                    <a href="#" className="tag" >{highlightSearchQuery(truncateText(apiName, 9), searchQuery)}</a>
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
                                <div className="position">Category</div>
                                <div className="name"> <a href="#">{highlightSearchQuery(truncateText(categoryLabel, 13), searchQuery)}</a></div>
                            </div>
                        </div>
                        <div className="current-bid">
                            <div className="subtitle">Price</div>
                            <div className="price">
                                <span className="cash">5000 DZA</span><span className="icon"><img src="assets/images/icon/ethe.svg" alt="images"/></span>
                            </div>
                        </div>
                    </div>
                    
                    {searchQuery && searchFilter === 'Description' && (
                        <div className="details-product">
                            <div className="author">
                                <div className="content">
                                    <div className="position">Description</div>
                                    <div className="name">
                                        {highlightSearchQuery(truncateText(description, 100), searchQuery)}
                                        {!description.toLowerCase().split(/\s+/).some((word) =>
                                            searchQuery.trim().toLowerCase().split(/\s+/).includes(word)
                                        ) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {searchQuery && searchFilter === 'Functionalities' && (
                        <div className="details-product">
                            <div className="author">
                                <div className="content">
                                    <div className="position">Functions</div>
                                    <div className="name">
                                        {loading
                                            ? 'Loading...'
                                            : functions.length > 0 ? (
                                                functions.map((func, index) => (
                                                    <span key={func.id}>
                                                        {highlightSearchQuery(truncateText(func.functName, 50), searchQuery)}
                                                        {index !== functions.length - 1 && ', '}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="placeholder">No functions available.</span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <br />
                    <div className="product-button">
                        <Link className='tf-button flex items-center' to={`/ApiDetail/`}>
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
