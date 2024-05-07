import React, { useMemo, useState } from 'react';
import {  Paper, Stack, useMediaQuery } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import {
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_TableHeadCellFilterContainer,
} from 'material-react-table';

const useStyles = makeStyles({
  tableHeader: {
    fontSize: '20px', // Adjust the font size as needed
    fontWeight: 'bold', // You can adjust other typography styles here
  },
  tableCell: {
    fontSize: '1rem', // Adjust the font size as needed
  },
});

const EndpointExacTable = ({}) => {
  const isMobile = useMediaQuery('(max-width: 1000px)');

  // Define your static data
  const staticData = [
    { id: 1, firstName: 'John', lastName: 'Doe', gender: 'Male', age: 30 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', gender: 'Female', age: 25 },
    { id: 3, firstName: 'Alice', lastName: 'Smith', gender: 'Female', age: 35 },
    { id: 4, firstName: 'Bob', lastName: 'Johnson', gender: 'Male', age: 40 },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        filterVariant: 'autocomplete',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        filterFn: 'equals',
        filterSelectOptions: ['Male', 'Female', 'Other'],
        filterVariant: 'select',
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: staticData, // Use static data here
    columnFilterDisplayMode: 'custom', // We will render our own filtering UI
    enableFacetedValues: true,
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
    }),
  });

  return (
    <Stack direction={isMobile ? 'column-reverse' : 'row'} gap="8px">
      <MRT_TableContainer table={table} />
      <Paper>
        <Stack p="8px" gap="8px">
          {table.getLeafHeaders().map((header) => (
            <MRT_TableHeadCellFilterContainer key={header.id} header={header} table={table} in />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default EndpointExacTable;
