import React, { useEffect, useRef, useState } from "react";
import { FaPrint } from "react-icons/fa";
import logo from "../../../../public/images/logo.svg";
import Image from "next/image";
import { fetchCustomerAsync } from "@/store/slice/customerSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/root-store";
import { RxCross2 } from "react-icons/rx";
import { createInvoiceAsync, Invoice } from "@/store/slice/invoiceSlice";
import axios from "axios";
import { API_URLS } from "@/utils/api-urls";
interface CartItem {
  id: number;
  name: string;
  stock: number;
  price: number;
}
interface PrintInvoiceProps {
  invoiceId: number;
  customerData: {
    name: string;
    phone: string;
    address: string;
    email: string;
    orderType: string;
  };
  cartItems: CartItem[];
  calculateTotal: () => number;
  total: number;
}

const PrintInvoice = ({
  invoiceId,
  customerData,
  cartItems,
  invoiceNumber,
  calculateTotal,
  total,
}: PrintInvoiceProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrintButtonHidden, setIsPrintButtonHidden] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const currentDateRef = useRef<string>("");
  const SelectOrder = useSelector((state: RootState) => state.order.orders);
  const [message,setMessage] = useState(false)
  useEffect(() => {
    dispatch(fetchCustomerAsync());
  }, [dispatch]);
console.log(cartItems,'cartItems');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePrint = async() => {
    try {
      // API call to notify successful print
      const response = await fetch(`${API_URLS}/orders/invoices/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id:invoiceNumber }),
      });
      setMessage(true)
      // Show success message

      // Trigger the browser's print dialog
      // window.print();
    } catch (error) {
      // Handle API call errors
      console.error("Error while printing the invoice:", error);
  };
    // window.print();
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const currentDate = new Date();
    currentDateRef.current = formatDate(currentDate);
  }, []);

  useEffect(() => {
    const handleAfterPrint = () => {
      setIsPrintButtonHidden(false);
    };
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);

      closeModal();
    };
  }, []);

  const CusID = useSelector((state: RootState) => state.customer.customers);
  const OrderTable = (state: RootState) => state.order.orders;

  return (
    <>
      {!isPrintButtonHidden && (
        <button
          className="bg-gray-300 text-black hover:bg-[#ea6a12] hover:text-white py-2 px-4 
  rounded-lg mt-4 w-full flex items-center justify-center"
          onClick={toggleModal}
        >
          <FaPrint className="mr-2" /> Print Invoice
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full md:w-[60%] bg-white shadow-lg rounded-lg p-6 relative">
            {/* Heading and Close */}
            <div className="flex justify-between flex-row mb-3">
              <h1> </h1>
              <RxCross2
                className="text-2xl text-[#ea6a12]"
                onClick={closeModal}
              />
            </div>
            {/* Invoice Data start here  */}

            <div className="sm:w-11/12 lg:w-3/4 mx-auto border shadow-lg rounded-md px-3 py-2 ">
              <div className="flex flex-row justify-between  bg-white ">
                <Image src={logo} alt="Logo" width={100} height={100} />

                <div className="text-end">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    Invoice #
                  </h2>
                  <span className="mt-1 block text-gray-500 text-center">
                    {invoiceId}
                  </span>

                  <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
                    45 Roker Terrace
                    <br />
                    Latheronwheel
                    <br />
                    KW5 8NW, London
                    <br />
                    United Kingdom
                    <br />
                  </address>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Bill to:
                  </h3>
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                    {customerData.name}
                  </h3>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {customerData.address}
                  </h3>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {customerData.email}
                  </h3>
                  <address className="mt-2 text-sm font-italic text-gray-500">
                    {customerData.phone}
                  </address>
                </div>

                <div className="sm:text-end space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Invoice date:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {currentDateRef.current}
                      </dd>
                    </dl>
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Due date:
                      </dt>
                      <dd className="col-span-2 text-gray-500">
                        {currentDateRef.current}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                  <div className="sm:grid sm:grid-cols-5">
                    <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                      Item
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </div>
                    <div className="text-start text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                      <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>
                      {cartItems.map((item) => (
                        <div
                          className="grid grid-cols-3 sm:grid-cols-5 gap-4"
                          key={item.id}
                        >
                          <div className="col-span-full sm:col-span-2 mr-3">
                            <h5 className="sm:hidden text-xs font-medium  uppercase text-red-500"></h5>

                            <p className="font-medium text-gray-800 dark:text-gray-200">
                              {item.name}
                            </p>
                          </div>
                          <div>
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase"></h5>
                            <p className="text-gray-800 dark:text-gray-200">
                              {" "}
                              {item.stock}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-800 dark:text-gray-200">
                              {" "}
                              {item.price}
                            </p>
                          </div>
                          <div>
                            <p className=" text-gray-800 dark:text-gray-200">
                              {item.price * item.stock}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex sm:justify-end">
                <div className="w-full max-w-2xl sm:text-end space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-5 gap-x-3">
                      <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                        Subtotal:
                      </dt>
                      <dd className=" text-gray-500">{total}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Thank you!
                </h4>
                <p className="text-gray-500">
                  If you have any questions concerning this invoice, use the
                  following contact information:
                </p>
                <div className="mt-2">
                  <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    A.info@example.com
                  </p>
                  <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    +1 (062) 109-9222
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-3 justify-center">
              <button
                className="bg-[#ea6a12] text-white py-2 px-4 rounded-lg mt-4 flex items-center justify-center w-[30%]"
                onClick={() => {
                  handlePrint();
                  closeModal();
                }}
              >
                <FaPrint className="mr-2" /> Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
         {message && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded shadow-lg">
          {'Invoice generated successfully'}
        </div>
      )}
    </>
  );
};
export default PrintInvoice;
