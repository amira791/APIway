import React, { useState, useEffect } from 'react';
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import FourDataTable from './FrDatatable';
import useManageAccountsF from '../../Hook/FouAccountsHook';
import { Button } from '@chakra-ui/react'; // Import Chakra UI Button or your preferred button component

const FourAccountManag = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { fournisseurs, loading, error, activateStatus, deactivateStatus, fetchFournisseursData } = useManageAccountsF();

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchFournisseursData();
  }, []);

  // Custom cell for rendering status with Tailwind CSS classes
  const customStatusCell = (row) => {
    const status = row?.user?.is_active ? 'active' : 'inactive';
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
    for (const userId of selectedRows) {
      activateStatus(userId);
    }
    setSelectedRows([]);
    console.log("selectedRows: ", selectedRows); // Log selectedRows after clearing
  };

  const handleDeactivateStatus = () => {
    for (const userId of selectedRows) {
      deactivateStatus(userId);
    }
    fetchFournisseursData();
    setSelectedRows([]);
    console.log("selectedRows: ", selectedRows); // Log selectedRows after clearing
  };

  const columns = [
    {
      name: 'User Name',
      selector: (row) => row?.user?.username || 'N/A',
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row) => row?.user?.first_name || 'N/A',
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row?.user?.last_name || 'N/A',
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row?.user?.email || 'N/A',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row?.user?.phone || 'N/A',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row?.user?.is_active ? 'Active' : 'Inactive',
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
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error fetching data: {error.message}</div>
      ) : (
        <FourDataTable columns={columns} data={fournisseurs} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows} />
      )}
    </div>
  );
};

export default FourAccountManag;
