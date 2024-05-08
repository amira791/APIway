import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import TheDataTable from './FrDatatable';
import useManageAccountsF from '../../../src/Hooks/FouAccountsHook';
import { Button } from '@chakra-ui/react'; // Import Chakra UI Button or your preferred button component

const FourAccountManag = () => {
  const { fournisseurs, loading, error, activateStatus, deactivateStatus, fetchFournisseursData } = useManageAccountsF();
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelRows , setClearSelRows] = useState(false);

  const customStatusCell = (row) => {
    const status = row.FRstatus.toLowerCase();
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
  
    return <div className={statusClass}>{row.FRstatus}</div>;
  };

// Define a function to handle the selected row IDs from TheDataTable


  const handleActivateStatus =  () => {
    for (const userId of selectedRows) {
      activateStatus(userId);
    }
    setSelectedRows([]); // Use the state updater function
    setClearSelRows(true);
    console.log("selectedRows in activate ",selectedRows); // Log selectedRows after clearing
  };

 const handleDeactivateStatus = () => {
    for (const userId of selectedRows) {
       deactivateStatus(userId);
    }
    fetchFournisseursData();
    setSelectedRows([]); // Use the state updater function
    setClearSelRows(true);
    console.log("selectedRows in activate ",selectedRows); // Log selectedRows after clearing
  };

// Then, you can log the updated state inside the component re-render
useEffect(() => {
  console.log("Updated selectedRows:", selectedRows);
}, [selectedRows]);

  
  const columns = [
    {
      name: 'User Name',
      selector: (row) => row.FRusername,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row) => row.FR_first_name,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.FR_last_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.FRemail,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.FRphone,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.FRstatus,
      sortable: true,
      // Assuming you still need custom status cell rendering
      cell: customStatusCell,
    },
  ];

//****************************data****************** */
const data = [
  {
    FRusername: 'john_doe',
    FR_first_name: 'John',
    FR_last_name: 'Doe',
    FRemail: 'john@example.com',
    FRphone: '+1234567890',
    FRstatus: 'Active',
  },
  {
    FRusername: 'jane_smith',
    FR_first_name: 'Jane',
    FR_last_name: 'Smith',
    FRemail: 'jane@example.com',
    FRphone: '+9876543210',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'alex_rossi',
    FR_first_name: 'Alex',
    FR_last_name: 'Rossi',
    FRemail: 'alex@example.com',
    FRphone: '+1122334455',
    FRstatus: 'Active',
  },
  {
    FRusername: 'lisa_wang',
    FR_first_name: 'Lisa',
    FR_last_name: 'Wang',
    FRemail: 'lisa@example.com',
    FRphone: '+9988776655',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'michael_jackson',
    FR_first_name: 'Michael',
    FR_last_name: 'Jackson',
    FRemail: 'michael@example.com',
    FRphone: '+1123456789',
    FRstatus: 'Active',
  },
  {
    FRusername: 'sarah_anderson',
    FR_first_name: 'Sarah',
    FR_last_name: 'Anderson',
    FRemail: 'sarah@example.com',
    FRphone: '+9988776655',
    FRstatus: 'Active',
  },
  {
    FRusername: 'chris_evans',
    FR_first_name: 'Chris',
    FR_last_name: 'Evans',
    FRemail: 'chris@example.com',
    FRphone: '+1122334455',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'emily_lee',
    FR_first_name: 'Emily',
    FR_last_name: 'Lee',
    FRemail: 'emily@example.com',
    FRphone: '+1234509876',
    FRstatus: 'Active',
  },
  {
    FRusername: 'david_kim',
    FR_first_name: 'David',
    FR_last_name: 'Kim',
    FRemail: 'david@example.com',
    FRphone: '+1122334455',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'olivia_smith',
    FR_first_name: 'Olivia',
    FR_last_name: 'Smith',
    FRemail: 'olivia@example.com',
    FRphone: '+9988776655',
    FRstatus: 'Active',
  },
  {
    FRusername: 'james_jones',
    FR_first_name: 'James',
    FR_last_name: 'Jones',
    FRemail: 'james@example.com',
    FRphone: '+1122334455',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'sophia_brown',
    FR_first_name: 'Sophia',
    FR_last_name: 'Brown',
    FRemail: 'sophia@example.com',
    FRphone: '+9988776655',
    FRstatus: 'Active',
  },
  {
    FRusername: 'ethan_nguyen',
    FR_first_name: 'Ethan',
    FR_last_name: 'Nguyen',
    FRemail: 'ethan@example.com',
    FRphone: '+1122334455',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'mia_miller',
    FR_first_name: 'Mia',
    FR_last_name: 'Miller',
    FRemail: 'mia@example.com',
    FRphone: '+9988776655',
    FRstatus: 'Active',
  },
  {
    FRusername: 'william_davis',
    FR_first_name: 'William',
    FR_last_name: 'Davis',
    FRemail: 'william@example.com',
    FRphone: '+1122334455',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'ava_garcia',
    FR_first_name: 'Ava',
    FR_last_name: 'Garcia',
    FRemail: 'ava@example.com',
    FRphone: '+9988776655',
    FRstatus: 'Active',
  },
  {
    FRusername: 'noah_rodriguez',
    FR_first_name: 'Noah',
    FR_last_name: 'Rodriguez',
    FRemail: 'noah@example.com',
    FRphone: '+1122334455',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'emma_martinez',
    FR_first_name: 'Emma',
    FR_last_name: 'Martinez',
    FRemail: 'emma@example.com',
    FRphone: '+9988776655',
    FRstatus: 'Active',
  },
  {
    FRusername: 'liam_hernandez',
    FR_first_name: 'Liam',
    FR_last_name: 'Hernandez',
    FRemail: 'liam@example.com',
    FRphone: '+1122334455',
    FRstatus: 'Inactive',
  },
  {
    FRusername: 'isabella_lopez',
    FR_first_name: 'Isabella',
    FR_last_name: 'Lopez',
    FRemail: 'isabella@example.com',
    FRphone: '+9988776655',
    FRstatus: 'Active',
  },
];

/****************************************************** */



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
        <TheDataTable columns={columns} data={fournisseurs} clearSelRows={clearSelRows} selectedRows={selectedRows} onSelectedRowsChange={setSelectedRows} />
       </div>
  );
};

export default FourAccountManag;
