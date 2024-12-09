
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearFormData } from "@/store/Re-Slice/ReservationSlice";
import TextInput from "@/app/common-components/TextInput";
import { createReservationAsync } from "@/store/Re-Slice/ReservationSlice";
import { Reservation } from "@/pages/reservation/types";
import { AppDispatch } from "@/store/root-store";
import {createCustomerAsync} from '@/store/slice/customerSlice';

interface ReservationFormProps {
  closeModal: () => void;
  tables: any[];
  submitReservation: (tableData: any) => void;
}

const ReservationModal: React.FC<ReservationFormProps> = ({
  closeModal,
  tables,
  // submitReservation,
}) => {
  const dispatch: AppDispatch = useDispatch();

  type ReservationModal = Omit<Reservation, "id">;

  const [formData, setFormData] = useState<ReservationModal>({
    name: "",
    phone: "",
    email: "",
    address: "",
    event: "",
    tableId: 0,
    customerId: 0,
    booking_time: "",
    status: "Confirmed",
  });

const submitReservation = (reservationData: Omit<Reservation, 'id'>) => {
  dispatch(createReservationAsync(reservationData))
    .then((action: any) => {

      console.log("Reservation created:", action.payload);
    })
    .catch((error: any) => {
      console.error("Error creating reservation:", error);
    });
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCustomer = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
    };

    dispatch(createCustomerAsync(newCustomer))
      .then((action: any) => {
        const customerId = action.payload.id;
        const createReservation={
        
          event: formData.event,
          tableId: formData.tableId,
          customerId: customerId,
          booking_time: formData.booking_time,
          status:formData.status
        }
        dispatch (createReservationAsync(createReservation))

        const completeFormData: Omit<Reservation, 'id'> = {
          ...formData,
          customerId: customerId,
        };

        submitReservation(completeFormData);
        console.log('Submitting reservation:', completeFormData);

        closeModal();
      })
      .catch((error: any) => {
        console.error("Error creating customer:", error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "booking_time" ? value : value,
    }));
  };
  

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      dispatch(clearFormData());
    };
  }, [closeModal, dispatch]);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const dummyTableData = [
    { id: 1, table_number: 1, status: "reserved" },
    { id: 2, table_number: 2, status: "available" },
    { id: 3, table_number: 3, status: "reserved" },
  ];
  return (
    <>
      <div
        className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
        onClick={handleCloseModal}
      >
        <div
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative flex flex-col-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FaTimes />
          </button>
          <form onSubmit={handleSubmit} className="flex flex-row md:flex-row">
            <div className="w-full sm:w-full md:w-1/2 pr-0 md:pr-4 ">
              <TextInput
                label="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
              />
              <TextInput
                label="Phone"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
              />
              <TextInput
                label="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="text"
              />
              <TextInput
                label="Address"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
              />
              <button
                type="submit"
                className="bg-[#EA6A12] hover:bg-[#D95F0E] text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
              >
                Save Reservation
              </button>
            </div>
             <div className="w-full sm:w-full md:w-1/2 pl-0 md:pl-4">
              <TextInput
                label="Event"
                id="event"
                name="event"
                value={formData.event}
                onChange={handleChange}
                type="text"
              /> 
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="tableId"
                >
                  Table
                </label>
                <select
                  id="tableId"
                  name="tableId"
                  value={formData.tableId || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="" disabled>
                    Select a Table
                  </option>
                  {dummyTableData.map((table) => (
                    <option
                      key={table.id}
                      value={table.id}
                      disabled={table.status === "reserved"}
                    >
                      {`Table ${table.table_number} ${
                        table.status === "reserved" ? "(Reserved)" : ""
                      }`}
                    </option>
                  ))}
                </select>
              </div>
              <TextInput
                label="Booking Time"
                id="booking_time"
                name="booking_time"
                value={formData.booking_time}
                onChange={handleChange}
                type="datetime-local"
                // required
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReservationModal;
