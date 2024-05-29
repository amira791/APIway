import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@chakra-ui/react';

const CustomDataTable = ({ columns, rows, selectedRows, setSelectedRows, clearSelectedRows, setClearSelRows, getRowId }) => {
  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  useEffect(() => {
    if (clearSelectedRows) {
      setSelectedRows([]);
      setClearSelRows(false);
    }
  }, [clearSelectedRows, setClearSelRows, setSelectedRows]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        checkboxSelection
        selectionModel={selectedRows}
        onSelectionModelChange={handleSelectionModelChange}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={getRowId}
        components={{
          NoRowsOverlay: () => <div>No Rows</div>,
        }}
      />
    </div>
  );
};

export default CustomDataTable;