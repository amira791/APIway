/*import React, { useState, useEffect } from 'react';
/*import DataTable from 'react-data-table-component';
import { Button } from '@chakra-ui/react'; // Make sure to import your Button component
import useManageAccountsF from '../../Hook/FouAccountsHook';

const FourAccountManag = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelRows, setClearSelRows] = useState(false);
  const { fournisseurs,loading,error,activateStatus,deactivateStatus,fetchFournisseursData } = useManageAccountsF();

  useEffect(() => {
    console.log("Updated selectedRows:", selectedRows);
  }, [selectedRows]);

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

  const handleActivateStatus = () => {
    selectedRows.forEach(row => activateStatus(row.id));
    setSelectedRows([]);
    setClearSelRows(true);
  };

  const handleDeactivateStatus = () => {
    selectedRows.forEach(row => deactivateStatus(row.id));
    fetchFournisseursData();
    setSelectedRows([]);
    setClearSelRows(true);
  };

  const columns = [
    {
      name: 'User Name',
      selector: row => row.user.username,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: row => row.user.first_name,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.user.last_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.user.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.user.phone,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.user.is_active ? 'Active' : 'Inactive',
      sortable: true,
      cell: customStatusCell,
    },
  ];

  return (
    <div className="content">
      <div className="flex space-x-4 justify-end mb-4">
        <Button className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-3 px-6 rounded-lg" disabled={selectedRows.length === 0} onClick={handleActivateStatus}>
          Activate Status
        </Button>
        <Button className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-3 px-6 rounded-lg" disabled={selectedRows.length === 0} onClick={handleDeactivateStatus}>
          Deactivate Status
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={fournisseurs}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
        clearSelectedRows={clearSelRows}
        onClearSelectedRows={() => setClearSelRows(false)}
      />
    </div>
  );
};

export default FourAccountManag;


import React, { useState, useEffect } from 'react';
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import CustomDataTable from '../global_components/DataTable';
import useManageAccountsF from '../../Hook/FouAccountsHook';
import { Button } from '@chakra-ui/react';

const FourAccountManag = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { fournisseurs, loading, error, activateStatus, deactivateStatus, fetchFournisseursData } = useManageAccountsF();
  const [clearSelRows, setClearSelRows] = useState(false);
  
  useEffect(() => {
    fetchFournisseursData();
  }, []);

  const handleActivateStatus = () => {
    selectedRows.forEach(id => activateStatus(id));
    setSelectedRows([]);
    setClearSelRows(true);
  };

  const handleDeactivateStatus = () => {
    selectedRows.forEach(id => deactivateStatus(id));
    fetchFournisseursData();
    setSelectedRows([]);
    setClearSelRows(true);
  };

  const customStatusCell = (params) => {
    if (!params || !params.row || !params.row.user) return <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded">unknown</div>;
    const status = params.row.user.is_active ? 'active' : 'inactive';
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

  const columns = [
    { field: 'id_fournisseur', headerName: 'ID', width: 150 },
    { field: 'email', 
      renderCell: (params) => <span>{params.row.user.email}</span>,
      headerName: 'Email', width: 200 },
    { field: 'username', 
      renderCell: (params) => <span>{params.row.user.username}</span>, 
      headerName: 'Username', width: 150 },
    { field: 'first_name', 
      renderCell: (params) => <span>{params.row.user.first_name}</span>,
      headerName: 'First Name', width: 150 },
    { field: 'last_name', 
      renderCell: (params) => <span>{params.row.user.last_name}</span>,
      headerName: 'Last Name', width: 150 },
    { field: 'phone', 
      renderCell: (params) => <span>{params.row.user.phone}</span>,
      headerName: 'Phone', width: 150 },
    { field: 'is_active', 
      renderCell: customStatusCell, 
      headerName: 'Status', width: 120 }
  ];

  return (
    <div className="content">
      <div className="flex space-x-4 justify-end mb-4">
        <Button className="bg-green-200 hover:bg-green-300 text-green-800 font-bold py-3 px-6 rounded-lg" disabled={selectedRows.length === 0} onClick={handleActivateStatus}>
          Activate Status
        </Button>
        <Button className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-3 px-6 rounded-lg" disabled={selectedRows.length === 0} onClick={handleDeactivateStatus}>
          Deactivate Status
        </Button>
      </div>
      <CustomDataTable
        columns={columns}
        rows={fournisseurs || []}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        clearSelectedRows={clearSelRows}
        setClearSelRows={setClearSelRows}
        getRowId={(row) => row.id_fournisseur}
      />
    </div>
  );
};

export default FourAccountManag;*/




import React, { useState, useMemo , useEffect} from 'react';
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import TheDataTable from './FrDatatable';
import useManageAccountsF from '../../Hook/FouAccountsHook';
import { Button } from '@chakra-ui/react'; // Import Chakra UI Button or your preferred button component


// Import Tailwind CSS


const FourAccountManag = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { fournisseurs, loading, error, activateStatus, deactivateStatus, fetchFournisseursData } = useManageAccountsF();


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
    fetchFournisseursData();
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
        <TheDataTable columns={columns} data={fournisseurs} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows} />
      </div>
  );
};

export default FourAccountManag;
