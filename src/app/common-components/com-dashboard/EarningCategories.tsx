import React from "react";
import CustomPieChart from "./CustomPieChart";

interface EarningCategoriesProps {
  className: string;
}

const EarningCategories: React.FC<EarningCategoriesProps> = ({ className = '' }) => {
  const classNames = `rounded-lg shadow-lg bg-white earning-categories-graph ${className}`;

  return (
    <div className=" ">
      <div className={classNames}>
        <h2 className="text-lg font-semibold mb-4 relative left-3 ml-6 ">
          Earning Categories <br />
          Heist Earnings Categories
        </h2>
        <div className="mb-14">
          <CustomPieChart
            data={[
              { name: "Pizza", value: 335 },
              { name: "Burger", value: 234 },
              { name: "VegPizza", value: 234 },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default EarningCategories;
