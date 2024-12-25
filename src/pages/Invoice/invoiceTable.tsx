import React, { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import InvoiceDetails from "./InvoiceDetails";
import { fetchInvoiceData } from "../../api/salesreport-api";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const itemsPerPage = 7;

  const getData = async () => {
    try {
      const response = await fetchInvoiceData();
      console.log("response", response.data);
      if (response?.data) {
        setInvoices(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCloseInvoiceDetail = () => {
    setSelectedInvoice(null);
  };

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

  const handlePageClick = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  console.log("invoices", invoices);
  return (
    <>
      {selectedInvoice ? (
        <InvoiceDetails
          invoice={selectedInvoice}
          onClose={handleCloseInvoiceDetail} orders={[]}        />
      ) : (
        <>
        
          {/* Header */}
          <div className="flex justify-between items-center mx-10 my-3">
            <h1 className="font-exo2 text-3xl font-semibold text-[#353535]">
              Invoice List
            </h1>
          </div>

          {/* Invoice Table */}
          <div className="m-4 border w-[95%] rounded-lg bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-center border-b">
                  <tr>
                    <th className="px-6 py-3">Invoice ID</th>
                    <th className="px-6 py-3">Customer Name</th>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Invoice Date</th>
                    <th className="px-6 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length > 0 ? (
                    invoices.map((invoice) => (
                      <tr
                        key={invoice.invoice_id}
                        className="text-center border-b"
                      >
                        <td className="px-6 py-4">#{invoice.invoice_id}</td>
                        <td className="px-6 py-4">{invoice.customer_name}</td>
                        <td className="px-6 py-4">{invoice.order_id}</td>
                        <td className="px-6 py-4">
                          {new Date(invoice.issued_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">{invoice.total}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-3"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No invoices available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center m-7">
            <span className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {indexOfFirstItem + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900">
                {Math.min(indexOfLastItem, invoices.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {invoices.length}
              </span>{" "}
              Entries
            </span>
            <nav aria-label="Page navigation">
              <ul className="flex items-center h-8 text-sm">
                {/* Previous Page Button */}
                <li>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-3 h-8 ${
                      currentPage === 1
                        ? "text-gray-500 bg-white border border-[#ea6a12] cursor-not-allowed"
                        : "text-[#ea6a12] bg-blue-50 border border-[#ea6a12] hover:bg-[#ea6a12] hover:text-white"
                    } rounded-s-lg`}
                  >
                    <span className="sr-only">Previous</span>
                    <MdKeyboardDoubleArrowLeft className="text-lg font-bold" />
                  </button>
                </li>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageClick(index + 1)}
                      className={`flex items-center justify-center px-3 h-8 leading-tight ${
                        currentPage === index + 1
                          ? "text-white bg-[#ea6a12] border border-[#ea6a12]"
                          : "text-[#ea6a12] bg-white border border-[#ea6a12]"
                      } hover:bg-[#ea6a12] hover:text-white`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center px-3 h-8 ${
                      currentPage === totalPages
                        ? "text-gray-500 bg-white border border-[#ea6a12] cursor-not-allowed"
                        : "text-black bg-white border border-[#ea6a12] hover:bg-[#ea6a12] hover:text-white"
                    } rounded-e-lg`}
                  >
                    <span className="sr-only">Next</span>
                    <MdKeyboardDoubleArrowRight className="text-lg font-bold" />
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
