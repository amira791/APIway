import React, { useState, useMemo , useEffect} from 'react';
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import TheDataTable from './CsDatatable';
import useManageAccountsC from '../../Hook/ConsomAccountsHook';
import { Button } from '@chakra-ui/react'; // Import Chakra UI Button or your preferred button component


// Import Tailwind CSS


const ConsomAccountManag = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { consommateurs, loading, error, activateStatus, deactivateStatus, fetchConsomsData } = useManageAccountsC();


  // Custom cell for rendering status with Tailwind CSS classes
  const customStatusCell = (row) => {
    const status = row.user.is_active ? 'active' : 'inactive';
    let statusClass = '';
  
    switch (status) {
      case 'active':
        statusClass = 'bg-green-100 text-green-800 px-2 py-1 rounded';
        break;
      case 'inactive':
        statusClass = 'bg-red-100 text-red-800 px-2 py-1 rounded';
        break;
      default:
        statusClass = 'bg-gray-100 text-gray-800 px-2 py-1 rounded';
        break;
    }
  
    return <div className={statusClass}>{status}</div>;
  };

  const handleActivateStatus =  () => {
    for (const userId of selectedRows) {
      activateStatus(userId);
    }
    setSelectedRows([]); // Use the state updater function
    console.log("selectedRows ; ",selectedRows); // Log selectedRows after clearing
  };

  const handleDeactivateStatus = () => {
    for (const userId of selectedRows) {
       deactivateStatus(userId);
    }
    fetchConsomsData();
    setSelectedRows([]); // Use the state updater function
    console.log("selectedRows ; ",selectedRows); // Log selectedRows after clearing
  };

// Then, you can log the updated state inside the component re-render
useEffect(() => {
  console.log("Updated selectedRows:", selectedRows);
}, [selectedRows]);


  
    const columns = [
    {
      name: 'User Name',
      selector: (row) => row.user.username,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row) => row.user.first_name,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.user.last_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.user.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.user.phone,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.user.is_active ? 'Active' : 'Inactive',
      sortable: true,
      // Assuming you still need custom status cell rendering
      cell: customStatusCell,
    },
  ];

  return (
    <div className="content">
        
        {/* Add buttons for activating and deactivating status */}
        <div className="flex space-x-4 justify-end mb-4">
          <Button className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-3 px-6 rounded-lg" disabled={selectedRows.length === 0} onClick={handleActivateStatus}>
            Activate Status
          </Button>
          <Button className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-3 px-6 rounded-lg" disabled={selectedRows.length === 0} onClick={handleDeactivateStatus}>
            Deactivate Status
          </Button>
        </div>
        {/* Passing the columns and data props to the DataTable component */}
        <TheDataTable columns={columns} data={consommateurs} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows} />
      </div>
  );
};

export default ConsomAccountManag;
