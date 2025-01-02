import React, { useEffect, useState } from "react";
import CustomPieChart from "./CustomPieChart";
import { fetchCategoryApi } from "@/api/reservation-api";

interface EarningCategoriesProps {
  className: string;
}

const EarningCategories: React.FC<EarningCategoriesProps> = ({ className = '' }) => {
  const classNames = `rounded-lg shadow-lg bg-white earning-categories-graph ${className}`;
    const [userData, setUserData] = useState<any[]>([]);
  
const getData = async () => {
    try {
      const response = await fetchCategoryApi();
      console.log("Response from API:", response);

      // Validate the response is an array
      if (response?.data && Array.isArray(response.data)) {
        setUserData(response.data);
      } else {
        console.error("Invalid data format: Expected an array");
        setUserData([]); // Set an empty array to avoid rendering issues
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserData([]); // Set an empty array in case of an error
    }
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []);

  return (
    <div className=" ">
      <div className={classNames}>
        <h2 className="text-lg font-semibold mb-4 relative left-3 ml-6 ">
          Earning Categories <br />
          Heist Earnings Categories
        </h2>
        <div className="mb-14">
        <CustomPieChart
  data={userData.map((item) => ({
    name: item.category_name,
    value: item.percentage,
  }))}
/>
        </div>
      </div>
    </div>
  );
};

export default EarningCategories;
