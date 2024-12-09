import React from "react";
import Layout from "../layout";
import AddModalCate from "./categories-com/addModalCate";
import MenuComparison from "../menu/menu-com/menuComparison";
import CategoryCard from "./categories-com/categoryCard";

const index = () => {
  return (
    <Layout>
      {/* Left heading and button section */}
      <div className="flex ml-4 justify-between items-center  mx-10 my-3">
        <div className="flex flex-col m-3">
          <h1 className="font-exo2 text-3xl font-semibold  text-[#353535]">
            Menu Categories
          </h1>
          <h2>Here is your menu managment </h2>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Cart icon and Cart detail show in this componenets  */}

          <AddModalCate />
        </div>
      </div>

      {/* Main content area */}
      <div className="grid grid-rows mt-4  gap-3   ">
        {/* Menu catalog */}
        <div className="bg-[#fbf9f0]  rounded-md  mt-5">
          <CategoryCard />
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

export default index;
