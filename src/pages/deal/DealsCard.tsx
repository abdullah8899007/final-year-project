import { MdAddBox } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { RxSwitch } from "react-icons/rx";
import { useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import CreateDealModal from "./CreateDealModal";

interface DealsProps {}

const Deals: React.FC<DealsProps> = () => {
  const [isSwitch, setIsSwitch] = useState<boolean | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deals, setDeals] = useState<boolean>(false);
  return (
    <section className="max-w-screen-xl mx-auto px-4">
      {/* header of this sec */}
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-4xl font-semibold mt-3">Deals </h1>
          <p className="text-xl ">Here is your deals management </p>
        </div>
        <div>
          <button
            onClick={() => setDeals(!deals)}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-[#EA6A12] rounded-full text-white font-bold hover:bg-[#964611]"
          >
            <MdAddBox></MdAddBox> Add Deals
          </button>
        </div>
      </div>
      <div className="mt-12">
        {/* start The Month's Special */}
        <div className="lg:flex  items-center justify-center gap-5">
          <div className="flex items-center justify-between gap-12 bg-[#EA6A12]  rounded-2xl px-12 py-5">
            <div
              className="flex-1 text-white space-y-7"
              style={{
                width: "200px",
                height: "200px",
              }}
            >
              <div className="text-xl flex items-center gap-5">
                The Month Special{" "}
                <span onClick={() => setIsSwitch(!isSwitch)} className="">
                  <RxSwitch
                    className={`text-4xl ${isSwitch ? "rotate-180" : ""}`}
                  />
                </span>
              </div>
              <h1 className="text-3xl font-bold">
                The Japanese <br /> Oishii Burger
              </h1>
              {isSwitch ? (
                // Click to open the modal
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="flex items-center justify-center gap-3 uppercase font-semibold text-1xl underline hover:scale-95"
                >
                  Order Now <FaArrowRight />
                </button>
              ) : (
                // disabled Button
                <button
                  className="flex items-center justify-center gap-3 uppercase  rounded-md cursor-not-allowed "
                  disabled
                >
                  Order Now <FaArrowRight />
                </button>
              )}
            </div>
            <div className="flex-1 relative">
              <img
                width={300}
                src="https://i.ibb.co/rM3BXkP/barger-1-removebg-preview.png"
                alt="burger-1"
                className=" bg-[#fcbe36]  rounded-full"
              />
              <div className="absolute top-0 left-6 bg-[#e5272e] flex items-center justify-center p-3 rounded-full text-white font-bold text-2xl w-12 ">
                12$
              </div>
            </div>
          </div>
          <div className="flex items-center mt-6 lg:mt-0 justify-between gap-12 bg-[#fcbe36]  rounded-2xl px-12 py-5">
            <div className="flex-1 text-white space-y-7">
              <div className="text-xl flex items-center gap-6 ">
                Festive Special
                <span onClick={() => setIsSwitch(!isSwitch)} className="">
                  <RxSwitch
                    className={`text-4xl ${isSwitch ? "rotate-180" : ""}`}
                  />
                </span>
              </div>
              <h1 className="text-3xl font-bold">
                Burger With <br /> Benefits
              </h1>
              {isSwitch ? (
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="flex items-center justify-center gap-3 uppercase font-semibold text-1xl underline hover:scale-95"
                >
                  Order Now <FaArrowRight />
                </button>
              ) : (
                <button
                  className="flex items-center justify-center gap-3 uppercase  rounded-md cursor-not-allowed "
                  disabled
                >
                  Order Now <FaArrowRight />
                </button>
              )}
            </div>
            <div className="flex-1 relative">
              <img
                width={300}
                src="https://i.ibb.co/rM3BXkP/barger-1-removebg-preview.png"
                alt="burger-1"
                className=" bg-[#e7272c]  rounded-full"
              />
              <div className="absolute -top-6 -left-0  flex items-center justify-center p-3 rounded-full text-white font-bold  w-12 ">
                <div className="flex flex-col justify-center items-center">
                  <span>
                    <img
                      className="w-44"
                      src="https://i.ibb.co/MRJJCwb/arrow.png"
                      alt="arrow"
                    />
                  </span>
                  <div className="flex flex-col items-center">
                    <p className="text-sm">From</p>
                    <p className="text-xl font-bold">$30.00</p>
                  </div>
                  <span className="rotate-180">
                    <img
                      className="w-44"
                      src="https://i.ibb.co/MRJJCwb/arrow.png"
                      alt="arrow"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-12 mb-24">
        {/* start  3 item sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* 1st card */}
          <div className="relative flex items-center justify-between gap-2 bg-[#e7272c]  rounded-2xl px-8 py-5">
            <div className="flex-1 text-white space-y-4">
              <h1 className="text-2xl ">Offer</h1>
              <h1 className="text-2xl font-bold">
                Fatboy <br /> Combo
              </h1>
              {isSwitch ? (
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="flex items-center justify-center gap-3 uppercase font-semibold text-1xl underline hover:scale-95"
                >
                  Order Now <FaArrowRight />
                </button>
              ) : (
                <button
                  className="flex items-center justify-center gap-3 uppercase  rounded-md cursor-not-allowed "
                  disabled
                >
                  Order Now <FaArrowRight />
                </button>
              )}
            </div>
            <div className="flex-1 relative">
              <img
                width={300}
                src="https://i.ibb.co/rM3BXkP/barger-1-removebg-preview.png"
                alt="burger-1"
                className=" bg-[#fcbe36]  rounded-full"
              />
              <div className="absolute -top-4 -left-6  flex items-center justify-center p-3 rounded-full text-white font-bold text-2xl w-12 ">
                <div className="flex flex-col justify-center items-center">
                  <span>
                    <img
                      className="w-44"
                      src="https://i.ibb.co/MRJJCwb/arrow.png"
                      alt="arrow"
                    />
                  </span>
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-bold">60%</p>
                    <p className="text-sm font-bold uppercase">off</p>
                  </div>
                  <span className="rotate-180">
                    <img
                      className="w-44"
                      src="https://i.ibb.co/MRJJCwb/arrow.png"
                      alt="arrow"
                    />
                  </span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsSwitch(!isSwitch)}
              className="absolute right-5 top-2"
            >
              <RxSwitch
                className={`text-4xl ${isSwitch ? "rotate-180" : ""}`}
              />
            </span>
          </div>
          {/* 2nd cart */}
          <div className="relative flex items-center justify-between gap-2 bg-[#222222]  rounded-2xl px-8 py-5">
            <div className="flex-1 text-white space-y-4">
              <div className="relative flex items-center">
                <div>
                  {" "}
                  <h1 className="text-xl font-bold mt-2 absolute top-[60px] left-2 ">
                    $
                  </h1>
                </div>
                <h1 className="text-[100px] font-bold text-[#fcbe36]">2</h1>
                <h1 className="uppercase font-bold text-1xl">
                  All Day <br /> Entry <br /> Day
                </h1>
              </div>
              {isSwitch ? (
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="flex items-center justify-center gap-3 uppercase font-semibold text-1xl underline hover:scale-95"
                >
                  Order Now <FaArrowRight />
                </button>
              ) : (
                // disabled Button
                <button
                  className="flex items-center justify-center gap-3 uppercase  rounded-md cursor-not-allowed "
                  disabled
                >
                  Order Now <FaArrowRight />
                </button>
              )}
            </div>
            <div className="flex-1 relative">
              <img
                width={300}
                src="https://i.ibb.co/rM3BXkP/barger-1-removebg-preview.png"
                alt="burger-1"
                className=" bg-[#fcbe36]  rounded-full"
              />
            </div>
            <span
              onClick={() => setIsSwitch(!isSwitch)}
              className="absolute right-5 top-2 text-white"
            >
              <RxSwitch
                className={`text-4xl ${isSwitch ? "rotate-180" : ""}`}
              />
            </span>
          </div>
          <div
            style={{
              backgroundImage: "url(https://i.ibb.co/9tbdj7B/burger-4.jpg)",
            }}
            className="relative bg-no-repeat bg-cover text-white	object-cover flex items-center justify-end gap-2  rounded-2xl px-8 py-5"
          >
            <div className="absolute left-10 bottom-6">
              {isSwitch ? (
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="flex items-center justify-center gap-3 uppercase font-semibold text-1xl underline hover:scale-95"
                >
                  Order Now <FaArrowRight />
                </button>
              ) : (
                // disabled Button
                <button
                  className="flex items-center justify-center gap-3 uppercase  rounded-md cursor-not-allowed "
                  disabled
                >
                  Order Now <FaArrowRight />
                </button>
              )}
            </div>
            <div className="rotate-3 w-44 relative flex flex-col items-center justify-center">
              <div className="text-black absolute top-6 font-semibold z-10">
                10 BEEP BURGER
              </div>
              <div className="relative r bg-[#fcbe36] rounded-full w-44">
                <div>
                  {" "}
                  <h1 className="text-2xl font-bold mt-2 absolute top-[70px] left-2">
                    $
                  </h1>
                </div>
                <h1 className="text-[120px] font-bold text-[#e7272c]">20</h1>
              </div>
              <div className="text-black absolute bottom-7 font-bold">
                Limited time Offer
              </div>
            </div>
            <span
              onClick={() => setIsSwitch(!isSwitch)}
              className="absolute right-5 top-2 text-white"
            >
              <RxSwitch
                className={`text-4xl ${isSwitch ? "rotate-180" : ""}`}
              />
            </span>
          </div>
        </div>
      </section>
      <div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none ">
              <div className="relative w-[50%] md:w-[400px] my-6 mx-auto max-w-3xl">
                <div
                  className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
                >
                  <div className="flex items-start justify-between p-10 border-b border-solid border-blueGray-200 rounded-t ">
                    <h3 className="text-3xl font-semibold border-l-4 border-[#ef6f18]">
                      Order Now
                    </h3>
                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                    </button>
                  </div>
                  <div className="md:px-12 px-5 mb-3">
                    <div>
                      <p className="text-xl ">Deal Name </p>
                      <input
                        className="border text-[#ef6f18] border-red-400 py-3 px-6 w-full rounded-md mt-3 placeholder-[#ef6f18] outline-none "
                        type="text"
                        name="name"
                        id="name"
                        placeholder="deal Name"
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-xl">Deal Price </p>
                      <input
                        className="border text-[#ef6f18] border-red-400 py-3 px-6 w-full rounded-md mt-3 placeholder-[#ef6f18] outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        name="number"
                        id="number"
                        placeholder="price"
                      />
                    </div>
                    <button className="px-4 py-3 mt-4 border border-red-500 hover:bg-[#ef6f18] rounded-lg flex items-center gap-3 font-bold text-[#ef6f18] hover:text-white">
                      Check Out <IoBagCheckOutline className="text-xl " />
                    </button>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-[#ef6f18] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border rounded-lg hover:bg-[#ef6f18] hover:text-white border-red-500"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      <div>{deals && <CreateDealModal open={deals} setOpen={setDeals} />}</div>
    </section>
  );
};

export default Deals;
