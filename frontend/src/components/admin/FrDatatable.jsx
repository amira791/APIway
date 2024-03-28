import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'; // Or your chosen library
import { Button } from '@chakra-ui/react';

const FourDataTable = ({ columns, data,onSelectedRowsChange }) => {
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null); // Column ID for sorting
  const [sortOrder, setSortOrder] = useState('asc'); // "asc" or "desc"
  const [selectedRows, setSelectedRows] = useState([]); // Array of selected row IDs
  const [arrgids, setArrgIds] = useState([]); // Array of selected row IDs

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        Object.values(row).some(
          (value) => value && value.toString().toLowerCase().includes(filterText.toLowerCase())
        )
      )
    );
  }, [data, filterText]);

  // Handle filtering logic based on filterText and data types
  const handleFilter = (e) => {
    setFilterText(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const newData = data.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm)
      )
    );
    setFilteredData(newData);
    setCurrentPage(1); // Reset current page to 1 when filtering
  };
  // Handle sorting logic based on sortColumn and sortOrder
  const handleSort = (column) => {
    const newSortColumn = column.selector; // Column ID
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(newSortColumn);
    setSortOrder(newSortOrder);
  
    const sortedData = filteredData.sort((a, b) => {
      const valueA = a[newSortColumn];
      const valueB = b[newSortColumn];
  
      // Handle undefined values to prevent TypeError
      if (valueA === undefined || valueA === null) return sortOrder === 'asc' ? -1 : 1;
      if (valueB === undefined || valueB === null) return sortOrder === 'asc' ? 1 : -1;
  
      // Implement your sorting logic here based on column data types
      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
    setFilteredData(sortedData);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  let endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  // Add this line to handle cases where remaining items are less than rowsPerPage
  endIndex = Math.max(endIndex, startIndex + 1);
  const pageData = filteredData.slice(startIndex, endIndex);

  
  // Call handleChange when selectedRows change
  

  const handleChange = (state) => {
    setSelectedRows(state.selectedRows); // Update selectedRows state in the DataTable component
    const selectedIDs = state.selectedRows.map((row) => row.id_fournisseur);
    // Log the selected rows
    console.log('Selected Rows:', selectedIDs);
    if(onSelectedRowsChange){
      onSelectedRowsChange(selectedIDs);
      
    }
    
  };
  

  return (
    <div>
      <FilterInput value={filterText} onChange={handleFilter} placeholder="Search..." />
      <DataTable
        columns={columns}
        data={pageData} 
        pagination
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={[5, 10, 20]}
        paginationTotalRows={filteredData.length}
        paginationComponentOptions={{
          onPageChange: handlePageChange,
          onRowsPerPageChange: handleRowsPerPageChange
        }}
        sortFunction={handleSort} 
        selectableRows={true}
        onSelectedRowsChange={handleChange} 
        /*cellProps={{
          'Select': {
            style: { padding: '0 5px' }, //styling for checkbox cell
            onClick: handleCheckboxChange, // Passing the function reference directly
          },
        }}*/
        highlightOnHover={true} 
        customStyles={{
          header: {
            style: {
              backgroundColor: '#f2f2f2', // Custom header background color
            },
          },
        }}
      />
    </div>
  );
};

export default FourDataTable;

//  FilterInput component 
const FilterInput = ({ value, onChange }) => (
  <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
      className="border border-gray-300 rounded-tl-md rounded-tr-md  pl-10 focus:outline-none focus:border-blue-500 hover:bg-gray-200"
      style={{ backgroundColor: '#1a1a11' }} // Adjust background color here
    />);

