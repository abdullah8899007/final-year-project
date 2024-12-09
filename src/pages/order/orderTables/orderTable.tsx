import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import {
  fetchOrdersAsync,
  setOrderStatus,
  updateOrderAsync,
} from "@/store/slice/orderSlice";
import { fetchCustomerAsync } from "@/store/slice/customerSlice";
import { RootState, AppDispatch } from "@/store/root-store";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const OrderTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerAsync());

    dispatch(fetchOrdersAsync());
  }, [dispatch]);

  const customers = useSelector((state: RootState) => state.customer.customers);
  const orders = useSelector((state: RootState) => state.order.orders);

  const ordersWithCustomerInfo = orders.map((order) => {
    const customer = customers.find(
      (customer) => customer.id === order.customerId
    );
    return {
      ...order,
      customerName: customer ? customer.name : "Unknown",
      customerAddress: customer ? customer.address : "Unknown",
    };
  });

  let filteredOrders;

  if (selectedStatus) {
    if (selectedStatus === "Enqueue") {
      filteredOrders = ordersWithCustomerInfo.filter(
        (order) => order.status === "Ready"
      );
    } else {
      filteredOrders = ordersWithCustomerInfo.filter(
        (order) => order.status === "Completed"
      );
    }
  } else {
    filteredOrders = ordersWithCustomerInfo;
  }

  // Pagination
  const itemsPerPage = 7;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDropdownToggle = (orderId: number) => {
    setDropdownOpen(orderId === dropdownOpen ? null : orderId);
  };

  const handleChangeStatus = async (orderId: number, newStatus: string) => {
    try {
      const orderToUpdate = ordersWithCustomerInfo.find(
        (order) => order.id === orderId
      );
      if (!orderToUpdate) {
        console.error("Order not found");
        return;
      }

      const updatedOrder = { ...orderToUpdate, status: newStatus };

      dispatch(setOrderStatus({ orderId, status: newStatus }));

      await dispatch(updateOrderAsync(updatedOrder));
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error updating order status:", error);

      dispatch(
        setOrderStatus({
          orderId,
          status: orders.find((order) => order.id === orderId)?.status ?? "",
        })
      );
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(
      value === "Enqueue" ? "Ready" : value === "Completed" ? "Delivered" : null
    );
  };

  return (
    <>
      <div className="flex flex-col mx-4 my-3 sm:flex-row justify-between items-center">
        <div className="m-3">
          <h1 className="font-exo2 text-3xl font-semibold text-[#353535]">
            Order List
          </h1>
          <h2>Here is your Order management</h2>
        </div>
        <div className="flex items-center ">
          <div className="relative gap-3">
            <select
              id="orderStatus"
              title="orderStatus"
              className="appearance-none bg-[#ea6a12] text-white border border-gray-300 text-sm rounded-full
       focus:ring-[#ea6a12] focus:outline-none block w-full px-10 py-3 dark:focus:ring-[#ea6a12] dark:focus:border-[#ea6a12]
       hover:bg-[#e15201] hover:text-white"
              onChange={handleStatusChange}
            >
              <option value="" selected className="bg-white text-black">
                Order Status
              </option>
              <option value="Ready" className="bg-white text-black">
                On Delivery
              </option>
              <option value="Completed" className="bg-white text-black">
                Delivered
              </option>
            </select>
            <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white text-md font-bold" />
            <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white text-md font-bold" />
          </div>
        </div>
      </div>
      {/* Table Start Here */}
      <div className="overflow-x-auto w-[95%] m-5 bg-white rounded-lg shadow-md p-3">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs uppercase text-center">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 sm:px-4">
                Order ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 sm:px-4">
                Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 sm:px-4">
                Customer Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 sm:px-4">
                Location
              </th>
              <th className="px-6 py-3 border-b border-gray-200 sm:px-4">
                Amount
              </th>
              <th className="px-6 py-3 border-b border-gray-200 sm:px-4">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 sm:px-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                className="bg-white dark:bg-gray-800 dark:border-gray-700 text-center"
                key={order.id}
              >
                <td className="px-6 py-4 sm:px-4">#{order.id}</td>
                <td className="px-6 py-4 sm:px-4">
                  {new Date(order.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 sm:px-4">{order.customerName}</td>
                <td className="px-6 py-4 sm:px-4">{order.customerAddress}</td>
                <td className="px-6 py-4 sm:px-4">RS{order.total}</td>

                <td className="px-6 py-4 sm:px-4">
                  {order.status === "Completed" ? (
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 flex items-center justify-center rounded-full bg-green-500 text-white">
                        <FaCircle className="text-green-500" />
                      </div>
                      <span className="ml-2 text-green-500">Delivered</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 flex items-center justify-center rounded-full bg-[#ea6a12]">
                        <FaCircle className="text-[#ea6a12]" />
                      </div>
                      <span className="ml-2 text-black">on Delivery</span>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 sm:px-4">
                  <div className="flex items-center justify-center">
                    <BsThreeDots
                      className="text-lg text-[#7e7d7d] text-center cursor-pointer"
                      onClick={() => handleDropdownToggle(order.id)}
                    />
                    {dropdownOpen === order.id && (
                      <div className="absolute z-10 right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl">
                        <button
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 w-full text-left"
                          onClick={() =>
                            handleChangeStatus(order.id, "Completed")
                          }
                        >
                          Mark as Delivered
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 w-full text-left"
                          onClick={() =>
                            handleChangeStatus(order.id, "Enqueue")
                          }
                        >
                          Mark as Pending
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination  start here */}
      <div className="flex justify-between items-center m-3">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {indexOfFirstItem + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(indexOfLastItem, ordersWithCustomerInfo.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {ordersWithCustomerInfo.length}
          </span>{" "}
          Entries
        </span>
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li onClick={handlePrevPage}>
              <button
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${
                  currentPage === 1
                    ? "text-gray-500 bg-white border border-e-0 border-[#ea6a12]"
                    : "text-[#ea6a12] border border-[#ea6a12] bg-blue-50"
                } rounded-s-lg hover:bg-[#ea6a12] hover:text-white`}
              >
                <span className="sr-only">Previous</span>
                <MdKeyboardDoubleArrowLeft className=" rtl:rotate-180 text-[#ea6a12] hover:text-white text-lg font-bold" />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === index + 1
                      ? "text-white border border-[#ea6a12] bg-[#ea6a12]  hover:text-white"
                      : "text-[#ea6a12] bg-white border border-[#ea6a12]"
                  }`}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li onClick={handleNextPage}>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === totalPages
                    ? "text-[#ea6a12] border border-[#ea6a12]"
                    : "text-black border border-[#ea6a12] hover:bg-[#ea6a12] hover:text-white"
                } rounded-e-lg hover:bg-[#ea6a12] `}
              >
                <span className="sr-only">Next</span>
                <MdKeyboardDoubleArrowRight className=" rtl:rotate-180 text-[#ea6a12] hover:text-white text-lg font-bold" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default OrderTable;
