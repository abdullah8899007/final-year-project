
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { RootState, AppDispatch } from "@/store/root-store";
import { fetchTablesAsync } from "@/store/Re-Slice/TableSlice";

interface TableGridProps {
  removeTable: (tableId: number) => void;
}

const TableGrid: React.FC<TableGridProps> = ({ removeTable }) => {
  const dispatch: AppDispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table.tables);
  console.log("tableData", tableData);

  useEffect(() => {
    dispatch(fetchTablesAsync());
  }, [dispatch]);

  const handleRemoveTable = (tableId: number) => {
    removeTable(tableId);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-row-1 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-3 w-full">
          {Array.isArray(tableData) &&
            tableData.map((table) => (
              <div
                key={table.id}
                className={`bg-gray-200 rounded-lg shadow-md flex flex-col justify-between items-center py-6 px-4 h-29 w-[7rem] sm:w-[10rem] relative ${
                  table.status === "reserved" ? "bg-orange-400" : ""
                }`}
              >
                <FaTimes
                  onClick={() => handleRemoveTable(table.id)}
                  className="text-red-500 cursor-pointer absolute top-2 right-2"
                />
                <span
                  className={`${
                    table.status === "reserved" ? "text-white" : "text-black"
                  }`}
                >
                  Table {table.table_number}
                </span>
                {table.status === "reserved" && <span>Reserved</span>}
                <span>{table.sitting_size}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TableGrid;
