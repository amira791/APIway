import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { Button, Input, Checkbox, Switch, Radio, Select, Tabs } from "antd";
import ManipulateTypes from "../../hooks/EndpointHook";
import ParamsTable from "./CommunComponants/paramTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Option } = Select;

const { TabPane } = Tabs;

const AddEndpointForm = ({ onSave }) => {
  //const [groups, setGroups] = useState([]);
  const { types } = ManipulateTypes();
  const [endpointName, setEndpointName] = useState("");
  const [endpointDesc, setEndpointDesc] = useState("");
  const [method, setMethod] = useState("GET");
  const [endpointPath, setEndpointPath] = useState("/");
  const [headers, setHeaders] = useState([]);
  const [queryParams, setQueryParams] = useState([]);

  const [body, setBody] = useState({
    mediaType: "application/json",
    payloadName: "",
    payloadValue: "",
    bodyExample: "",
  });
  const [dynamicTabs, setDynamicTabs] = useState([]);
  const [responseExamples, setResponseExamples] = useState([]);
  const [newExample, setNewExample] = useState({
    codeStatus: "",
    exampleName: "",
    responseBody: "",
  });
  const [isAddingNewExample, setIsAddingNewExample] = useState(false);
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(null);
  const [isEditingExample, setIsEditingExample] = useState(false);

  const handleAddNewExample = () => {
    if (!isEditingExample) {
      setIsAddingNewExample(true);
    }
  };

  const handleSaveNewExample = () => {
    setResponseExamples([...responseExamples, newExample]);
    setNewExample({ codeStatus: "", exampleName: "", responseBody: "" });
    setIsAddingNewExample(false);
  };

  const handleCancelAddNewExample = () => {
    setIsAddingNewExample(false);
  };

  const handleSelectResponseExample = (e) => {
    const index = e.target.value;
    if (index !== "") {
      setSelectedExampleIndex(parseInt(index));
      setIsEditingExample(true);
      setIsAddingNewExample(false);
    } else {
      setSelectedExampleIndex(null);
      setIsEditingExample(false);
    }
  };

  const handleEditExampleChange = (index, key, value) => {
    const updatedExamples = [...responseExamples];
    updatedExamples[index][key] = value;
    setResponseExamples(updatedExamples);
  };

  const handleConfirmEditExample = () => {
    setSelectedExampleIndex(null);
    setIsEditingExample(false);
  };

  const handleDeleteExample = () => {
    const updatedExamples = [...responseExamples];
    updatedExamples.splice(selectedExampleIndex, 1);
    setResponseExamples(updatedExamples);
    setSelectedExampleIndex(null);
    setIsEditingExample(false);
  };

  const handleCancelEditExample = () => {
    setSelectedExampleIndex(null);
    setIsEditingExample(false);
  };
  const handleEndpointPathChange = (e) => {
    const newPath = e.target.value;
    setEndpointPath(newPath);

    const regex = /{(.*?)}/g;
    let matches = [];
    let match;
    while ((match = regex.exec(newPath)) !== null) {
      matches.push(match[1]);
    }

    const newTabs = matches.map((name, index) => ({
      key: `dynamic_${index}`,
      title: name,
      content: name,
    }));

    setDynamicTabs(newTabs);

    // Adjust params array to match the length of dynamicTabs
    const newParams = newTabs.map((tab) => ({
      name: tab.content,
      type: "",
      value: "",
      required: false,
    }));
    setParams(newParams);
  };
  const [params, setParams] = useState([
    { name: "", type: "", value: "", required: false },
  ]);
  const handleParamChange = (index, key, value) => {
    const updatedParams = [...params];
    updatedParams[index][key] = value;
    setParams(updatedParams);
  };

  const handleSubmit = async () => {
    var formData = {};
    // Check if all required fields are filled
    const requiredFields = ["endpointName", "endpointDesc", "endpointPath"];
    const emptyFields = requiredFields.filter(
      (field) => !eval(field) && eval(field) !== 0
    );

    if (emptyFields.length > 0) {
      // Construct message indicating which fields are empty
      const emptyFieldsMessage = emptyFields.join(", ");
      toast.error(`Please fill in the following fields: ${emptyFieldsMessage}`);
      return; // Stop execution if any required field is empty
    }
    const emptyFieldIndex = dynamicTabs.findIndex((tab, index) => {
      return !params[index].value;
    });

    if (emptyFieldIndex !== -1) {
      toast.error("Please fill in all the fields in the params table.");
      return; // Stop execution if any field is empty
    }
    if (params.length === 1 && params[0].name == "") {
      formData = {
        name: endpointName,
        method: method,
        description: endpointDesc,
        path: endpointPath,
        params: null,
        headers: headers,
        queryParams: queryParams,
        body: body,
        responseExamples: responseExamples,
        group: null,
      };
    } else {
      formData = {
        name: endpointName,
        method: method,
        description: endpointDesc,
        path: endpointPath,
        params: params,
        headers: headers,
        queryParams: queryParams,
        body: body,
        responseExamples: responseExamples,
        group: null,
      };
    }
    ////alert("params is",params);

    try {
      //alert("params is",params);
      // Send endpoint data to parent component to save to database
      onSave(formData);
      // Clear form fields
      setEndpointName("");
      setMethod("GET");
      setEndpointPath("/");
      setHeaders([]);
      setParams([{ name: "", type: "", value: "", required: false }]);
      setQueryParams([]);
      setResponseExamples([]);
    } catch (error) {
      console.error("Error saving endpoint:", error);
    }
  };

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
        <h4>
         Add Endpoint
        </h4>
      </section>
      <section className="description-section">
        <div className="sub-section">
          <label>
            <span className="capitalize is-required infos-text">Name</span>
          </label>
          <div>
            <input
              data-id="endpointName"
              name="endpointName"
              placeholder="Name your endpoint"
              type="text"
              className="ant-input"
              value={endpointName}
              required="required"
              onChange={(e) => setEndpointName(e.target.value)}
            />
          </div>
        </div>
      </section>
      <section className="description-md-section section-with-md">
        <div className="sub-section">
          <label>
            <span className="capitalize is-required infos-text">Description</span>
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
                    required="required"
                  ></textarea>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="graphql-updater-section"></section>
      <div className="definition-inner-section">
        <section className="sc-wQkWr kawync">
          <div>
            <label>
              <span className="capitalize is-required infos-text">Methode</span>
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
            <span className="capitalize is-required infos-text">Path</span>
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
          <Tabs defaultActiveKey="headers" style={{fontSize:"20px"}}>
            <TabPane tab="Endpoint params" key="params" >
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
                      {dynamicTabs.map((tab, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              placeholder="Name"
                              value={tab.content}
                              disabled="true"
                              /*   onChange={(e) => handleParamChange(index, "name", e.target.value)} */
                            />
                          </td>
                          <td>
                            <select
                              onChange={(e) => {
                                handleParamChange(index, "name", tab.content);
                                handleParamChange(
                                  index,
                                  "type",
                                  e.target.value
                                );
                              }}
                            >
                              <option value="">Select type</option>
                              {types.map((type) => (
                                <option
                                  key={type.id_TypeParam}
                                  value={type.id_TypeParam}
                                >
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              placeholder="Value"
                              value={params[index] ? params[index].value : ""} // Check if params[index] exists before accessing its properties
                              onChange={(e) =>
                                handleParamChange(
                                  index,
                                  "value",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={params[index] ? params[index].required : false} 
                              onChange={(e) =>
                                handleParamChange(
                                  index,
                                  "required",
                                  e.target.checked
                                )
                              }
                            />
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
                <label className="capitalize is-required infos-text">Headers</label>

                <ParamsTable
                  data={headers}
                  params={["Key", "Example value", "Required"]}
                  onChange={handleHeaderChange}
                  onAddRow={handleAddHeader}
                  onDelete={handleDeleteHeader}
                  activeTab={"headers"}
                />
              </div>
            </TabPane>
            {method === "GET" && (
              <TabPane tab="Query Parameters" key="queryParameters">
                <div>
                  <label className="capitalize is-required infos-text">Query Parameters</label>

                  <ParamsTable
                    data={queryParams}
                    params={["Key", "Type", "Example value", "Required"]}
                    onAddRow={handleAddQueryParam}
                    onChange={handleQueryParamChange}
                    onDelete={handleDeleteQueryParam}
                    activeTab={"query"}
                  />
                </div>
              </TabPane>
            )}
            {(method === "POST" || method === "PUT" || method === "PATCH") && (
              <TabPane tab="Body" key="body">
                <div>
                  <label className="capitalize is-required infos-text">Media Type</label>
                  <select
                    value={body.mediaType}
                    onClick={(e) =>
                      setBody({ ...body, mediaType: e.target.value })
                    }
                  >
                    <option value="application/json">application/json</option>
                    <option value="application/xml">application/XML</option>
                    <option value="application/octet-stream">
                      application/octet-stream
                    </option>
                    <option value="text/plain">text/plain</option>
                    <option value="form-data">form-data</option>
                  </select>
                  <label className="capitalize is-required infos-text">Payload name</label>
                  <input
                    type="text"
                    value={body.payloadName}
                    onChange={(e) =>
                      setBody({ ...body, payloadName: e.target.value })
                    }
                    placeholder="Payload Name"
                  />
                  <label className="infos-text">Payload description</label>
                  <input
                    type="text"
                    value={body.payloadValue}
                    onChange={(e) =>
                      setBody({ ...body, payloadValue: e.target.value })
                    }
                    placeholder="Payload Description"
                  />
                  <fieldset class="message">
                    <label className="capitalize is-required infos-text">Enter un example</label>
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
            <TabPane tab="Response" key="response">
              <div>
                <select onChange={handleSelectResponseExample}>
                  <option value="">Select a response example</option>
                  {responseExamples.length === 0 ? (
                    <option disabled>No example inserted</option>
                  ) : (
                    responseExamples.map((example, index) => (
                      <option key={index} value={index}>
                        {example.codeStatus}
                      </option>
                    ))
                  )}
                </select>
                <button className="endpoints-btn" onClick={handleAddNewExample}>  <i className="far fa-plus"></i> Add New Example</button>
                {isAddingNewExample && (
                  <div>
                    <input
                      type="number"
                      value={newExample.codeStatus}
                      onChange={(e) =>
                        setNewExample({
                          ...newExample,
                          codeStatus: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={newExample.exampleName}
                      onChange={(e) =>
                        setNewExample({
                          ...newExample,
                          exampleName: e.target.value,
                        })
                      }
                      placeholder="Example Name"
                    />
                    <textarea
                      value={newExample.responseBody}
                      onChange={(e) =>
                        setNewExample({
                          ...newExample,
                          responseBody: e.target.value,
                        })
                      }
                      placeholder="Response Body"
                    ></textarea>
                    <button className="endpoints-btn" style={{background:"green"}} onClick={handleSaveNewExample}>  <i class="fa-solid fa-check"></i>  Confirm example</button>
                    <button className="endpoints-btn" onClick={handleCancelAddNewExample}> <i class="fa-solid fa-xmark"></i>  Cancel</button>
                  </div>
                )}
                {selectedExampleIndex !== null && (
                  <div>
                    {/* Display the form to edit the selected example */}
                    <input
                      type="number"
                      value={responseExamples[selectedExampleIndex].codeStatus}
                      onChange={(e) =>
                        handleEditExampleChange(
                          selectedExampleIndex,
                          "codeStatus",
                          e.target.value
                        )
                      }
                    />
                    <input
                      type="text"
                      value={responseExamples[selectedExampleIndex].exampleName}
                      onChange={(e) =>
                        handleEditExampleChange(
                          selectedExampleIndex,
                          "exampleName",
                          e.target.value
                        )
                      }
                      placeholder="Example Name"
                    />
                    <textarea
                      value={
                        responseExamples[selectedExampleIndex].responseBody
                      }
                      onChange={(e) =>
                        handleEditExampleChange(
                          selectedExampleIndex,
                          "responseBody",
                          e.target.value
                        )
                      }
                      placeholder="Response Body"
                    ></textarea>
                    <button  className="endpoints-btn" onClick={handleConfirmEditExample}>
                      Confirm Edit
                    </button>
                    <button bclassName="endpoints-btn" onClick={handleDeleteExample}>Delete</button>
                    <button className="endpoints-btn" onClick={handleCancelEditExample}> <i class="fa-solid fa-xmark"></i>Cancel</button>
                  </div>
                )}
              </div>
            </TabPane>
          </Tabs>
        </section>
      </div>

      <div className="action-btn-wrapper" style={{ marginBottom: "3%" }}>
        <button
          data-id="saveEndpoint"
          type="button"
        className="ant-btn ant-btn-primary endpoints-btn"
          onClick={handleSubmit}
        >
          <ToastContainer />
          <i class="fa-solid fa-bookmark"></i> <span>Save Endpoint</span>
        </button>
        <button
          data-id="cancelSaveEndpointButton"
          type="button"
          className="ant-btn endpoints-btn"
          style={{ backgroundColor: "red" }}
        >
          <i class="fa-solid fa-xmark"></i> <span>cancel</span>
        </button>
      </div>
    </div>
  );
};

export default AddEndpointForm;
