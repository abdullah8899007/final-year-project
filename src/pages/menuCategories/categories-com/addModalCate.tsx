import React, { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import ImageUploader from "@/app/common-components/ImageUploader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/root-store";
import { CategoryItems } from "@/store/slice/categoriesSlice";
import { RxCross2 } from "react-icons/rx";
import { createCategoryAsync } from "@/store/slice/categoriesSlice";
const AddModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory: Omit<CategoryItems, "id" | "count"> = {
      name: formData.name,
      image: formData.image,
    };
    
    dispatch(createCategoryAsync(newCategory));
    console.log("api", newCategory);
 
    setFormData({
      name: "",
      image: "",
    });
    closeModal();
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleImageChange = (imageUrl: any) => {
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl || "",
    }));
  };

  return (
    <>
      <button
        title="add"
        onClick={toggleModal}
        className="flex items-center justify-center bg-[#ea6a12] text-white px-2 py-2 sm:px-2 md:px-2 md:py-3 rounded-full"
      >
        <AiFillPlusSquare className="w-6 h-6 mr-2 text-white cursor-pointer" />
        Add Menu Categories
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className=" w-[60%] bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex justify-between flex-row">
              <h1 className="font-exo2 text-2xl font-semibold  text-[#ea6a12]">
                Add Menu Categories{" "}
              </h1>
              <RxCross2
                className="text-2xl text-[#ea6a12]"
                onClick={closeModal}
              />
            </div>

            <form
               className="w flex flex-row  bg-white shadow-lg rounded-lg p-6 "
              onSubmit={handleSubmit}
            >
              <div className="w-2/3 ml-2 ">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Menu Categories
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handelChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#ea6a12] text-white  py-2 px-7 rounded-md hover:bg-[#cea488]"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                {/* Right side image uploader with preview */}
                <div className="flex flex-col ml-10 items-center justify-center h-full">
                  <ImageUploader onChange={handleImageChange} />
                
                </div>
              </div>

            </form>

            {/* main closed */}
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
