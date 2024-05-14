import ManipulateProv from "../../Hooks/ProviderHook";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ManipulateCat from "../../Hooks/CategoryHook";
import APIAjout from "../../Hooks/APIHook";
import VersionTable from "../provider_componants/APIversions";
import CustomPagination from "../global_componants/Pagination";
import Monetizing from "./ModifyMonetize";
import DataTable from "react-data-table-component";
const ProvAPIList = () => {
    const { providerAPIs,getApisByProvider  } = ManipulateProv();
    const [showUpdateSection, setShowUpdateSection] = useState(false);
    const [showVersionsSection, setShowVersionsSection] = useState(false);
    const [selectedAPI, setSelectedAPI] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page number
  //  const [Models, setModels] = useState([]); 
    const [showMonetizeSection, setShowMonetizeSection] = useState(false);
    const [showModifySection, setShowModifySection] = useState(true);
    const itemsPerPage = 5; // Number of APIs per page
    const totalAPIs = providerAPIs.length; // Total number of APIs
    const totalPages = Math.ceil(totalAPIs / itemsPerPage); // Calculate total pages
    const handleUpdateClick = (api) => {
      setSelectedAPI(api);
      setShowUpdateSection(true);
    };


    const handleReturnClick = () => {
      if(showMonetizeSection){
        window.location.reload();
      }else{setShowUpdateSection(false);}
      
    };

    const handleReturnClick2 = () => {
        setShowVersionsSection(false);
    };

    const handleVersions = (api) => {
        setSelectedAPI(api);
        setShowVersionsSection(true);
    };
    const { categories } = ManipulateCat();
    const { updateAPI } = APIAjout();
    const [activeFilter, setActiveFilter] = useState("#general-section");
    const [termesAgreed, setTermsAgreed] = useState(false);
    const handleFilterClick = (filterId) => {
      setActiveFilter(filterId);
    };
    const provider_id = 1;
    const [formData, setFormData] = useState({
        description: selectedAPI?.description || '',
        termOfUse: selectedAPI?.terms_of_use|| '',
        categoryId: selectedAPI?.category|| '',
        website: selectedAPI?.website|| '', 
        visibility: selectedAPI?.visibility || '',
        logo : selectedAPI?.logo || null
    });
    useEffect(() => {
        setFormData({
            description: selectedAPI?.description || '',
            termOfUse: selectedAPI?.terms_of_use || '',
            categoryId: selectedAPI?.category || '',
            website: selectedAPI?.website|| '', 
            visibility: selectedAPI?.visibility || '',
            logo : selectedAPI?.logo || null
        });
    }, [selectedAPI]);
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
          ...prevState,
          logo: file,
        }));
    };
    
   // console.log("formdata",formData);
    const handleSubmit = (e) => {
      e.preventDefault();

      //console.log("submittedForm",formData);
      if(window.confirm("Are you sure you want to save your modifications?")){
        updateAPI(selectedAPI.id_api,formData);
        window.location.reload();
      }
    };

    const handleToggleMonetizeSection = () => {
        setShowMonetizeSection(!showMonetizeSection);
        setShowModifySection(!showModifySection);
    };
    const columns= [
        {
            name:"Logo",
            selector:(row)=><img  height ={70} width={80} src={ row.logo}/>,
        },
        {
            name:"Name",
            selector:(row)=>row.api_name,
        },
        {
            name:"Website",
            selector:(row)=>row.website,
        },
        {
            name:"Category",
            selector:(row)=>row.category_label,
        },
        {
            name:"Visibility",
            selector:(row)=>row.visibility ? 'Visible' : 'Not Visible',
        },
        {
            name:"Action",
            cell:(row)=>(
                <><button className="update_btn" onClick={() => handleUpdateClick(row)} title="Update API">
                    <i className="fa-solid fa-pencil"></i>
                </button>
                <button className="update_btn" onClick={() => handleVersions(row)} title="Manage versions">
                    <i class="fa-solid fa-code-compare"></i>
                </button></>
            )

        }

    ];
    const [search, SetSearch]= useState('');
    const [filter, setFilter]= useState([]);
    useEffect(()=>{
        const result= providerAPIs.filter((item)=>{
         return item.api_name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    },[search]);
    const tableHeaderstyle={
        headCells:{
            style:{
                fontWeight:"bold",
                fontSize:"14px",
                backgroundColor: "#F5ECFF"
    
            },
        },
        pagination: {
            style: {
              width: '100%',
            },
            pageButtonsStyle: {
              borderColor: '#fff',
              
            },
            pageButtonsActiveStyle: {
              backgroundColor: '#fff',
              color: '#333',
            },
        },
        subHeader: {
            style: {
                backgroundColor: '#1f1f2cs',
                
            }
        },
        
    }

    return(
        <div>
            <div
                id="apis-section"
                style={{ display: !showUpdateSection && !showVersionsSection ? "block" : "none" }}
            > 
                <h4 className="title-dashboard">API List</h4>
{/*                 <div className="table-ranking top">
                    <div className="title-ranking">
                        <div className="col-rankingg">Logo</div>
                        <div className="col-rankingg">Name</div>
                        <div className="col-rankingg">WebSite</div>
                        <div className="col-rankingg">Category</div>
                        <div className="col-rankingg">Visibility</div>
                        <div className="col-rankingg">Action</div>
                    </div>
                </div>
                <div className="table-ranking">
                {providerAPIs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((api) => {
                  const logoFileNameWithExtension = api.logo.replace(/^.*[\\\/]/, '');
                  const logoFileName = logoFileNameWithExtension.split('%0D%0A')[0];
                  
                 
                    return (
                    <div className="content-ranking" key={api.id_api}>
                        <div className="col-rankingg">
                        <div className="image"><img src={api.logo} /></div>
                        </div>
                        <div className="col-rankingg">{api.api_name}</div>
                        <div className="col-rankingg">{api.website}</div>
                        <div className="col-rankingg">{api.category_label}</div>
                        <div className="col-rankingg">{api.visibility ? 'Visible' : 'Not Visible'}</div>
                        <div className="col-rankingg" style={{ display: 'flex', gap: '10px' }}>
                            <button className="update_btn"onClick={() => handleUpdateClick(api)} title="Update API">   
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button className="update_btn" onClick={() => handleVersions(api)} title="Manage versions">   
                                <i class="fa-solid fa-code-compare"></i>
                            </button>

                        </div>
                    </div>
                    );
                })}

                </div>
                
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={setCurrentPage}
                /> */}

               <React.Fragment>
                <DataTable
                    customStyles={ tableHeaderstyle}
                    columns={columns}
                    data={filter.length > 0 ? filter : providerAPIs}
                    pagination
                    fixedHeader
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                       <input type="text"
                       className="w-25 form-control"
                       placeholder="Search..."
                       value={ search}
                       onChange={(e)=>SetSearch(e.target.value)}
                       
                       />
                    }
                    subHeaderAlign="right"

                >

                </DataTable>
               </React.Fragment>
            </div>

            <div>
            {showUpdateSection && (
                <div id="update-section">
                    <div>
                        <h4 className="title-dashboard" style={{ display: "inline-block", marginRight: "600px" }}>Update Your API</h4>
                        <button onClick={handleReturnClick} title="Return to APIs"><i class="fa-solid fa-right-from-bracket"></i></button>
                        {showModifySection && (
                            <button
                                onClick={handleToggleMonetizeSection}
                                title="Toggle Monetize Section"
                            >
                                Modify pricing plans
                            </button>
                        )}
                    </div>
                    <div>
                    {showModifySection && (
                        <section className="add-nft tf-section tf-hot-pick tf-filter">
                            <div className="tf-container">
                            <div className="row ">
                                <div className="col-xl-9 col-lg-8 content-inner">
                                <div className="add-nft-inner">
                                    <div
                                    id="general-section"
                                    style={{
                                        display:
                                        activeFilter === "#general-section"
                                            ? "block"
                                            : "none",
                                    }}
                                    >
                                    <form onSubmit={handleSubmit}>
                                        <fieldset className="message">
                                            <label>API category</label>
                                            <div class="form-select">
                                                <select
                                                    id="Api-category"
                                                    value={formData.categoryId}
                                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                                >
                                                    <option value="">{selectedAPI.category_label}</option>
                                                    {categories.map((category) => (
                                                        <option
                                                            key={category.id}
                                                            value={category.id_category}
                                                        >
                                                            {category.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <i class="icon-fl-down"></i>
                                            </div>
                                        </fieldset>

                                        <fieldset class="message">
                                            <label>API description</label>
                                            <textarea
                                                id="Api-description"
                                                name="message"
                                                rows="4"
                                                tabindex="4"
                                                aria-required="true"
                                                required=""
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            
                                            ></textarea>
                                        </fieldset>

                                    <fieldset>
                                        <label>Terms of Use </label>
                                        <input
                                            id="Api-terme_of_use"
                                            type="text"
                                            value={formData.termOfUse}
                                            onChange={(e) => setFormData({ ...formData, termOfUse: e.target.value })}
                                        />
                                        </fieldset>
                                        <fieldset>
                                        <label>WebSite Link</label>
                                        <input
                                            id="website"
                                            type="text"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        />
                                        </fieldset>
                                        <div className="tf-tab">
                                        <div className="content-tab">
                                            <div className="content-inner active">
                                            <div className="tab-create-item">
                                                <h6 className="title">
                                                Drop file to upload or attach it 
                                                </h6>
                                                <div className="drag-upload">
                                                <input
                                                    type="file"
                                                    id="Api-logo"
                                                    accept="image/png, image/jpeg,image/jpg" // Set accepted file types
                                                    onChange={handleLogoChange}
                                                />
                                                <img
                                                    src="assets/images/svg/drap-upload.svg"
                                                    alt="Image"
                                                />
                                                <h6 className="title">Upload Logo</h6>
                                                </div>
                                                <div className="list">
                                                <div className="col-xl-12 col-lg-12 col-md-12">
                                                    <div>
                                                    <h5 className="title-preview">
                                                        API Visibility
                                                    </h5>
                                                    <p>
                                                        Switching your API visibility to{" "}
                                                        {formData.visibility
                                                        ? "Public"
                                                        : "Private"}{" "}
                                                        makes it{" "}
                                                        {formData.visibility
                                                        ? "searchable and accessible"
                                                        : "not visible on the Hub and new users can't access it"}{" "}
                                                        on the API Hub.
                                                    </p>
                                                    <div className="sc-product style1">
                                                        <div className="top">
                                                        <div>
                                                            <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30"
                                                            height="30"
                                                            fill="currentColor"
                                                            class="bi bi-lock-fill"
                                                            viewBox="0 0 16 16"
                                                            >
                                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h6 className="title-preview">
                                                            API Project is{" "}
                                                            {formData.visibility
                                                                ? "Public"
                                                                : "Private"}
                                                            </h6>
                                                            <p>
                                                            {formData.visibility
                                                                ? "It’s searchable and accessible"
                                                                : "It’s not visible on the Hub and new users can’t access it"}
                                                            </p>
                                                        </div>
                                                        <div className="button-toggle mt0">
                                                            <input
                                                            type="checkbox"
                                                            id="Api-visibility"
                                                            checked={formData.visibility}
                                                            onChange={(e) => setFormData({ ...formData, visibility: e.target.checked })}

                                                            />
                                                            <label htmlFor="Api-visibility">
                                                            {formData.visibility
                                                                ? "Make API Private"
                                                                : "Make API Public"}
                                                            </label>
                                                        </div>
                                                        </div>{" "}
                                                    </div>
                                                    </div>
                                                </div>

                                                </div>
                                            </div>

                                            
                                            </div>
                                        </div>
                                        </div>
                                        <button type="submit">Submit</button>
                                    </form>
                                    </div>

                                </div>
                                </div>
                            </div>
                            </div>
                        </section>
                    )}
                    {showMonetizeSection && (
                        <section
                            id="monetize-section"
                            className="tf-section tf-create-and-sell"
                        >
                            <div>
                                <h4 className="title-dashboard" style={{ display: "inline-block", marginRight: "600px" }}>Monetize Section</h4>
                            </div>
                            <Monetizing apiId={selectedAPI.id_api}/>
                        </section>
                    )}
                    </div>
                </div>
            )}
            </div>
            <div>
            {showVersionsSection && (
                <div id="versions-section">
                    <div>
                        <h4 className="title-dashboard" style={{ display: "inline-block", marginRight: "600px" }}>Manage Versions</h4>
                        {/* <button onClick={handleReturnClick2} title="Return to APIs"><i class="fa-solid fa-right-from-bracket"></i></button> */}
                    </div>
                   
                    <VersionTable selectedAPI={selectedAPI} onReturnClick={handleReturnClick2}/>  

                </div>
            )}
            </div>
        </div>
    );
};
export default ProvAPIList;

