import { useState } from "react";
import { useEffect } from "react";
import React, { useRef } from "react";
import ManipulateCat from "../../hooks/CategoryHook.jsx";
import APIAjout from"../../hooks/ApiHook.jsx";
import ManipulateVersion from "../../hooks/VersionHook.jsx";
import $ from "jquery";
import "datatables.net";
import CreateEndpointForm from "./CreateEndpointForm.jsx";
import AddGroupForm from "./CreateGroupEndpoint.jsx";
import EndpointTable from "./CommunComponants/endpointable.jsx";
import Monetizing from "./ModifyMonetize.jsx";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddVersion = ({selectedAPI, onReturnClick2}) => {
  $.noConflict();
  const provider_id = 1;
  /**************From hooks****************************/
  const { categories } = ManipulateCat();
  const { addNewAPI } = APIAjout();
  const { addVersion, checkIfVersionExists } = ManipulateVersion();
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
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  console.log("LOGO",selectedAPI.logo);
  const [formData, setFormData] = useState({
    num_version: "",
    description: "",
    api: selectedAPI.id_api,
    state:"",
    current: ''
    
  });
  console.log("FormData:",formData)
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
 console.log("Funct2:",functionalities);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submission logic goes here
    // Check if the version already exists for the selected API
    const versionExists = checkIfVersionExists(selectedAPI.id_api, formData.num_version);
    console.log("Vexist:",versionExists);
    // If version exists, display a toast message
    if (versionExists == true) {
        toast.error("Version already exists. Please choose a different version number.");
    }
    // Check if any field other than current is empty or not applicable
    Object.entries(formData).forEach(([key, value]) => {
    if (key !== "current" && (!value)) {
        toast.error(`${key.replace(/_/g, " ")} is required.`);
    }
    });
     
    // Check if functionalities array is empty
    if (functionalities.length === 0 || functionalities.some(func => func.trim() === "")) {
        toast.error("Please fill in version's functionalities.");
        
    }

    // Check if endpoints array is empty
    if (endpoints.length === 0) {
        toast.error("Please add at least one endpoint.");
        return;
    }
 //   alert(formData.num_version);
    addVersion(formData, functionalities, baseURLs, endpoints);
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

  const handleAddToGroup = (index) => {
    setEditedRowIndex(index);
    setGroupchoice(true);
  };
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const handleNumVersionChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Check if the version already exists for the selected API
    const versionExists = await checkIfVersionExists(selectedAPI.id_api, value);
    console.log("Vexist:",versionExists);
    // If version exists, display a toast message
    if (versionExists) {
      toast.error("Version already exists. Please choose a different version number.");
    }
  };


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

  return (
    <body>
      <div className="wrapper">
        <div className="page clearfix">
          <section className="page-title">
            <div className="tf-container">
              <div className="row">
                <div className="col-md-12"></div>
              </div>
            </div>
            <div className="returnButtonContainer">
                <button className="returnToAPIlist" onClick={onReturnClick2} title="Return to APIs">
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
          </section>
          <div class="row tf-container">
            <div class="col-md-12">
              <h4 className="page-title-heading" style={{ marginBottom: "5%" }}>
                Add New API version
              </h4>

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
                        <fieldset className="propertise">
                            <label className="mb8">Version Number</label>
                            <input
                                type="text"
                                id="num_version"
                                name="num_version"
                                placeholder="Version Number"
                                value={formData.num_version}
                                onChange={handleNumVersionChange}
                              //  required
                            />
                        </fieldset>

                        <fieldset class="message">
                          <label>Version Description*</label>
                          <textarea
                            id="description"
                            name="message"
                            rows="4"
                            placeholder="Description"
                            tabindex="4"
                            //  aria-required="true"
                          //  required
                            value={formData.description}
                            onChange={handleChange}
                          ></textarea>
                        </fieldset>

                        <fieldset className="propertise">
                          <label className="mb8">Version functionalities</label>
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
                              //  required
                              />
                            </li>
                          </ul>
                        </fieldset>
                        <div className="tf-tab">
                          <div className="content-tab">
                            <div className="content-inner active">
                              <div className="tab-create-item">
                                <div className="list">
                                  <div className="widget widget-category sc-product style2">
                                    <div>
                                      <h6 className="widget-title">Base URL</h6>
                                      <p style={{ margin: "3%" }}>
                                        Add a base URLs for this version 
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
                                          //  required
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
                                      <h5 className="title-preview">
                                        Version State
                                      </h5>
                                      <div className="sc-product style1">
                                        <div className="top">
                                            <div>
                                            <h6 className="title-preview">
                                                Choose The Version State
                                            </h6>
                                            </div>

                                            <div className="button-toggle mt0">
                                                <select
                                                    value={formData.state}
                                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                   // required
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Draft">Draft</option>
                                                    <option value="Deprecated">Deprecated</option>
                                                </select>
                                                {formData.state === "Active" && (
                                                    <div className="CurrentVersionCheckBox">
                                                    <span>Set the version as current</span>
                                                    <input
                                                        type="checkbox"
                                                        id="currentVersionCheckbox"
                                                        checked={formData.current}
                                                        onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                                                    />
                                                    <label htmlFor="currentVersionCheckbox">Current Version</label>
                                                    
                                                    </div>
                                                )}
                                            </div>
                                        </div>{" "}

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
                        

                            <div class="banner-collection-inner">
                              <div class="button-top" style={{marginBottom: "200px"}}>
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
                              <AddEndpointForm onSave={handleAddEndpoints} />
                            )}
                            {showGroupForm && (
                              <AddGroupForm onSave={handleAddGroup} />
                            )}
                         

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
                </section>
                <div
                  className="col-xl-3 col-lg-4 col-md-6"
                  style={{
                    display:
                      activeFilter === "#monetize-section" ? "none" : "block",
                  }}
                >
                  <h5 className="title-preview">Version Preview</h5>
                  <div className="sc-product style1">
                    <div className="top">
                      <a href="#" className="tag">
                        {selectedAPI.api_name}
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        
                        
                          <div className="avatar">
                            <img
                              src={selectedAPI.logo}
                              
                            />
                          </div>
                      
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

                        <div className="current-bid">

                          <div className="price">
                            <span className="cash">
                              Version: {formData.num_version}
                            </span>
                          </div>
                          <div className="author">
                            <div className="content">
                              <div
                                className=" tag"
                                style={{
                                  textDecorationLine: "underline",
                                  fontSize: "20px",
                                  marginBottom: "3%",
                                }}
                              >
                                Functionalities:
                              </div>
                              {functionalities && (
                                <div className="name">
                                  {functionalities.map((funct) => (
                                    <a
                                      href="#"
                                      style={{
                                        display: "block",
                                        fontSize: "17px",
                                      }}
                                    >
                                      -{funct}{" "}
                                    </a>
                                  ))}
                                </div>
                              )}
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
        <div
          className="modal fade popup"
          id="popup_bid"
          tabIndex="-1"
          aria-modal="true"
          role="dialog"
        >
          {/* Modal content for bidding */}
        </div>
        <ToastContainer />
      </div>
    </body>
  );
};

export default AddVersion;