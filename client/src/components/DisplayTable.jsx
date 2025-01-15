import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-2 w-full">
      <table className="w-full">
        <thead className="text-left bg-black text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="p-2 border whitespace-nowrap">#</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border whitespace-nowrap">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-left">
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              <td className="p-2 border whitespace-nowrap">{index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
