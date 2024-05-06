import React, { useMemo, useState } from "react";
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
    endpointDetails: {
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginTop: "20px",
      backgroundColor: "#f5f5f5",
    },
    button: {
      margin: "0.5rem",
    },
  });

const Example = () => {
  const classes = useStyles(); // Initialize the styles
  const [selectedEndpoint, setSelectedEndpoint] = useState(data[0]); // Initialize selected endpoint state
  const handleEndpointSelection = (endpoint) => {
    setSelectedEndpoint(endpoint);
  };
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
    data: data,
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

  return (
    <Box display="flex" justifyContent="space-between">
      <Box sx={{ flex: 1, backgroundColor: "#fff", maxHeight: 700 }}>
        <MaterialReactTable table={table} />
      </Box>
      
        <>
          <Box sx={{ flex: 1, backgroundColor: "#fff", padding: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography style={{ fontSize: "20px" }}>
                {selectedEndpoint.name}:
              </Typography>
              <Typography
                style={{
                  color: getColorForMethod(selectedEndpoint.method),
                  fontSize: "20px",
                }}
              >
                {selectedEndpoint.method} {selectedEndpoint.path}
              </Typography>
              <Button variant="contained" color="primary"    className={classes.button}>
                Subscribe{" "}
              </Button>
            </div>
            <Divider />
            Brief Description of the current chosen endpoint
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ mt: 2 }}>
                APIway App
              </Typography>
              <Box sx={{ mt: 1 }}>
                {/* <Typography variant="body1">Select Application:</Typography> */}
                <Select disabled value="default">
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
              <Typography variant="h6" sx={{ mt: 2 }}>
                Request URL
              </Typography>
              <Box sx={{ mt: 1 }}>
                {/* <Typography variant="body1">Select Application:</Typography> */}
                <Select disabled value="default">
                  <MenuItem value="default" disabled>
                    {" "}
                    Apiway.com{" "}
                  </MenuItem>
                </Select>
                <Typography variant="body1">Required</Typography>
              </Box>
            </div>
            <Divider />
            <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<StepIcon/>}>
          <Typography>Header Parameters</Typography>
        </AccordionSummary>
        <AccordionDetails>
      
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ mt: 2 }}>
                APIway App
              </Typography>
              <Box sx={{ mt: 1 }}>
                {/* <Typography variant="body1">Select Application:</Typography> */}
                <Select disabled value="default">
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
              <Typography variant="h6" sx={{ mt: 2 }}>
                Request URL
              </Typography>
              <Box sx={{ mt: 1 }}>
                {/* <Typography variant="body1">Select Application:</Typography> */}
                <Select disabled value="default">
                  <MenuItem value="default" disabled>
                    {" "}
                    Apiway.com{" "}
                  </MenuItem>
                </Select>
                <Typography variant="body1">Required</Typography>
              </Box>
            </div> </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<StepIcon/>}>
          <Typography>Required Parameters</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ mt: 2 }}>
              X-APIway-Key
              </Typography>
              <Box sx={{ mt: 1 }}>
                {/* <Typography variant="body1">Select Application:</Typography> */}
                <Select disabled value="default">
                  <MenuItem value="default" disabled>
                  5bcf37c40cmshdee5def2d7ghg456bnhsd445dpwdbwk56cvafa45{" "}
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
              <Typography variant="h6" sx={{ mt: 2 }}>
              X-APIway-Host
              </Typography>
              <Box sx={{ mt: 1 }}>
                {/* <Typography variant="body1">Select Application:</Typography> */}
                <Select disabled value="default">
                  <MenuItem value="default" disabled>
                    {" "}
                    Apiway.com{" "}
                  </MenuItem>
                </Select>
                <Typography variant="body1">Required</Typography>
              </Box>
            </div>   </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<StepIcon />}>
          <Typography>Optional Parameters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" color="primary">Optional Parameters Button 1</Button>
          <Button variant="contained" color="secondary">Optional Parameters Button 2</Button>
        </AccordionDetails>
      </Accordion>
      {selectedEndpoint.method === 'POST' && (
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<StepIcon/>}>
            <Typography>Request Body</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="contained" color="primary">Request Body Button 1</Button>
            <Button variant="contained" color="secondary">Request Body Button 2</Button>
          </AccordionDetails>
        </Accordion>
      )}
          </Box>
          <Box sx={{ flex: 1, backgroundColor: "#fff", padding: "1rem" }}>
            <Typography variant="h6">{selectedEndpoint.name}</Typography>
            <Divider />
            <div class="tf-tab">
                                        <ul class="menu-tab ">
                                        <li class="tab-title active">
                                                <a href="#">Response Example</a>
                                            </li>
                                            <li class="tab-title ">
                                                <a href="#">Results</a>
                                            </li>
                                          
                                            
                                        </ul>
                                                          
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
