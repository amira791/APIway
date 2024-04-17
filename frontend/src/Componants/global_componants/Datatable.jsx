import React, { useState } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';

const DataTable = ({ columns, data }) => {
  const [filterInput, setFilterInput] = useState('');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  return (
    <div>
      <input
        type="text"
        value={filterInput}
        onChange={e => {
          setFilterInput(e.target.value);
          setGlobalFilter(e.target.value);
        }}
        placeholder={"Search..."}
      />
      <table {...getTableProps()} style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ border: '1px solid black', padding: '8px' }}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ border: '1px solid black' }}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
