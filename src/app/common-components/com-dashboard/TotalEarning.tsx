import React, { useEffect, useState } from "react";
import { fetchSalesApi } from "../../../api/reservation-api";

interface TotalEarningsProps {
  className?: string;
}

const TotalEarnings: React.FC<TotalEarningsProps> = ({ className = "" }) => {
  const [mainBalance, setMainBalance] = useState<number | null>(null);

  const getData = async () => {
    try {
      const response = await fetchSalesApi();
      setMainBalance(response.data.MainBalance);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`lg:w-[22rem] sm:w-full md:w-[22rem] mt-5 ${className}`}>
  <div className="rounded-lg shadow-lg bg-[#EA6A12] p-6 flex flex-col items-center justify-center h-full">
    <h2 className="text-base sm:text-lg font-semibold mb-4 text-white font-exo2 leading-6 text-center">
      Total Earnings
    </h2>
    <p className="text-3xl sm:text-4xl text-white font-extrabold leading-9 text-center">
      {mainBalance !== null ? (
        <span className="text-white drop-shadow-lg">
          ${mainBalance}
        </span>
      ) : (
        "Loading..."
      )}
    </p>

        {/* <div className="mt-6 sm:mt-8 relative bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 font-exo2 leading-5">
            Total Profit
          </h3>
          <div className="flex items-center px-2.5 py-0.5 text-base sm:text-lg font-semibold text-black-500 text-center">
            +0.4%
          </div>
          <div className="relative mt-2">
            <div className="absolute inset-0 bg-green-500 h-0.5 transform -skew-y-2"></div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default TotalEarnings;
