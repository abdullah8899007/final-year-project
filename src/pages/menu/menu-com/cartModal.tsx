import React, { useRef, useState, useEffect } from "react";
import PrintInvoice from "@/pages/menu/menu-com/printInvoice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/root-store";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
  SendCustomerData,
  fetchCustomerId,
} from "../../../api/reservation-api";
import axios from "axios";
import { API_URLS } from "@/utils/api-urls";

interface CartItem {
  id: number;
  name: string;
  stock: number;
  price: number;
  image: string;
}
interface CartModalProps {
  selectedItem: any;
  setSelectedItem: any;
}
const CartModal: React.FC<CartModalProps> = ({
  selectedItem,
  setSelectedItem,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const Customer = useSelector((state: RootState) => state.customer.customers);
  const [invoiceId, setInvoiceId] = useState<number>(0);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>(
    {}
  );
  const [checkoutTriggered, setCheckoutTriggered] = useState(false);
const [invoiceNumber,setInvoiceNumber] = useState()
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [orderId, setOrderId] = useState<number>(0);
  const [customerData, setCustomerData] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchCustomerId();
      setCustomerData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const customerId = customerData?.data?.id;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return selectedItem.reduce(
      (totalPrice, item) =>
        totalPrice + item.price * (itemQuantities[item.id] || 1),
      0
    );
  };
  const OrderQuantity = selectedItem.quantity;
  const OrderId = selectedItem[0]?.id;
const handleCheckout = async () => {
  try {
    const response = await axios.post(
      `${API_URLS}/customers/create_customer/`,
      userData
    );
    

    setCheckoutTriggered((prev) => !prev);
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};

useEffect(() => {
  getData();
}, [checkoutTriggered]);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setCheckoutTriggered((prev) => !prev); 

    if (newQuantity > 0) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }));
    }
  };
  const handleDelete = (id: any) => {
    setSelectedItem((prevItems: any[]) =>
      prevItems.filter((item: { id: any }) => item.id !== id)
    );
  };

  const CartItem = useSelector((state: RootState) => state.cart.items);
  const subtotal = calculateTotal();
  const total =
    discount > 0 ? subtotal - (subtotal * discount) / 100 : subtotal;

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDiscount = parseFloat(e.target.value);
    if (!isNaN(newDiscount)) {
      setDiscount(newDiscount);
    } else {
      setDiscount(0);
    }
  };
  const handleSubmit = async () => {
    const updatedItems = selectedItem.map((item: any) => ({
      itemid: item.id,
      quantity: itemQuantities[item.id] || 1,
    }));

    const payload = {
      customerId: customerId,
      items: updatedItems,
      orderType: "Lunch",
      total: total,
    };

    try {
      const response = await axios.post(
        `${API_URLS}/orders/orders/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response,'response');
if(response.data.data){
  setInvoiceNumber(response.data.data.id)
}
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
console.log(cartItems,'cartItems');

  return (
    <div>
      <button
        type="button"
        onClick={toggleModal}
        title="confirm order"
        className=" px-10 py-2 w-full bg-[#ea6a12] hover:[#ea6a12] text-white rounded-full"
      >
        Submit Order
      </button>
      {isModalOpen && (
        <div>
          <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className=" w-[100%] bg-white shadow-lg rounded-lg p-6 relative">
              <div className="flex justify-between flex-row">
                <h1 className="font-exo2 text-2xl m-3 font-semibold  text-[#ea6a12]">
                  Order Confirmation
                </h1>
                <RxCross2
                  className="text-2xl text-[#ea6a12]"
                  onClick={closeModal}
                />
              </div>

              {/* Cart Page here  */}

              <div className="bg-white min-h-screen  w-full  ">
                {/* User Detail from here */}
                <div className="flex flex-col md:flex-row gap-10 ml-4">
                  {/* User Detail Form */}
                  <div className="flex flex-col md:flex-row gap-5 w-full">
                    <div className="flex flex-col">
                      <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        title="Enter your name"
                        value={userData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="number"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        title="Enter your phone number"
                        value={userData.phone}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none "
                      />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col">
                      <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        title="Email"
                        value={userData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none "
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="block text-sm font-medium  text-gray-700"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        title="Enter your address"
                        value={userData.address}
                        onChange={handleChange}
                        cols={36}
                        rows={2}
                        className="mt-1 border w-full  rounded-md focus:outline-none  "
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="email"
                      >
                        Order Type
                      </label>
                      <select
                        title="OrderType"
                        name="orderType"
                        value={userData.orderType}
                        onChange={handleChange}
                        className="mt-2 p-2 px-5  border border-gray-300 text-sm font-medium font-exo2 rounded-sm w-full focus:outline-none"
                      >
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Cart Page here  */}

                <div className="bg-white min-h-screen  w-full  ">
                  {/* Cart Info  */}

                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="md:w-4/4 w-full">
                      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left font-semibold">
                                Product
                              </th>
                              <th className="text-left font-semibold">
                                Prices
                              </th>
                              <th className="text-left font-semibold">
                                Quantity
                              </th>
                              <th className="text-left font-semibold">Total</th>
                              <th className="text-left font-semibold">
                                Action
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {selectedItem?.map(
                              (
                                item: {
                                  id: React.Key | null | undefined;
                                  name: string;
                                  price: number;
                                },
                                index: any
                              ) => (
                                <tr key={item.id}>
                                  {" "}
                                  {/* Unique key for each item */}
                                  <td>
                                    <p>
                                      {item.name
                                        .split(" ")
                                        .slice(0, 2)
                                        .join(" ")}
                                    </p>
                                  </td>
                                  <td>Rs: {item.price.toFixed(2)}</td>
                                  <td>
                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(
                                            item.id,
                                            (itemQuantities[item.id] || 1) - 1
                                          )
                                        }
                                        className="w-6 h-6 text-md flex items-center justify-center text-[#ffffff] border bg-[#ea6a12] rounded-full"
                                      >
                                        -
                                      </button>
                                      <span>
                                        {itemQuantities[item.id] || 1}
                                      </span>
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(
                                            item.id,
                                            (itemQuantities[item.id] || 1) + 1
                                          )
                                        }
                                        className="w-6 h-6 text-md flex items-center justify-center text-[#ffffff] border bg-[#ea6a12] rounded-full"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td>
                                    Rs:{" "}
                                    {(
                                      item.price *
                                      (itemQuantities[item.id] || 1)
                                    ).toFixed(2)}
                                  </td>
                                  <td>
                                    <MdDelete
                                      className="text-2xl cursor-pointer shrink-0 fill-[#ea6a12] hover:fill-red-500"
                                      onClick={() => handleDelete(item.id)}
                                    />
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="md:w-2/4">
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Summary</h2>
                        <div className="flex justify-between mb-2">
                          <span>Subtotal :- </span>
                          <span>Rs. {calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">Discount </span>
                          <div className="flex justify-end">
                            <input
                              type="number"
                              title="Discount"
                              value={discount}
                              onChange={handleDiscountChange}
                              className="mt-1 hover:border rounded-md w-[17%] focus:outline-none"
                            />
                            <span className="mt-2">%</span>
                          </div>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between ">
                          <span className="font-semibold">Total</span>
                          <span className="font-semibold">Rs :{total}</span>
                        </div>
                        <button
                          type="submit"
                          className="bg-[#ea6a12] text-white py-2 px-4 rounded-lg mt-4 w-full"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                        <button
                          type="submit"
                          className="bg-[#ea6a12] text-white py-2 px-4 rounded-lg mt-4 w-full"
                          onClick={handleSubmit}
                        >
                          Confirm-Order
                        </button>

                        <PrintInvoice
                          invoiceId={invoiceId}
                          customerData={userData}
                          cartItems={selectedItem}
                          calculateTotal={calculateTotal}
                          total={total}
                          invoiceNumber={invoiceNumber}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* main modal close */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
