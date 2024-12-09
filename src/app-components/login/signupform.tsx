import React from "react";

const Signupform = () => {
  return (
    <form className="w-full max-w-lg signup-wrapperr">
      <div className="signup-wrapper-layer">
      <div className="flex flex-wrap -mx-3 mb-6 signup-containerr">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 input-signup">
          <div className="flex  -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
              <label
                htmlFor="username1"
                className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
              >
                Full Name
              </label>
              <input
                id="reset-username1"
                type="text"
                className="bg-gray-200 border border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="username2"
                className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
              >
                Last Name
              </label>
              <input
                id="reset-username2"
                type="text"
                className="bg-gray-200 border border-gray-700  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 input-signup">
          <div className="flex  -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="username3"
                className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
              >
                Email
              </label>
              <input
                id="reset-username3"
                type="text"
                className="bg-gray-200 border border-gray-700  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="username4"
                className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
              >
                Phone No
              </label>
              <input
                id="reset-username4"
                type="text"
                className="bg-gray-200 border border-gray-700  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 input-signup">
          <div className="flex  -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="username5"
                className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
              >
                Password
              </label>
              <input
                id="reset-username5"
                type="text"
                className="bg-gray-200 border border-gray-700  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="username6"
                className="block text-gray-700 text-sm font-bold mb-2 label-email reset-email"
              >
                Confirm Password
              </label>
              <input
                id="reset-username6"
                type="text"
                className="bg-gray-200 border border-gray-700  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sign-up-input"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </form>
  );
};

export default Signupform;
