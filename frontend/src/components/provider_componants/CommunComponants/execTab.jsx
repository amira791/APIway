import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  Divider,
  MenuItem,
  Select,
  StepIcon,
  Typography,
} from "@material-ui/core";
import { AccordionDetails, Box, Button } from "@mui/material";
import { Icons } from "react-toastify";
import APIAjout from "../../../hooks/APIHook2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const data = [
  {
    name: "User Endpoint",
    method: "GET",
    group: "Like Management",
    path: "/user",
  },
  {
    name: "Post Endpoint",
    method: "POST",
    group: "Post Management",
    path: "/post",
  },
  {
    name: "Comment Endpoint",
    method: "PUT",
    group: "Comment Management",
    path: "/comment",
  },
  {
    name: "Like Endpoint",
    method: "DELETE",
    group: "Like Management",
    path: "/like",
  },
];
const getColorForMethod = (method) => {
  switch (method) {
    case "GET":
      return "#007bff"; // Blue color for GET method
    case "POST":
      return "#28a745"; // Green color for POST method
    case "PUT":
      return "#ffc107"; // Yellow color for PUT method
    case "DELETE":
      return "#dc3545"; // Red color for DELETE method
    default:
      return "#000"; // Default color
  }
};
const useStyles = makeStyles({
  tableHeader: {
    fontSize: "20px", // Adjust the font size as needed
    fontWeight: "bold", // You can adjust other typography styles here
  },
  tableCell: {
    fontSize: "1rem", // Adjust the font size as needed
  },
  endpointDetails: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "20px",
    backgroundColor: "#f5f5f5",
  },
  button: {
    margin: "0.5rem",
    fontSize: "20px", // Increase font size for buttons
    padding: "10px 20px", // Increase padding for buttons
  },
  text: {
    fontSize: "20px", // Increase font size for text elements
  },
  insidertext: {
    fontSize: "15px", // Increase font size for text elements
  },
  selecttext: {
    fontSize: "13px", // Increase font size for text elements
  },
});

