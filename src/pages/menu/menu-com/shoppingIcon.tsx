import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import CartModal from "./cartModal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch,RootState } from "../../../store/root-store";
import { FaCartShopping } from "react-icons/fa6";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../../../store/slice/cartSlice";
import { MenuItem } from "../../../store/slice/menuSlice";
import { RxCross2 } from "react-icons/rx";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category?: number;
  stock: number;
}
const ShoppingIcon: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const cartItem = useSelector((state: RootState) => state.cart.items);

  // Show Total Item in above Icons
  const calculateTotalQuantity = () => {
    return cartItem.reduce(
      (totalQuantity, item) => totalQuantity + item.stock,
      0
    );
  };
  const calculateTotal = () => {
    const totalPrice = cartItem.reduce(
      (totalPrice, item) => totalPrice + item.stock * item.price,
      0
    );
    return totalPrice;
  };

  // Add to cart
  const handleAddToCart = (item: MenuItem) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        stock: 1,
      })
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };
  // Handel  Cart Functionlity Throught slice

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    dispatch(updateQuantity({ id: itemId, stock: newQuantity }));
  }; 

  const handleDelete = (itemId: number) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  return (
    <div>
      {/* Shopping cart icon */}
      <button title="Shoppingcart" onClick={toggleCart} className="">
        <div className="relative py-2 gap-2">
          
            <p className="flex h-2 w-2  items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
              {" "}
              {calculateTotalQuantity()}
            </p>
         
          <FaCartShopping  className="text-4xl mr-1 text-[#ea6a12] "/>
          
        </div>
      </button>


      {/* Shopping cart Modal */}

      {isCartOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="  w-[60%] bg-white shadow-lg rounded-lg p-6 relative">
          <RxCross2 className="text-2xl text-[#ea6a12] float-right"       onClick={closeCart}/>
          
            <h4 className="text-md font-bold text-black mt-6">
              Total Items : {calculateTotalQuantity()}
            </h4>
            {/* Cart Item Table is here  */}
            <div className="bg-white rounded-lg shadow-md mb-4 w-full overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr>
                    <th className="font-semibold">Product</th>
                    <th className="font-semibold">Name</th>
                    <th className="font-semibold">Quantity</th>
                    <th className="font-semibold">Total</th>
                    <th className="font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItem.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 ">
                        <picture className="items-center justify-center flex  ">
                          <img
                            src={item.image}
                            alt="Food"
                            className="object-cover rounded-full w-16 h-16  "
                          />
                        </picture>
                      </td>
                      <td className="py-4 ">
                        <p className="text-sm text-black">
                          {item.name.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Quantity: {item.stock}
                        </p>
                      </td>
                      <td className="py-4 ">
                        <div className="flex justify-center items-center">
                          <button
                            title="minus"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.stock - 1)
                            }
                            className="w-6 h-6 text-md flex items-center justify-center text-[#ffffff] border bg-[#ea6a12] rounded-full"
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {item.stock}
                          </span>
                          <button
                            title="plus"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.stock + 1)
                            }
                            className="w-6 h-6 flex text-md items-center justify-center text-[#ffffff] border bg-[#ea6a12] rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 ">
                        Rs {(item.price * item.stock).toFixed(2)}
                      </td>
                      <td className="py-4  flex justify-center">
                        <MdDelete
                          className="text-2xl cursor-pointer shrink-0 fill-[#ea6a12] hover:fill-red-500 mt-5 "
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex mx-4 justify-between">
                <span className="text-lg font-semibold text-gray-500">
                  Total
                </span>
                <span className="text-lg font-semibold text-gray-500">
                  Total: RS {calculateTotal()}
                </span>
              </div>
              <div className="flex max-sm:flex-col gap-4 !mt-8 mb-3">
                <button
                  type="button"
                  className="px-10 py-2  bg-gray-200 hover:bg-[#ea6a12] hover:text-white text-black rounded-full"
                  onClick={closeCart}
                >
                  Back
                </button>

                <CartModal />
              </div>
            </div>

            {/* Closed main div here  */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingIcon;
