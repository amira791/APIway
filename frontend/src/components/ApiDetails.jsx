// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // Update this line
// import Navbar from './global_components/navbar';
// import Footer from './global_components/footer';
// import Card from './global_components/Card';
// import useApi from '../hooks/ApiHook';
// import { Link } from 'react-router-dom';

// const ApiDetails = () => {
//     // const { Api ,fetchApi } = useApi();
//     const { logo } = useParams(); // Get API ID from URL params
//     const [apiDetails, setApiDetails] = useState(null);


//     // useEffect(() => {
//     //     // Fetch API details using the API ID
//     //     axios.get(`http://127.0.0.1:8000/apis/${id}`)
//     //       .then(response => {
//     //         setApiDetails(response.data);
//     //       })
//     //       .catch(error => {
//     //         console.error('Error fetching API details:', error);
//     //       });
//     //   }, [id]);
//     //  useEffect(() => {
//     //     console.log("id",api_id);
//     //     fetchApi(api_id);
//     //  }, [api_id]);

//     // const logoFileName = Api.logo.replace(/^.*[\\\/]/, '');
//     // console.log("logoFileName",logoFileName);
//     // const imagePath = `/assets/images/${logoFileName}`;

//     return (
//         <>
       
//     <div id="wrapper" class="wrapper-style">
//         <div id="page" class="clearfix">
            

//         <section class="tf-page-title ">    
//                 <div class="tf-container">
//                     <div class="row">
//                         <div class="col-md-12">

//                             <ul class="breadcrumbs">
//                                 <li><Link to={'/'}>Home</Link></li>
//                                 <li><Link to={'/searchApi'}>Explore</Link></li>
//                                 <li>Item Details</li>
//                             </ul>
//                             <h4 class="page-title-heading">Item Details</h4>
//                         </div>
//                     </div>
//                 </div>                    
//             </section>

//             <section class="tf-item-detail">
//                 <div class="tf-container">
//                     <div class="row">
//                         <div class="col-md-12">
//                             <div class="tf-item-detail-inner">
//                                 <div class="image">
//                                     <img src="assets/images/apiLogo.jpg" alt="Image"/>
//                                 </div>
//                                 <div class="content">
//                                     <div class="content-top">
//                                         <div class="author">
//                                             <img src="assets/images/author/author-detail-3.png" alt="Image"></img>
//                                             <h6 class="title">Trending Arts</h6>
//                                         </div>
//                                         <div class="wishlish">
//                                             <div class="number-wishlish"><i class="far fa-heart"></i>68</div>
//                                             <div class="option btn-option"><i class="far fa-ellipsis-h"></i>
//                                                 <div class="option_popup">
//                                                     <a href="#">Delete</a>
//                                                     <a href="#">Edit</a>
//                                                 </div></div>
//                                         </div>
//                                     </div>
//                                     <h2 class="title-detail">Wicked Cranium #4449</h2>
//                                     <p class="except">A Collection Of 10,000 Undead NFTs Minted On The Ethereum Blockchain. Each Unique Deadfella Is Randomly Generated From A Combination.</p>
//                                     <div class="tf-tab">
//                                         <ul class="menu-tab ">
//                                             <li class="tab-title active">
//                                                 <a href="#">Details</a>
//                                             </li>
//                                             <li class="tab-title ">
//                                                 <a href="#">Bids</a>
//                                             </li>
//                                             <li class="tab-title">
//                                                 <a href="#">History</a>
//                                             </li>
                                            
