import React, { useEffect, useState } from "react";
import { GrFormView } from "react-icons/gr";
import food from "../../../../public/images/food.svg";
import { useDispatch } from "react-redux";
import { Menu_CATEGORIES } from "@/api/data";
import { MenuItem } from "@/store/slice/menuSlice";
import { RootState, AppDispatch } from "@/store/root-store";
import { RxCross2 } from "react-icons/rx";

interface EditModalProps {
  id: number;
  initialData: MenuItem;
}
const ViewModal: React.FC<EditModalProps> = ({ id, initialData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<MenuItem>(initialData);

  useEffect(() => {
    if (isModalOpen) {
      setFormData(initialData);
    }
  }, [isModalOpen, initialData]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        title="view"
        className="flex items-center justify-center rounded-full bg-[#f8c6bf] hover:bg-[#f1b3ab] focus:outline-none sm:p-1 md:p-1 lg:p-2"
        onClick={toggleModal}
      >
        <GrFormView className="text-[#f07464] text-lg font-bold" />
      </button>
      {/* Modal Open Here */}
      {isModalOpen && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full md:w-[60%] bg-white shadow-lg rounded-lg p-6 relative">
            {/* Heading and Close */}
            <div className="flex justify-between flex-row">
              <h1 className="font-exo2 text-2xl font-semibold text-[#ea6a12]">
                View Menu Items{" "}
              </h1>
              <RxCross2 className="text-2xl text-[#ea6a12]"  onClick={closeModal}/>
            </div>
            {/* Detail of Item Start */}
            <div className="flex flex-col md:flex-row md:space-x-4 gap-2">
              <div className="w-full md:w-1/3 mb-4 mt-5 mx-auto  sm:mb-10 md:mb-10 lg:mb-10">
                <picture>
                  <img
                    src={initialData.image}
                    alt="Uploaded Image"
                    width={250}
                    height={250}
                    className="w-64  object-cover card-img-top img2 h-[250px] bg-white shadow-lg rounded-md"
                  />
                </picture>
              </div>
              <div className="w-full md:w-2/3 bg-white shadow-lg ml-3 pb-3">
                <div className="card-body">
                  <h1 className="card-title text-2xl font-bold font-exo2 px-2 my-4 text-[#ea6a12]">
                    {initialData.name}
                  </h1>
                  <p className="card-text lead font-bold text-md px-2 mb-3 ">
                    RS {initialData.price}
                  </p>
                  <p className="card-text lead font-exo2 text-md px-2 mb-3 text-gray-500">
                    {initialData.description}
                  </p>
                </div>
                <div className="card-footer flex items-center justify-center">
                  <button
                    title="Back"
                    className="bg-[#ea6a12] item-center text-white justify-center items-center flex py-3 px-10 md:mb-3 rounded-md"
                    onClick={closeModal}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
            {/* Main modal closed here */}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
