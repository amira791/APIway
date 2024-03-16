import { useState } from "react";
import { useEffect } from "react";
import React, { useRef } from "react";
import Footer from "../global_componants/footer.jsx";
import Navbar from "../global_componants/navbar.jsx";
import DataTable from "../global_componants/Datatable.jsx";
import ManipulateCat from "../../Hooks/CategoryHook.jsx";
import APIAjout from "../../Hooks/APIHook.jsx.jsx";
import $ from "jquery";
import "datatables.net";
import CreateEndpointForm from "./CreateEndpointForm.jsx";

const AddAPIPage = () => {
  const tableRef = useRef(null);
  $.noConflict();

  useEffect(() => {
    if (tableRef.current) {
      $("#example").DataTable();
    }
  }, [tableRef]);

  const [newFunctionality, setNewFunctionality] = useState("");
  const [functionalities, setFunctionalities] = useState([]);

  const handleInputChange = (e) => {
    setNewFunctionality(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && newFunctionality.trim() !== "") {
      e.preventDefault();
      setFunctionalities([...functionalities, newFunctionality.trim()]);
      setNewFunctionality("");
    }
  };
  const handleRemoveFunctionality = (indexToRemove) => {
    setFunctionalities((prevFunctionalities) =>
      prevFunctionalities.filter((_, index) => index !== indexToRemove)
    );
  };
  const { categories } = ManipulateCat();
  const { addNewAPI } = APIAjout();
  const columns = [
    {
      Header: "Name",
      accessor: "name",
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
  const [showForm, setShowForm] = useState(false);

  const handleCreateEndpoint = () => {
    setShowForm(true);
  };

  const handleSubmitForm = (formData) => {
    // Handle form submission here
    console.log("Form data:", formData);
    setShowForm(false); // Close the form after submission
  };
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
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      alert(checked);
      setFormData((prevState) => ({
        ...prevState,
        visibility: checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  const handleChanges = (e, index) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const updatedURLs = [...prevState.baseURLs];
      updatedURLs[index] = value; // Update the URL at the specified index
      return { ...prevState, baseURLs: updatedURLs };
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      logo: file, // Set logo field to the selected file
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;

    alert(categoryId);
    setFormData((prevState) => ({
      ...prevState,
      categoryId: categoryId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submission logic goes here

    alert(formData.apiName);
    addNewAPI(formData, functionalities);
  };

  const handleAddURL = () => {
    setFormData((prevState) => ({
      ...prevState,
      baseURLs: [...prevState.baseURLs, ""], // Add an empty string for the new URL
    }));
  };

  return (
    <body>
      <div className="wrapper">
        <div className="page clearfix">
          <Navbar />
          <section className="page-title">
            <div className="tf-container">
              <div className="row">
                <div className="col-md-12">
                  <h4 className="page-title-heading">Add New API</h4>
                </div>
              </div>
            </div>
          </section>
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
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <fieldset>
                          <label>Name your API*</label>
                          <input
                            id="apiName"
                            type="text"
                            placeholder="E.G. Climat change API "
                            onChange={handleChange}
                          />
                        </fieldset>
                        <fieldset className="message">
                          <label>Choose a category*</label>
                          <div class="form-select">
                            <select
                              id="categoryId"
                              onChange={handleCategoryChange}
                            >
                              <option value="">Select Category</option>
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
                          <label>Enter a description*</label>
                          <textarea
                            id="description"
                            name="message"
                            rows="4"
                            placeholder="Description"
                            tabindex="4"
                            aria-required="true"
                            required=""
                            onChange={handleChange}
                          ></textarea>
                        </fieldset>

                        <fieldset className="propertise">
                          <label className="mb8">Add functionality</label>
                          <ul className="propertise-list">
                            {functionalities.map((functionality, index) => (
                              <li key={index}>
                                {functionality}
                                <i
                                  className="fal fa-times"
                                  onClick={() =>
                                    handleRemoveFunctionality(index)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "5px",
                                  }}
                                ></i>
                              </li>
                            ))}
                            <li>
                              <input
                                type="text"
                                value={newFunctionality}
                                onChange={handleInputChange}
                                onKeyPress={handleInputKeyPress}
                                placeholder="Add new functionality..."
                              />
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
                            id="termOfUse"
                            type="text"
                            placeholder="Terms of Use"
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
                                    id="logo"
                                    accept="image/png, image/jpeg, image/jpg"
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

                                          <div class="button-toggle mt0">
                                            <input
                                              type="checkbox"
                                              id="switch1"
                                              onChange={handleChange}
                                              disabled={!termesAgreed}
                                            />
                                            <label for="switch1">
                                              {" "}
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
                                                onChange={(e) => {
                                                  setTermsAgreed(
                                                    e.target.checked
                                                  );

                                                  alert(termesAgreed);
                                                }}
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
                                            onChange={(e) =>
                                              handleChanges(e, index)
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
                          {/*   <form action="#">
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
                          </form> */}
                          <div>
                          <div class="banner-collection-inner">
                            <div class="button-top">
                              <a
                                href="#"
                                className="btn-wishlish"
                                onClick={handleCreateEndpoint}
                              >
                                <i className="far fa-plus"></i> Create Endpoint
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
                          {showForm && (
                                <CreateEndpointForm
                                  onSubmit={handleSubmitForm}
                                />
                              )}
                          </div>
                          <table
                            ref={tableRef}
                            id="example"
                            className="display"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>
                                  <input type="checkbox" id="select-all" />
                                  Select
                                </th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Adresse</th>
                                <th>Email</th>
                                <th>Adresse</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Airi Satou</td>
                                <td>Accountant</td>
                                <td>Tokyo</td>
                                <td>33</td>
                                <td>2008-11-28</td>
                                <td>$162,700</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Brielle Williamson</td>
                                <td>Integration Specialist</td>
                                <td>New York</td>
                                <td>61</td>
                                <td>2012-12-02</td>
                                <td>$372,000</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Herrod Chandler</td>
                                <td>Sales Assistant</td>
                                <td>San Francisco</td>
                                <td>59</td>
                                <td>2012-08-06</td>
                                <td>$137,500</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Rhona Davidson</td>
                                <td>Integration Specialist</td>
                                <td>Tokyo</td>
                                <td>55</td>
                                <td>2010-10-14</td>
                                <td>$327,900</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Colleen Hurst</td>
                                <td>Javascript Developer</td>
                                <td>San Francisco</td>
                                <td>39</td>
                                <td>2009-09-15</td>
                                <td>$205,500</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Sonya Frost</td>
                                <td>Software Engineer</td>
                                <td>Edinburgh</td>
                                <td>23</td>
                                <td>2008-12-13</td>
                                <td>$103,600</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Jena Gaines</td>
                                <td>Office Manager</td>
                                <td>London</td>
                                <td>30</td>
                                <td>2008-12-19</td>
                                <td>$90,560</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Quinn Flynn</td>
                                <td>Support Lead</td>
                                <td>Edinburgh</td>
                                <td>22</td>
                                <td>2013-03-03</td>
                                <td>$342,000</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="selected_students[]"
                                    value="student_id"
                                  />
                                </td>
                                <td>Charde Marshall</td>
                                <td>Regional Director</td>
                                <td>San Francisco</td>
                                <td>36</td>
                                <td>2008-10-16</td>
                                <td>$470,600</td>
                              </tr>
                            </tbody>
                          </table>
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
        <Footer />
        <div
          className="modal fade popup"
          id="popup_bid"
          tabIndex="-1"
          aria-modal="true"
          role="dialog"
        >
          {/* Modal content for bidding */}
        </div>
      </div>
    </body>
  );
};

export default AddAPIPage;
