import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'; // Or your chosen library

const ConsomDataTable = ({ columns, data,onSelectedRowsChange }) => {
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
        Object.values(row.user).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(filterText.toLowerCase())
        )
      )
    );
  }, [data, filterText]);
  

  const tableHeaderstyle={
    headCells:{
        style:{
            fontWeight:"bold",
            fontSize:"14px",
            backgroundColor: "#E5E7EB"

        },
    },
    pagination: {
        style: {
          width: '100%',
        },
        pageButtonsStyle: {
          borderColor: '#fff',
          
        },
        pageButtonsActiveStyle: {
          backgroundColor: '#fff',
          color: '#333',
        },
    },
    subHeader: {
        style: {
            backgroundColor: '#1f1f2cs',
            
        }
    },
    
}


  // Handle filtering logic based on filterText and data types
  // Handle filtering logic based on filterText and data types
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilterText(searchTerm);

    const newData = data.filter((row) =>
      Object.values(row).some((value) =>
        value && value.toString().toLowerCase().includes(searchTerm)
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
    const selectedIDs = state.selectedRows.map((row) => row.id_consommateur);
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
        paginationTotalRows={pageData.length}
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
        customStyles={tableHeaderstyle}
      />
    </div>
  );
};

export default ConsomDataTable;

//  FilterInput component 
const FilterInput = ({ value, onChange }) => (
  <input
      id="tableSearch"
      type="search"
      value={value}
      onChange={onChange}
      placeholder="Search..."
      className="filter-input"
/>);