const Example = ({ endpoints, state, isSubscribed, navigate,website }) => {
  const classes = useStyles(); // Initialize the styles
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]); // Initialize selected endpoint state
  const [headers, setHeaders] = useState([]);
  const [queryParams, setQueryParams] = useState([]);

  const [endpointBody, setEndpointBody] = useState(null);
  const [responseExamples, setResponseExamples] = useState([]);
  const [endpointParameters, setEndpointParameters] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [responseContent, setResponseContent] = useState("");
  const [apiResult, setApiResult] = useState(null); // State to hold API result

  const [result, setResult] = useState(null);
  const [queryParamValues, setQueryParamValues] = useState({});
  const [endpointParamValues, setEndpointParamValues] = useState({});

  const [activeFilter, setActiveFilter] = useState("result-section");
  const {
    fetchAPIHeadersByEndpointId,
    fetchAPIQueryParamsByEndpointId,
    fetchAPIEndpointBodyByEndpointId,
    fetchAPIResponseExamplesByEndpointId,
    fetchEndpointParametersByEndpointId,
    executeAPI,
  } = APIAjout();
  const [selectedChoice, setSelectedChoice] = useState("Response Example");
  const handleEndpointSelection = (endpoint) => {
    setSelectedEndpoint(endpoint);
  };
  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    if (choice === "Response Example") {
      setSelectedCode("");
      setResponseContent("");
    }
  };
  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };
  const handleCodeSelect = (code) => {
    setSelectedCode(code);
    const selectedExample = responseExamples.find(
      (example) => example.code_status === code
    );

    if (selectedExample) {
      setResponseContent(selectedExample.body);
    } else {
      setResponseContent("");
    }
  };
  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setHeaders(prevHeaders =>
      prevHeaders.map(header =>
        header.key === key ? { ...header, example_value: value } : header
      )
    );
  };
  // Handle input change for query parameters
  const handleQueryParamChange = (name, value) => {
    setQueryParamValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input change for endpoint parameters
  const handleEndpointParamChange = (name, value) => {
    setEndpointParamValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async () => {
    const combinedQueryParams = {
      ...queryParams
        .filter((param) => !param.required)
        .reduce(
          (obj, param) => ({
            ...obj,
            [param.name]: queryParamValues[param.name] || "",
          }),
          {}
        ),
      ...queryParams
        .filter((param) => param.required)
        .reduce(
          (obj, param) => ({
            ...obj,
            [param.name]: queryParamValues[param.name] || "",
          }),
          {}
        ),
    };

    const combinedEndpointParams = {
      ...endpointParameters
        .filter((param) => !param.required)
        .reduce(
          (obj, param) => ({
            ...obj,
            [param.name]: endpointParamValues[param.name] || "",
          }),
          {}
        ),
      ...endpointParameters
        .filter((param) => param.required)
        .reduce(
          (obj, param) => ({
            ...obj,
            [param.name]: endpointParamValues[param.name] || "",
          }),
          {}
        ),
    };
    const headerValues = headers.reduce((acc, header) => {
      acc[header.key] = header.example_value;
      return acc;
    }, {});

    const apiKey = 'valid_api_key_123';//localStorage.getItem("apiKey");
    if (apiKey) {
      headerValues['x-api-key'] = apiKey; // Add API key to headers
    } else {
      // Handle case where API key is not available
      alert("API key not found. Please subscribe to get an API key.");
      return;
    }
    console.log(headerValues);
    let bodyValue = null; // Initialize body value as null

    // Check if the textarea element exists
    const textarea = document.getElementById("message");
    const method = document.getElementById("method").innerText;
    const path = document.getElementById("path").innerText;
    if (textarea) {
      bodyValue = JSON.parse(textarea.value); // Parse the JSON string
      console.log(bodyValue);
    }
    const endpointWithoutLeadingSlash = path.startsWith("/")
      ? path.substring(1)
      : path;
    console.log(method);

    const result = await executeAPI(
      website, // website
      endpointWithoutLeadingSlash, // endpoint
      method, // method
      headerValues, // headers
      combinedQueryParams, // query params
      bodyValue, // body (modify as needed)
      combinedEndpointParams, // path params
      selectedEndpoint.id_endpoint
    );

    console.log(result);

    setApiResult(result);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedEndpoint !== null) {
          // Fetch headers by endpoint ID
          const headers = await fetchAPIHeadersByEndpointId(
            selectedEndpoint.id_endpoint
          );
          setHeaders(headers);

          // Fetch query parameters by endpoint ID
          const queryParams = await fetchAPIQueryParamsByEndpointId(
            selectedEndpoint.id_endpoint
          );
          setQueryParams(queryParams);

          // Fetch endpoint body by endpoint ID
          const endpointBody = await fetchAPIEndpointBodyByEndpointId(
            selectedEndpoint.id_endpoint
          );
          setEndpointBody(endpointBody);

          // Fetch response examples by endpoint ID
          const responseExamples = await fetchAPIResponseExamplesByEndpointId(
            selectedEndpoint.id_endpoint
          );
          setResponseExamples(responseExamples);

          // Fetch endpoint parameters by endpoint ID
          const endpointParameters = await fetchEndpointParametersByEndpointId(
            selectedEndpoint.id_endpoint
          );
          setEndpointParameters(endpointParameters);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedEndpoint]);

  const columns = useMemo(
    () => [
      {
        header: (
          <Typography className={classes.tableHeader}>Endpoints</Typography>
        ), // Apply styles to header
        accessorKey: "endpoint", // Use a key that represents a single field from the data
        Cell: (
          { cell } // Use Cell to define how the data should be rendered
        ) => (
          <div onClick={() => handleEndpointSelection(cell.row.original)}>
            <CustomEndPointHeader
              endpointName={cell.row.original.name}
              method={cell.row.original.method}
              path={cell.row.original.path}
            />
          </div>
        ),
      },

      {
        header: <Typography className={classes.tableHeader}>Group</Typography>, // Apply styles to header
        accessorKey: "group",
        enableGrouping: true, // Enable grouping for the Group column
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: endpoints,
    muiTableHeadProps: {
      sx: {
        fontSize: "20px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "20px",
      },
    },
    muiTableProps: {
      sx: {
        backgroundColor: "#f5f5f5",
      },
    },
    enableGrouping: true, // Enable grouping for the entire table
    initialState: {
      grouping: ["group"], // Group by the 'group' column by default
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: "group", desc: false }], // Sort by group name by default
    },

    muiTableContainerProps: {
      className: classes.transparentBackground,
      sx: { maxHeight: 700 },
    }, // Apply transparent background style
  });
  if (!selectedEndpoint) {
    return <div>No endpoint selected</div>;
  }
  return (
    <Box display="flex" justifyContent="space-between" gap="25px">
      <Box sx={{ flex: 1, maxHeight: 700 }}>
        <MaterialReactTable table={table} />
      </Box>

      <>
        <Box sx={{ flex: 1, padding: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography style={{ fontSize: "20px" }}>
              {selectedEndpoint.title}:
            </Typography>
            <Typography
              style={{
                color: getColorForMethod(selectedEndpoint.method),
                fontSize: "20px",
              }}
            >
              <h6 id="method">{selectedEndpoint.method}</h6>{" "}
              <p id="path">{selectedEndpoint.path}</p>
            </Typography>
            <button onClick={handleSubmit}>Execute API</button>
            {/*  {state!="Deprecated"?
             <Button
              variant="contained"
              color="primary"
              style={{
                margin: "0.5rem",
                fontSize: "15px", // Increase font size for buttons
                padding: "10px 20px", // Increase padding for buttons
              }}
              onClick={()=>executeAPI(selectedEndpoint.id_endpoint)}
            >
             {isSubscribed? "Test":"Subscribe"}
            </Button>:<></>} */}
          </div>
          <Divider />
          {selectedEndpoint.description}
          <Divider />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ mt: 2 }}>
              APIway App
            </Typography>
            <Box className={classes.insidertext} sx={{ mt: 1 }}>
              {/* <Typography variant="body1">Select Application:</Typography> */}
              <select name="" id="" disabled="disabled">
                <option value="">Default Application </option>
              </select>
              {/* <Select disabled value="default">
                <MenuItem value="default" disabled>
                  Default Application{" "}
                </MenuItem>
              </Select> */}
              <Typography variant="body1">Required</Typography>
            </Box>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ mt: 2 }}>
              Request URL
            </Typography>
            <Box sx={{ mt: 1 }}>
              {/* <Typography variant="body1">Select Application:</Typography> */}
              <select name="" id="" disabled="disabled">
                <option value=""> Apiway.com</option>
              </select>
              {/* <Select disabled value="default">
                <MenuItem value="default" disabled>
                  {" "}
                  Apiway.com{" "}
                </MenuItem>
              </Select> */}
              <Typography variant="body1">Required</Typography>
            </Box>
          </div>
          <Divider />
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<StepIcon />}>
              <Typography className={classes.text}>
                Header Parameters
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" sx={{ mt: 2 }}>
                  X-APIway-Key
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {/* <Typography variant="body1">Select Application:</Typography> */}
                  <Select
                    className={classes.insidertext}
                    disabled
                    value="default"
                  >
                    <MenuItem value="default" disabled>
                      Default Application{" "}
                    </MenuItem>
                  </Select>
                  <Typography variant="body1">Required</Typography>
                </Box>
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" sx={{ mt: 2 }}>
                  X-APIway-Host
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {/* <Typography variant="body1">Select Application:</Typography> */}
                  <Select
                    className={classes.insidertext}
                    disabled
                    value="default"
                  >
                    <MenuItem value="default" disabled>
                      {" "}
                      Apiway.com{" "}
                    </MenuItem>
                  </Select>
                  <Typography variant="body1">Required</Typography>
                </Box>
              </div>
              {headers.map((parameter) => (
        <div key={parameter.key}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ mt: 2 }}>
              {parameter.key}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <input
                className="insidertext"
                value={parameter.example_value}
                onChange={(e) => handleInputChange(e, parameter.key)}
              />
              {parameter.required && (
                <Typography variant="body1">Required</Typography>
              )}
            </Box>
          </div>
          <Divider />
        </div>
      ))}
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary>
              <Typography>Required Parameters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Query Parameters</Typography>
              {queryParams
                .filter((param) => param.required)
                .map((param, index) => (
                  <div key={index}>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                      {param.name}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <input
                        type="text"
                        onChange={(e) =>
                          handleQueryParamChange(param.name, e.target.value)
                        }
                      />
                      <Typography variant="body1">
                        Example values: {param.example_value}
                      </Typography>
                    </Box>
                  </div>
                ))}
              <Divider />
              <Typography>Endpoint Parameters</Typography>
              {endpointParameters
                .filter((param) => param.required)
                .map((param, index) => (
                  <div key={index}>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                      {param.name}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <input
                        type="text"
                        defaultValue={param.example_value}
                        onChange={(e) =>
                          handleEndpointParamChange(param.name, e.target.value)
                        }
                      />
                      <Typography variant="body1">
                        Example values: {param.example_value}
                      </Typography>
                    </Box>
                  </div>
                ))}
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary>
              <Typography>Optional Parameters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Query Parameters</Typography>
              {queryParams
                .filter((param) => !param.required)
                .map((param, index) => (
                  <div key={index}>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                      {param.name}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <input
                        type="text"
                        defaultValue={param.example_value}
                        onChange={(e) =>
                          handleQueryParamChange(param.name, e.target.value)
                        }
                      />
                      <Typography variant="body1">
                        Example values: {param.example_value}
                      </Typography>
                    </Box>
                  </div>
                ))}
              <Divider />
              <Typography>Endpoint Parameters</Typography>
              {endpointParameters
                .filter((param) => !param.required)
                .map((param, index) => (
                  <div key={index}>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                      {param.name}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <input
                        type="text"
                        defaultValue={param.example_value}
                        onChange={(e) =>
                          handleEndpointParamChange(param.name, e.target.value)
                        }
                      />
                      <Typography variant="body1">
                        Example values: {param.example_value}
                      </Typography>
                    </Box>
                  </div>
                ))}
            </AccordionDetails>
          </Accordion>
          {selectedEndpoint.method === "POST" && (
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<StepIcon />}>
                <Typography className={classes.text}>Request Body</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {endpointBody && (
                  <div>
                    <Box sx={{ mt: 1, lineHeight: "120px" }}>
                      <Typography className={classes.insidertext}>
                        Media Type: {endpointBody.media_type}
                      </Typography>
                      <Typography className={classes.insidertext}>
                        Name: {endpointBody.payload_name}
                      </Typography>
                      <Typography className={classes.insidertext}>
                        Description: {endpointBody.payload_description}
                      </Typography>
                      <fieldset class="message">
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          placeholder="documentation"
                          tabindex="4"
                          defaultValue={endpointBody.body_example}
                          aria-required="true"
                          required=""
                        ></textarea>
                      </fieldset>
                    </Box>
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
        <Box sx={{ flex: 1, padding: "1rem" }}>
          <Typography variant="h1" className={classes.text}>
            {selectedEndpoint.name}
          </Typography>
          <Divider />
          <div class="tf-tab">
            <div>
              <ul className="menu-tab">
                <li
                  className={
                    selectedChoice === "Response Example"
                      ? "tab-title active"
                      : "tab-title"
                  }
                >
                  <a
                    href="#"
                    onClick={() => handleChoiceClick("Response Example")}
                  >
                    <h5>Response Example</h5>
                  </a>
                </li>
                <li
                  className={
                    selectedChoice === "View Results"
                      ? "tab-title active"
                      : "tab-title"
                  }
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      margin: "0.5rem",
                      fontSize: "15px", // Increase font size for buttons
                      padding: "10px 20px", // Increase padding for buttons
                    }}
                    disabled
                  >
                    <a
                      href="#"
                      onClick={() => handleChoiceClick("View Results")}
                    >
                      View Results
                    </a>{" "}
                  </Button>
                </li>
              </ul>
              {selectedChoice === "Response Example" && (
                <div>
                  <Select
                    value={selectedCode}
                    onChange={(e) => handleCodeSelect(e.target.value)}
                    disabled={!responseExamples.length}
                  >
                    <MenuItem value="" disabled>
                      {responseExamples.length
                        ? "Select Code"
                        : "No Code Statues"}
                    </MenuItem>
                    {responseExamples.map((example, index) => (
                      <MenuItem key={index} value={example.code_status}>
                        {example.code_status}
                      </MenuItem>
                    ))}
                  </Select>
                  <div>
                    {responseContent && (
                      <div>
                        <p>Response content:</p>
                        <p>{responseContent}</p>
                        {result && (
                          <div>
                            <h4>Response:</h4>
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    )}

                   

                    {apiResult && (
                      <>
                        <div class="top-menu">
                          <ul className="filter-menu">
                            <li
                              className={
                                activeFilter === "result-section"
                                  ? "active"
                                  : ""
                              }
                            >
                              <a
                              
                                onClick={() =>
                                  handleFilterClick("result-section")
                                }
                              >
                                Results
                              </a>
                            </li>
                            <li
                              className={
                                activeFilter === "header-section"
                                  ? "active"
                                  : ""
                              }
                            >
                              <a
                              
                                onClick={() =>
                                  handleFilterClick("header-section")
                                }
                              >
                                Header
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="inner-content wallet">
                          <div class="wallet-list">
                            <div
                              class="tf-wallet"
                              style={{ height: "700px", overflow: "auto" }}
                            >
                              <div class="icon">
                                <h5>Code status</h5>
                                <span class="label">
                                  {apiResult.status_code}
                                </span>
                              </div>
                              <p class="content" id="header-section"  style={{
                        display:
                          activeFilter === "header-section"
                            ? "block"
                            : "none",
                      }}>
                                {Object.entries(apiResult.headers).map(
                                  ([key, value]) => (
                                    <div key={key}>
                                      <strong>{key}:</strong> {value}
                                    </div>
                                  )
                                )}
                              </p>
                              <p class="content" id="result-section" style={{
                        display:
                          activeFilter === "result-section"
                            ? "block"
                            : "none",
                      }}>
                                {JSON.stringify(
                                  JSON.parse(apiResult.body),
                                  null,
                                  2
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              {selectedChoice === "View Results" && (
                <div>
                  {/* Your code for the View Results section goes here */}
                  <Button disabled>View Results</Button>
                </div>
              )}
            </div>
          </div>
        </Box>
      </>
    </Box>
  );
};

const CustomEndPointHeader = ({ endpointName, method, path }) => {
  // Function to determine the color based on the method

  return (
    <Typography style={{ color: getColorForMethod(method), fontSize: "20px" }}>
      - {method} {path}
    </Typography>
  );
};

export default Example;
