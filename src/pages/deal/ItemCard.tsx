import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { LuCopyPlus } from "react-icons/lu";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { DEAL_ITEMS as staticDealItems } from "@/api/data-deal";
import { DEAL_CATEGORIES as staticCatItem } from "@/api/data-deal";
import { DealItem, deleteDealItem } from "@/store/slice/dealSlice";
import { RootState, AppDispatch } from "@/store/root-store";
import { addToCart } from "@/store/slice/cartSlice";
import UpdateDealModal from "./UpdateDealModal";
import ViewDealModal from "./ViewDealModal";
const itemsPerPage = 12;
interface CartItem {
  id: number;
  name: string;
  price: number;
  category: number;
  quantity: number;
}
const ItemCard = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dealUpdate, setDealUpdate] = useState<DealItem | null>(null);
  const [deals, setDeals] = useState<boolean>(false);
  const [viewDeal, setViewDeal] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, error, items } = useSelector(
    (state: RootState) => state.Deals
  );
  const selectedItem = useSelector(
    (state: RootState) => state.menu.selectedItem
  );

  const catItem = useSelector(
    (state: RootState) => state.categories.itemsCategories
  );

  const combinedItems = [...staticDealItems, ...items];
  const combineCat = [...catItem, ...staticCatItem];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDeleteItemClick = (itemId: number) => {
    dispatch(deleteDealItem(itemId));
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(combinedItems.length / itemsPerPage);
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

  const itemsToShow = Array.isArray(combinedItems)
    ? combinedItems.slice(indexOfFirstItem, indexOfLastItem).map((item) => {
        let categoryName = "Unknown Category";

        return {
          ...item,
          categoryName: categoryName,
        };
      })
    : [];
  return (
    <>
      {deals && (
        <UpdateDealModal open={deals} setOpen={setDeals} data={dealUpdate} />
      )}
      {viewDeal && <ViewDealModal setOpen={setViewDeal} data={dealUpdate} />}
      <div className="flex flex-wrap justify-center mt-6 ">
        <div className="flex flex-wrap justify-center w-full mb-10">
          {itemsToShow.map((item) => (
            <div
              key={item.id}
              className="sm:w-[20%] md:w-1.5/3 lg:w-[16%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5 mx-auto mb-5 sm:mb-10 md:mb-10 lg:mb-10"
            >
              <div className="shadow-md transition duration-300 h-full w-full card hover:shadow-lg">
                <img
                  src={
                    item.image
                      ? item.image
                      : "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh9SwcSd7avecMao67V4ME7-lwrkCNWNZY5Q&usqp=CAU"
                  }
                  className="w-full"
                  alt=""
                />
                <div className="px-3 py-2">
                  <h4>
                    <b>{item.name}</b>
                  </h4>
                  <p>{item.description}</p>
                  <div className="flex justify-center items-end mt-4 w-full gap-1  ">
                    <button
                      onClick={() => {
                        setViewDeal(true), setDealUpdate(item);
                      }}
                      className="flex items-center justify-center rounded-full bg-[#f8c6bf] hover:bg-[#f1b3ab] focus:outline-none sm:p-1 md:p-1 lg:p-2"
                    >
                      <GrFormView className="text-[#f07464] text-lg font-bold" />
                    </button>
                    <button
                      onClick={() => {
                        setDeals(true), setDealUpdate(item);
                      }}
                      className="flex items-center justify-center  rounded-full bg-[#f5c29e] focus:outline-none sm:p-1 md:p-2 lg:p-2"
                    >
                      <MdEdit className="text-[#eb7523]" />
                    </button>
                    <button
                      title="Delete"
                      className="flex items-center justify-center  rounded-full bg-[#f3a79f] focus:outline-none sm:p-1 md:p-1 lg:p-2"
                      onClick={() => handleDeleteItemClick(Number(item.id))}
                    >
                      <MdDelete className="text-[#e52614]" />
                    </button>
                    <button
                      title="Add"
                      className="flex items-center justify-center  rounded-full bg-[#efefed] focus:outline-none sm:p-1 md:p-1 lg:p-2"
                      // onClick={() => handleAddToCart(item)}
                    >
                      <LuCopyPlus className="text-[#a49d9d]" />
                    </button>
                  </div>
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
            {Math.min(indexOfLastItem, combinedItems.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {combinedItems.length}
          </span>{" "}
          Entries
        </span>
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li onClick={handlePrevPage}>
              <span
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight cursor-pointer ${
                  currentPage === 1
                    ? "text-gray-500 bg-white border border-e-0 border-[#ea6a12]"
                    : "text-[#ea6a12] border border-[#ea6a12] bg-blue-50"
                } rounded-s-lg hover:bg-[#d8a787] hover:text-white`}
              >
                <span className="sr-only">Previous</span>
                <MdKeyboardDoubleArrowLeft className=" rtl:rotate-180 text-[#ea6a12] text-lg font-bold" />
              </span>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <span
                  className={`flex items-center justify-center px-3 h-8 leading-tight cursor-pointer ${
                    currentPage === index + 1
                      ? "text-white border border-[#ea6a12] bg-[#ea6a12]  hover:text-white"
                      : "text-[#ea6a12] bg-white border border-[#ea6a12]"
                  }`}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </span>
              </li>
            ))}
            <li onClick={handleNextPage}>
              <span
                className={`flex items-center justify-center px-3 h-8 leading-tight cursor-pointer ${
                  currentPage === totalPages
                    ? "text-[#ea6a12] border border-[#ea6a12]"
                    : "text-black border border-[#ea6a12] hover:bg-[#ea6a12] hover:text-white"
                } rounded-e-lg hover:bg-[#d8a787] `}
              >
                <span className="sr-only">Next</span>
                <MdKeyboardDoubleArrowRight className=" rtl:rotate-180 text-[#ea6a12]  text-lg font-bold" />
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ItemCard;
