import React, { useState } from "react";
import { useEffect } from "react";
import Footer from "../global_componants/footer";
import Navbar from "../global_componants/navbar";
import DataTable from "../global_componants/Datatable";
import ManipulateCat from "../../hooks/CategoryHook";
import APIAjout from "../../hooks/APIHook";

const AddAPIPage = () => {
  const { categories } = ManipulateCat();
  const { addNewAPI } = APIAjout();
  const columns = [
    {
      Header: "Name",
      accessor: "name", // accessor is the "key" in your data
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Location",
      accessor: "location",
    },
  ];

  const data = [
    { name: "John", age: 30, location: "New York" },
    { name: "Jane", age: 25, location: "Los Angeles" },
    { name: "Doe", age: 40, location: "Chicago" },
  ];
  const [activeFilter, setActiveFilter] = useState("#general-section");
  const [termesAgreed, setTermsAgreed] = useState(false);
  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };
  const provider_id = 1;
  const [formData, setFormData] = useState({
    apiName: "",
    description: "",
    termOfUse: "",
    providerId: provider_id,
    categoryId: "",
    visibility: false,
    category: "",
    baseURLs: [""],
    logo: null,
  });
  const handleChange = (e, index) => {
    const { id, value } = e.target;
    if (id === "Api-visibility") {
      setFormData((prevState) => ({
        ...prevState,
        visibility: e.target.checked,
      }));
    } else if (id === "Api-baseURL") {
      const newBaseURLs = [...formData.baseURLs];
      newBaseURLs[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        baseURLs: newBaseURLs,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      logo: file,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submission logic goes here
    console.log(formData);
    addNewAPI(formData);
  };

  const handleAddURL = () => {
    setFormData((prevState) => ({
      ...prevState,
      baseURLs: [...prevState.baseURLs, ""],
    }));
  };


  return (
   
      
        <div>
          
  
          <div class="row tf-container">
            <div class="col-md-12">
              <div class="top-menu">
                <ul className="filter-menu">
                  <li
                    className={
                      activeFilter === "#general-section" ? "active" : ""
                    }
                  >
                    <a
                      href="#"
                      onClick={() => handleFilterClick("#general-section")}
                    >
                      General
                    </a>
                  </li>
                  <li
                    className={
                      activeFilter === "#definition-section" ? "active" : ""
                    }
                  >
                    <a
                      href="#"
                      onClick={() => handleFilterClick("#definition-section")}
                    >
                      Definitions
                    </a>
                  </li>
                  <li
                    className={activeFilter === "#doc-section" ? "active" : ""}
                  >
                    <a
                      href="#"
                      onClick={() => handleFilterClick("#doc-section")}
                    >
                      Documentation
                    </a>
                  </li>
                  <li className={activeFilter === "#pixel" ? "active" : ""}>
                    <a href="#" onClick={() => handleFilterClick("#pixel")}>
                      Gateway
                    </a>
                  </li>
                  <li className={activeFilter === "#music" ? "active" : ""}>
                    <a href="#" onClick={() => handleFilterClick("#music")}>
                      Community
                    </a>
                  </li>
                  <li className={activeFilter === "#abstract" ? "active" : ""}>
                    <a href="#" onClick={() => handleFilterClick("#abstract")}>
                      Monetize
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
                        <fieldset>
                          <label>Name your API*</label>
                          <input
                            id="Api-name"
                            type="text"
                            placeholder="E.G. Climat change API "
                            value={formData.apiName}
                            onChange={handleChange}
                          />
                        </fieldset>
                        <fieldset className="message">
                          <label>Choose a category*</label>
                          <div class="form-select">
                            <select
                              id="Api-category"
                              value={formData.categoryId}
                              onChange={handleCategoryChange}
                            >
                              <option value="">Select Category</option>
                              {categories.map((category) => (
                                <option
                                  key={category.id}
                                  value={category.value}
                                >
                                  {category.label}
                                </option>
                              ))}
                            </select>
                            <i class="icon-fl-down"></i>
                          </div>
                        </fieldset>

                        <fieldset class="message">
                          <label>Enter a description*</label>
                          <textarea
                            id="Api-description"
                            name="message"
                            rows="4"
                            placeholder="description"
                            tabindex="4"
                            aria-required="true"
                            required=""
                            value={formData.description}
                            onChange={handleChange}
                          ></textarea>
                        </fieldset>

                        <fieldset className="propertise">
                          <label className="mb8">Add functionality</label>
                          <ul className="propertise-list">
                            <li>
                              <a href="#">
                                Art<i className="fal fa-times"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Body type<i className="fal fa-times"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                Face color<i className="fal fa-times"></i>
                              </a>
                            </li>
                          </ul>
                        </fieldset>
                        <h1 className="title">Additional Information</h1>
                        <p className="sub">
                          They All Serve The Same Purpose, But Each One Takes.
                        </p>

                        <fieldset>
                          <label>Terms of Use (optional)</label>
                          <input
                            id="Api-terme_of_use"
                            type="text"
                            placeholder="E.G. After Purchase You Will Get A  T-Shirt"
                            value={formData.termOfUse}
                            onChange={handleChange}
                          />
                        </fieldset>
                        <div className="tf-tab">
                          <div className="content-tab">
                            <div className="content-inner active">
                              <div className="tab-create-item">
                                <h6 className="title">
                                  Drop file to upload or attach it (optional)
                                </h6>
                                <p className="sub">
                                  But Each One Takes A Different Approach And
                                  Makes Different Tradeoffs.
                                </p>
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
                                  <p className="sub-title">
                                    Maximum Size: 500 x 500px, JPEG / PNG
                                  </p>
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
                                              onChange={handleChange}
                                              disabled={termesAgreed}
                                              unselectable={termesAgreed}
                                            />
                                            <label htmlFor="Api-visibility">
                                              {formData.visibility
                                                ? "Make API Private"
                                                : "Make API Public"}
                                            </label>
                                          </div>
                                        </div>{" "}
                                        {!formData.visibility && (
                                          <label class="checkbox-item">
                                            <span class="custom-checkbox">
                                              <input
                                                type="checkbox"
                                                checked={termesAgreed}
                                                onChange={(e) =>
                                                  setTermsAgreed(
                                                    e.target.checked
                                                  )
                                                }
                                              />
                                              <span class="btn-checkbox"></span>
                                            </span>
                                            <span>
                                              {" "}
                                              I confirm that I own or have
                                              rights to publish this API
                                              according to the Hub{" "}
                                              <a href="">Terms of Service</a>
                                            </span>
                                          </label>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="widget widget-category sc-product style2">
                                    <div>
                                      <h6 className="widget-title">Base URL</h6>
                                      <p>
                                        Add a base URL, configure multiple URLs,
                                        override URLs, and select a load
                                        balancer
                                      </p>
                                      {formData.baseURLs.map((url, index) => (
                                        <fieldset key={index}>
                                          <label>URL {index + 1}</label>
                                          <input
                                            type="text"
                                            placeholder="Api base"
                                            value={url}
                                            onChange={(e) =>
                                              handleChange(e, index)
                                            }
                                          />
                                        </fieldset>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={handleAddURL}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="22"
                                          height="22"
                                          fill="currentColor"
                                          class="bi bi-plus-lg"
                                          viewBox="0 0 16 16"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                                          />
                                        </svg>{" "}
                                        Add URL
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/*   */}
                            </div>
                          </div>
                        </div>
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                    <div
                      id="definition-section"
                      style={{
                        display:
                          activeFilter === "#definition-section"
                            ? "block"
                            : "none",
                      }}
                    >
                      <h4 className="page-title-heading title">Definitions</h4>

                      <h3>Endpoints</h3>
                      <p className="sub mb22">
                        Changes made to the endpoints will be reflected in the
                        Hub. Add and define your API endpoints.
                      </p>
                      <div class="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <form action="#">
                            <div class="search-form2">
                              <input
                                type="text"
                                placeholder="Search keyword..."
                                required=""
                              />
                              <a class="btn-search">
                                <i class="icon-fl-search-filled"></i>
                              </a>
                            </div>
                          </form>

                          <div class="banner-collection-inner">
                            <div class="button-top">
                              <a href="#" class="btn-wishlish">
                                <i class="far fa-plus"></i> Create Endpoint
                              </a>
                              <a href="#" class="btn-wishlish">
                                <i class="far fa-plus"></i> Create Group
                              </a>
                              <div class="btn-option">
                                <i class="far fa-ellipsis-h"></i>
                                <div class="option_popup">
                                  <a href="#">Delete</a>
                                  <a href="#">Edit</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*   <DataTable columns={columns} data={data} />*/}
                    </div>
                    <div
                      id="doc-section"
                      style={{
                        display:
                          activeFilter === "#doc-section" ? "block" : "none",
                      }}
                    >
                      <h3>Documentation</h3>
                      <fieldset class="message">
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          placeholder="documentation"
                          tabindex="4"
                          aria-required="true"
                          required=""
                        ></textarea>
                      </fieldset>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6">
                  <h5 className="title-preview">API Preview</h5>
                  <div className="sc-product style1">
                    <div className="top">
                      <a href="#" className="tag">
                        Sweet Baby #1
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product4.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="featured-countdown">
                        <span
                          className="js-countdown"
                          data-timer="55555"
                          data-labels=" ,  h , m , s "
                        ></span>
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author1.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Creator</div>
                            <div className="name">
                              {" "}
                              <a href="#">Carly Webster</a>
                            </div>
                          </div>
                        </div>
                        <div className="current-bid">
                          <div className="subtitle">Current bid</div>
                          <div className="price">
                            <span className="cash">5 ETH</span>
                            <span className="icon">
                              <img
                                src="assets/images/icon/ethe.svg"
                                alt="images"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          <span className="icon-btn-product"></span> Place Bid
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        

    
    
  );
};

export default AddAPIPage;
