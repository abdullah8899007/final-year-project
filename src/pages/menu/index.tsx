import React, { useState } from "react";
import Layout from "../layout";
import ShoppingIcon from "./menu-com/shoppingIcon";
import ItemCard from "../../pages/menu/menu-com/ItemCard";
import AddModal from "./menu-com/addModal";
import MenuComparison from "./menu-com/menuComparison";
import CartModal from "./menu-com/cartModal";

const Menuitem: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  console.log("selectedItem", selectedItem);

  return (
    <Layout>
      {/* Left heading and button section */}
      <div className="flex ml-4 justify-between items-center  mx-10 my-3">
        <div className="flex flex-col m-3">
          <h1 className="font-exo2 text-3xl font-semibold  text-[#353535]">
            Menu
          </h1>
          <h2>Here is your menu managment </h2>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Cart icon and Cart detail show in this componenets  */}
          {/* <ShoppingIcon /> */}
          <CartModal
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <AddModal />
        </div>
      </div>
      {/* Main content area */}
      <div className="griLunchLunchd grid-rows mt-4  gap-3   ">
        {/* Menu catalog */}
        <div className="bg-[#FBF9F0]  rounded-md  mt-5">
          <ItemCard
            data={data}
            setData={setData}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </div>
        {/* Menu */}
        <div className="bg-white p-4  h-[95%] border rounded-lg shadow-md my-3 mx-3 ">
          <h2 className="text-3xl font-exo2 text-black  font-semibold mb-5 ">
            Menu Comparison
          </h2>
          <MenuComparison />
        </div>
      </div>
    </Layout>
  );
};
export default Menuitem;
