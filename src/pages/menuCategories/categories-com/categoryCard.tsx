import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import EditModal from "./editCat";
import { RootState, AppDispatch } from "@/store/root-store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAsync,
  deleteCategoryAsync,
  selectAllCategories,
} from "@/store/slice/categoriesSlice";
import {
  MdKeyboardDoubleArrowLeft, 
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Image from "next/image";

const itemsPerPage = 12;

const CategoryCard = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const [isLoading, setIsLoading] = React.useState(true);
  console.log(categories);
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  if (!categories || !Array.isArray(categories)) {
    return <div>Loading...</div>;
  }

  const handleDeleteItemClick = (categoryId: number) => {
    dispatch(deleteCategoryAsync(categoryId));
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const itemsToShow = categories.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <>
      <div className="flex flex-wrap justify-center mt-10 ">
        <div className="flex flex-wrap justify-center w-full mb-5">
          {itemsToShow.map((item) => (
            <div
              key={item.id}
              className="sm:w-[20%] md:w-1/3 lg:w-[16%] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5 mx-auto mb-5 sm:mb-10 md:mb-10 lg:mb-10"
            >
              <div className="justify-center  flex text-center   overflow-visible relative -top-10 ">
                <div className="image-container w-32 h-32">
               
                    <Image
                      src={`data:${item.image}`}
                      alt="Food"
                      className="object-cover rounded-full w-full h-full"
                      width={32}
                      height={32}
                    />
                
                </div>
              </div>
              <div className="px-5 relative -top-5 ">
                <p className="text-[#ea6a12] text-md text-center font-bold font-exo2">
                  {item.name}
                </p>
                <div className="flex justify-around items-center mt-4 gap-2 ">
                  <EditModal id={item.id} initialData={item} />
                  <button
                    title="Delete"
                    className="flex items-center justify-center rounded-full bg-[#f3a79f] focus:outline-none sm:p-1 md:p-2 lg:p-2"
                  >
                    <MdDelete
                      className="text-[#e52614]"
                      onClick={() => handleDeleteItemClick(item.id)}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center m-3">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {indexOfFirstItem + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {Math.min(indexOfLastItem, categories.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {categories.length}
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
                } rounded-l-lg hover:bg-[#ea6a12] hover:text-white`}
              >
                <span className="sr-only">Previous</span>
                <MdKeyboardDoubleArrowLeft className="rtl:rotate-180 text-[#ea6a12] hover:text-white text-lg font-bold" />
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === index + 1
                      ? "text-white border border-[#ea6a12] bg-[#ea6a12] hover:text-white"
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
                } rounded-r-lg hover:bg-[#ea6a12]`}
              >
                <span className="sr-only">Next</span>
                <MdKeyboardDoubleArrowRight className="rtl:rotate-180 text-[#ea6a12] hover:text-white text-lg font-bold" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default CategoryCard;
