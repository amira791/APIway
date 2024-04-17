import React, { useMemo,useState } from 'react';
import { MaterialReactTable,useMaterialReactTable } from 'material-react-table';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles({
    tableHeader: {
      fontSize: '20px', // Adjust the font size as needed
      fontWeight: 'bold', // You can adjust other typography styles here
    },
    tableCell: {
      fontSize: '1rem', // Adjust the font size as needed
    },
  });
  
const EndpointTable = ({ endpoints,onDelete,onAddTogroup ,groups,onRemoveFromGroup,handleAdding}) => {
    const classes = useStyles(); // Initialize the styles

    const [selectedEndpoint, setSelectedEndpoint] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
  
    const handleGroupSelect = (endpointName) => {
      setSelectedEndpoint(endpointName);
    };
  
    const handleConfirm = () => {
        console.log("selectedGroup",selectedGroup,"selectedEndpoint",selectedEndpoint)
      if (selectedGroup && selectedEndpoint) {
        onAddTogroup(selectedGroup, selectedEndpoint);
        setSelectedEndpoint(null);
      //  setSelectedGroup(null);
      }
    };
  
    const handleRemove = (endpointName) => {
      onRemoveFromGroup(endpointName);
    };
    const columns = useMemo(() => [
    {
        header: <Typography className={classes.tableHeader}>Name</Typography>, // Apply styles to header
        accessorKey: 'name',
    },
    {
        header: <Typography className={classes.tableHeader}>Method</Typography>, // Apply styles to header
        accessorKey: 'method',
    },
    {
        header: <Typography className={classes.tableHeader}>Group</Typography>, // Apply styles to header
        accessorKey: 'group',
      enableGrouping: true, // Enable grouping for the Group column
    },
    {
        header: <Typography className={classes.tableHeader}>Action</Typography>, // Apply styles to header
     accessorKey: 'action',
        Cell: ({ cell }) => (
            <div>
             {cell.row.original.group != null ? (
              <button onClick={() => handleRemove(cell.row.original.name)}>Remove from Group</button>
            ) : (
              <div>
                <select  onClick={(e) => {
                    setSelectedEndpoint(cell.row.original.name);
                    setSelectedGroup(e.target.value)}}>
                  <option value="">Select Group</option>
                  {groups.map((group) => (
                    <option key={group.name} value={group.name}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleConfirm()}>Confirm</button>
              </div>
            )}

              <button style={{display:"flex",justifyContent:"center",alignItems:"center", gap:"5%", marginTop:"3%"}} onClick={() => onDelete(cell.row.original.name)}> <i class="fa-solid fa-trash"></i> Delete</button>
         
          </div>
        ),
      },
    ], [onDelete, groups, onAddTogroup, onRemoveFromGroup, selectedGroup]);
  

  const table = useMaterialReactTable({
    columns,
    data: endpoints, // Use your actual endpoints data here
    muiTableBodyCellProps:{
        sx: {
            fontSize: '20px',
          },
    },
  muiTableProps:{
    sx:{
        backgroundColor: '#f5f5f5',
    }
  },
    enableGrouping: true, // Enable grouping for the entire table
    initialState: {
      grouping: ['group'], // Group by the 'group' column by default
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: 'group', desc: false }], // Sort by group name by default
     },
 
    
   muiTableContainerProps: { className: classes.transparentBackground, sx: { maxHeight: 700 } }, // Apply transparent background style
  
  });
  const onGroupSelectChange = (selectedGroup, endpointName) => {
    // Implement logic to handle group selection change
    console.log(`Selected group: ${selectedGroup}, Endpoint name: ${endpointName}`);
    // Now you can perform further actions, such as adding the endpoint to the selected group
    onAddTogroup(selectedGroup, endpointName);
  };
  
  return (
    <MaterialReactTable table={table} />
  );
};

export default EndpointTable;
