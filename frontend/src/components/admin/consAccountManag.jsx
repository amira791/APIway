import React, { useState, useEffect } from 'react';
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import ConsomDataTable from './CsDatatable';
import useManageAccountsC from '../../Hook/ConsomAccountsHook';
import { Button, Spinner } from '@chakra-ui/react'; // Import Chakra UI components including Spinner

const ConsomAccountManag = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { consommateurs, loading, error, activateStatus, deactivateStatus, fetchConsomsData } = useManageAccountsC();

  useEffect(() => {
    fetchConsomsData();
  }, []);

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
    console.log("selectedRows ; ", selectedRows);
  };

  const handleDeactivateStatus = () => {
    for (const userId of selectedRows) {
      deactivateStatus(userId);
    }
    fetchConsomsData();
    setSelectedRows([]);
    console.log("selectedRows ; ", selectedRows);
  };

  useEffect(() => {
    console.log("Updated selectedRows:", selectedRows);
  }, [selectedRows]);

  const columns = [
    {
      name: 'User Name',
      selector: (row) => row?.user?.username,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row) => row?.user?.first_name,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row?.user?.last_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row?.user?.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row?.user?.phone,
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
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" />
        </div>
      ) : (
        <ConsomDataTable columns={columns} data={consommateurs} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows} />
      )}

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default ConsomAccountManag;
