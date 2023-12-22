import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";

export const DataTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    pageOptions,
    setPageSize,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.id === "actions"
                      ? {}
                      : column.getSortByToggleProps()
                  )}
                  key={column.id}
                  className={`p-3 border-b ${
                    column.isSorted ? "bg-gray-300" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {column.render("Header")}
                    {/* Render sorting indicators */}
                    {column.id !== "actions" && (
                      <span>
                        {column.isSorted ? (
                          <span>
                            {column.isSortedDesc ? " ▼" : " ▲"}
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className="hover:bg-gray-100"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="p-3 border-b"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions?.length}
          </strong>{" "}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              !canPreviousPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              !canNextPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
        <div className="text-sm mr-3 text-gray-700">
          Show{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="text-gray-700 border rounded px-2 cursor-pointer py-1"
          >
            {[10, 25, 50].map((pageSizeOption) => (
              <option key={pageSizeOption} value={pageSizeOption}>
                {pageSizeOption}
              </option>
            ))}
          </select>{" "}
          entries
        </div>
      </div>
    </div>
  );
};
