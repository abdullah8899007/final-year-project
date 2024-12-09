import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import food from "../../../../public/images/food.svg";
import { RootState, AppDispatch } from "@/store/root-store";
import ImageUploader from "@/app/common-components/ImageUploader";
import { CategoryItems, updateCategoryAsync } from "@/store/slice/categoriesSlice";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
interface EditModalProps {
  id: number;
  initialData: CategoryItems;
}
const EditCat: React.FC<EditModalProps> = ({ id, initialData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<CategoryItems>(initialData);
 
  const dispatch: AppDispatch = useDispatch(); 

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
    
    console.log(formData);
    dispatch(updateCategoryAsync(formData));
    closeModal();
  };
  useEffect(() => {
    if (isModalOpen) {
      console.log("Item image URL:", formData.image);
    }
  }, [formData.image, isModalOpen]);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  return (
    <>
      <button
        title="Update"
        onClick={toggleModal}
        className="flex items-center justify-center rounded-full bg-[#f5c29e] focus:outline-none sm:p-1 md:p-2 lg:p-2"
      >
        <MdEdit className="text-[#eb7523]" />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className=" w-[60%] bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex justify-between flex-row">
              <h1 className="font-exo2 text-2xl font-semibold  text-[#ea6a12]">
                Update Menu Categories{" "}
              </h1>
              <RxCross2 className="text-2xl text-[#ea6a12]"  onClick={closeModal}/>
            </div>

            <form
              className="w flex flex-row  bg-white shadow-lg rounded-lg p-6 "
              onSubmit={handleSubmit}
            >
              <div className="w-2/3 ml-2 ">
                <div className="space-y-4">
                  <div>
                 
<input type="hidden" name="categoryId" value={formData.id} />

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
                      onChange={handleChange}
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
                  <picture>
                    <img
                      src={formData.image}
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="w-64 h-64 object-cover rounded-md mb-5"
                    />
                  </picture>

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

export default EditCat;
