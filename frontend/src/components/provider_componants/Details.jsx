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
import Forum from "../forum/Forum.jsx";

const Details = () => {
    const { id } = useParams(); // Get the ID parameter from the URL
    const [activeTab, setActiveTab] = useState('About');
    const [api , setAPI] = useState([])
    const [apiDetails, setAPIDetails] = useState([]);
    const [apiCategory, setAPICategory] = useState([]);
    const [apiProvider, setAPIProvider] = useState([]);
    const [chosenVersion, setChosenVersion]= useState([]);
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
          console.log("get the API ...")
          console.log(details)
          setAPI(details)
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
    <body className="body header-fixed">
      <div id="wrapper" className="wrapper-style">
        <div id="page" className="clearfix">
          <Navbar />
          <section className="tf-page-title-details ">
            <h4 className="page-title-heading">API Details</h4>
          </section>

          <section className="tf-item-detail">
            <div className="tf-container2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tf-item-detail-inner">
                   
                    <div className="content">
                      <div className="content-top">
                      <div className="image" style={{ width: "15%", height: "15%" }}>
                      <img src={apiDetails.logo} alt="Image" />
                     
                      
                    </div>
                    <div style={{ width: "100%"}} >
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"2%",gap:"20%"}}>
                        <div className="author">
                          <img
                            src="/assets/images/author/author-detail-3.png"
                            alt="Image"
                          />
                          <h6 className="title"  style={{fontSize:"17px"}}>Provider: {apiProvider.first_name}  {apiProvider.last_name}</h6>
                        </div>
                        <div className="wishlish" >
                          <div className="number-wishlish">
                            <i className="far fa-heart"></i>
                          </div>
                         {/*  <div className="option btn-option">
                            <i className="far fa-ellipsis-h"></i>
                            <div className="option_popup">
                              <a href="#">Delete</a>
                              <a href="#">Edit</a>
                            </div>
                          </div> */}
                        </div>
                        </div>
                        <div>
                          <p></p>
                        <h2 style={{display:"flex",alignItems:"center",paddingBottom:"2%",gap:"2%"}} className="title-detail">API name: <p>{apiDetails.api_name}</p> </h2>
                        <div className="author" style={{display:"flex",alignItems:"center",paddingBottom:"2%",gap:"2%"}}>
                          <h4 className="title" style={{fontSize:"25px"}}>Category:  </h4> <p style={{fontSize:"23px"}}>  {   apiCategory.label}</p>
                        </div>
                        <div className="author" style={{display:"flex",alignItems:"center",paddingBottom:"2%",gap:"2%"}}>
                          <h4 className="title" style={{fontSize:"25px"}}>Description:  </h4> <p style={{fontSize:"23px"}}> {apiDetails.description}</p>
                        </div>
                       
                      </div>
                      </div>
                      </div>
                      <div className="tf-tab">
                      <ul className="menu-tab" >
                      <li className={activeTab === 'About' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleTabClick('About')} style={{fontSize:"25px"}}>About</a>
        </li>
        <li className={activeTab === 'Endpoints' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleTabClick('Endpoints')} style={{fontSize:"25px"}}>Endpoints</a>
        </li>
        
        <li className={activeTab === 'Discussion' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleTabClick('Discussion')} style={{fontSize:"25px"}}>Discussion</a>
        </li>
        <li className={activeTab === 'Pricing' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleTabClick('Pricing')} style={{fontSize:"25px"}}>Pricing</a>
        </li>
      </ul>
                        <div className="content-tab">
                        {activeTab === 'Endpoints' && (
          <div id="Endpoints" className="tab-content">
            <fieldset className="message" style={{display:"flex",justifyContent:"end",alignItems:"center",gap:"3%"}}>
                            <h6>Choose a version</h6>
                            <div className="form-select" >
                            <select onChange={handleVersionChange} value={chosenVersion}>
                                    {apiVersions.map(apiVersion => (
                                      <option key={apiVersion.id_version} value={apiVersion.id_version}>
                                        {apiVersion.num_version} ({apiVersion.state})
                                      </option>
                                    ))}
                                  </select>
                            </div>
                            </fieldset>
                            <div className="tab-details">
                           { apiEndpoints?    <Example endpoints={apiEndpoints} state={chosenVersionState} /> :<></>}
                            </div>
                          </div> )}
                      {activeTab === 'About' && (
          <div id="About" className="tab-content">
        
                           <h3>{api.description}</h3>
                          </div>)}
                          {activeTab === 'Discussion' && (
                              <div id="Discussion" className="tab-content">
                                  <Forum forum_id={api.forum}/>
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