// import React, { useState } from "react";
// import { AiFillPlusSquare } from "react-icons/ai";
// import ImageUploader from "@/app/common-components/ImageUploader";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/store/root-store";
// import { CategoryItems } from "@/store/slice/categoriesSlice";
// import { RxCross2 } from "react-icons/rx";
// import { createCategoryAsync } from "@/store/slice/categoriesSlice";
// const AddModal = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     image: "",
//   });
//   const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newCategory: Omit<CategoryItems, "id" | "count"> = {
//       name: formData.name,
//       image: formData.image,
//     };
    
//     dispatch(createCategoryAsync(newCategory));
//     console.log("api", newCategory);
 
//     setFormData({
//       name: "",
//       image: "",
//     });
//     closeModal();
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <>
//       <button
//         title="add"
//         onClick={toggleModal}
//         className="flex items-center justify-center bg-[#ea6a12] text-white px-2 py-2 sm:px-2 md:px-2 md:py-3 rounded-full"
//       >
//         <AiFillPlusSquare className="w-6 h-6 mr-2 text-white cursor-pointer" />
//         Add Menu Categories
//       </button>
//       {isModalOpen && (
//         <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
//           <div className=" w-[60%] bg-white shadow-lg rounded-lg p-6 relative">
//             <div className="flex justify-between flex-row">
//               <h1 className="font-exo2 text-2xl font-semibold  text-[#ea6a12]">
//                 Add Menu Categories{" "}
//               </h1>
//               <RxCross2
//                 className="text-2xl text-[#ea6a12]"
//                 onClick={closeModal}
//               />
//             </div>

//             <form
//                className="w flex flex-row  bg-white shadow-lg rounded-lg p-6 "
//               onSubmit={handleSubmit}
//             >
//               <div className="w-2/3 ml-2 ">
//                 <div className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Menu Categories
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handelChange}
//                       className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="bg-[#ea6a12] text-white  py-2 px-7 rounded-md hover:bg-[#cea488]"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>

//             </form>

//             {/* main closed */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddModal;
import React, { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/root-store";
import { CategoryItems } from "@/store/slice/categoriesSlice";
import { RxCross2 } from "react-icons/rx";
import { createCategoryAsync } from "@/store/slice/categoriesSlice";
import axios from "axios"; // Import axios
import { API_URLS } from "@/utils/api-urls";

const AddModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "cccc",
  });

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    setFormData((prevData) => ({
      ...prevData,
      image: file, // Store the file object for the image
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);

    // Append image only if it exists
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Send the data using axios
    try {
      const response = await axios.post(`${API_URLS}/menu/categories/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      });
      console.log("Category created:", response.data);
      dispatch(createCategoryAsync(response.data));
    } catch (error) {
      console.error("Error creating category:", error);
    }

    setFormData({
      name: "",
      image: "cccc",
    });
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          <div className="w-[60%] bg-white shadow-lg rounded-lg p-6 relative">
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
            </form>

            {/* main closed */}
          </div>
        </div>
      )}
    </>
  );
};

export default AddModal;
