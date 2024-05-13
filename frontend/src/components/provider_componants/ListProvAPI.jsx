import ManipulateProv from "../../../src/hooks/ProviderHook";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ManipulateCat from "../../../src/hooks/CategoryHook";
import APIAjout from "../../../src/hooks/ApiHook";
const ProvAPIList = () => {
    const { providerAPIs } = ManipulateProv();
    const [showUpdateSection, setShowUpdateSection] = useState(false);
    const [selectedAPI, setSelectedAPI] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const handleUpdateClick = (api) => {
      setSelectedAPI(api);
      setShowUpdateSection(true);
      
    };

    const handleReturnClick = () => {
      setShowUpdateSection(false);
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
    
    console.log("formdata",formData);
    const handleSubmit = (e) => {
      e.preventDefault();
      // Your submission logic goes here
      console.log("submittedForm",formData);
      updateAPI(selectedAPI.id_api,formData);
    };
  


    return(
        <div>
            <div
                id="apis-section"
                style={{ display: !showUpdateSection ? "block" : "none" }}
            > 
                <h4 className="title-dashboard">API List</h4>
                <div className="table-ranking top">
                    <div className="title-ranking">
                        <div className="col-rankingg"><a href="#">Logo</a></div>
                        <div className="col-rankingg"><a href="#">Name</a></div>
                        <div className="col-rankingg"><a href="#">Base Link</a></div>
                        <div className="col-rankingg"><a href="#">Category</a></div>
                        <div className="col-rankingg"><a href="#">Visibility</a></div>
                        <div className="col-rankingg"><a href="#">Action</a></div>
                    </div>
                </div>
                <div className="table-ranking">
                {providerAPIs.map((api) => {
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
                        <div className="col-rankingg">
                            <button onClick={() => handleUpdateClick(api)} title="Update API">   
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                        </div>
                    </div>
                    );
                })}
                <div className="table-btn">
                    <a href="#">Load more</a>
                </div>
                </div>
                


            </div>
            <div>
            {showUpdateSection && (
                <div id="update-section">
                    <div>
                        <h4 className="title-dashboard" style={{ display: "inline-block", marginRight: "600px" }}>Update Your API</h4>
                        <button onClick={handleReturnClick} title="Return to APIs"><i class="fa-solid fa-right-from-bracket"></i></button>
                    </div>
                    <div>
          
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
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};
export default ProvAPIList;

