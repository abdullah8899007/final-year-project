import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import avtar from "../../../public/images/avtar.png";
import bellIcon from "../../../public/images/bell.png";
import msg from "../../../public/images/msg.png";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";

const TopHeader = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({
    profile: false,
    msg: false,
    bellIcon: false,
  });

  const toggleDropdown = (itemName: "profile" | "msg" | "bellIcon"): void => {
    setIsSubMenuOpen((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <>
      <header className="antialiased">
        <nav className="bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center">
            {/* search and logo */}
            <div className="flex justify-start items-center">
              <a href="/" title="logo" className="flex mr-4">
                <Image src={logo} alt="logo" className="w-[50px] h-[50px]" />
              </a>
              <form className="hidden lg:block lg:pl-2">
                <label className="sr-only">Search</label>

                {/* <div className="relative mt-1 lg:w-96 ml-24">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block pl-10 pr-10 text-sm bg-white h-[30px] md:w-[250px] w-full outline-none p-5 placeholder:text-[18px] font-normal shadow-sm rounded-full border border-gray-300"
                    placeholder="Search..."
                  />
                </div> */}
              </form>
            </div>
            {/* Right side */}
            <div className="flex items-center lg:order-2 gap-4">
              {/* <!-- bell --> */}
              <div
                className={`flex items-center gap-[25px] border-r-[1px] pr-[px] md:pr-[25px] relative cursor-pointer ${
                  isSubMenuOpen.msg ? "text-blue-500" : ""
                }`}
                onClick={() => toggleDropdown("bellIcon")}
              >
                {/* <Image
                  src={bellIcon}
                  alt="logo"
                  className="w-[20px] h-[20px] cursor-pointer"
                /> */}
                {isSubMenuOpen.bellIcon && (
                  <div className="absolute z-10 right-0 top-full bg-white border rounded-md  shadow-lg">
                    <div className=" min-w-full rounded-lg w-[410px] max-h-[500px] overflow-auto">
                      <div className="flex items-center justify-between my-2 px-2">
                        <p className="text-xs text-blue-500 cursor-pointer">
                          Clear all
                        </p>
                        <p className="text-xs text-blue-500 cursor-pointer">
                          Mark as read
                        </p>
                      </div>
                      <ul className="divide-y">
                        <li className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer">
                          <div className="w-12 h-12 rounded-full shrink-0 bg-slate-500 " />
                          <div className="ml-6">
                            <h3 className="text-sm text-[#333] font-semibold">
                              Your have a new message from Yin
                            </h3>
                            <p className="text-xs text-gray-400 mt-2">
                              Hello there, check this new items in from the your
                              may interested from the motion school
                            </p>
                            <p className="text-xs text-blue-500 leading-3 mt-2">
                              10 minutes ago
                            </p>
                          </div>
                        </li>
                      </ul>
                      <p className="text-sm px-4 mt-4 mb-3 inline-block text-blue-500 cursor-pointer">
                        View all Notifications
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* mail Icon  */}

              <div
                className={`flex items-center gap-[25px] border-r-[1px] pr-[px] md:pr-[25px] relative cursor-pointer ${
                  isSubMenuOpen.msg ? "text-blue-500" : ""
                }`}
                onClick={() => toggleDropdown("msg")}
              >
                {/* <Image src={msg} alt="logo" className="w-[20px] h-[20px]" /> */}
                {isSubMenuOpen.msg && (
                  <div className="absolute z-10 right-0 top-full bg-white border rounded-md  shadow-lg">
                    <div className=" min-w-full rounded-lg w-[410px] max-h-[500px] overflow-auto">
                      <ul className="divide-y">
                        <li className="py-4 px-4 flex items-center hover:bg-gray-50 text-black text-sm cursor-pointer">
                          <div className="w-12 h-12 rounded-full shrink-0 bg-slate-500 " />
                          <div className="ml-6">
                            <h3 className="text-sm text-[#333] font-semibold">
                              Your have a new message from Yin
                            </h3>
                            <p className="text-xs text-gray-400 mt-2">
                              Hello there, check this new items in from the your
                              may interested from the motion school
                            </p>
                            <p className="text-xs text-blue-500 leading-3 mt-2">
                              10 minutes ago
                            </p>
                          </div>
                        </li>
                      </ul>
                      <p className="text-sm px-4 mt-4 mb-3 inline-block text-blue-500 cursor-pointer">
                        View all msg
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="flex items-center gap-[15px] relative ">
                <div
                  className={`h-[30px] w-[30px] md:w-[50px] md:h-[50px] flex items-center justify-center rounded-full cursor-pointer relative bg-[#f0f0f1] ${
                    isSubMenuOpen.profile ? "text-blue-500" : ""
                  }`}
                >
                  <Image
                    src={avtar}
                    alt="user"
                    className="w-[30px] h-[30px] md:w-full md:h-full object-cover rounded-full"
                    onClick={() => toggleDropdown("profile")}
                  />
                  {isSubMenuOpen.profile && (
                    <div
                      id="userDropdown"
                      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-[44px] "
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="avatarButton"
                      >
                        {/* <li>
                          <Link
                            href="../Profile"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                           <IoPersonSharp className="text-2xl text-[#747a87]" />
                            <span className="flex-1 ms-3 text-1xl whitespace-nowrap">
                              Profile
                            </span>
                          </Link>
                        </li> */}
                        <li>
                          <Link
                            href="/"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <RiLogoutBoxLine className="text-2xl  text-[#747a87] "/>
                            <span className="flex-1 ms-3 whitespace-nowrap">
                              Logout
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <p className="text-[14px] md:text-base">
                  Jhon Doe <br />
                  <span className="text-[#ea6a12] font-bold">Admin</span>
                </p>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default TopHeader;


