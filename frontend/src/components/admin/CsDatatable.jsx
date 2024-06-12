import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'; // Or your chosen library

const ConsomDataTable = ({ columns, data, onSelectedRowsChange }) => {
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null); // Column ID for sorting
  const [sortOrder, setSortOrder] = useState('asc'); // "asc" or "desc"
  const [selectedRows, setSelectedRows] = useState([]); // Array of selected row IDs

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        Object.values(row.user || {}).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(filterText.toLowerCase())
        )
      )
    );
  }, [data, filterText]);

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
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

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilterText(searchTerm);
  };

  const handleSort = (column) => {
    const newSortColumn = column.selector; // Column ID
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(newSortColumn);
    setSortOrder(newSortOrder);

    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[newSortColumn] || '';
      const valueB = b[newSortColumn] || '';

      if (valueA < valueB) {
        return newSortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return newSortOrder === 'asc' ? 1 : -1;
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
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const pageData = filteredData.slice(startIndex, endIndex);

  const handleChange = (state) => {
    const selectedIDs = state.selectedRows.map((row) => row.id_consommateur);
    setSelectedRows(selectedIDs);
    if (onSelectedRowsChange) {
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
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        onSort={handleSort}
        selectableRows={true}
        onSelectedRowsChange={handleChange}
        highlightOnHover={true}
        customStyles={tableHeaderStyle}
      />
    </div>
  );
};

export default ConsomDataTable;

const FilterInput = ({ value, onChange }) => (
  <input
    id="tableSearch"
    type="search"
    value={value}
    onChange={onChange}
    placeholder="Search..."
    className="filter-input"
  />
);