import React, { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerAsync,deleteCustomerAsync} from "@/store/slice/customerSlice";
import { fetchOrdersAsync,deleteOrderAsync } from "@/store/slice/orderSlice";
import { fetchInvoiceAsync, selectInvoices ,deleteInvoiceAsync} from "@/store/slice/invoiceSlice";
import { RootState,AppDispatch } from "@/store/root-store";

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import InvoiceDetails from "./InvoiceDetails";
const InvoiceTable = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomerAsync());
    dispatch(fetchOrdersAsync());
    dispatch(fetchInvoiceAsync());
  }, [dispatch]);

  const invoices = useSelector((state: RootState) => state.invoice.invoices);
  const customers = useSelector((state: RootState) => state.customer.customers);
  const orders = useSelector((state: RootState) => state.order.orders);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedInvoice, setSelectedInvoice] = React.useState<any>(null);


  const handleFileInvoiceClick = (invoiceId: number) => {
    const selectedInvoice = invoices.find(
      (invoice) => invoice.invoice_id === invoiceId
    );
    
    if (selectedInvoice) {
      const matchedOrder = orders.find((order) => order.id === selectedInvoice.orderId);
      const customer = matchedOrder
        ? customers.find((c) => c.id === matchedOrder.customerId)
        : null;
  
      setSelectedInvoice({
        ...selectedInvoice,
        customerName: customer ? customer.name : "Unknown",
        customerAddress: customer ? customer.address : "Unknown",
        customerPhone: customer ? customer.phone : "Unknown",
        orderId: matchedOrder ? matchedOrder.id : "Unknown",
        orderDetail: matchedOrder ? matchedOrder.total : "Unknown",
      });
    }
  };

  const handleCloseInvoiceDetail = () => {
    setSelectedInvoice(null);
  };
  // Pagination

  const itemsPerPage = 7;
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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

  const resultdata = invoices
    .slice(indexOfFirstItem, indexOfLastItem)
    .map((invoices) => {
      const matchedOrder = orders.find(
        (order) => order.id === invoices.orderId
      );
      const customer = matchedOrder
        ? customers.find((c) => c.id === matchedOrder.customerId)
        : null;

      return {
        ...invoices,
        customerName: customer ? customer.name : "Unknown",
        customerAddress: customer ? customer.address : "Unknown",
        customerPhone: customer ? customer.phone : "unkown",
        orderId: matchedOrder ? matchedOrder.id : "Unknown",
        orderDetail: matchedOrder ? matchedOrder.total : "Unknown",
      };
    });
    const handleDeleteInvoice = (invoiceId: number) => {
      dispatch(deleteInvoiceAsync(invoiceId));
      const selectedInvoice = invoices.find((invoice) => invoice.invoice_id === invoiceId);
      if (selectedInvoice) {
        dispatch(deleteOrderAsync(selectedInvoice.orderId));
        const matchedOrder = orders.find((order) => order.id === selectedInvoice.orderId);
        if (matchedOrder) {
          dispatch(deleteCustomerAsync(matchedOrder.customerId));
        }
      }
    };
    
  return (
    <>
      {selectedInvoice ? (
        <InvoiceDetails
          invoice={selectedInvoice}
          onClose={handleCloseInvoiceDetail}
          orders={orders}
        />
      ) : (
        <>
          <div className="flex ml-4 justify-between items-center mx-10 my-3">
            <div className="flex flex-col m-3">
              <h1 className="font-exo2 text-3xl font-semibold text-[#353535]">
                Invoice List
              </h1>
            </div>
          </div>

          <div className="grid grid-rows m-4 border w-[95%] rounded-lg bg-white shadow-sm">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs uppercase text-center">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 border-b border-gray-200"
                    >
                      Invoice ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-b border-gray-200"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-b border-gray-200"
                    >
                      Order Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-b border-gray-200"
                    >
                      Invoice date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-b border-gray-200"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-b border-gray-200"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resultdata.map((invoice) => (
                    <tr
                      className="bg-white dark:bg-gray-800 dark:border-gray-700 text-center"
                      key={invoice.invoice_id}
                    >
                      <td className="px-6 py-4">#{invoice.invoice_id}</td>
                      <td className="px-6 py-4">{invoice.customerName}</td>
                      <td className="px-4 py-4">{invoice.orderId}</td>
                      <td className="px-6 py-4"> {new Date(invoice.issued_at).toLocaleString()}</td>
                      <td className="px-6 py-4">{invoice.orderDetail}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <MdDeleteSweep className="text-lg text-[#7e7d7d] text-center cursor-pointer" />
                          <button
                            title="invoice"
                            onClick={() => handleFileInvoiceClick(invoice.invoice_id)}
                          >
                            <FaFileInvoice className="text-lg text-[#7e7d7d] text-center cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div></div>
            </div>
          </div>
          {/* Pagination  start here */}
          <div className="flex justify-between items-center m-7">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {indexOfFirstItem + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.min(indexOfLastItem, resultdata.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {resultdata.length}
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
      )}
    </>
  );
};

export default InvoiceTable;
