import React, { useRef, useState } from "react";
import PrintInvoice from "@/pages/menu/menu-com/printInvoice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/root-store";
import { removeFromCart, updateQuantity } from "@/store/slice/cartSlice";
import { MdDelete } from "react-icons/md";
import { createOrderAsync } from "@/store/slice/orderSlice";
import { createCustomerAsync, Customer } from "@/store/slice/customerSlice";
import { RxCross2 } from "react-icons/rx";
import { createInvoiceAsync, Invoice } from "@/store/slice/invoiceSlice";
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

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    orderType: "",
  });
  const [orderId, setOrderId] = useState<number>(0);

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
    if (name === "orderType") {
      setUserData((prevData) => ({
        ...prevData,
        orderType: value,
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  console.log("selectedItem>>>>>>>>>>>>>>>>>>>>>>>>.", selectedItem);
  const calculateTotal = () => {
    return cartItems.reduce(
      (totalPrice, item) => totalPrice + item.stock * item.price,
      0
    );
  };
  //   setItemQuantities((prevQuantities) => {
  //     const { [id]: _, ...remainingQuantities } = prevQuantities;
  //     return remainingQuantities;
  //   });
  // };

  const handleUpdateQuantity = (id: any, newQuantity: number) => {
    // Update the quantity for the specific item
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };
  const handleDelete = (id: any) => {
    setSelectedItem((prevItems: any[]) =>
      prevItems.filter((item: { id: any }) => item.id !== id)
    );
  };

  const CartItem = useSelector((state: RootState) => state.cart.items);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Create a new customer object
    const newCustomer = {
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      email: userData.email,
    };

    // Dispatch action to create the customer
    dispatch(createCustomerAsync(newCustomer))
      .then((customerAction: any) => {
        const customerId = customerAction.payload.id;
        if (!userData.orderType) {
          alert("Please select an order type.");
          return;
        }

        const orderItems = cartItems.map((item) => ({
          itemId: item.id,
          stock: item.stock,
        }));

        const order = {
          customerId: customerId,
          items: orderItems,
          orderType: userData.orderType,
          total: calculateTotal(),
          status: "Enqueue",
        };
        dispatch(createOrderAsync(order)).then((orderAction: any) => {
          const orderId = orderAction.payload.data.id;

          const newInvoice: Omit<Invoice, "invoice_id" | "issued_at"> = {
            orderId: orderId,
            customer: customerId,
            items: cartItems.map((item) => ({
              itemId: item.id,
              stock: item.stock,
              price: item.price,
              status: "pending",
            })),
          };

          dispatch(createInvoiceAsync(newInvoice)).then((orderAction: any) => {
            const invoiceId = orderAction.payload.invoice_id;
            console.log("invice id", invoiceId);
            setInvoiceId(invoiceId);
          });
        });
      })
      .catch((error: any) => {
        console.error("Error creating customer:", error);
      });
  };

  // Caculate the dicount or total jo upper sa get kiya hai
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
                                      onClick={() => handleDelete(item.id)} // Pass item id to handleDelete
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
                          onClick={handleSubmit}
                        >
                          Checkout
                        </button>
                        <PrintInvoice
                          invoiceId={invoiceId}
                          customerData={userData}
                          cartItems={cartItems}
                          calculateTotal={calculateTotal}
                          total={total}
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
