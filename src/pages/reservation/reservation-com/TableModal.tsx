
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTableAsync } from "@/store/Re-Slice/TableSlice"; // Correct import statement
import { fetchTablesAsync } from "@/store/Re-Slice/TableSlice"; // Correct import statement
import TextInput from "@/app/common-components/TextInput";
import { Table } from "@/pages/reservation/types";
import { RootState ,AppDispatch} from "@/store/root-store";

interface TableModalProps {
  closeModal: () => void;
  submitTable: (tableData: any) => void;
}

const TableModal: React.FC<TableModalProps> = ({ closeModal }) => {
  const dispatch:AppDispatch = useDispatch();

  const [formData, setFormData] = useState({
    table_number: 0,
    sitting_size: 0,
    status: "available",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTable: Omit<Table, 'id'> = { 
      table_number: formData.table_number,
      sitting_size: formData.sitting_size,
      status: formData.status,
    };

    try {
      if (!newTable.table_number || !newTable.sitting_size) {
        throw new Error("table_number and seating_size are required fields");
      }

      dispatch(addTableAsync(newTable)); 
    
      closeModal();
    } catch (error) {
      setError("Failed to add table");
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 flex flex-col relative z-50">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FaTimes />
        </button>
        <div className="w-full pr-4">
          <h2 className="text-lg font-bold mb-4">Table Details</h2>
          {error && <div className="text-red-500">{error}</div>}
          <TextInput
            label="Table No"
            id="table_number"
            name="table_number"
            type="number"
            value={formData.table_number}
            onChange={handleChange}
          />
          <TextInput
            label="Sitting Size"
            id="sitting_size"
            name="sitting_size"
            type="number"
            value={formData.sitting_size}
            onChange={handleChange}
          />

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="available">Available</option>
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#EA6A12] hover:bg-[#D95F0E] text-white font-bold py-2 px-4 rounded mt-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TableModal;
