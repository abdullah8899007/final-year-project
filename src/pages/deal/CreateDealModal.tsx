import React, { useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { DealItem, addDealItem } from "@/store/slice/dealSlice";
import { AppDispatch } from "@/store/root-store";
import ImageUploader from "@/app/common-components/ImageUploader";
type CreateDealModalProps = {
  open: boolean;
  setOpen: (e: boolean) => void;
};
const CreateDealModal = ({ setOpen }: CreateDealModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [state, setState] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTrue(false);
    const body: DealItem = {
      id: Math.floor(Math.random() * 1000),
      name: state.name,
      description: state.description,
      price: parseFloat(state.price),
      image: state.image,
    };
    if (
      body.description !== "" &&
      body.image !== "" &&
      body.name !== "" &&
      body.price
    ) {
      dispatch(addDealItem(body));
      setOpen(false);
      setState({
        name: "",
        description: "",
        price: "",
        image: "",
      });
    } else {
      setIsTrue(true);
    }
  };
  const handleImageChange = (value: string | null) => {
    setState((prevData) => ({
      ...prevData,
      image: value || "",
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none ">
          <div className="relative w-[80%] md:w-[600px] height-[100px] my-6 mx-auto max-w-3xl">
            <div
              className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
            >
              <div className="flex items-start justify-between p-10 border-b border-solid border-blueGray-200 rounded-t ">
                <h3 className="text-3xl font-semibold border-l-4 border-[#ef6f18]">
                  Deals
                </h3>
                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                </button>
              </div>
              <div className="md:px-12 px-5 mb-3 overflow-y-scroll">
                <div>
                  <p className="text-xl ">Deal Name </p>
                  <input
                    className="border text-[#ef6f18] border-red-400 py-3 px-6 w-full rounded-md mt-3 placeholder-[#ef6f18] outline-none "
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    placeholder="deal Name"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-xl">Deal price</p>
                  <input
                    className="border text-[#ef6f18] border-red-400 py-3 px-6 w-full rounded-md mt-3 placeholder-[#ef6f18] outline-none "
                    type="number"
                    required
                    name="price"
                    id="number"
                    value={state.price}
                    onChange={(e) =>
                      setState({ ...state, price: e.target.value })
                    }
                    placeholder="price"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xl">Deal description</p>
                  <textarea
                    required
                    value={state.description}
                    className="border text-[#ef6f18] border-red-400 py-3 px-6 w-full rounded-md mt-3 placeholder-[#ef6f18] outline-none"
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                    placeholder="Description"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xl">Deal Images </p>
                  <ImageUploader onChange={handleImageChange} />
                </div>
              </div>

              <div className="mt-2 mb-2">
                <p className="text-[red] ">
                  {isTrue && `All field are required`}
                </p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-[#ef6f18] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border rounded-lg hover:bg-[#ef6f18] hover:text-white border-red-500"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button
                  className="text-[#ef6f18] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border rounded-lg hover:bg-[#ef6f18] hover:text-white border-red-500 flex justify-center"
                  type="submit"
                >
                  Save <IoBagCheckOutline className="text-xl " />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </form>
    </>
  );
};
export default CreateDealModal;
