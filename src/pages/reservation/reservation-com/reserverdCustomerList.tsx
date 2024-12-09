
import React, { useEffect } from "react";
import { Customer } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/root-store";
import { fetchReservationsAsync } from "@/store/Re-Slice/ReservationSlice";
import { AppDispatch } from "@/store/root-store";

interface ReservedCustomerListProps {
  customers: Customer[];
}

const ReservedCustomerList: React.FC<ReservedCustomerListProps> = ({
  customers,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const reservationData = useSelector(
    (state: RootState) => state.reservation.reservations
  );
  const customerData = useSelector(
    (state: RootState) => state.customer.customers
  );

  useEffect(() => {
    console.log("Fetching reservations...");
    dispatch(fetchReservationsAsync());
  }, [dispatch]);

  useEffect(() => {
    console.log("Reservation data changed:", reservationData);
  }, [reservationData]);

  const findCustomerById = (customerId: number) =>
    customerData.find((customer) => customer.id === customerId);

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <ul>
        {Array.isArray(reservationData) &&
          reservationData.map((reservation) => {
            const customer = findCustomerById(reservation.customerId);

            return (
              <li
                key={reservation.id}
                className="mb-5 bg-[#F8F8F8] text-black py-3 px-3 rounded-lg shadow-lg"
              >
                <div className="flex">
                  <div>
                    <span>{customer?.name}</span>
                    <br />
                    <span className="text-[#959895]">
                      {reservation.booking_time}
                    </span>
                    <br />
                    <span className="inline-block bg-[#EA6A12] text-white py-1 px-3 rounded-lg">
                      {reservation.status}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ReservedCustomerList;
