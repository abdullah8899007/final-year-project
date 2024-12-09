
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReservedCustomerList from "./ReserverdCustomerList";
import ReservationModal from "./ReservationModal";
import TableModal from "./TableModal";
import TableGrid from "./TablesGrid";
import { AppDispatch, RootState } from "@/store/root-store";
import { removeTable } from "@/store/Re-Slice/TableSlice";
import { createReservationAsync } from "@/store/Re-Slice/ReservationSlice";
import { fetchTablesAsync } from "@/store/Re-Slice/TableSlice";
import { Table, Reservation, Customer } from "../types";

const ReservationManagement: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table.tables);
  const error = useSelector((state: RootState) => state.table.error);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [table, setTable] = useState<Table[]>([]);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

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
  };
  
  const submitReservation = (reservationData: any) => {
    const newCreate: Omit<Reservation, "id"> = {
      tableId: reservationData.tableId,
      customerId: reservationData.customerId,
      name: reservationData.name,
      phone: reservationData.phone,
      email: reservationData.email,
      address: reservationData.address,
      event: reservationData.event,
      booking_time: reservationData.booking_time,
      status: "Confirmed",
    };
    
    const customerId = reservationData.customerId || 1; 
    
    dispatch(createReservationAsync({ ...newCreate, customerId }))
      .then(() => {
        console.log('Reservation created successfully!');
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
      });
  
    if (Array.isArray(tableData)) {
      const updatedTables = tableData.map((table) =>
        table.id === reservationData.tableId
          ? { ...table, status: "reserved" }
          : table
      );
      setTable(updatedTables);
    }
    else {
      console.error('tableData is not an array:', tableData);
    }
  };
  
  const submitTable = () => {
    dispatch(fetchTablesAsync())
      .then(() => {
        console.log("Tables fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching tables:", error);
      });
  
    closeTableModal();
  };

  const handleRemoveTable = (tableId: number) => {
    dispatch(removeTable(tableId));
    console.log(`Removing table with ID: ${tableId}`);
  };

  useEffect(() => {
    dispatch(fetchTablesAsync());
  }, [dispatch]);

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
      <div className="flex flex-col items-center justify-center py-2">
        {showReservationModal && (
          <ReservationModal
            closeModal={closeReservationModal}
            submitReservation={submitReservation}
            tables={tableData}
          />
        )}
        {showTableModal && (
          <TableModal closeModal={closeTableModal} submitTable={submitTable} />
        )}

        <div className="flex flex-col sm:flex-col md:flex-row w-full">
          <div className="md:w-1/2 ml-16">
            <ReservedCustomerList customers={customers} />
          </div>
          <div className="w-full">
            <TableGrid removeTable={handleRemoveTable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationManagement;
