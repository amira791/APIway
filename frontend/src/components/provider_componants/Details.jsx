import React, { useState, useEffect } from "react";
import APIAjout from "../../hooks/APIHook2.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../global_components/navbar.jsx";
import Footer from "../global_components/footer.jsx";
import EndpointExacTable from "./CommunComponants/EndpointExecTable.jsx";

import Example from "./CommunComponants/execTab.jsx";
import PricingContainer from "./PricingPlan.jsx";
import { useParams } from "react-router-dom";

const Details = () => {
    const { id } = useParams(); // Get the ID parameter from the URL

    const [apiDetails, setAPIDetails] = useState(null);
    const [apiCategory, setAPICategory] = useState(null);
    const [apiProvider, setAPIProvider] = useState(null);
    const { fetchAPIDetailsById,fetchAPICategorysById,fetchAPIProviderById } = APIAjout();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const details = await fetchAPIDetailsById(id);
         const category= await fetchAPICategorysById(details.category);
         const provider= await fetchAPIProviderById(details.provider);
         
          setAPIDetails(details);
          setAPICategory(category);
          setAPIProvider(provider);
        } catch (error) {
          console.error("Error fetching API details:", error);
        }
      };
      fetchData();
    }, []);
  
    if (!apiDetails) {
      return <div>Loading...</div>;
    }
  
  return (
    <body class="body header-fixed">
      <div id="wrapper" class="wrapper-style">
        <div id="page" class="clearfix">
          <Navbar />
          <section class="tf-page-title-details ">
            <h4 class="page-title-heading">API Details</h4>
          </section>

          <section class="tf-item-detail">
            <div class="tf-container2">
              <div class="row">
                <div class="col-lg-12">
                  <div class="tf-item-detail-inner">
                   
                    <div class="content">
                      <div class="content-top">
                      <div class="image" style={{ width: "15%", height: "15%" }}>
                      <img src="assets/images/item-details.jpg" alt="Image" />
                    </div>
                    <div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"2%"}}>
                        <div class="author">
                          <img
                            src="assets/images/author/author-detail-3.png"
                            alt="Image"
                          />
                          <h6 class="title">{apiProvider.FR_first_name}  {apiProvider.FR_last_name}</h6>
                        </div>
                        <div class="wishlish">
                          <div class="number-wishlish">
                            <i class="far fa-heart"></i>
                          </div>
                          <div class="option btn-option">
                            <i class="far fa-ellipsis-h"></i>
                            <div class="option_popup">
                              <a href="#">Delete</a>
                              <a href="#">Edit</a>
                            </div>
                          </div>
                        </div>
                        </div>
                        <div>
                        <h2 class="title-detail">{apiDetails.api_name}</h2>
                        <div class="author">
                          <h4 class="title">Category:  </h4> <p>  {   apiCategory.label}</p>
                        </div>
                      <p class="except">
                      {apiDetails.description}
                      </p>
                      </div>
                      </div>
                      </div>
                      <div class="tf-tab">
                        <ul class="menu-tab ">
                          <li class="tab-title active">
                            <a href="#">Endpoints</a>
                          </li>
                          <li class="tab-title ">
                            <a href="#">About</a>
                          </li>
                          <li class="tab-title ">
                            <a href="#">Discussion</a>
                          </li>
                          <li class="tab-title">
                            <a href="#">Pricing</a>
                          </li>
                        </ul>
                        <div class="content-tab">
                        
                          <div class="content-inner active">
                          <fieldset className="message" style={{display:"flex",justifyContent:"end",gap:"3%"}}>
                            <label>Choose a version</label>
                            <div class="form-select" >
                          <select>
                              <option value="v1">Version 1</option>
                              <option value="v2">Version 2</option>
                              <option value="v3">Version 3</option>
                            </select>
                            </div>
                            </fieldset>
                            <div class="tab-details">
                              <Example />
                            </div>
                          </div>
                          <div class="content-inner">
                            <ul class="tab-bid">
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-1.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-2.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-3.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-1.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-2.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-3.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-1.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-2.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-3.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-1.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-2.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="assets/images/author/authour-bid-3.png"
                                      alt="Image"
                                    />
                                  </div>
                                  <div class="infor">
                                    <div class="history">
                                      <span class="price">1.35 ETH</span> by{" "}
                                      <span class="name">carlisle</span>
                                    </div>
                                    <div class="time">3/26/2022, 7:28 AM</div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div class="content-inner">
                            <ul class="tab-history">
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="assets/images/author/author-history-1.jpg"
                                        alt="Image"
                                      />
                                    </div>
                                    <div class="content">
                                      <h6 class="name">
                                        Mason Woodward <span>place a bid</span>
                                      </h6>
                                      <p class="time">8 hours ago</p>
                                    </div>
                                  </div>
                                  <div class="price">
                                    <p>4.89 ET</p>
                                    <span>= $12.245</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="assets/images/author/author-history-2.jpg"
                                        alt="Image"
                                      />
                                    </div>
                                    <div class="content">
                                      <h6>
                                        Violet Pascall <span>place a bid</span>
                                      </h6>
                                      <p class="time">8 hours ago</p>
                                    </div>
                                  </div>
                                  <div class="price">
                                    <p>4.89 ET</p>
                                    <span>= $12.245</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="assets/images/author/author-history-3.jpg"
                                        alt="Image"
                                      />
                                    </div>
                                    <div class="content">
                                      <h6>
                                        Camilla Hudson <span>place a bid</span>
                                      </h6>
                                      <p class="time">8 hours ago</p>
                                    </div>
                                  </div>
                                  <div class="price">
                                    <p>4.89 ET</p>
                                    <span>= $12.245</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="assets/images/author/author-history-4.jpg"
                                        alt="Image"
                                      />
                                    </div>
                                    <div class="content">
                                      <h6>
                                        Derick Reed <span>place a bid</span>
                                      </h6>
                                      <p class="time">8 hours ago</p>
                                    </div>
                                  </div>
                                  <div class="price">
                                    <p>4.89 ET</p>
                                    <span>= $12.245</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="assets/images/author/author-history-1.jpg"
                                        alt="Image"
                                      />
                                    </div>
                                    <div class="content">
                                      <h6>
                                        Mason Woodward <span>place a bid</span>
                                      </h6>
                                      <p class="time">8 hours ago</p>
                                    </div>
                                  </div>
                                  <div class="price">
                                    <p>4.89 ET</p>
                                    <span>= $12.245</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="assets/images/author/author-history-2.jpg"
                                        alt="Image"
                                      />
                                    </div>
                                    <div class="content">
                                      <h6>
                                        Violet Pascall <span>place a bid</span>
                                      </h6>
                                      <p class="time">8 hours ago</p>
                                    </div>
                                  </div>
                                  <div class="price">
                                    <p>4.89 ET</p>
                                    <span>= $12.245</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="assets/images/author/author-history-3.jpg"
                                        alt="Image"
                                      />
                                    </div>
                                    <div class="content">
                                      <h6>
                                        Camilla Hudson <span>place a bid</span>
                                      </h6>
                                      <p class="time">8 hours ago</p>
                                    </div>
                                  </div>
                                  <div class="price">
                                    <p>4.89 ET</p>
                                    <span>= $12.245</span>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="assets/images/author/author-history-4.jpg"
                                        alt="Image"
                                      />
                                    </div>
                                    <div class="content">
                                      <h6>
                                        Derick Reed <span>place a bid</span>
                                      </h6>
                                      <p class="time">8 hours ago</p>
                                    </div>
                                  </div>
                                  <div class="price">
                                    <p>4.89 ET</p>
                                    <span>= $12.245</span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div class="content-inner active">
                        <PricingContainer/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
      <a id="scroll-top"></a>
    </body>
  );
};

export default Details;
