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
import API from "../../API.js";

const Details = () => {
    const { id } = useParams(); // Get the ID parameter from the URL
    const [activeTab, setActiveTab] = useState('Endpoints');
    const [apiDetails, setAPIDetails] = useState(null);
    const [apiCategory, setAPICategory] = useState(null);
    const [apiProvider, setAPIProvider] = useState(null);
    const [chosenVersion, setChosenVersion]= useState(null);
    const [apiVersions, setApiVersions] = useState([]);
    const [apiEndpoints, setApiEndpoints] = useState(null);
    const [chosenVersionState, setChosenVersionState] = useState(null);
    const { fetchAPIDetailsById,fetchAPICategorysById,fetchAPIProviderById,fetchAllAPIVersionsById,fetchAPIEndpointsByVersion,tarifTypes } = APIAjout();
    
    const handleVersionChange = (event) => {
      const selectedVersionId = event.target.value;
    //  alert(selectedVersionId);
      const selectedVersion = apiVersions.find(version => version.id_version == selectedVersionId);
      setChosenVersion(selectedVersionId);
      
      setChosenVersionState(selectedVersion.state);
      
    };
    
  
    const handleTabClick = (tabId) => {
      setActiveTab(tabId);
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
        
          const details = await fetchAPIDetailsById(id);
          console.log(details);
          const category = await fetchAPICategorysById(details.category);
          const provider = await fetchAPIProviderById(details.provider);
          const versions = await fetchAllAPIVersionsById(id);
          console.log(versions);
          const versionId = versions.length > 0 ? versions[0].id_version : null;
          setChosenVersion(versionId);
          setAPIDetails(details);
          setAPICategory(category);
          setAPIProvider(provider);
          setApiVersions(versions);
       
          if (versionId !== null) {
            const endpoints = await fetchAPIEndpointsByVersion(versionId);
            setApiEndpoints(endpoints);
            console.log(endpoints);
          }
          if (!apiEndpoints ) {
            return <div>Loading  Endpoints...</div>;
          }
        } catch (error) {
          console.error("Error fetching API details:", error);
        }
      };
      fetchData();
    }, [id]);
    
    useEffect(() => {
     
      const fetchData = async () => {
        try {
          if (chosenVersion !== null) {
            const endpoints = await fetchAPIEndpointsByVersion(chosenVersion);
            setApiEndpoints(endpoints);
            console.log(endpoints);
          }
        } catch (error) {
          console.error("Error fetching API endpoints:", error);
        }
      };
      fetchData();
    }, [chosenVersion]);
    
    if (!apiDetails ) {
      return <div>Loading...</div>;
    }
    if (!apiEndpoints ) {
      return <div>Loading  Endpoints...</div>;
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
                      <img src={apiDetails.logo} alt="Image" />
                     
                      
                    </div>
                    <div style={{ width: "100%"}} >
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"2%",gap:"20%"}}>
                        <div class="author">
                          <img
                            src="/assets/images/author/author-detail-3.png"
                            alt="Image"
                          />
                          <h6 class="title"  style={{fontSize:"17px"}}>Provider: {apiProvider.FR_first_name}  {apiProvider.FR_last_name}</h6>
                        </div>
                        <div class="wishlish" >
                          <div class="number-wishlish">
                            <i class="far fa-heart"></i>
                          </div>
                         {/*  <div class="option btn-option">
                            <i class="far fa-ellipsis-h"></i>
                            <div class="option_popup">
                              <a href="#">Delete</a>
                              <a href="#">Edit</a>
                            </div>
                          </div> */}
                        </div>
                        </div>
                        <div>
                          <p></p>
                        <h2 style={{display:"flex",alignItems:"center",paddingBottom:"2%",gap:"2%"}} class="title-detail">API name: <p>{apiDetails.api_name}</p> </h2>
                        <div class="author" style={{display:"flex",alignItems:"center",paddingBottom:"2%",gap:"2%"}}>
                          <h4 class="title" style={{fontSize:"25px"}}>Category:  </h4> <p style={{fontSize:"23px"}}>  {   apiCategory.label}</p>
                        </div>
                        <div class="author" style={{display:"flex",alignItems:"center",paddingBottom:"2%",gap:"2%"}}>
                          <h4 class="title" style={{fontSize:"25px"}}>Description:  </h4> <p style={{fontSize:"23px"}}> {apiDetails.description}</p>
                        </div>
                       
                      </div>
                      </div>
                      </div>
                      <div class="tf-tab">
                      <ul className="menu-tab" >
        <li className={activeTab === 'Endpoints' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleTabClick('Endpoints')} style={{fontSize:"25px"}}>Endpoints</a>
        </li>
        <li className={activeTab === 'About' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleTabClick('About')} style={{fontSize:"25px"}}>About</a>
        </li>
        <li className={activeTab === 'Discussion' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleTabClick('Discussion')} style={{fontSize:"25px"}}>Discussion</a>
        </li>
        <li className={activeTab === 'Pricing' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleTabClick('Pricing')} style={{fontSize:"25px"}}>Pricing</a>
        </li>
      </ul>
                        <div class="content-tab">
                        {activeTab === 'Endpoints' && (
          <div id="Endpoints" className="tab-content">
            <fieldset className="message" style={{display:"flex",justifyContent:"end",alignItems:"center",gap:"3%"}}>
                            <h6>Choose a version</h6>
                            <div class="form-select" >
                            <select onChange={handleVersionChange} value={chosenVersion}>
                                    {apiVersions.map(apiVersion => (
                                      <option key={apiVersion.id_version} value={apiVersion.id_version}>
                                        {apiVersion.num_version} ({apiVersion.state})
                                      </option>
                                    ))}
                                  </select>
                            </div>
                            </fieldset>
                            <div class="tab-details">
                           { apiEndpoints?    <Example endpoints={apiEndpoints} state={chosenVersionState} /> :<></>}
                            </div>
                          </div> )}
                      {activeTab === 'About' && (
          <div id="About" className="tab-content">
        
                            <ul class="tab-bid">
                              <li>
                                <div class="box-bid">
                                  <div class="image-bid">
                                    <img
                                      src="/assets/images/author/authour-bid-1.png"
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
                                      src="/assets/images/author/authour-bid-2.png"
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
                                      src="/assets/images/author/authour-bid-3.png"
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
                                      src="/assets/images/author/authour-bid-1.png"
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
                                      src="/assets/images/author/authour-bid-2.png"
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
                                      src="/assets/images/author/authour-bid-3.png"
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
                                      src="/assets/images/author/authour-bid-1.png"
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
                                      src="/assets/images/author/authour-bid-2.png"
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
                                      src="/assets/images/author/authour-bid-3.png"
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
                                      src="/assets/images/author/authour-bid-1.png"
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
                                      src="/assets/images/author/authour-bid-2.png"
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
                                      src="/assets/images/author/authour-bid-3.png"
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
                          </div>)}
                          {activeTab === 'Discussion' && (
          <div id="Discussion" className="tab-content">
                            <ul class="tab-history">
                              <li>
                                <div class="box-history">
                                  <div class="infor">
                                    <div class="img">
                                      <img
                                        src="/assets/images/author/author-history-1.jpg"
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
                                        src="/assets/images/author/author-history-2.jpg"
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
                                        src="/assets/images/author/author-history-3.jpg"
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
                                        src="/assets/images/author/author-history-4.jpg"
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
                                        src="/assets/images/author/author-history-1.jpg"
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
                                        src="/assets/images/author/author-history-2.jpg"
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
                                        src="/assets/images/author/author-history-3.jpg"
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
                                        src="/assets/images/author/author-history-4.jpg"
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
                          </div> )}
                          {activeTab === 'Pricing' && (
          <div id="Pricing" className="tab-content">
                        <PricingContainer id={id} tarifs={tarifTypes}/>
                          </div>)}
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
