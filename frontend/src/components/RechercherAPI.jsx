import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Navbar from './global_components/navbar';
import Footer from './global_components/footer';
import Card from './global_components/Card';
import useApi from '../hooks/ApiHook';

const SearchApi = () => {
    const { searchResults,APIs,Categories,fetchApiCategories,fetchApiSearchResults,setSearchResults } = useApi();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(null);
    const categoryListRef = useRef(null); // Create a ref

    useEffect(() => {
        setSearchResults(APIs); // Set initial search results to all APIs
    }, [APIs]);

    useEffect(() => {
        fetchApiCategories();
    }, []);

    useEffect(() => {
        // Access the current property of the ref to get the DOM element
        const categoryList = categoryListRef.current;
        if (categoryList) {
            
            categoryList.style.overflowY = 'auto';
            categoryList.style.scrollbarWidth = 'thin'; /* For Firefox */
            categoryList.style.scrollbarColor = 'var(--scrollbar-track-color) var(--scrollbar-thumb-color)'; /* For Firefox */
            categoryList.style.scrollbarTrackColor = 'var(--scrollbar-track-color)'; /* For Webkit/Blink */
            categoryList.style.scrollbarThumbColor = 'var(--scrollbar-thumb-color)'; /* For Webkit/Blink */

        }
    }, []);

    const handleSearch = async (e) => {
        setSelectedCategoryLabel('API Categories');
       fetchApiSearchResults({ query: searchQuery });
      
    };

    const handleCategoryClick = async (categoryLabel) => {

        setSelectedCategoryLabel(categoryLabel);
        fetchApiSearchResults({ query: categoryLabel });
    };


    return (
        <div className="body header-fixed">
            <div className="preload preload-container">
                <div className="preload-logo"></div>
            </div>
            <div id="wrapper" className="wrapper-style">
                <div id="page" className="clearfix">
                    <Navbar />
                    <div className="contentDiv">
                        <section className="tf-page-title">
                            <div className="tf-container">
                                <div className="row">
                                    <div className="col-md-12">
                                        {/*<ul className="breadcrumbs">
                                            <li><a href="index-2.html">Home</a></li>
                                            <li><a href="explore.html">Explore</a></li>
                                            <li>Explore APIs</li>
                                            </ul>*/}
                                        <h2 className="page-title-heading text-6xl mt-4">Explore APIs</h2>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="tf-baner-live-auction style-2">
                            <div className="tf-container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="banner-liver-auction-wrap">
                                            <div className="content">
                                                <div className="heading">
                                                    <h2 className="title text-3xl">Big Boss #1238</h2>
                                                    <span className="label">Coming soon</span>
                                                </div>
                                                <div className="price">
                                                    <span className="icon"><i className="fab fa-ethereum"></i></span>
                                                    <span>5 ETH</span>
                                                </div>
                                                <p className="sub-heading">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                            </div>
                                            <div className="image">
                                                <img src="assets/images/img-banner-explore.png" alt="Image" className="img1" />
                                                <img src="assets/images/img-banner-live-auction-2.png" alt="Image" className="img2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="tf-baner-live-auction style-2">
                            <div className="tf-container">
                                <div className="mt-6 mb-20 flex flex-col items-center">
                                    <h6 className="widget-title text-5xl mb-16">Search APIs By : Name/Description</h6>
                                    <form onSubmit={handleSearch} className="border border-gray-300 w-full max-w-7xl flex">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                         
                                            className="py-3 px-4 outline-none rounded-l-full rounded-r-none flex-grow focus:ring-1/2 focus:ring-blue-500"
                                            style={{ width: 'calc(100% - 4.5rem)', marginRight: '-1px' }}
                                        />
                                        <button
                                            type="submit"
                                            className="btn-search product-button px-4 bg-gray-700 text-white rounded-l-none rounded-r-"
                                            style={{ height: '47px', marginLeft: '-1px' }}
                                        >
                                            <i className="icon-fl-search-filled"></i>
                                        </button>
                                    </form>
                                </div>
                                <div className="row ">
                                    <div className="col-md-12">
                                        <div className="top-menu">
                                            <ul className="filter-menu">
                                                <li className="active"><a href="#" data-filter=".3d">3D MODEL</a></li>
                                                <li><a href="#" data-filter=".anime">ANIME/MANGA</a></li>
                                                <li><a href="#" data-filter=".cyber">CYBER PUNK</a></li>
                                                <li><a href="#" data-filter=".pixel">PIXEL ART </a></li>
                                                <li><a href="#" data-filter=".music">MUSIC </a></li>
                                                <li><a href="#" data-filter=".abstract">ABSTRACT </a></li>
                                                <li><a href="#" data-filter=".2d">2D ARTS </a></li>
                                            </ul>

                                            
                                            <div id="item_category" className="dropdown">
                                                <a href="#" className="btn-selector nolink">{selectedCategoryLabel || 'API Categories'}</a>
                                                {/* Attach the ref to the ul element */}
                                                <ul ref={categoryListRef} className="max-h-80 overflow-y-auto">
                                                    {Categories.map(category =>
                                                        <li key={category.id_category}>
                                                            <a href="#" onClick={() => handleCategoryClick(category.label)}>{category.label}</a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row tf-filter-container">
                                    {searchResults.length > 0 ? (
                                        searchResults.map(api => (
                                            <Card
                                                key={api.id_api}
                                                apiName={api.api_name}
                                                description={api.description}
                                                logo={api.logo}
                                                termsOfUse={api.terms_of_use}
                                                website={api.website}
                                                categoryLabel={api.category_label}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-md-12 text-center mt-4">
                                            <p className='text-5xl text-gray-500 mb-16'>No results found...!</p>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-12">
                                    <div className="btn-loadmore mt6">
                                        <a href="#" className="tf-button loadmore">Load More</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <Footer />
                </div>
            </div>
            <div className="modal fade popup" id="popup_bid" tabIndex="-1" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body space-y-20 pd-40">
                            <h3>Place a Bid</h3>
                            <p className="text-center sub-heading">You must bid at least <span className="price color-popup">4.89 ETH</span></p>
                            <input type="text" className="form-control" placeholder="00.00 ETH" />
                            <p className="label-1">Enter quantity. <span className="color-popup">5 available</span>
                            </p>
                            <input type="text" className="form-control quantity form-bottom" value="1" />
                            <div className="d-flex justify-content-between detail-1">
                                <p>You must bid at least:</p>
                                <p className="text-right price color-popup">4.89 ETH</p>
                            </div>
                            <div className="d-flex justify-content-between detail-2">
                                <p>Service free:</p>
                                <p className="text-right price color-popup">0.89 ETH</p>
                            </div>
                            <div className="d-flex justify-content-between detail-3">
                                <p>Total bid amount:</p>
                                <p className="text-right price color-popup">4 ETH</p>
                            </div>
                            <a href="#" className="button-popup" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close">Place bid</a>
                        </div>
                    </div>
                </div>
            </div>

            <script src="../../../unpkg.com/imagesloaded%405.0.0/imagesloaded.pkgd.min.js"></script>
            <script src="../../../unpkg.com/imagesloaded%405.0.0/imagesloaded.pkgd.js"></script>

            <script src="assets/js/jquery.min.js"></script>
            <script src="assets/js/jquery.easing.js"></script>
            <script src="assets/js/bootstrap.min.js"></script>
            <script src="assets/js/swiper-bundle.min.js"></script>
            <script src="assets/js/swiper.js"></script>
            <script src="assets/js/count-down.js"></script>
            <script src="assets/js/jquery.isotope.min.js"></script>
            <script src="assets/js/switchmode.js"></script>
            <script src="assets/js/plugin.js"></script>
            <script src="assets/js/shortcodes.js"></script>
            <script src="assets/js/main.js"></script>
        </div>
    );
};

export default SearchApi;
