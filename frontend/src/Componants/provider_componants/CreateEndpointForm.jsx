import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { Button, Input, Checkbox, Switch, Radio, Select, Tabs } from "antd";
import ManipulateTypes from "../../Hooks/EndpointHook";
import ParamsTable from "./CommunComponants/headerTable";
import TransformationTable from "./CommunComponants/trandformationsTable";

const { Option } = Select;

const { TabPane } = Tabs;

const AddEndpointForm = ({ onSave }) => {
  //const [groups, setGroups] = useState([]);
  const { types } = ManipulateTypes();
  const [endpointName, setEndpointName] = useState("");
  const [endpointDesc, setEndpointDesc] = useState("");
  const [externalDocUrl, setExternalDocUrl] = useState("");
  const [externalDocDescription, setExternalDocDescription] = useState("");
  const [method, setMethod] = useState("GET");
  const [endpointPath, setEndpointPath] = useState("/");
  const [headers, setHeaders] = useState([]);
  const [queryParams, setQueryParams] = useState([]);
  

  const [body, setBody] = useState({
    mediaType: "application/json",
    payloadName: "",
    payloadValue: "",
  });
  const [dynamicTabs, setDynamicTabs] = useState([]);

  const handleEndpointPathChange = (e) => {
    const newPath = e.target.value;
    setEndpointPath(newPath);

    // Regular expression to match text enclosed within curly braces {}
    const regex = /{(.*?)}/g;
    let matches = [];
    let match;
    while ((match = regex.exec(newPath)) !== null) {
      matches.push(match[1]); // Extracted names from curly braces
    }

    // Create dynamic tabs for each match found
    const newTabs = matches.map((name, index) => ({
      key: `dynamic_${index}`,
      title: name,
      content: name,
    }));

    setDynamicTabs(newTabs);
  };
 
  const handleSubmit = async () => {
    const formData = {
      name: endpointName,
      method: method,
      description: endpointDesc,
      path: endpointPath,
      externalDocUrl: externalDocUrl,
      externalDocDescription: externalDocDescription,
      params: dynamicTabs,
      headers: headers,
      queryParams: queryParams,
      body:body,
      group: null 
    };

    try {
      // Send endpoint data to parent component to save to database
      onSave(formData);
      // Clear form fields
      setEndpointName("");
      setMethod("GET");
      setExternalDocUrl("");
      setExternalDocDescription("");
      setEndpointPath("/");
      setHeaders([]);
      setQueryParams([]);
    } catch (error) {
      console.error("Error saving endpoint:", error);
    }
  };
  /* const handleAddToGroup = (endpoint) => {
    // Logic to add the endpoint to the selected group
    const updatedEndpoint = { ...endpoint, group: selectedGroup };
    onSave(updatedEndpoint);
  }; */
  /*   const handlePathChange = (e) => {
    setEndpointPath(e.target.value);
  };

  const handleHeadersChange = (e) => {
    setHeaders(e.target.value);
  };

  const handleQueryParametersChange = (e) => {
    setQueryParams(e.target.value);
  }; */

  const handleAddHeader = (newRow) => {
    setHeaders([...headers, newRow]);
  };

  const handleAddQueryParam = (newRow) => {
    setQueryParams([...queryParams, newRow]);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleHeaderChange = (index, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = value;
    setHeaders(updatedHeaders);
  };

  const handleQueryParamChange = (index, value) => {
    const updatedQueryParams = [...queryParams];
    updatedQueryParams[index] = value;
    setQueryParams(updatedQueryParams);
  };
  

  const handleDeleteHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
  };

  const handleDeleteQueryParam = (index) => {
    const updatedQueryParams = [...queryParams];
    updatedQueryParams.splice(index, 1);
    setQueryParams(updatedQueryParams);
  };

 
  return (
    <div className="ant-spin-container">
      <section className="sc-wQkWr kawync">
        <h5 className="sc-dmlrTW jWdUg title">
          <span>Add Endpoint</span>
        </h5>
      </section>
      <section className="description-section">
        <div className="sub-section">
          <label>
            <span className="capitalize is-required">Name</span>
          </label>
          <div>
            <input
              data-id="endpointName"
              name="endpointName"
              placeholder="Name your endpoint"
              type="text"
              className="ant-input"
              value={endpointName}
              onChange={(e) => setEndpointName(e.target.value)}
            />
          </div>
        </div>
      </section>
      <section className="description-md-section section-with-md">
        <div className="sub-section">
          <label>
            <span className="capitalize is-required">Description</span>
          </label>
          <br />
          <div>
            <div className="sc-fTNIDv enJrlk">
              <div>
                <fieldset class="message">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Description"
                    tabindex="4"
                    value={endpointDesc}
                    onChange={(e) => setEndpointDesc(e.target.value)}
                    aria-required="true"
                    required=""
                  ></textarea>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="sc-eQdLTE jpYRrF">
        <section className="external-doc-section ">
          <div className="sub-section">
            <label>
              <span>External Doc URL</span>
            </label>
            <div>
              <input
                required
                name="url"
                placeholder="External link to more information"
                type="text"
                data-id="external-doc-url"
                className="ant-input"
                value={externalDocUrl}
                onChange={(e) => setExternalDocUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="sub-section">
            <label>
              <span>External Doc Description</span>
            </label>
            <div>
              <input
                required
                name="description"
                placeholder="Brief label for external link"
                type="text"
                data-id="external-doc-description"
                className="ant-input"
                value={externalDocDescription}
                onChange={(e) => setExternalDocDescription(e.target.value)}
              />
            </div>
          </div>
        </section>
      </div>
      <section className="graphql-updater-section"></section>
      <div className="definition-inner-section">
        <section className="sc-wQkWr kawync">
          <div>
            <label>
              <span>Methode</span>
            </label>

            <div
              className="ant-select sc-eYAzsh kDxVzo ant-select-single ant-select-show-arrow"
              data-id="selectMethod"
            >
              {/* Method selection dropdown */}
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
          <label>
            <span>Path</span>
          </label>
          <div>
            <input
              data-id="endpointPath"
              name="PathParamsInput"
              placeholder="Specify the endpoint path relative to the base URL"
              type="text"
              className="ant-input"
              value={endpointPath}
              onChange={handleEndpointPathChange}
            />
          </div>
        </section>
        {/* Tab section for headers, query parameters, etc. */}
        <section className="tab-section">
          <Tabs defaultActiveKey="headers">
            <TabPane tab="Endpoint params" key="params">
              {dynamicTabs.length === 0 ? (
                <p>No parameters yet.</p>
              ) : (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Example Value</th>
                        <th>Required</th>
                      
                      </tr>
                    </thead>
                    <tbody>
                      {dynamicTabs.map((tab) => (
                        <tr>
                          <td>{tab.content}</td>
                          <td>
                            {" "}
                            <select
                              id="typeId" /* onChange={handletypeChange} */
                            >
                              <option value="">Select type</option>
                              {types.map((type) => (
                                <option key={type.id_type} value={type.name}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            {" "}
                            <input type="text" placeholder="Example" />
                          </td>
                          <td>
                            <input type="checkbox" name="selected_students[]" />
                          </td>
                        
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabPane>
            <TabPane tab="Headers" key="headers">
              <div>
                <label>Headers</label>

                <ParamsTable
                  data={headers}
                  params={["Key", "Type", "Example value", "Required"]}
                  onChange={handleHeaderChange}
                  onAddRow={handleAddHeader}
                  onDelete={handleDeleteHeader}
                  activeTab={'headers'}
                />
              </div>
            </TabPane>
            {method === "GET" && (
              <TabPane tab="Query Parameters" key="queryParameters">
                <div>
                  <label>Query Parameters</label>

                  <ParamsTable
                    data={queryParams}
                    params={["Key", "Type", "Example value", "Required"]}
                    onAddRow={handleAddQueryParam}
                    onChange={handleQueryParamChange}
                    onDelete={handleDeleteQueryParam}
                    activeTab={'query'}
                  />
                </div>
              </TabPane>
            )}
            {(method === "POST" || method === "PUT" || method === "PATCH") && (
              <TabPane tab="Body" key="body">
                <div>
                  <label>Media Type</label>
                  <select
                    value={body.mediaType}
                    onClick={(e) =>
                      setBody({ ...body, mediaType: e.target.value })
                    }
                  >
                    <option value="application/json">application/json</option>
                    <option value="application/xml">application/XML</option>
                    <option value="application/octet-stream">application/octet-stream</option>
                    <option value="text/plain">text/plain</option>
                    <option value="form-data">form-data</option>
                  
                  </select>
                  <label>Payload name</label>
                  <input
                    type="text"
                    value={body.payloadName}
                    onChange={(e) =>
                      setBody({ ...body, payloadName: e.target.value })
                    }
                    placeholder="Payload Name"
                  />
                  <label>Payload description</label>
                  <input
                    type="text"
                    value={body.payloadValue}
                    onChange={(e) =>
                      setBody({ ...body, payloadValue: e.target.value })
                    }
                    placeholder="Payload Value"
                  />
                    <fieldset class="message">
                          <label>Enter un example</label>
                          <textarea
                            id="description"
                            name="message"
                            rows="4"
                            placeholder="Example"
                            tabindex="4"
                            aria-required="true"
                            required=""
                            onChange={(e) =>
                              setBody({ ...body, bodyExample: e.target.value })
                            }
                          ></textarea>
                        </fieldset>
                </div>
              </TabPane>
            )}
     
          </Tabs>
        </section>
      </div>

      <div className="action-btn-wrapper" style={{marginBottom:"3%"}}>
        <button
          data-id="saveEndpoint"
          type="button"
          className="ant-btn ant-btn-primary"
          onClick={handleSubmit}
        >
        <i class="fa-solid fa-bookmark"></i>  <span>save</span>
        </button>
        <button
          data-id="cancelSaveEndpointButton"
          type="button"
          className="ant-btn"
          style={{backgroundColor:"red"}}
        >
        <i class="fa-solid fa-xmark"></i>  <span>cancel</span>
        </button>
      </div>
    </div>
  );
};

export default AddEndpointForm;
