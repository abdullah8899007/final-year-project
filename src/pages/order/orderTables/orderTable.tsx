import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { fetchOrderDetails } from "../../../api/salesreport-api";

const OrderTable = () => {
  const [userInfo, setUserInfo] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchOrderDetails();
      if (response) {
        setUserInfo(response || []); 
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col mx-4 my-3 sm:flex-row justify-between items-center">
        <div className="m-3">
          <h1 className="font-exo2 text-3xl font-semibold text-[#353535]">
            Order List
          </h1>
          <h2>Here is your Order management</h2>
        </div>
        {/* <div className="flex items-center">
          <div className="relative gap-3">
            <select
              id="orderStatus"
              title="orderStatus"
              className="appearance-none bg-[#ea6a12] text-white border border-gray-300 text-sm rounded-full
               focus:ring-[#ea6a12] focus:outline-none block w-full px-10 py-3 dark:focus:ring-[#ea6a12] dark:focus:border-[#ea6a12]
               hover:bg-[#e15201] hover:text-white"
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
          </div>
        </div> */}
      </div>
      <div className="overflow-x-auto w-[95%] m-5 bg-white rounded-lg shadow-md p-3">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs uppercase text-center bg-gray-100">
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
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {userInfo.length > 0 ? (
              userInfo.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="px-6 py-3 border-b border-gray-200 sm:px-4">
                    {order.id}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 sm:px-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 sm:px-4">
                    {order.name}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 sm:px-4">
                    ${order.total}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-3 border-b border-gray-200 sm:px-4 text-center text-gray-500"
                >
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTable;
