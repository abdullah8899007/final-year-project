import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, updateMenuItemAsync } from "@/store/slice/menuSlice";
import ImageUploader from "@/app/common-components/ImageUploader";
import { RootState, AppDispatch } from "@/store/root-store";
import { Menu_CATEGORIES } from "@/api/data";
import { RxCross2 } from "react-icons/rx";
import { selectAllCategories } from "@/store/slice/categoriesSlice";
interface EditModalProps {
  id: number;
  initialData: MenuItem;
}

const EditModal: React.FC<EditModalProps> = ({ id, initialData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<MenuItem>(initialData);
  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const categories = useSelector((state: RootState) =>
    selectAllCategories(state)
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const processedValue = name === "categoryId" ? Number(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const handleImageChange = (imageUrl: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateMenuItemAsync(formData));
    closeModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen) {
    }
  }, [formData.image, isModalOpen]);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  return (
    <div>
      <button
        title="Edit"
        className="flex items-center justify-center  rounded-full bg-[#f5c29e] focus:outline-none sm:p-1 md:p-2 lg:p-2"
        onClick={toggleModal}
      >
        <MdEdit className="text-[#eb7523]" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className=" w-[60%] bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex justify-between flex-row">
              <h1 className="font-exo2 text-2xl font-semibold  text-[#ea6a12]">
                Update Menu Items{" "}
              </h1>
              <RxCross2
                className="text-2xl text-[#ea6a12]"
                onClick={closeModal}
              />
            </div>

            <form
              className="w flex flex-row  bg-white shadow-lg rounded-lg p-6  "
              onSubmit={handleSubmit}
            >
              <div className="w-2/3 ml-2 ">
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
                      className="block text-sm font-medium text-gray-700 "
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
                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="hover:bg-[#ea6a12]"
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.stock}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 text-sm font-medium font-exo2  rounded-md w-full focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#ea6a12] text-white  py-2 px-7 rounded-md hover:bg-[#cea488]"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                {/* Right side image uploader with preview */}
                <div className="flex flex-col  ml-10 items-center justify-center h-full">
                  <picture>
                    <img
                      src={formData.image}
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="w-64 h-64 object-cover rounded-md"
                    />
                  </picture>

                  <ImageUploader onChange={handleImageChange} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