//                                         </ul>
//                                         <div class="content-tab">
//                                             <div class="content-inner active" >
//                                                 <div class="tab-details">
//                                                     <div class="top">
//                                                         <div class="author">
//                                                             <div class="heading">Current Owner</div>
//                                                             <div class="infor">
//                                                                 <img src="assets/images/author/author-detail-1.png" alt="Image"></img>
//                                                                 <h6 class="name">Surrogatess</h6>
//                                                             </div>
//                                                         </div>
//                                                         <div class="author">
//                                                             <div class="heading">Creator</div>
//                                                             <div class="infor">
//                                                                 <img src="assets/images/author/author-detail-2.png" alt="Image"></img>
//                                                                 <h6 class="name">Truman Wallaker</h6>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div class="title-propepties">Properties</div>
//                                                     <ul class="properties">
//                                                         <li><a href="#"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                             <path d="M6 11.375L1.09375 7.53125L0 8.375L6 13.0312L12 8.375L10.9062 7.53125L6 11.375ZM6 9.65625L10.9062 5.84375L12 5L6 0.34375L0 5L1.09375 5.84375L6 9.65625ZM6 2.03125L9.8125 5L6 7.96875L2.1875 5L6 2.03125Z" fill="white"/>
//                                                             </svg>Background: Blue</a></li>
//                                                         <li><a href="#"><svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                             <path d="M10.125 8.28125L7.96875 7.21875C8.8125 6.53125 9.375 5.5 9.375 4.34375C9.375 2.3125 7.71875 0.65625 5.71875 0.65625C3.6875 0.65625 2.03125 2.3125 2.03125 4.34375C2.03125 5.75 2.875 7 4.03125 7.59375V9.78125C2.625 9.46875 2.6875 9.46875 2.53125 9.46875C2.1875 9.46875 1.84375 9.625 1.59375 9.875L0.65625 10.8125L4.0625 14.2188C4.34375 14.5 4.75 14.6562 5.15625 14.6562H9.375C10 14.6562 10.5625 14.1875 10.6875 13.5625L11.2188 10.4062C11.3438 9.53125 10.9062 8.6875 10.125 8.28125ZM9.90625 10.1875L9.375 13.3438H5.15625C5.09375 13.3438 5.03125 13.3125 5 13.2812L2.53125 10.8125L5.375 11.4062V4.34375C5.375 4.15625 5.53125 4 5.71875 4C5.90625 4 6.03125 4.15625 6.03125 4.34375V8.34375H7.21875L9.53125 9.5C9.78125 9.625 9.9375 9.90625 9.90625 10.1875ZM3.375 4.34375C3.375 3.03125 4.4375 2 5.71875 2C7 2 8.03125 3.03125 8.03125 4.34375C8.03125 4.96875 7.78125 5.53125 7.375 5.96875V4.34375C7.375 3.40625 6.625 2.65625 5.71875 2.65625C4.78125 2.65625 4.03125 3.40625 4.03125 4.34375V5.96875C3.625 5.53125 3.375 4.96875 3.375 4.34375Z" fill="white"/>
//                                                             </svg>Mouth Grade: Fresh</a></li>
//                                                         <li><a href="#"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                             <path d="M6.34375 3.65625H7.65625V5H6.34375V3.65625ZM6.34375 6.34375H7.65625V10.3438H6.34375V6.34375ZM7 0.34375C3.3125 0.34375 0.34375 3.3125 0.34375 7C0.34375 10.6875 3.3125 13.6562 7 13.6562C10.6875 13.6562 13.6562 10.6875 13.6562 7C13.6562 3.3125 10.6875 0.34375 7 0.34375ZM7 12.3438C4.0625 12.3438 1.65625 9.9375 1.65625 7C1.65625 4.0625 4.0625 1.65625 7 1.65625C9.9375 1.65625 12.3438 4.0625 12.3438 7C12.3438 9.9375 9.9375 12.3438 7 12.3438Z" fill="white"/>
//                                                             </svg>2400 x 2278 px (1.72MB)</a></li>
//                                                         <li><a href="#"><svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                             <path d="M5 5C6.28125 5 7.34375 3.96875 7.34375 2.65625C7.34375 1.375 6.28125 0.34375 5 0.34375C3.71875 0.34375 2.65625 1.375 2.65625 2.65625C2.65625 3.96875 3.71875 5 5 5ZM5 1.65625C5.5625 1.65625 6 2.125 6 2.65625C6 3.21875 5.5625 3.65625 5 3.65625C4.4375 3.65625 4 3.21875 4 2.65625C4 2.125 4.4375 1.65625 5 1.65625ZM5.03125 8.34375H2.1875C2.84375 8 3.96875 7.65625 5 7.65625C5.0625 7.65625 5.15625 7.6875 5.21875 7.6875C5.46875 7.1875 5.84375 6.78125 6.3125 6.46875C5.84375 6.375 5.375 6.34375 5 6.34375C3.4375 6.34375 0.34375 7.125 0.34375 8.65625V9.65625H5V8.65625C5 8.5625 5 8.4375 5.03125 8.34375ZM10 6.65625C8.78125 6.65625 6.34375 7.34375 6.34375 8.65625V9.65625H13.6562V8.65625C13.6562 7.34375 11.2188 6.65625 10 6.65625ZM10.8125 5.46875C11.3125 5.15625 11.6562 4.625 11.6562 4C11.6562 3.09375 10.9062 2.34375 10 2.34375C9.09375 2.34375 8.34375 3.09375 8.34375 4C8.34375 4.625 8.6875 5.15625 9.1875 5.46875C9.4375 5.59375 9.71875 5.65625 10 5.65625C10.2812 5.65625 10.5625 5.59375 10.8125 5.46875Z" fill="white"/>
//                                                             </svg>
//                                                             Head: Bowlcut</a></li>
//                                                         <li><a href="#"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                             <path d="M1.65625 13.6562V8.65625H0.65625V5C0.65625 4.28125 1.28125 3.65625 2 3.65625H4C4.71875 3.65625 5.34375 4.28125 5.34375 5V8.65625H4.34375V13.6562H1.65625ZM10 13.6562V9.65625H12L10.3125 4.59375C10.125 4.03125 9.625 3.65625 9.03125 3.65625H8.96875C8.375 3.65625 7.875 4.03125 7.6875 4.59375L6 9.65625H8V13.6562H10ZM3 3C3.75 3 4.34375 2.40625 4.34375 1.65625C4.34375 0.9375 3.75 0.34375 3 0.34375C2.25 0.34375 1.65625 0.9375 1.65625 1.65625C1.65625 2.40625 2.25 3 3 3ZM9 3C9.75 3 10.3438 2.40625 10.3438 1.65625C10.3438 0.9375 9.75 0.34375 9 0.34375C8.25 0.34375 7.65625 0.9375 7.65625 1.65625C7.65625 2.40625 8.25 3 9 3Z" fill="white"/>
//                                                             </svg>
//                                                             Body: Red</a></li>
//                                                         <li><a href="#" class="active">See more</a></li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                             <div class="content-inner">                                               
//                                                 <ul class="tab-bid">
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-1.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-2.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-3.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-1.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-2.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-3.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-1.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-2.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-3.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-1.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-2.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-bid">
//                                                             <div class="image-bid">
//                                                                 <img src="assets/images/author/authour-bid-3.png" alt="Image"></img>
//                                                             </div>
//                                                             <div class="infor">
//                                                                 <div class="history"><span class="price">1.35 ETH</span> by <span class="name">carlisle</span></div>
//                                                                 <div class="time">3/26/2022, 7:28 AM</div>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                 </ul>
//                                             </div>
//                                             <div class="content-inner" >
//                                                 <ul class="tab-history">
//                                                     <li>
//                                                         <div class="box-history">
//                                                             <div class="infor">
//                                                                 <div class="img"><img src="assets/images/author/author-history-1.jpg" alt="Image"></img></div>
//                                                                 <div class="content">
//                                                                     <h6 class="name">Mason Woodward <span>place a bid</span></h6>
//                                                                     <p class="time">8 hours ago</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div class="price">
//                                                                 <p>4.89 ET</p>
//                                                                 <span>= $12.245</span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-history">
//                                                             <div class="infor">
//                                                                 <div class="img"><img src="assets/images/author/author-history-2.jpg" alt="Image"></img></div>
//                                                                 <div class="content">
//                                                                     <h6>Violet Pascall <span>place a bid</span></h6>
//                                                                     <p class="time">8 hours ago</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div class="price">
//                                                                 <p>4.89 ET</p>
//                                                                 <span>= $12.245</span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-history">
//                                                             <div class="infor">
//                                                                 <div class="img"><img src="assets/images/author/author-history-3.jpg" alt="Image"></img></div>
//                                                                 <div class="content">
//                                                                     <h6>Camilla Hudson <span>place a bid</span></h6>
//                                                                     <p class="time">8 hours ago</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div class="price">
//                                                                 <p>4.89 ET</p>
//                                                                 <span>= $12.245</span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-history">
//                                                             <div class="infor">
//                                                                 <div class="img"><img src="assets/images/author/author-history-4.jpg" alt="Image"></img></div>
//                                                                 <div class="content">
//                                                                     <h6>Derick Reed <span>place a bid</span></h6>
//                                                                     <p class="time">8 hours ago</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div class="price">
//                                                                 <p>4.89 ET</p>
//                                                                 <span>= $12.245</span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-history">
//                                                             <div class="infor">
//                                                                 <div class="img"><img src="assets/images/author/author-history-1.jpg" alt="Image"></img></div>
//                                                                 <div class="content">
//                                                                     <h6>Mason Woodward <span>place a bid</span></h6>
//                                                                     <p class="time">8 hours ago</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div class="price">
//                                                                 <p>4.89 ET</p>
//                                                                 <span>= $12.245</span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-history">
//                                                             <div class="infor">
//                                                                 <div class="img"><img src="assets/images/author/author-history-2.jpg" alt="Image"></img></div>
//                                                                 <div class="content">
//                                                                     <h6>Violet Pascall <span>place a bid</span></h6>
//                                                                     <p class="time">8 hours ago</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div class="price">
//                                                                 <p>4.89 ET</p>
//                                                                 <span>= $12.245</span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-history">
//                                                             <div class="infor">
//                                                                 <div class="img"><img src="assets/images/author/author-history-3.jpg" alt="Image"></img></div>
//                                                                 <div class="content">
//                                                                     <h6>Camilla Hudson <span>place a bid</span></h6>
//                                                                     <p class="time">8 hours ago</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div class="price">
//                                                                 <p>4.89 ET</p>
//                                                                 <span>= $12.245</span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                     <li>
//                                                         <div class="box-history">
//                                                             <div class="infor">
//                                                                 <div class="img"><img src="assets/images/author/author-history-4.jpg" alt="Image"></img></div>
//                                                                 <div class="content">
//                                                                     <h6>Derick Reed <span>place a bid</span></h6>
//                                                                     <p class="time">8 hours ago</p>
//                                                                 </div>
//                                                             </div>
//                                                             <div class="price">
//                                                                 <p>4.89 ET</p>
//                                                                 <span>= $12.245</span>
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                 </ul>
//                                             </div>
//                                         </div>                           
//                                     </div>
//                                     <div class="content-bottom">
//                                         <div class="heading">
//                                             <h6>Top bid</h6>
//                                             <div class="price"><div class="icon"><i class="fab fa-ethereum"></i></div><span>3.52 ETH ($9118.1 USD)</span></div>
//                                         </div>
//                                         <div class="button">
//                                             <a href="#" class="tf-button" data-toggle="modal" data-target="#popup_bid">Place your bid</a>
//                                             <a href="#" class="tf-button">Save for later</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             </div>
//             </div>
// <script src="assets/js/jquery.min.js"></script>
// <script src="assets/js/jquery.easing.js"></script>
// <script src="assets/js/bootstrap.min.js"></script>
// <script src="assets/js/plugin.js"></script>
// <script src="assets/js/count-down.js"></script>
// <script src="assets/js/switchmode.js"></script>
// <script src="assets/js/shortcodes.js"></script>
// <script src="assets/js/main.js"></script>
// </>
//     );
// };

// export default ApiDetails;