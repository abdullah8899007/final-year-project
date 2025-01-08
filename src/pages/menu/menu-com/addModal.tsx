import React, { useState, useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import ImageUploader from "@/app/common-components/ImageUploader";
import { AppDispatch } from "@/store/root-store";
import { MenuItem, createMenuItemAsync } from "@/store/slice/menuSlice";
import { RxCross2 } from "react-icons/rx";
import { selectAllCategories } from "@/store/slice/categoriesSlice";
import { RootState } from "@/store/root-store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../../api/salesreport-api";
import axios from "axios";
import { API_URLS } from "@/utils/api-urls";
import { toast, Toaster } from 'react-hot-toast';
 

const AddModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: 0,
    image: "ccc",
  });
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const getData = async () => {
    try {
      const response = await fetchAllCategories(); // Assume fetchAllCategories handles the API call
      if (response) {
        setMainCategories(response.results);
      } else {
        setMainCategories([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMainCategories([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log("mainCategories", mainCategories);

  // Fetch categories from Redux
  const categories = useSelector((state: RootState) =>
    selectAllCategories(state)
  );

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      categoryId: Number(formData.categoryId),
      stock: formData.stock,
      image: formData.image,
    };

    try {
      const response = await axios.post(`${API_URLS}/menu/items/`, payload); // Replace with your API endpoint
      if (response.status === 201) {
        console.log("Menu item created successfully:", response.data);
        setFormData({
          name: "",
          description: "",
          price: "",
          categoryId: "",
          stock: 0,
          image: "ccc",
        });
        closeModal();
        toast.success('Item added succefully!');
      } else {
        toast.error('something went wrong!');
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error creating menu item:", error);
    }
  };

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle Image Upload
  const handleImageChange = (imageUrl: any) => {
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl || "",
    }));
  };

  return (
    <div>
      <button
        title="add"
        onClick={toggleModal}
        className="flex items-center justify-center bg-[#ea6a12] text-white px-8 py-2 sm:px-12 md:px-8 md:py-3 rounded-full"
      >
        <AiFillPlusSquare className="w-6 h-6 mr-2 text-white cursor-pointer" />
        Add Menu
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-[70%] bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex justify-between flex-row">
              <h1 className="font-exo2 text-2xl font-semibold text-[#ea6a12]">
                Add Menu Items{" "}
              </h1>
              <RxCross2
                className="text-2xl text-[#ea6a12]"
                onClick={closeModal}
              />
            </div>

            <form
              className="w flex flex-row bg-white shadow-lg rounded-lg p-6"
              onSubmit={handleSubmit}
            >
              <div className="w-2/3 ml-2">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full resize-none focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 text-sm font-medium font-exo2 rounded-md w-full focus:outline-none"
                      required
                    >
                      <option value="">Select Category</option>
                      {Array.isArray(mainCategories) &&
                      mainCategories.length > 0 ? (
                        mainCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No categories available</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Stock
                    </label>
                    <input
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 text-sm font-medium font-exo2 rounded-md w-full focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#ea6a12] text-white py-2 px-7 rounded-md hover:bg-[#cea488]"
                  >
                    Save
                  </button>
                </div>
              </div>
              {/* <div className="w-1/2 pl-4">
                <div className="flex flex-col ml-10 items-center justify-center h-full">
                  <ImageUploader onChange={handleImageChange} />
                </div>
              </div> */}
            </form>
          </div>
        </div>
      )}
      <Toaster
position="top-right"
reverseOrder={false}
/>
    </div>
  );
};

export default AddModal;
