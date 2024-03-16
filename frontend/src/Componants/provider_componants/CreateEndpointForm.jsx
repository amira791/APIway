import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const AddEndpointForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    externalDocUrl: "",
    externalDocDescription: "",
    path: "/",
    method: "GET", // Assuming default method is GET
    headers: [], // Initialize headers array
    queryParameters: [], // Initialize queryParameters array
    rows: [], // Initialize generic rows array
    requestBody:
      "const axios = require('axios');\n const options = { \nmethod: 'GET',\nurl: 'https://ApiWAY.com/',\nheaders: {\n'X-ApiWAY-Key': '5bcf37c40cmshdee5def2d7c7762p13d764jsn072b95ed10e6',\n 'X-ApiWAY-Host': 'new319.p.ApiWAY.com'\n }\n};\n try {\n const response = await axios.request(options);\n console.log(response.data);\n} catch (error) {\n console.error(error)\n  }",
    requestTransformations: [],
    responseTransformations: [],
  });
  const [showHeaders, setShowHeaders] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [showRequestTransformations, setShowRequestTransformations] = useState(false);
  const [showResponseTransformations, setShowResponseTransformations] = useState(false);

  const toggleSection = (section) => {
    switch (section) {
      case "headers":
        setShowHeaders(!showHeaders);
        break;
      case "query":
        setShowQuery(!showQuery);
        break;
      case "body":
        setShowBody(!showBody);
        break;
      case "request-transformations":
        setShowRequestTransformations(!showRequestTransformations);
        break;
      case "response-transformations":
        setShowResponseTransformations(!showResponseTransformations);
        break;
      default:
        break;
    }
  };

  const addQueryParam = () => {
    setFormData((prevState) => ({
      ...prevState,
      queryParameters: [
        ...prevState.queryParameters,
        { name: "", type: "", exampleValue: "", required: false },
      ],
    }));
  };

  const handleChangeQueryParam = (e, index, field) => {
    const updatedQueryParams = [...formData.queryParameters];
    updatedQueryParams[index][field] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      queryParameters: updatedQueryParams,
    }));
  };

  const removeQueryParam = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      queryParameters: prevState.queryParameters.filter((_, i) => i !== index),
    }));
  };

  const addRequestTransformation = () => {
    setFormData((prevState) => ({
      ...prevState,
      requestTransformations: [
        ...prevState.requestTransformations,
        { name: "", type: "", exampleValue: "", required: false },
      ],
    }));
  };

  const handleChangeRequestTransformation = (e, index, field) => {
    const updatedTransformations = [...formData.requestTransformations];
    updatedTransformations[index][field] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      requestTransformations: updatedTransformations,
    }));
  };

  const addHeader = () => {
    setFormData((prevState) => ({
      ...prevState,
      headers: [...prevState.headers, ""],
    }));
  };
  const removeRequestTransformation = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      requestTransformations: prevState.requestTransformations.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addResponseTransformation = () => {
    setFormData((prevState) => ({
      ...prevState,
      responseTransformations: [
        ...prevState.responseTransformations,
        { name: "", type: "", exampleValue: "", required: false },
      ],
    }));
  };

  const handleChangeResponseTransformation = (e, index, field) => {
    const updatedTransformations = [...formData.responseTransformations];
    updatedTransformations[index][field] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      responseTransformations: updatedTransformations,
    }));
  };

  const removeResponseTransformation = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      responseTransformations: prevState.responseTransformations.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const removeHeader = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      headers: prevState.headers.filter((_, i) => i !== index),
    }));
  };

  const handleChangeHeader = (e, index) => {
    const updatedHeaders = [...formData.headers];
    updatedHeaders[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      headers: updatedHeaders,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const MethodOptions = ["GET", "POST", "PUT", "DELETE"];

  const defaultRow = {
    name: "",
    type: "string",
    exampleValue: "",
    required: false,
  };



  const addRow = () => {
    setFormData((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, { ...defaultRow }],
    }));
  };

  const handleRowChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      rows: prevState.rows.map((row, i) =>
        i === index ? { ...row, [name]: newValue } : row
      ),
    }));
  };

  const deleteRow = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      rows: prevState.rows.filter((row, i) => i !== index),
    }));
  };
  return (
    <form onSubmit={handleSubmit} id="endpointcreationform">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name your endpoint"
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what this endpoint does"
        ></textarea>
      </div>
      <div>
        <label>External Doc URL:</label>
        <input
          type="text"
          name="externalDocUrl"
          value={formData.externalDocUrl}
          onChange={handleChange}
          placeholder="External link to more information"
        />
      </div>
      <div>
        <label>External Doc Description:</label>
        <input
          type="text"
          name="externalDocDescription"
          value={formData.externalDocDescription}
          onChange={handleChange}
          placeholder="Brief label for external link"
        />
      </div>

      <div>
        <label>Method:</label>
        <select name="method" value={formData.method} onChange={handleChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div>
        <label>Path:</label>
        <input
          type="text"
          name="path"
          value={  formData.path}
          onChange={handleChange}
          placeholder="Endpoint path"
        />
        <p>
          Use {"{"}curly braces{"}"} to indicate path parameters if needed.
          e.g., /employees/{"{"}id{"}"}
        </p>
      </div>

      <div className="btn-slider">
        <button
          className={`tf-button style-3 ${showHeaders ? 'active' : ''}`}
          onClick={() => toggleSection("headers")}
        >
          Headers
        </button>
        <button
          className={`tf-button style-3 ${showQuery ? 'active' : ''}`}
          onClick={() => toggleSection("query")}
        >
          Query
        </button>
        <button
          className={`tf-button style-3 ${showBody ? 'active' : ''}`}
          onClick={() => toggleSection("body")}
        >
          Body
        </button>
        <button
          className={`tf-button style-3 ${showRequestTransformations ? 'active' : ''}`}
          onClick={() => toggleSection("request-transformations")}
        >
          Request Transformations
        </button>
        <button
          className={`tf-button style-3 ${showResponseTransformations ? 'active' : ''}`}
          onClick={() => toggleSection("response-transformations")}
        >
          Response Transformations
        </button>
      </div>
      {showHeaders && (
  <div>
    <h2>Headers</h2>
    {/* Render table for headers */}
    <button onClick={addRow}>Add Row</button>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Example Value</th>
          <th>Required</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {formData.headers.map((header, index) => (
          <tr key={index}>
            <td>
              <input
                type="text"
                value={header}
                onChange={(e) => handleChangeHeader(e, index)}
              />
            </td>
            <td>
              <button onClick={() => deleteRow(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{showQuery && (
  <div>
    <h2>Query</h2>
    {/* Render table for query params */}
    <button onClick={addRow}>Add Row</button>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Example Value</th>
          <th>Required</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {formData.queryParameters.map((param, index) => (
          <tr key={index}>
            <td>
              <input
                type="text"
                value={param.name}
                onChange={(e) => handleChangeQueryParam(e, index, "name")}
              />
            </td>
            <td>
              <select
                value={param.type}
                onChange={(e) => handleChangeQueryParam(e, index, "type")}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                {/* Add more types as needed */}
              </select>
            </td>
            <td>
              <input
                type="text"
                value={param.exampleValue}
                onChange={(e) => handleChangeQueryParam(e, index, "exampleValue")}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={param.required}
                onChange={(e) => handleChangeQueryParam(e, index, "required")}
              />
            </td>
            <td>
              <button onClick={() => removeQueryParam(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
      {showBody && (
        <div>
          {/* Render Body section */}
        </div>
      )}
      {showRequestTransformations && (
        <div>
          {/* Render Request Transformations section */}
        </div>
      )}
      {showResponseTransformations && (
        <div>
          {/* Render Response Transformations section */}
        </div>
      )}

     {/*  <div>
        <label>Headers:</label>
        <button type="button" onClick={addHeader}>
          Add Header
        </button>
        {formData.headers.map((header, index) => (
          <div key={index}>
            <input
              type="text"
              value={header}
              onChange={(e) => handleChangeHeader(e, index)}
            />
            <button type="button" onClick={() => removeHeader(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div>
        <label>Query Parameters:</label>
        <button type="button" onClick={addQueryParam}>
          Add Query Param
        </button>
        {formData.queryParameters.map((param, index) => (
          <div key={index}>
            <input
              type="text"
              value={param}
              onChange={(e) => handleChangeQueryParam(e, index)}
            />
            <button type="button" onClick={() => removeQueryParam(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
 */}
     {/*  <div>
        <label>Request Body:</label>
        <textarea
          name="requestBody"
          value={formData.requestBody}
          onChange={handleChange}
          placeholder="Request Body"
          rows="20"
          tabindex="4"
          aria-required="true"
        ></textarea>
      </div>

      <div>
        <label>Request Transformations:</label>
        <button type="button" onClick={addRequestTransformation}>
          Add Transformation
        </button>
        {formData.requestTransformations.map((transformation, index) => (
          <div key={index}>
            <input
              type="text"
              value={transformation}
              onChange={(e) => handleChangeRequestTransformation(e, index)}
            />
            <button
              type="button"
              onClick={() => removeRequestTransformation(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div>
        <label>Response Transformations:</label>
        <button type="button" onClick={addResponseTransformation}>
          Add Transformation
        </button>
        {formData.responseTransformations.map((transformation, index) => (
          <div key={index}>
            <input
              type="text"
              value={transformation}
              onChange={(e) => handleChangeResponseTransformation(e, index)}
            />
            <button
              type="button"
              onClick={() => removeResponseTransformation(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div> */}

      <button type="submit">Add Endpoint</button>
    </form>
  );
};

export default AddEndpointForm;
