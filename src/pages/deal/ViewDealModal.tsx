import React from "react";
type UpdateDealModalProps = {
  setOpen: (e: boolean) => void;
  data: any;
};

const ViewDealModal = ({ setOpen, data }: UpdateDealModalProps) => {
  return (
    <>
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

            <div className="mt-3 mb-3">
              <div>
                <img src={data.image} className="w-full" alt="" />
              </div>
              <div className="flex flex-wrap justify-between mt-4 mb-4 p-[15px]">
                <div>
                  <span className="font-bold">Deal Name</span>
                  <h3>{data.name}</h3>
                </div>
                <div>
                  <span className="font-bold">Deal Price</span>
                  <h3>{data.price}</h3>
                </div>
              </div>
              <div className="flex flex-wrap justify-start mt-4 mb-4 p-[15px]">
                <div>
                  <span className="font-bold">Deal description</span>
                  <h3>{data.description}</h3>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-[#ef6f18] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border rounded-lg hover:bg-[#ef6f18] hover:text-white border-red-500"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
export default ViewDealModal;
