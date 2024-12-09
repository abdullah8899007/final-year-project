import React, { useMemo } from 'react';

interface Transaction {
  id: string;
  date: string;
  foodItem: string;
  price: number;
}

interface TotalEarningsProps {
  className?: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2024-02-17", foodItem: "Sausage Pizza", price: -115 },
  { id: "2", date: "2024-02-16", foodItem: "Pepperoni Pizza", price: -120 },
  { id: "3", date: "2024-02-15", foodItem: "Veggie Pizza", price: -140 },
  { id: "4", date: "2024-02-14", foodItem: "BBQ Pizza", price: -150 },
  { id: "5", date: "2024-02-14", foodItem: "Meat Pizza", price: -130 },
  { id: "6", date: "2024-02-14", foodItem: "Supreme Pizza", price: -130 },
];

const randomSeed = 8000;

const getTotalEarnings = (transactions: Transaction[], randomSeed: number): number => {
  const updatedTransactions = transactions.slice(0, transactions.length - 1);
  const randomEarning = Math.floor(Math.abs(Math.sin(randomSeed)) * 1000);

  return updatedTransactions.reduce(
    (acc, transaction) => acc + Math.abs(transaction.price),
    0
  ) + randomEarning;
};

const TotalEarnings: React.FC<TotalEarningsProps> = ({ className = '' }) => {
  const totalEarnings = useMemo(() => getTotalEarnings(TRANSACTIONS, randomSeed), []);

  return (
    <div className={`lg:w-[22rem] sm:w-full md:w-[22rem] mt-5 ${className}`}>
      <div className="rounded-lg shadow-lg bg-[#EA6A12] p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-white font-exo2 leading-6">
          Total Earnings
        </h2>
        <p className="text-lg sm:text-xl text-white font-extrabold leading-9">
          ${totalEarnings}
        </p>

        <div className="mt-6 sm:mt-8 relative bg-white rounded-lg shadow-md p-4 ">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 font-exo2 leading-5">
            Total Profit
          </h3>
          <div className="flex items-center px-2.5 py-0.5 text-base sm:text-lg font-semibold text-black-500 text-center">
            +0.4%
          </div>
          <div className="relative mt-2">
            <div className="absolute inset-0 bg-green-500 h-0.5 transform -skew-y-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalEarnings;
