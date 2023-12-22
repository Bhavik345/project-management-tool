import React from 'react';
import { useTable, useSortBy } from 'react-table';

export const DataTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className="min-w-full">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.id}
                className="p-2 border-b"
              >
                {column.render('Header')}
                {/* Render sorting indicators */}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-100">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} key={cell.column.id} className="p-2 border-b">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

