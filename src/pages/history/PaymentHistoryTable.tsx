import React, { useEffect, useState } from "react";
import { fetchHistoryData } from "@/api/salesreport-api";
import InvoiceBtn from "./InvoiceBtn";
import moment from 'moment';

export default function PaymentHistoryTable() {
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [visibleItems, setVisibleItems] = useState<number>(10); // Track visible items
  const [isAllLoaded, setIsAllLoaded] = useState<boolean>(false); // To track if all items are loaded

  const getData = async () => {
    try {
      const response = await fetchHistoryData();
      if (response) {
        setPaymentHistory(response || []);
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

  // Show all items when Load More button is clicked
  const handleLoadMore = () => {
    if (visibleItems < paymentHistory.length) {
      setVisibleItems(paymentHistory.length);
      setIsAllLoaded(true); // Mark that all items are loaded
    }
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="p-6 w-full bg-white rounded-lg flex-grow flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Payment History
        </h2>
        <div className="overflow-x-auto flex-grow">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-10 py-2 border border-gray-300">#</th>
                <th className="px-10 py-2 border border-gray-300">Name</th>
                <th className="px-10 py-2 border border-gray-300">Date</th>
                <th className="px-10 py-2 border border-gray-300">Order Type</th>
                <th className="px-10 py-2 border border-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.length > 0 ? (
                paymentHistory.slice(0, visibleItems).map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200`}
                  >
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.customer__name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.orderType}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.total}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-gray-500 bg-white"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Show the Load More button if there are more items to load */}
          {!isAllLoaded && paymentHistory.length > visibleItems && (
            
             <div className="invoice-btn-container pt-4">
                    <InvoiceBtn onViewMore={handleLoadMore} />
                  </div>
          )}
        </div>
      </div>

    </div>
  );
}
