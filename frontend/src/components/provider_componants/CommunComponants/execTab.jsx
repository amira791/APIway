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
    fontSize: '20px', // Adjust the font size as needed
    fontWeight: 'bold', // You can adjust other typography styles here
  },
  tableCell: {
    fontSize: '1rem', // Adjust the font size as needed
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

const Example = ({ endpoints , state,isSubscribed,navigate}) => {
  const classes = useStyles(); // Initialize the styles
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]); // Initialize selected endpoint state
  const [headers, setHeaders] = useState([]);
  const [queryParams, setQueryParams] = useState([]);
  const [endpointBody, setEndpointBody] = useState(null);
  const [responseExamples, setResponseExamples] = useState([]);
  const [endpointParameters, setEndpointParameters] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');
  const [responseContent, setResponseContent] = useState('');


  const {
    fetchAPIHeadersByEndpointId,
    fetchAPIQueryParamsByEndpointId,
    fetchAPIEndpointBodyByEndpointId,
    fetchAPIResponseExamplesByEndpointId,
    fetchEndpointParametersByEndpointId,
  } = APIAjout();
  const [selectedChoice, setSelectedChoice] = useState('Response Example');


  const handleEndpointSelection = (endpoint) => {
    setSelectedEndpoint(endpoint);
  };
  const handleChoiceClick = (choice) => {
    setSelectedChoice(choice);
    if (choice === 'Response Example') {
      setSelectedCode('');
      setResponseContent('');
    }
  };

  const handleCodeSelect = (code) => {
    setSelectedCode(code);
    const selectedExample = responseExamples.find(example => example.code_status === code);
  
    if (selectedExample) {
      setResponseContent(selectedExample.body);
    } else {
      setResponseContent('');
    }
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
    muiTableHeadProps:{
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
        <MaterialReactTable    table={table} />
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
              {selectedEndpoint.method} {selectedEndpoint.path}
            </Typography>
            {state!="Deprecated"?
             <Button
              variant="contained"
              color="primary"
              style={{
                margin: "0.5rem",
                fontSize: "15px", // Increase font size for buttons
                padding: "10px 20px", // Increase padding for buttons
              }}
              onClick={navigate}
            >
             {isSubscribed? "Test":"Subscribe"}
            </Button>:<></>}
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
              <select  name="" id="" disabled="disabled">
                <option value="">Default Application{" "}</option>
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
          <Accordion  sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<StepIcon />}>
              <Typography className={classes.text}>Header Parameters</Typography>
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
                  <Select className={classes.insidertext} disabled value="default">
                    <MenuItem  value="default" disabled>
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
                  <Select className={classes.insidertext} disabled value="default">
                    <MenuItem value="default" disabled>
                      {" "}
                      Apiway.com{" "}
                    </MenuItem>
                  </Select>
                  <Typography variant="body1">Required</Typography>
                </Box>
              </div>
              {headers.map((parameter) => (
                <div key={parameter.id}>
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
                      <Select className={classes.insidertext}   disabled value="default">
                        <MenuItem value="default" disabled>
                          {parameter.example_value}
                        </MenuItem>
                      </Select>
                      {parameter.required ? (
                        <Typography variant="body1">Required</Typography>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </div>
                  <Divider />
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion  sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<StepIcon />}>
              <Typography className={classes.text}>Required Parameters</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography className={classes.insidertext}>Query Parameters</Typography>
            {queryParams.filter(param => param.required).map((param, index) => (
            <div key={index}>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {param.name}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <input type="text" defaultValue={param.example_value} />
                <Typography variant="body1"> Example values: {param.example_value}</Typography>
              </Box>
            </div>
            ))}
              <Divider />
              <Typography className={classes.insidertext}>Endpoint Parameters</Typography>
              {endpointParameters.filter(param => param.required).map((param, index) => (
            <div key={index}>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {param.name}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <input type="text" defaultValue={param.example_value} />
                <Typography variant="body1">Example values: {param.example_value}</Typography>
              </Box>
            </div>
          ))}
            
            </AccordionDetails>
          </Accordion>
          <Accordion  sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<StepIcon />}>
              <Typography className={classes.text}>Optional Parameters</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography className={classes.insidertext}>Query Parameters</Typography>
            {queryParams.filter(param => !param.required).map((param, index) => (
            <div key={index}>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {param.name}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <input type="text" defaultValue={param.example_value} />
                <Typography variant="body1">Example values: {param.example_value}</Typography>
              </Box>
            </div>
            ))}
              <Divider />
              <Typography className={classes.insidertext}>Endpoint Parameters</Typography>
              {endpointParameters.filter(param => !param.required).map((param, index) => (
            <div key={index}>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {param.name}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <input type="text" defaultValue={param.example_value} />
                <Typography variant="body1">Example values: {param.example_value}</Typography>
              </Box>
            </div>
          ))}
            
            </AccordionDetails>
          </Accordion>
          {selectedEndpoint.method === "POST" && (
            <Accordion  sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<StepIcon />}>
                <Typography className={classes.text}>Request Body</Typography>
              </AccordionSummary>
              <AccordionDetails>
              {endpointBody && (
  <div >
    <Box sx={{ mt: 1 , lineHeight:"120px"}}>
      <Typography className={classes.insidertext}>Media Type: {endpointBody.media_type}</Typography>
      <Typography className={classes.insidertext}>Payload Name: {endpointBody.payload_name}</Typography>
      <Typography className={classes.insidertext}>Description: {endpointBody.payload_description}</Typography>
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
          <Typography variant="h1" className={classes.text}>{selectedEndpoint.name}</Typography>
          <Divider />
          <div class="tf-tab">
          <div>
      <ul className="menu-tab">
        <li className={selectedChoice === 'Response Example' ? 'tab-title active' : 'tab-title'}>
          <a href="#" onClick={() => handleChoiceClick('Response Example')}>
          <h6>Response Example</h6>  
          </a>
        </li>
        <li className={selectedChoice === 'View Results' ? 'tab-title active' : 'tab-title'}>
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
          <a href="#" onClick={() => handleChoiceClick('View Results')}>
        

            View Results
       
          </a>   </Button>
        </li>
      </ul>
      {selectedChoice === 'Response Example' && (
        <div>
        <Select
          value={selectedCode}
          onChange={(e) => handleCodeSelect(e.target.value)}
          disabled={!responseExamples.length}
        >
          <MenuItem value="" disabled>
            {responseExamples.length ? 'Select Code' : 'No Code Statues'}
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
            </div>
          )}
        </div>
      </div>
      )}
      {selectedChoice === 'View Results' && (
        <div>
          {/* Your code for the View Results section goes here */}
          <Button
           
            disabled
          >
            View Results
          </Button>
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
