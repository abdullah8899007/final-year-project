
import React from 'react';
import CustomPieChart from './CustomPieChart'; 

interface TotalSalesProps {
  className: string;
}

const data = [
  { name: 'Direct', value: 2000 },
  { name: 'Online', value: 3000 },
  { name: 'Agent', value: 5000 },
];

const TotalSales: React.FC<TotalSalesProps> = ({ className=''}) => {
  const totalSales = data.reduce((total, entry) => total + entry.value, 0);

  return (
    <div className={`rounded-lg shadow-lg bg-white ${className} mt-5 p-4`}>
      <h3 className="text-lg font-bold mb-4">Total Sales</h3>
      <CustomPieChart data={data} />
      <div className="mt-4 flex items-center justify-center">
        <p className="text-lg font-semibold">
          Total Sales: {totalSales}
        </p>
      </div>
    </div>
  );
};

export default TotalSales;
