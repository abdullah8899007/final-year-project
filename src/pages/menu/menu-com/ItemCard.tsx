import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { LuCopyPlus } from "react-icons/lu";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import EditModal from "./editModal";
import ViewModal from "./viewModal";
import { RootState, AppDispatch } from "@/store/root-store";
import { MenuItem, selectAllitems,deleteMenuItemAsync,fetchMenuItemsAsync} from "@/store/slice/menuSlice";
import { addToCart } from "@/store/slice/cartSlice";
import {selectAllCategories} from "@/store/slice/categoriesSlice";
const itemsPerPage = 12;
interface CartItem {
  id: number;
  name: string;
  price: number;
  category: number;
  stock: number;
}
interface EditModalProps {
  id: number;
  initialData: Partial<MenuItem>;
}

const ItemCard = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, error} = useSelector(
    (state: RootState) => state.menu 
  );
 const Selectmenuitems = useSelector(selectAllitems);
  const categoryItem = useSelector((state: RootState) => selectAllCategories(state));
 
  useEffect(() => {
    dispatch(fetchMenuItemsAsync());
  }, [dispatch]);
  
  console.log("menu items", Selectmenuitems);
  
  if (!Selectmenuitems || !Array.isArray(Selectmenuitems)) { 
    return <div>Loading...</div>; 
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  // Add data In cart
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
  const handleDeleteItemClick = (itemId: number) => {
    dispatch(deleteMenuItemAsync(itemId));
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(Selectmenuitems.length / itemsPerPage);
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
  const itemsToShow = Array.isArray(Selectmenuitems)
  ? Selectmenuitems.slice(indexOfFirstItem, indexOfLastItem).map((item) => {
      let categoryName = "Unknown Category";
      if (Array.isArray(categoryItem)) {
        const foundCategory = categoryItem.find(
          (category) => category.id === item.categoryId
        );
        if (foundCategory) {
          categoryName = foundCategory.name;
        }
      }
      return {
        ...item,
        categoryName: categoryName,
      };
    })
  : [];



  return (
    <>
      <div className="flex flex-wrap justify-center mt-6 ">
        {/* Item Crad start here  */}
        {/* First row */}
        <div className="flex flex-wrap justify-center w-full mb-10">
          {itemsToShow.map((item) => (
            <div
              key={item.id}
              className="sm:w-[20%] md:w-1.5/3 lg:w-[16%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5 mx-auto mb-5 sm:mb-10 md:mb-10 lg:mb-10"
            >
              {/* Food image */}
              <div className="justify-center  flex text-center   overflow-visible relative -top-10 ">
                <div className="image-container w-32 h-32">
                  <picture className="block w-full h-full">
                    <img
                      src={item.image}
                      alt="Food"
                      className="object-cover rounded-full w-full h-full"
                    />
                  </picture>
                </div>
              </div>
              <div className=" relative -top-5 ">
                <h5 className="text-lg font-semibold text-center font-exo2 text-[#373d3f] ">
                  {item.name.split(" ").slice(0, 1).join(" ")}
           
                  
                </h5>

                <p className="text-[#ea6a12] text-md text-center font-bold font-exo2">
                  {item.categoryName}
                </p>

                <div className="text-center text-lg font-bold text-gray-800 mt-4">
                  Rs :{item.price}
                </div>
                <div className="text-center text-lg font-bold text-gray-800 mt-4 hidden">
                  Rs: {item.description}${item.stock}
                </div>
                <div className="flex justify-center item-center mt-4 w-full gap-1  ">
                  {/* view */}
                  <ViewModal initialData={item} id={item.id} />
                  {/* Edit */}
                  <EditModal initialData={item} id={item.id} />

                  {/* Delete */}
                  <button
                    title="Delete"
                    className="flex items-center justify-center  rounded-full bg-[#f3a79f] focus:outline-none sm:p-1 md:p-1 lg:p-2"
                    onClick={() => handleDeleteItemClick(item.id)}
                  >
                    <MdDelete className="text-[#e52614]" />
                  </button>
                  {/* Add */}
                  <button
                    title="Add"
                    className="flex items-center justify-center  rounded-full bg-[#efefed] focus:outline-none sm:p-1 md:p-1 lg:p-2"
                    onClick={() => handleAddToCart(item)}
                  >
                    <LuCopyPlus className="text-[#a49d9d]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination  start here */}
      <div className="flex justify-between items-center m-3">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {indexOfFirstItem + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(indexOfLastItem, Selectmenuitems.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Selectmenuitems.length}
          </span>{" "}
          Entries
        </span>
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li onClick={handlePrevPage}>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${
                  currentPage === 1
                    ? "text-gray-500 bg-white border border-e-0 border-[#ea6a12]"
                    : "text-[#ea6a12] border border-[#ea6a12] bg-blue-50"
                } rounded-s-lg hover:bg-[#ea6a12] hover:text-white`}
              >
                <span className="sr-only">Previous</span>
                <MdKeyboardDoubleArrowLeft className=" rtl:rotate-180 text-[#ea6a12] hover:text-white text-lg font-bold" />
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === index + 1
                      ? "text-white border border-[#ea6a12] bg-[#ea6a12]  hover:text-white"
                      : "text-[#ea6a12] bg-white border border-[#ea6a12]"
                  }`}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li onClick={handleNextPage}>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === totalPages
                    ? "text-[#ea6a12] border border-[#ea6a12]"
                    : "text-black border border-[#ea6a12] hover:bg-[#ea6a12] hover:text-white"
                } rounded-e-lg hover:bg-[#ea6a12] `}
              >
                <span className="sr-only">Next</span>
                <MdKeyboardDoubleArrowRight className=" rtl:rotate-180 text-[#ea6a12] hover:text-white text-lg font-bold" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ItemCard;
