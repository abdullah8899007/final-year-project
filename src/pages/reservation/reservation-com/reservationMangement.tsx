import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTable, clearError } from '@/store/Re-Slice/TableSlice';
import ReservedCustomerList from "./reserverdCustomerList";
import ReservationModal from "./reservationModal";
import TableModal from "./TableModal";
import TableGrid from "./TablesGrid";
import { Table } from "../types";
import { Customer } from "../types";
import { RootState } from "@/store/root-store";

const ReservationManagement: React.FC = () => {
  const dispatch = useDispatch();
  const tables = useSelector((state: RootState) => state.table.tables);
  const error = useSelector((state: RootState) => state.table.error);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [table, setTable] = useState<Table[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);
  const fetchData = () => {
    setTimeout(() => {
      const dummyCustomers: Customer[] = [
        {
          id: 1,
          name: "John Doe",
          phone: "123-456-7890",
          email: "john@example.com",
          address: "123 Main St",
          tableId: 2,
          bookingDateTime: "2024-02-28 T15:30:00",
          status: "Confirmed",
          image: "https://dummyimage.com/50x50/000/fff&text=John", 
        },
        {
          id: 2,
          name: "Jane Doe",
          phone: "987-654-3210",
          email: "jane@example.com",
          address: "456 Oak St",
          tableId: 1,
          bookingDateTime: "2024-02-28 T18:00:00 ",
          status: "Confirmed",
          image: "https://dummyimage.com/50x50/000/fff&text=John", 
        },
      ];
      const dummyTables: Table[] = [
        // { id: 1, tableNumber: 1,seatingSize: 4, status: "available" },
        { id: 2, tableNumber: 2,seatingSize: 2, status: "reserved" },
        { id: 3, tableNumber: 3,seatingSize: 2, status: "reserved" },

        // { id: 4, tableNumber: 4,seatingSize: 2, status: "reserved" },

        // // { id: 5, tableNumber: 5,seatingSize: 2, status: "available" },
        // // { id: 6, tableNumber: 6,seatingSize: 4, status: "available" },
        // { id: 7, tableNumber: 7,seatingSize: 2, status: "reserved" },
        // { id: 8, tableNumber: 8,seatingSize: 2, status: "reserved" },
        // { id: 9, tableNumber: 9,seatingSize: 2, status: "available" },

        // { id: 10, tableNumber: 10,seatingSize: 2, status: "reserved" },
      ];
      setCustomers(dummyCustomers);
      setTable(dummyTables as Table[]); 
      setLoading(false);
    }, 1000);
  };

  const openReservationModal = () => {
    setShowReservationModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
  };

  const openTableModal = () => {
    setShowTableModal(true);
  };

 
  const closeTableModal = () => {
    setShowTableModal(false);
    dispatch(clearError()); 
  };
  const submitReservation = (reservationData: any) => {
    console.log("Submitted reservation:", reservationData);
    setCustomers([
      ...customers,
      {
        id: customers.length + 1,
        ...reservationData,
        status: "Confirmed",
        bookingTime: new Date().toISOString(),
      },
    ]);
  
    const updatedTables = tables.map((table) =>
      table.id === reservationData.tableId ? { ...table, status: 'reserved' } : table
    );
    // setTable(updatedTables); 
    setTable((prevTables) =>
  prevTables.map((table) =>
    table.id === reservationData.tableId
      ? { ...table, status: 'reserved' }
      : table
  )
);

  };
  
  const submitTable = (tableData: any) => {
    console.log("Submitted table:", tableData);
    dispatch(addTable(tableData));

    const newTable: Table = {
      id: tables.length + 1, 
      tableNumber: tableData.tableId,
     seatingSize: tableData.seatingSize,
      status: tableData.status,
    };
  
    setTable([...table, newTable]);
  
    closeTableModal();
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="flex justify-between items-center py-4 px-8 mb-4">
        <h1 className="text-2xl font-bold m-0"> Reservations </h1>
        <div className="flex">
          <button
            className="bg-[#EA6A12] hover:bg-[#D95F0E] mr-12 text-white font-bold py-2 px-4 rounded"
            onClick={openTableModal}
          >
            Create Table
          </button>
          <button
            className="bg-[#EA6A12] hover:bg-[#D95F0E] text-white font-bold py-2 px-4 rounded"
            onClick={openReservationModal}
          >
            Create Reservation
          </button>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center  py-2   ">
        {showReservationModal && (
          <ReservationModal
            closeModal={closeReservationModal}
            submitReservation={submitReservation}
            tables={tables}
          />
        )}
        {showTableModal && (
          <TableModal closeModal={closeTableModal} submitTable={submitTable} />
        )}

        <div className="flex flex-col sm:flex-col   md:flex-row  w-full">
          <div className="md:w-1/2 ml-16  ">
            <ReservedCustomerList customers={customers} />
          </div>
          <div className=" w-full">
          <TableGrid tables={tables} submitTable={submitTable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationManagement;
