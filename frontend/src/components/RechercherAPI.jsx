import React, { useState, useEffect,useRef } from 'react';
import Navbar from './global_components/navbar';
import Footer from './global_components/footer';
import Card from './global_components/Card';
import useApi from '../hooks/ApiHook';

const SearchApi = () => {
    const { searchResults,APIs,Categories, suggestions, fetchApiSuggestions, fetchApiCategories,fetchApiSearchResults,setSearchResults,fetchAPIVersions } = useApi();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFilter, setSearchFilter] = useState('Name'); // Default search filter
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(null);
    const categoryListRef = useRef(null); // Create a ref
    const orderListRef = useRef(null); // Create a ref
    const [hoveredButton, setHoveredButton] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const itemsPerPage = 8; // Number of APIs per page
    const [showSuggestions, setShowSuggestions] = useState(false);
   

    useEffect(() => {
        setSearchResults(APIs); // Set initial search results to all APIs
    }, [APIs]);

    useEffect(() => {
        fetchApiCategories();
    }, []);

    useEffect(() => {
        // Access the current property of the ref to get the DOM element
        const categoryList = categoryListRef.current;
        const orderList = orderListRef.current;
        
        const styleScrollbar = (element) => {
            if (element) {
                element.style.overflowY = 'auto';
                element.style.scrollbarWidth = 'thin'; /* For Firefox */
                element.style.scrollbarColor = 'var(--scrollbar-track-color) var(--scrollbar-thumb-color)'; /* For Firefox */
                element.style.scrollbarTrackColor = 'var(--scrollbar-track-color)'; /* For Webkit/Blink */
                element.style.scrollbarThumbColor = 'var(--scrollbar-thumb-color)'; /* For Webkit/Blink */
            }
        };

        styleScrollbar(categoryList);
        styleScrollbar(orderList);
    }, []);

    

    const handleSearch = async () => {
       
        fetchApiSearchResults({ query: searchQuery, filter: searchFilter, category: selectedCategoryLabel, page: 1 });
    };

    const handleCategoryClick = async (categoryLabel) => {
        setSelectedCategoryLabel(categoryLabel);
        fetchApiSearchResults({ query: categoryLabel, filter: 'Category', page: 1 });
    };

    const handleSortByClick = async (sortby) => {
        fetchAPIVersions({ sortby: sortby });
    };

    const handleButtonClick = (filter) => {
        setSearchFilter(filter);
        setHoveredButton(filter);
    };

    const handleButtonHover = (filter) => {
        setHoveredButton(filter);
    };

    const handleButtonBlur = () => {
        setHoveredButton('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.filter-menu')) {
                setHoveredButton('');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSuggestionClick = (suggestion) => {
        let suggestionContent = '';
        if (searchFilter === 'Name') {
            suggestionContent = suggestion.api_name;
        } else if (searchFilter === 'Description') {
            suggestionContent = suggestion.description;
        } else if (searchFilter === 'Functionalities') {
            suggestionContent = suggestion.functName;
        }
        setSearchQuery(suggestionContent);
        setShowSuggestions(false); // Hide suggestion list after clicking on a suggestion
        fetchApiSearchResults({ query: searchQuery, filter: searchFilter, category: selectedCategoryLabel, page: 1 });
    };

    const handleClickOutside = (event) => {
        if (
            !event.target.closest('.search-bar') &&
            !event.target.closest('.suggestions-list') &&
            !event.target.classList.contains('suggestion-item') // Exclude clicks inside the suggestion items
        ) {
            setShowSuggestions(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Calculate total number of pages
    const totalPages = Math.ceil(searchResults.length / itemsPerPage);

    // Get the APIs to be displayed on the current page
    const indexOfLastApi = currentPage * itemsPerPage;
    const indexOfFirstApi = indexOfLastApi - itemsPerPage;
    const currentApis = searchResults.slice(indexOfFirstApi, indexOfLastApi);

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                                        <div className="image" style={{ maxHeight: "300px", overflow: "hidden", borderRadius: "15px" }}>
                                            <video autoPlay muted loop style={{ width: "100%" }}>
                                                <source src="assets/images/explore3.mp4" type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="tf-baner-live-auction style-2">
                            <div className="tf-container">
                                <div className="mt-6 mb-20 flex flex-col items-center">

                                    
                                <div className="mt-6 mb-10 flex justify-center items-center">
                                    <h6 className="widget-title text-5xl mb-16">Search APIs By :</h6>
                                    <div className="filter-menu ml-4 flex">
                                    <ul className="flex mb-14">
                                        <li>
                                            <button
                                                className={`btn ${searchFilter === 'Name' || hoveredButton === 'Name' ? 'active' : ''}`}
                                                onClick={() => handleButtonClick('Name')}
                                                onMouseEnter={() => handleButtonHover('Name')}
                                                onMouseLeave={handleButtonBlur}
                                            >
                                                Name
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`btn ${searchFilter === 'Description' || hoveredButton === 'Description' ? 'active' : ''}`}
                                                onClick={() => handleButtonClick('Description')}
                                                onMouseEnter={() => handleButtonHover('Description')}
                                                onMouseLeave={handleButtonBlur}
                                            >
                                                Description
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className={`btn ${searchFilter === 'Functionalities' || hoveredButton === 'Functionalities' ? 'active' : ''}`}
                                                onClick={() => handleButtonClick('Functionalities')}
                                                onMouseEnter={() => handleButtonHover('Functionalities')}
                                                onMouseLeave={handleButtonBlur}
                                            >
                                                Functionalities
                                            </button>
                                        </li>
                                    </ul>

                                    </div>
                                </div>


                                    



                                <form
                                    onSubmit={handleSearch}
                                    className={`border border-gray-300 w-full max-w-7xl relative `}
                                    id="subscribe-form"
                                    onClick={handleClickOutside} // Add click event listener to handle click outside the form
                                >
                                    <input
                                     id= {`${searchQuery !== '' && showSuggestions ? 'form-with-suggestions' : ''}`}
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSuggestions(true);
                                            // Call a function to fetch suggestions based on the input value
                                            fetchApiSuggestions(e.target.value, searchFilter);
                                        }}
                                        className={`${searchQuery !== '' && showSuggestions ? 'form-with-suggestions' : ''} py-3 px-4 outline-none rounded-l-full rounded-r-none text-white flex-grow focus:ring-1/2 focus:ring-blue-500 search-bar`}
                                        style={{ width: 'calc(100% - 4.5rem)', marginRight: '-1px' }}
                                    />
                                    <button
                                        type="submit"
                                        className={`btn-search product-button px-4 bg-gray-700 text-white rounded-l-none rounded-r- ${searchQuery !== ''  && showSuggestions  ? 'btn-with-suggestions' : ''}`}
                                        style={{ height: '48px', marginLeft: '-2px'}}
                                    >
                                        <i className="icon-fl-search-filled"></i>
                                    </button>

                                    {/* Suggestions list */}
                                    {searchQuery !== '' && showSuggestions && (
                                        <ul className="suggestions-list">
                                            {suggestions.map((suggestion, index) => (
                                                <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                                                    {/* Render suggestion content based on searchFilter */}
                                                    {searchFilter === 'Name' && suggestion.api_name}
                                                    {searchFilter === 'Description' && suggestion.description}
                                                    {searchFilter === 'Functionalities' && suggestion.functName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </form>

                                <br />
                                </div>
                                <div className="row ">
                                    <div className="col-md-12">

                                        <div className="top-menu">

                                            <div id="item_category" className="dropdown">
                                            <h6 className="widget-title text-4xl mb-2 mr-8">Filter APIs By :</h6>
                                                <a href="#" className="btn-selector nolink">{selectedCategoryLabel || 'API Categories'}</a>
                                                {/* Attach the ref to the ul element */}
                                                <ul ref={categoryListRef} className="max-h-80 ">
                                                    <li>
                                                        <p onClick={() => handleCategoryClick("All")}>ALL</p>
                                                    </li>
                                                    {Categories.map(category =>
                                                        <li key={category.id_category}>
                                                            <p onClick={() => handleCategoryClick(category.label)}>{category.label}</p>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div id="item_category2" className="dropdown">
                                                <a href="#" className="btn-selector nolink">Filter by date</a>
                                                <ul ref={orderListRef} className="max-h-80 ">
                                                    <li><span onClick={() => handleSortByClick('recent')}>Recently Created</span></li>
                                                    <li><span onClick={() => handleSortByClick('oldest')}>Oldest</span></li>
                                                    <li><span>Recently Sold</span></li> 
                                                </ul>
                                            </div>

                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="row tf-filter-container">
                                    {currentApis.length > 0 ? (
                                        currentApis.map(api => (
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
                                            <i className="icon-fl-search-filled text-7xl text-gray-500 "></i>
                                            <p className='text-5xl text-gray-500 mb-16 mt-6'>No results found...!</p>
                                        </div>
                                    )}
                                </div>
                                <div className="pagination-container">
                                    <ul className="pagination">
                                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                                            <li key={number} className="page-item">
                                                <a onClick={() => paginate(number)} href="#" className="page-link">
                                                    {number}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
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
