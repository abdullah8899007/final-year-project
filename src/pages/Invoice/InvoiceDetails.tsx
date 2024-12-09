import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../store/root-store";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMenuItemsAsync,
  selectMenuItemById,
  selectAllitems,
} from "@/store/slice/menuSlice";

interface Item {
  itemId: number;
  quantity: number;
}

interface InvoiceDetailProps {
  invoice: any;
  onClose: () => void;
  orders: any[];
}

const InvoiceDetails: React.FC<InvoiceDetailProps> = ({
  invoice,
  onClose,
  orders,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [itemDetails, setItemDetails] = useState<
    {
      name: string;
      price: number;
      itemId: number;
      description: string;
      stock: number;
    }[]
  >([]);

  const { isLoading, error, items } = useSelector(
    (state: RootState) => state.menu
  );

  console.log(orders);
  useEffect(() => {
    if (!invoice || !orders) return;

    const matchedOrder = orders.find((order) => order.id === invoice.orderId);
    console.log("matched order id ", matchedOrder);

    if (!matchedOrder || !matchedOrder.items) return;

    const newItemDetails = matchedOrder.items.map(
      (item: { itemId: number; stock: number }) => {
        const { itemId, stock } = item;
        const matchedItem = items.find(
          (menuItem: { id: number }) => menuItem.id === itemId
        );
        if (matchedItem) {
          return {
            itemId: item.itemId,
            stock: stock,
            name: matchedItem.name,
            price: matchedItem.price,
            description: matchedItem.description,
          };
        }
        console.log("match order", matchedItem);
      }
    );

    setItemDetails(newItemDetails);
    console.log("new items details", newItemDetails);
  }, [invoice, orders, items]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex ml-4 justify-between items-center mx-10 my-3 ">
        <div className="flex flex-col m-3">
          <h1 className="font-exo2 text-3xl font-semibold text-[#353535]">
            Invoice Details
          </h1>
        </div>
      </div>

      <div className=" bg-white shadow-lg rounded-lg p-6 relative mx-5 h-auto mb-10">
        <div className="rounded-md w-full">
          <div className="flex flex-row justify-between text-bold bg-white">
            Invoice #
            <div className="text-end">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200"></h2>
              <span className="mt-1 block text-gray-500 text-center">
                {" "}
                {invoice.invoice_id}
              </span>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3 ">
            <div>
              <h3 className="text-4xl font-semibold text-gray-800 dark:text-gray-200">
                Receiver
              </h3>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {invoice.customerName}
              </h3>
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                {invoice.customerAddress}
              </h3>
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
                {invoice.customeremail}
              </h3>
              <address className="mt-2 text-md font-italic text-gray-500">
                {invoice.customerPhone}
              </address>
            </div>

            <div className="sm:text-end space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                    Invoice date:
                  </dt>
                  <dd className="col-span-2 text-1xl text-gray-500">
                    {new Date(invoice.issued_at).toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          {/* Table start here  */}
          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice &&
                  itemDetails.map((itemDetail, index) => (
                    <tr
                      className="bg-white dark:bg-gray-800"
                      key={itemDetail.itemId}
                    >
                      <td className="px-6 py-4">{itemDetail.itemId}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {itemDetail.name}
                      </th>

                      <td className="px-6 py-4">{itemDetail.stock}</td>
                      <td className="px-6 py-4">{itemDetail.price}</td>
                      <td className="px-6 py-4">
                        {itemDetail.price * itemDetail.stock}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Table ends here */}

          <div className="flex flex-row mt-6">
            <div className="w-2/3">{/* left */}</div>
            <div className="w-2/4 mt-3">
              <div className="mt-8 flex sm:justify-end flex-col">
                <div className="w-full max-w-1xl space-y-2 item-center">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl className="grid sm:grid-cols-4 gap-x-3">
                      <dt className="col-span-2 font-semibold text-gray-800 dark:text-gray-200 float-right">
                        Subtotal:
                      </dt>
                      <dd className="col-span-1 text-gray-500">
                        {" "}
                        Rs : {invoice.orderDetail}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-5">
                  <button
                    className="bg-[#ea6a12] text-white py-2 px-8 rounded-lg mt-4 flex text-center"
                    onClick={handlePrint}
                  >
                    Print Invoice
                  </button>
                  <button
                    className="bg-[#ea6a12] text-white py-2 px-8 rounded-lg mt-4 flex  text-center "
                    onClick={onClose}
                  >
                    Back to list
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main div closed */}
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
