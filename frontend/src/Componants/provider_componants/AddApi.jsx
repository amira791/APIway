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
import TextEditor from "./CommunComponants/textEditor.jsx";
import AddGroupForm from "./CreateGroupEndpoint.jsx";
import EndpointTable from "./CommunComponants/endpointable.jsx";
import Monetizing from "./Monetize.jsx";
import PlansAjout from "../../Hooks/MonetizationHook.jsx";

const AddAPIPage = () => {
  $.noConflict();
  const provider_id = 1;
  /**************From hooks****************************/
  const { categories } = ManipulateCat();
  const { addNewAPI } = APIAjout();
  const { addApiModels } = PlansAjout();
  const [Models, setModels] = useState([]); // Define and manage the Models array in the parent component

  /*****************************************************/
  const [groupColors, setGroupColors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [termesAgreed, setTermsAgreed] = useState(false);
  const [endpoints, setEndpoints] = useState([]);
  const [newFunctionality, setNewFunctionality] = useState("");
  const [functionalities, setFunctionalities] = useState([]);
  const [baseURLs, setBaseURLs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("#general-section");
  const [activeType, setActiveType] = useState("#endpoints-section");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [firstGrp, setFirstGrp] = useState("");
  const [groupchoice, setGroupchoice] = useState(false);
  const tableRef = useRef(null);
  const tableRef2 = useRef(null);
  const [formData, setFormData] = useState({
    apiName: "",
    description: "",
    termOfUse: "",
    providerId: provider_id,
    categoryId: "",
    visibility: false,
    category: "",
    website: "",
    /*    baseURLs: [""], */
    logo: null,
  });
  /*  useEffect(() => {
    if (tableRef.current) {
      $("#example").DataTable();
    }
  }, [tableRef]);
 */

  const handleDeleteEndpoint = (endpointId) => {
    const updatedEndpoints = [...endpoints];
    console.log("00" + endpointId);
    // Find the index of the endpoint to update
    const endpointIndex = updatedEndpoints.findIndex(
      (endpoint) => endpoint.name === endpointId
    );
    console.log(endpointIndex);
    // Update the group of the endpoint at the found index
    /* if (endpointIndex !== -1) {
    } */

    updatedEndpoints.splice(endpointIndex, 1);
    setEndpoints(updatedEndpoints);
  };

  /****************************************************************************** */
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

  const handleSubmitForm = (formData) => {
    // Handle form submission here
    console.log("Form data:", formData);
    setShowForm(false); // Close the form after submission
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleTypeClick = (TypeId) => {
    setActiveType(TypeId);
  };
  const handleAddEndpoints = (newEndpoint) => {
    console.log("endpoints1");
    console.log(endpoints);
    setEndpoints([...endpoints, newEndpoint]);
    console.log("endpoints2");
    console.log(endpoints);
    $("#example").DataTable().destroy();
  };

  const handleAddGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
    console.log(endpoints);
    // $("#example2").DataTable().destroy();
  };

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

  const handleCreateEndpoint = () => {
    if (showGroupForm === true) {
      setShowGroupForm(false);
    }
    setShowForm(true);
  };
  const handleCreateGroup = () => {
    if (showForm === true) {
      setShowForm(false);
    }
    setShowGroupForm(true);
  };
  const [editedRowIndex, setEditedRowIndex] = useState(null);

  const handleChanges = (e, index) => {
    const { value } = e.target;
    const updatedURLs = [...baseURLs];
    updatedURLs[index] = value; // Update the URL at the specified index
    setBaseURLs(updatedURLs);
  };

  const handleAddURL = () => {
    setBaseURLs([...baseURLs, ""]); // Add an empty string for the new URL
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
    setFormData((prevState) => ({
      ...prevState,
      category: categories.at(categoryId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submission logic goes here

    alert(formData.apiName);
    addNewAPI(formData, functionalities, baseURLs, endpoints, Models);
  };
  const handleRemoveEndpointFromGroup = (endpointId) => {
    const updatedEndpoints = endpoints.map((endpoint) => {
      if (endpoint.name === endpointId) {
        return { ...endpoint, group: null }; // Remove the endpoint from the group
      }
      return endpoint;
    });
    setEndpoints(updatedEndpoints);
  };

  const handleAddEndpointToGroup = (groupName, endpointId) => {
    // Create a copy of the endpoints array
    const updatedEndpoints = [...endpoints];
    console.log("11" + groupName + "00" + endpointId);
    // Find the index of the endpoint to update
    const endpointIndex = updatedEndpoints.findIndex(
      (endpoint) => endpoint.name === endpointId
    );
    console.log(endpointIndex);
    // Update the group of the endpoint at the found index
    if (endpointIndex !== -1) {
      updatedEndpoints[endpointIndex] = {
        ...updatedEndpoints[endpointIndex],
        group: groupName,
      };
      console.log("updatedEndpoints");
      console.log(updatedEndpoints);
      // Set the updated endpoints state
      setEndpoints(updatedEndpoints);
      console.log("endpoints");
      console.log(endpoints);
    }
  };

  /*   const handleAddURL = () => {
    setFormData((prevState) => ({
      ...prevState,
      baseURLs: [...prevState.baseURLs, ""], // Add an empty string for the new URL
    }));
  };
 */
  const handleAddToGroup = (index) => {
    setEditedRowIndex(index);
    setGroupchoice(true);
  };
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };
  /* 
  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
    
  }, []); */
  useEffect(() => {
    const colors = {};
    groups.forEach((group) => {
      colors[group.name] = getRandomColor();
    });
    setGroupColors(colors);
  }, [groups]);
  useEffect(() => {
    // Check if there's only one group
    if (groups.length === 1) {
      // Set the selected group to the name of the single group
      setSelectedGroup(groups[0].name);
    }
  }, [groups]); // This effect will run whenever the groups array changes

  useEffect(() => {
    console.log("Updated endpoints:", endpoints);
  }, [endpoints]);

  useEffect(() => {
    console.log("Updated groups:", groups);
  }, [groups]);

  // Function to group endpoints by their group names
  const groupedEndpoints = endpoints.reduce((acc, endpoint) => {
    const groupName = endpoint.group || "Ungrouped"; // If endpoint has no group, assign it to an "Ungrouped" group
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(endpoint);
    return acc;
  }, {});

  useEffect(() => {
    // Initialize DataTable when component mounts
    if (tableRef.current && !$.fn.DataTable.isDataTable("#example")) {
      $(tableRef.current).DataTable();
    }

    // Destroy DataTable when component unmounts to avoid memory leaks
  }, []);

  useEffect(() => {
    // Update DataTable when endpoints change
    $(tableRef.current).DataTable();
  }, [endpoints, groups]);
  /*  useEffect(() => {
    // Update DataTable when endpoints change
   $(tableRef.current).DataTable();
      
    
  }, []);
 */
  return (
    <body>
      <div className="wrapper">
        <div className="page clearfix">
          <Navbar />
          <section className="page-title">
            <div className="tf-container">
              <div className="row">
                <div className="col-md-12">
                  </div>
              </div>
            </div>
          </section>
          <div class="row tf-container">
            <div class="col-md-12">
            <h4 className="page-title-heading" style={{marginBottom:"5%"}}>Add New API</h4>
               
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
                  <li
                    className={
                      activeFilter === "#monetize-section" ? "active" : ""
                    }
                  >
                    <a
                      href="#"
                      onClick={() => handleFilterClick("#monetize-section")}
                    >
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
                                  key={category.label}
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
                                 
                                  <div class="widget widget-category sc-product style2">
                                    <div>
                                      <h6 className="widget-title" style={{marginBottom:"3%"}}>Website</h6>

                                      <fieldset>
                                        <input
                                          id="website"
                                          type="text"
                                          placeholder="https://"
                                          onChange={handleChange}
                                        />
                                      </fieldset>
                                    </div>
                                  </div>
                                  <div className="widget widget-category sc-product style2">
                                    <div>
                                      <h6 className="widget-title">Base URL</h6>
                                      <p style={{margin:"3%"}}>
                                        Add a base URL, configure multiple URLs,
                                        override URLs, and select a load
                                        balancer
                                      </p>
                                      {baseURLs.map((url, index) => (
                                        <fieldset key={index}>
                                          <label>URL {index + 1}</label>
                                          <input
                                            type="text"
                                            placeholder="Api base"
                                            value={url}
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
                                        Add URL
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div>
                                      <h5 className="title-preview" >
                                        API Visibility
                                      </h5>
                                      <p style={{margin:"3%"}}>
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
                                            <span style={{fontSize:"20px"}} >
                                           
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
                     {/*  <h4 className="page-title-heading title">Definitions</h4> */}

                      <h3>Endpoints</h3>
                      <p className="sub mb22">
                        Changes made to the endpoints will be reflected in the
                        Hub. Add and define your API endpoints.
                      </p>
                      <div class="row">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <div>
                            <div class="banner-collection-inner">
                              <div class="button-top">
                                <a
                                  href="#"
                                  className="btn-wishlish"
                                  onClick={handleCreateEndpoint}
                                >
                                  <i className="far fa-plus"></i> Create
                                  Endpoint
                                </a>

                                <a
                                  href="#"
                                  class="btn-wishlish"
                                  onClick={handleCreateGroup}
                                >
                                  <i class="far fa-plus"></i> Create Group
                                </a>
                              </div>
                            </div>
                            {showForm && (
                              <CreateEndpointForm onSave={handleAddEndpoints} />
                            )}
                            {showGroupForm && (
                              <AddGroupForm onSave={handleAddGroup} />
                            )}
                          </div>

                          <div
                            id="endpoints-section"
                            style={{
                              display:
                                activeType === "#endpoints-section"
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <EndpointTable
                              endpoints={endpoints}
                              onDelete={handleDeleteEndpoint}
                              onAddTogroup={handleAddEndpointToGroup}
                              groups={groups}
                              onRemoveFromGroup={handleRemoveEndpointFromGroup}
                              handleAdding={handleAddToGroup}
                            />
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
                <section
                  id="monetize-section"
                  style={{
                    display:
                      activeFilter === "#monetize-section" ? "block" : "none",
                  }}
                  class="tf-section tf-create-and-sell"
                >
                  <Monetizing Models={Models} setModels={setModels} />
                  {/*   <div class="tf-container">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="tf-heading style-2 mb40 wow fadeInUp">
                          <h4 class="heading">Choose your plan</h4>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <div
                          class="tf-create wow fadeInUp"
                          data-wow-delay="0.2s"
                        >
                          <div class="icon">
                            <img
                              src="assets/images/svg/icon-create-1.svg"
                              alt="Image"
                            />
                          </div>
                          <h6 class="title">
                            <a href="#"> BASIC</a>
                          </h6>
                          <div class="button-toggle">
                            <input type="checkbox" id="switch" />
                            <label for="switch"></label>
                          </div>
                          <p class="content">
                            Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit
                            Voluptatem Accusantium Doloremque
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <div
                          class="tf-create wow fadeInUp"
                          data-wow-delay="0.4s"
                        >
                          <div class="icon">
                            <img
                              src="assets/images/svg/icon-create-2.svg"
                              alt="Image"
                            ></img>
                          </div>
                          <h6 class="title">
                            <a href="#">PRO</a>{" "}
                          </h6>
                          <div class="button-toggle">
                            <input type="checkbox" id="switch2" />
                            <label for="switch2"></label>
                          </div>
                          <p class="content">
                            Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit
                            Voluptatem Accusantium Doloremque
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <div
                          class="tf-create wow fadeInUp"
                          data-wow-delay="0.6s"
                        >
                          <div class="icon">
                            <img
                              src="assets/images/svg/icon-create-3.svg"
                              alt="Image"
                            />
                          </div>
                          <h6 class="title">
                            <a href="#">ULTRA</a>{" "}
                          </h6>
                          <div class="button-toggle">
                            <input type="checkbox" id="switch4" />
                            <label for="switch4"></label>
                          </div>
                          <p class="content">
                            Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit
                            Voluptatem Accusantium Doloremque
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-3 col-md-6">
                        <div
                          class="tf-create wow fadeInUp"
                          data-wow-delay="0.8s"
                        >
                          <div class="icon">
                            <img
                              src="assets/images/svg/icon-create-4.svg"
                              alt="Image"
                            />
                          </div>
                          <h6 class="title">
                            <a href="#">MEGA</a>
                          </h6>
                          <div class="button-toggle">
                            <input type="checkbox" id="switch5" />
                            <label for="switch5"></label>
                          </div>
                          <p class="content">
                            Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit
                            Voluptatem Accusantium Doloremque
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </section>
                <div
                  className="col-xl-3 col-lg-4 col-md-6"
                  style={{
                    display:
                      activeFilter === "#monetize-section" ? "none" : "block",
                  }}
                >
                  <h5 className="title-preview">API Preview</h5>
                  <div className="sc-product style1">
                    <div className="top">
                      <a href="#" className="tag">
                        {formData.apiName}
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        {formData.logo && (
                          <div className="avatar">
                            <img
                              src={URL.createObjectURL(formData.logo)}
                              alt="Uploaded Logo"
                            />
                          </div>
                        )}{" "}
                      </div>
                    
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        {/*    
                        
                        functionalities
                        <div className="author">
                          {formData.logo && (
                            <div className="avatar">
                              <img
                                src={URL.createObjectURL(formData.logo)}
                                alt="Uploaded Logo"
                              />
                            </div>
                          )}
                          <div className="content">
                            <div className="position">{formData.category}</div>
                            <div className="name">
                              {" "}
                              <a href="#">Carly Webster </a>
                            </div>
                          </div>
                        </div> */}
                        <div className="current-bid">
                       {/* {formData.categoryId &&  (<div className="subtitle">{formData.category}</div>)} 
                       */}    <div className="price">
                            <span className="cash">The API is:  {formData.visibility?"Visible": "Not visible"}</span>
                          
                          </div>
                          <div className="author">
                         
                          <div className="content">
                            
                            <div className=" tag" style={{ textDecorationLine: "underline" ,fontSize:"20px",marginBottom:"3%"}} >Functionalities:</div>
                           {functionalities && <div className="name">
                            
                             {
                             functionalities.map((funct)=>
                             <a href="#" style={{display:"block" ,fontSize:"17px"}}>-{funct} </a>)}
                            </div>}
                          </div>
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
