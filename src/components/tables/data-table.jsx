import { ArrowDown, ArrowUp, X } from "lucide-react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

export const DataTable = ({ columns, data , showSearch = true ,hideAction = true }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    pageOptions,
    setPageSize,
    previousPage,
    nextPage,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);


  const showNoRecords = page?.length <= 0;

  return (
    <div className="overflow-x-auto">
      {showSearch &&  <div className="mb-4 flex items-center justify-end mr-3 relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 transition duration-300 w-64"
          />
          {globalFilter && (
            <X
              className="w-5 h-5 cursor-pointer  absolute right-2 top-3 text-gray-500 focus:outline-none"
              onClick={() => setGlobalFilter("")}
            />
          )}
        </div>
      </div> }
     

      {showNoRecords ? (
        <div className="text-center text-gray-700 py-8">No records found</div>
      ) : (
        <>
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
                        column.isSorted ? "bg-blue-300" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {column.render("Header")}
                        {column.id !== "actions" && (
                          <span>
                            {column.isSorted ? (
                              <span>
                                {column.isSortedDesc ? (
                                  <ArrowUp className="w-5 h-5 text-gray-300" />
                                ) : (
                                  <ArrowDown className="w-5 h-5 text-gray-300" />
                                )}
                              </span>
                            ) : (
                              ""
                              // Display the sorting icon by default
                              // <ArrowUp className="w-5 h-5 text-gray-300" />
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
          {showSearch && hideAction && <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-700 flex items-center">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions?.length}
              </strong>{" "}
              <div className="text-sm ml-3 text-gray-700 ">
                Show{" "}
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="text-gray-700  border rounded px-2 cursor-pointer py-1"
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
            <div className="flex space-x-2 mr-3">
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
          </div>}
         
        </>
      )}
    </div>
  );
};
