import Footer from "../global_components/footer";
import NavbarProvider from "../provider_componants/CommunComponants/NavBar";
import AddAPIPage from "../provider_componants/AddApi";
import ProvAPIList from "../provider_componants/ListProvAPI";
import React, { useState  , useEffect } from "react";
import APIAjout from "../../hooks/APIHook";
import { useAuthContext } from "../../context/authContext";

const ProviderHomePage = () => {

    const { authState } = useAuthContext();
    const provider = authState.userId;

    useEffect(() => {
        const load = localStorage.getItem('load');
        if (load === "true") {
            localStorage.setItem('load', 'false');
            setTimeout(() => window.location.reload(), 200);
        }
    }, []);
    

    return (
        <div className="body header-fixed">    

            <div id="wrapper" className="wrapper-style">
                <div id="page" className="clearfix">
                    <NavbarProvider />
                   
                    <section className="tf-dashboard tf-tab">
                        <div className="tf-container">
                            <div className="row ">
                                <div className="col-xl-3 col-lg-12 col-md-12">
                                    <div className="dashboard-user">
                                        <div className="dashboard-infor">
                                            <div className="avatar">
                                                <img src="assets/images/author/user.png" alt="images"/>
                                            </div>
                                            <div className="name"> {authState.username}</div>
                                            
                                        </div>
                                        <div className="dashboard-filter">
                                            <ul className="filter-menuu menu-tab">
                                                <li className="active dashboard"><a href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path className="svg-fill" d="M17.3722 6.47085C17.7995 7.0155 17.3282 7.70964 16.6359 7.70964H2.66602C2.11373 7.70964 1.66602 7.26192 1.66602 6.70964V5.3513C1.66602 3.31797 3.31602 1.66797 5.34935 1.66797H7.28268C8.64102 1.66797 9.06602 2.10964 9.60768 2.83464L10.7744 4.38464C11.0327 4.7263 11.066 4.76797 11.5493 4.76797H13.8744C15.2932 4.76797 16.5581 5.43348 17.3722 6.47085Z" fill="#3749E9"/>
                                                    <path className="svg-fill" d="M17.3194 8.95704C17.8704 8.95704 18.3175 9.40269 18.3194 9.95365L18.3327 13.8739C18.3327 16.3323 16.3327 18.3323 13.8743 18.3323H6.12435C3.66602 18.3323 1.66602 16.3323 1.66602 13.8739V9.95724C1.66602 9.40496 2.11372 8.95725 2.666 8.95724L17.3194 8.95704Z" fill="#3749E9"/>
                                                    </svg> My APIs</a>
                                                </li>
                                                <li><a href="#" > <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path className="svg-fill" d="M18.3329 9.14297V10.8596C18.3329 11.318 17.9662 11.693 17.4995 11.7096H15.8662C14.9662 11.7096 14.1412 11.0513 14.0662 10.1513C14.0162 9.6263 14.2162 9.13464 14.5662 8.79297C14.8745 8.4763 15.2995 8.29297 15.7662 8.29297H17.4995C17.9662 8.30964 18.3329 8.68464 18.3329 9.14297Z" fill="#3749E9"/>
                                                    <path className="svg-fill" d="M17.0587 12.9596H15.867C14.2837 12.9596 12.9503 11.768 12.817 10.2513C12.742 9.38464 13.0587 8.51797 13.692 7.9013C14.2253 7.3513 14.967 7.04297 15.767 7.04297H17.0587C17.3003 7.04297 17.5003 6.84297 17.4753 6.6013C17.292 4.5763 15.9503 3.19297 13.9587 2.95964C13.7587 2.9263 13.5503 2.91797 13.3337 2.91797H5.83366C5.60033 2.91797 5.37533 2.93464 5.15866 2.96797C3.03366 3.23464 1.66699 4.81797 1.66699 7.08464V12.918C1.66699 15.218 3.53366 17.0846 5.83366 17.0846H13.3337C15.667 17.0846 17.2753 15.6263 17.4753 13.4013C17.5003 13.1596 17.3003 12.9596 17.0587 12.9596ZM10.8337 8.1263H5.83366C5.49199 8.1263 5.20866 7.84297 5.20866 7.5013C5.20866 7.15964 5.49199 6.8763 5.83366 6.8763H10.8337C11.1753 6.8763 11.4587 7.15964 11.4587 7.5013C11.4587 7.84297 11.1753 8.1263 10.8337 8.1263Z" fill="#3749E9"/>
                                                    </svg> Build API</a></li>
                                               
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
                                    <div className="dashboard-content inventory content-tab">
                                        <div className="inner-content inventory">
                                            
                                            <ProvAPIList provider_id={provider}/>

                                        </div>
                                        <div className="inner-content wallet">
                                           
                                            <AddAPIPage/>
                                        </div>
                                        <div className="inner-content inventory favorite">
                                            <h4 className="title-dashboard">Favorirtes</h4>
                                            <div className="table-ranking top">
                                                <div className="title-ranking">
                                                    <div className="col-rankingg"><a href="#">Name</a></div>
                                                    <div className="col-rankingg"><a href="#">Blockchain</a></div>
                                                    <div className="col-rankingg"><a href="#">Author</a></div>
                                                    <div className="col-rankingg"><a href="#">Price</a></div>
                                                </div>
                                            </div>
                                            <div className="table-ranking ">
                                                <div className="content-ranking">
                                                    <div className="col-rankingg">
                                                        <div className="box-product-favorite">
                                                            <a href="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9"/>
                                                                </svg></a>
                                                            <div className="image"><img src="assets/images/product/product27.jpg" alt="Image"/></div>  
                                                            <a href="#" className="name">Sweet Baby #1</a>  
                                                        </div>
                                                    </div>
                                                    <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.0138 5.65275C15.2277 5.65275 14.5905 6.29113 14.5905 7.07865V8.21954H19.2162V12.5686H14.5193V14.4223C14.5193 17.848 11.7474 20.625 8.32802 20.625C4.90869 20.625 2.13672 17.848 2.13672 14.4223C2.13672 10.9966 4.90869 8.21954 8.32802 8.21954H10.3206V7.07865C10.3206 3.92866 12.8695 1.375 16.0138 1.375H21.3867V5.65275H16.0138ZM10.3203 8.25586V12.5694H14.519V8.25586H10.3203ZM6.40625 14.423C6.40625 13.3598 7.26655 12.498 8.32767 12.498H10.2492V14.423C10.2492 15.4862 9.38889 16.348 8.32767 16.348C7.26655 16.348 6.40625 15.4862 6.40625 14.423Z" fill="#03DB80"/>
                                                        </svg>Flow</div>
                                                    <div className="col-rankingg"><div className="author-pd">
                                                        <div className="avatar">
                                                            <img src="assets/images/author/avt-fv1.jpg" alt="images"/>
                                                        </div>
                                                        <a href="#" className="name">Fabian Johnson</a>
                                                    </div></div>
                                                    <div className="col-rankingg">0.45 Flow</div>
                                                    <div className="dot"><a href="#"><i className="far fa-ellipsis-h"></i></a></div>
                                                </div>
                                                <div className="content-ranking">
                                                    <div className="col-rankingg">
                                                        <div className="box-product-favorite">
                                                            <a href="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9"/>
                                                                </svg></a>
                                                            <div className="image"><img src="assets/images/product/product4.jpg" alt="Image"/></div>  
                                                            <a href="#" className="name">Doug Ortega #1</a>  
                                                        </div>
                                                    </div>
                                                    <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                        <path d="M13.2819 22C11.8098 22 10.7378 21.622 10.0641 20.8659C9.39134 20.1102 9.05451 19.2952 9.05451 18.4217C9.05451 18.1024 9.11307 17.8337 9.23052 17.6152C9.34515 17.3999 9.51139 17.2214 9.71225 17.0985C9.91571 16.9724 10.1661 16.9096 10.4638 16.9096C10.7614 16.9096 11.0115 16.9724 11.2153 17.0985C11.4187 17.2244 11.5793 17.3969 11.6966 17.6152C11.814 17.8337 11.8727 18.1024 11.8727 18.4217C11.8727 18.8082 11.7867 19.1229 11.6145 19.3667C11.442 19.6103 11.2386 19.7697 11.0037 19.8457C11.2076 20.1477 11.5285 20.3619 11.9668 20.4879C12.4052 20.6225 12.8435 20.6896 13.2819 20.6896C13.8924 20.6896 14.4443 20.5132 14.9376 20.1606C15.4307 19.8075 15.7949 19.2869 16.0298 18.5981C16.2647 17.9094 16.3821 17.128 16.3821 16.2542C16.3821 15.3051 16.2527 14.4942 15.9946 13.8225C15.7438 13.1421 15.3721 12.638 14.8788 12.3103C14.4007 11.9874 13.8468 11.8171 13.2819 11.8191C12.9059 11.8191 12.4366 11.9871 11.8727 12.3232L10.8393 12.8775V12.3232L15.4895 5.67021H9.05451V12.5748C9.05451 13.1462 9.17195 13.6166 9.40684 13.9863C9.64172 14.356 10.0017 14.5407 10.4874 14.5407C10.8626 14.5407 11.2231 14.4064 11.5676 14.1372C11.9144 13.8659 12.216 13.5338 12.4599 13.155C12.4912 13.0788 12.5304 13.0243 12.5774 12.9907C12.6195 12.9507 12.6737 12.9285 12.73 12.9279C12.816 12.9279 12.9177 12.9741 13.0354 13.0667C13.145 13.2007 13.1998 13.3562 13.1998 13.5326C13.1863 13.6514 13.1666 13.7692 13.1408 13.8856C12.8749 14.524 12.5068 15.0111 12.0371 15.347C11.5797 15.6791 11.0394 15.8548 10.4874 15.8512C9.09367 15.8512 8.13055 15.5571 7.59837 14.9694C7.06619 14.381 6.79993 13.5829 6.79993 12.5752V5.67021H3.51172V4.38475H6.79993V1.46182L6.0484 0.654721V0H8.23246L9.05419 0.453375V4.38475L17.5561 4.35975L18.4018 5.26682L13.188 10.8614C13.5037 10.7263 13.8361 10.6415 14.1745 10.6093C14.7381 10.6093 15.3721 10.8026 16.0767 11.1891C16.7892 11.567 17.3372 12.0881 17.7205 12.7512C18.1042 13.4066 18.3507 14.0367 18.4605 14.6414C18.5779 15.2465 18.6367 15.7838 18.6367 16.2542C18.6367 17.3297 18.4251 18.329 18.0026 19.2535C17.5799 20.1772 16.9379 20.8659 16.0767 21.3197C15.2155 21.7734 14.2838 22 13.2819 22Z" fill="#2C7DF7"></path>
                                                        </svg>Tezos</div>
                                                    <div className="col-rankingg"><div className="author-pd">
                                                        <div className="avatar">
                                                            <img src="assets/images/author/author-follow2.jpg" alt="images"/>
                                                        </div>
                                                        <a href="#" className="name">Polly Walters</a>
                                                    </div></div>
                                                    <div className="col-rankingg">0.45 Flow</div>
                                                    <div className="dot"><a href="#"><i className="far fa-ellipsis-h"></i></a></div>
                                                </div>
                                                <div className="content-ranking">
                                                    <div className="col-rankingg">
                                                        <div className="box-product-favorite">
                                                            <a href="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9"/>
                                                                </svg></a>
                                                            <div className="image"><img src="assets/images/product/product5.jpg" alt="Image"/></div>  
                                                            <a href="#" className="name">Vincent Welch #1</a>  
                                                        </div>
                                                    </div>
                                                    <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.7619 0V8.13257L5.74624 10.8216L11.7619 8.13418V15.1949L4.89084 11.204L4.89062 11.2041L4.8907 11.2039L4.89062 11.2038L4.89077 11.2038L11.7619 0ZM11.7637 0L18.6357 11.2038L18.6359 11.2038L18.6359 11.2039L18.6359 11.2041L18.6357 11.204L11.7637 15.1949V8.13418L17.7802 10.8216L11.7637 8.13257V0ZM11.7626 16.4746V22.0005L4.88672 12.4844L11.7626 16.4746ZM11.7637 22.0005V16.4736L18.6359 12.4844L11.7637 22.0005Z" fill="#6B8CEF"></path>
                                                        </svg>Ethereum</div>
                                                    <div className="col-rankingg"><div className="author-pd">
                                                        <div className="avatar">
                                                            <img src="assets/images/author/avt-fv3.jpg" alt="images"/>
                                                        </div>
                                                        <a href="#" className="name">Basil Slater</a>
                                                    </div></div>
                                                    <div className="col-rankingg">0.45 Flow</div>
                                                    <div className="dot"><a href="#"><i className="far fa-ellipsis-h"></i></a></div>
                                                </div>
                                                <div className="content-ranking">
                                                    <div className="col-rankingg">
                                                        <div className="box-product-favorite">
                                                            <a href="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9"/>
                                                                </svg></a>
                                                            <div className="image"><img src="assets/images/product/product9.jpg" alt="Image"/></div>  
                                                            <a href="#" className="name">Alec Alvarado #1</a>  
                                                        </div>
                                                    </div>
                                                    <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.0138 5.65275C15.2277 5.65275 14.5905 6.29113 14.5905 7.07865V8.21954H19.2162V12.5686H14.5193V14.4223C14.5193 17.848 11.7474 20.625 8.32802 20.625C4.90869 20.625 2.13672 17.848 2.13672 14.4223C2.13672 10.9966 4.90869 8.21954 8.32802 8.21954H10.3206V7.07865C10.3206 3.92866 12.8695 1.375 16.0138 1.375H21.3867V5.65275H16.0138ZM10.3203 8.25586V12.5694H14.519V8.25586H10.3203ZM6.40625 14.423C6.40625 13.3598 7.26655 12.498 8.32767 12.498H10.2492V14.423C10.2492 15.4862 9.38889 16.348 8.32767 16.348C7.26655 16.348 6.40625 15.4862 6.40625 14.423Z" fill="#03DB80"/>
                                                        </svg>Flow</div>
                                                    <div className="col-rankingg"><div className="author-pd">
                                                        <div className="avatar">
                                                            <img src="assets/images/author/avt-fv4.jpg" alt="images"/>
                                                        </div>
                                                        <a href="#" className="name">Mirabelle Maldonado</a>
                                                    </div></div>
                                                    <div className="col-rankingg">0.45 Flow</div>
                                                    <div className="dot"><a href="#"><i className="far fa-ellipsis-h"></i></a></div>
                                                </div>
                                                <div className="content-ranking">
                                                    <div className="col-rankingg">
                                                        <div className="box-product-favorite">
                                                            <a href="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9"/>
                                                                </svg></a>
                                                            <div className="image"><img src="assets/images/product/product10.jpg" alt="Image"/></div>  
                                                            <a href="#" className="name">Baz Fletcher #1</a>  
                                                        </div>
                                                    </div>
                                                    <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                        <path d="M13.2819 22C11.8098 22 10.7378 21.622 10.0641 20.8659C9.39134 20.1102 9.05451 19.2952 9.05451 18.4217C9.05451 18.1024 9.11307 17.8337 9.23052 17.6152C9.34515 17.3999 9.51139 17.2214 9.71225 17.0985C9.91571 16.9724 10.1661 16.9096 10.4638 16.9096C10.7614 16.9096 11.0115 16.9724 11.2153 17.0985C11.4187 17.2244 11.5793 17.3969 11.6966 17.6152C11.814 17.8337 11.8727 18.1024 11.8727 18.4217C11.8727 18.8082 11.7867 19.1229 11.6145 19.3667C11.442 19.6103 11.2386 19.7697 11.0037 19.8457C11.2076 20.1477 11.5285 20.3619 11.9668 20.4879C12.4052 20.6225 12.8435 20.6896 13.2819 20.6896C13.8924 20.6896 14.4443 20.5132 14.9376 20.1606C15.4307 19.8075 15.7949 19.2869 16.0298 18.5981C16.2647 17.9094 16.3821 17.128 16.3821 16.2542C16.3821 15.3051 16.2527 14.4942 15.9946 13.8225C15.7438 13.1421 15.3721 12.638 14.8788 12.3103C14.4007 11.9874 13.8468 11.8171 13.2819 11.8191C12.9059 11.8191 12.4366 11.9871 11.8727 12.3232L10.8393 12.8775V12.3232L15.4895 5.67021H9.05451V12.5748C9.05451 13.1462 9.17195 13.6166 9.40684 13.9863C9.64172 14.356 10.0017 14.5407 10.4874 14.5407C10.8626 14.5407 11.2231 14.4064 11.5676 14.1372C11.9144 13.8659 12.216 13.5338 12.4599 13.155C12.4912 13.0788 12.5304 13.0243 12.5774 12.9907C12.6195 12.9507 12.6737 12.9285 12.73 12.9279C12.816 12.9279 12.9177 12.9741 13.0354 13.0667C13.145 13.2007 13.1998 13.3562 13.1998 13.5326C13.1863 13.6514 13.1666 13.7692 13.1408 13.8856C12.8749 14.524 12.5068 15.0111 12.0371 15.347C11.5797 15.6791 11.0394 15.8548 10.4874 15.8512C9.09367 15.8512 8.13055 15.5571 7.59837 14.9694C7.06619 14.381 6.79993 13.5829 6.79993 12.5752V5.67021H3.51172V4.38475H6.79993V1.46182L6.0484 0.654721V0H8.23246L9.05419 0.453375V4.38475L17.5561 4.35975L18.4018 5.26682L13.188 10.8614C13.5037 10.7263 13.8361 10.6415 14.1745 10.6093C14.7381 10.6093 15.3721 10.8026 16.0767 11.1891C16.7892 11.567 17.3372 12.0881 17.7205 12.7512C18.1042 13.4066 18.3507 14.0367 18.4605 14.6414C18.5779 15.2465 18.6367 15.7838 18.6367 16.2542C18.6367 17.3297 18.4251 18.329 18.0026 19.2535C17.5799 20.1772 16.9379 20.8659 16.0767 21.3197C15.2155 21.7734 14.2838 22 13.2819 22Z" fill="#2C7DF7"></path>
                                                        </svg>Tezos</div>
                                                    <div className="col-rankingg"><div className="author-pd">
                                                        <div className="avatar">
                                                            <img src="assets/images/author/avt-fv5.jpg" alt="images"/>
                                                        </div>
                                                        <a href="#" className="name">Roderick Boyd</a>
                                                    </div></div>
                                                    <div className="col-rankingg">0.45 Flow</div>
                                                    <div className="dot"><a href="#"><i className="far fa-ellipsis-h"></i></a></div>
                                                </div>
                                                <div className="content-ranking">
                                                    <div className="col-rankingg">
                                                        <div className="box-product-favorite">
                                                            <a href="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9"/>
                                                                </svg></a>
                                                            <div className="image"><img src="assets/images/product/product11.jpg" alt="Image"/></div>  
                                                            <a href="#" className="name">Bert Moore #1</a>  
                                                        </div>
                                                    </div>
                                                    <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.7619 0V8.13257L5.74624 10.8216L11.7619 8.13418V15.1949L4.89084 11.204L4.89062 11.2041L4.8907 11.2039L4.89062 11.2038L4.89077 11.2038L11.7619 0ZM11.7637 0L18.6357 11.2038L18.6359 11.2038L18.6359 11.2039L18.6359 11.2041L18.6357 11.204L11.7637 15.1949V8.13418L17.7802 10.8216L11.7637 8.13257V0ZM11.7626 16.4746V22.0005L4.88672 12.4844L11.7626 16.4746ZM11.7637 22.0005V16.4736L18.6359 12.4844L11.7637 22.0005Z" fill="#6B8CEF"></path>
                                                        </svg>Ethereum</div>
                                                    <div className="col-rankingg"><div className="author-pd">
                                                        <div className="avatar">
                                                            <img src="assets/images/author/avt-fv6.jpg" alt="images"/>
                                                        </div>
                                                        <a href="#" className="name">Lucy Neal</a>
                                                    </div></div>
                                                    <div className="col-rankingg">0.45 Flow</div>
                                                    <div className="dot"><a href="#"><i className="far fa-ellipsis-h"></i></a></div>
                                                </div>
                                                <div className="content-ranking">
                                                    <div className="col-rankingg">
                                                        <div className="box-product-favorite">
                                                            <a href="#" className="bookmark"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M12.7617 2.25H5.23828C4.42969 2.25 3.76172 2.91797 3.76172 3.76172V15.75L9 13.5L14.2383 15.75V3.76172C14.2383 2.91797 13.5703 2.25 12.7617 2.25Z" fill="#3749E9"/>
                                                                </svg></a>
                                                            <div className="image"><img src="assets/images/product/product6.jpg" alt="Image"/></div>  
                                                            <a href="#" className="name">Oriel Binder #1</a>  
                                                        </div>
                                                    </div>
                                                    <div className="col-rankingg coin"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                                        <path d="M13.2819 22C11.8098 22 10.7378 21.622 10.0641 20.8659C9.39134 20.1102 9.05451 19.2952 9.05451 18.4217C9.05451 18.1024 9.11307 17.8337 9.23052 17.6152C9.34515 17.3999 9.51139 17.2214 9.71225 17.0985C9.91571 16.9724 10.1661 16.9096 10.4638 16.9096C10.7614 16.9096 11.0115 16.9724 11.2153 17.0985C11.4187 17.2244 11.5793 17.3969 11.6966 17.6152C11.814 17.8337 11.8727 18.1024 11.8727 18.4217C11.8727 18.8082 11.7867 19.1229 11.6145 19.3667C11.442 19.6103 11.2386 19.7697 11.0037 19.8457C11.2076 20.1477 11.5285 20.3619 11.9668 20.4879C12.4052 20.6225 12.8435 20.6896 13.2819 20.6896C13.8924 20.6896 14.4443 20.5132 14.9376 20.1606C15.4307 19.8075 15.7949 19.2869 16.0298 18.5981C16.2647 17.9094 16.3821 17.128 16.3821 16.2542C16.3821 15.3051 16.2527 14.4942 15.9946 13.8225C15.7438 13.1421 15.3721 12.638 14.8788 12.3103C14.4007 11.9874 13.8468 11.8171 13.2819 11.8191C12.9059 11.8191 12.4366 11.9871 11.8727 12.3232L10.8393 12.8775V12.3232L15.4895 5.67021H9.05451V12.5748C9.05451 13.1462 9.17195 13.6166 9.40684 13.9863C9.64172 14.356 10.0017 14.5407 10.4874 14.5407C10.8626 14.5407 11.2231 14.4064 11.5676 14.1372C11.9144 13.8659 12.216 13.5338 12.4599 13.155C12.4912 13.0788 12.5304 13.0243 12.5774 12.9907C12.6195 12.9507 12.6737 12.9285 12.73 12.9279C12.816 12.9279 12.9177 12.9741 13.0354 13.0667C13.145 13.2007 13.1998 13.3562 13.1998 13.5326C13.1863 13.6514 13.1666 13.7692 13.1408 13.8856C12.8749 14.524 12.5068 15.0111 12.0371 15.347C11.5797 15.6791 11.0394 15.8548 10.4874 15.8512C9.09367 15.8512 8.13055 15.5571 7.59837 14.9694C7.06619 14.381 6.79993 13.5829 6.79993 12.5752V5.67021H3.51172V4.38475H6.79993V1.46182L6.0484 0.654721V0H8.23246L9.05419 0.453375V4.38475L17.5561 4.35975L18.4018 5.26682L13.188 10.8614C13.5037 10.7263 13.8361 10.6415 14.1745 10.6093C14.7381 10.6093 15.3721 10.8026 16.0767 11.1891C16.7892 11.567 17.3372 12.0881 17.7205 12.7512C18.1042 13.4066 18.3507 14.0367 18.4605 14.6414C18.5779 15.2465 18.6367 15.7838 18.6367 16.2542C18.6367 17.3297 18.4251 18.329 18.0026 19.2535C17.5799 20.1772 16.9379 20.8659 16.0767 21.3197C15.2155 21.7734 14.2838 22 13.2819 22Z" fill="#2C7DF7"></path>
                                                        </svg>Tezos</div>
                                                    <div className="col-rankingg"><div className="author-pd">
                                                        <div className="avatar">
                                                            <img src="assets/images/author/avt-fv7.jpg" alt="images"/>
                                                        </div>
                                                        <a href="#" className="name">Hazel Middleton</a>
                                                    </div></div>
                                                    <div className="col-rankingg">0.45 Flow</div>
                                                    <div className="dot"><a href="#"><i className="far fa-ellipsis-h"></i></a></div>
                                                </div>
                                                <div className="table-btn">
                                                    <a href="#">Load more</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inner-content profile">
                                            <h4 className="title-dashboard">Edit Profile</h4>
                                            <form action="#" className="form-edit-profile">
                                                <div className="user-profile">
                                                    <div className="title">Contact details</div>
                                                    <fieldset>
                                                        <h6>Full Name</h6>
                                                        <input type="text" placeholder="Francisco Maia" required/>
                                                    </fieldset>
                                                    <fieldset>
                                                        <h6>Gender</h6>
                                                        <input type="text" placeholder="Female" required/>
                                                    </fieldset>
                                                    <fieldset>
                                                        <h6>Date of birth</h6>
                                                        <input type="text" placeholder="January 24, 1983" required/>
                                                    </fieldset>
                                                </div>
                                                <div className="user-profile">
                                                    <div className="title">Contact details</div>
                                                    <fieldset>
                                                        <h6>Email Address</h6>
                                                        <input type="text" placeholder="Francisco Maia" required/>
                                                    </fieldset>
                                                    <fieldset>
                                                        <h6>Gender</h6>
                                                        <input type="text" placeholder="seb.bennett@gmail.com" required/>
                                                    </fieldset>
                                                    <fieldset>
                                                        <h6>Address</h6>
                                                        <input type="text" placeholder="83222 Dicki View, South Pasqualeview, RI 79216-3100" required/>
                                                    </fieldset>
                                                </div>
                                                <button className="btn-form" type="submit">
                                                    Update Settings
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                 <Footer />
                </div>
               
            </div>
           

            <a id="scroll-top"></a>

            
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
export default ProviderHomePage;