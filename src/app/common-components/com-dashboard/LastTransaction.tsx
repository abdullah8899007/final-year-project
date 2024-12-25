import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchLastTransactions } from "../../../api/salesreport-api";

interface Transaction {
  id: string;
  date: string;
  foodItem: string;
  price: number;
  image: string;
}

interface LastTransactionsProps {
  className: string;
}

const LastTransactions: React.FC<LastTransactionsProps> = ({
  className = "",
}) => {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const classNames = `rounded-lg shadow-lg bg-white last-transactions ${
    className || ""
  }`;

  const getData = async () => {
    try {
      const response = await fetchLastTransactions();

      if (response?.items?.length > 0) {
        const formattedData = response?.items.map(
          (item: any, index: number) => ({
            id: (index + 1).toString(),
            date: new Date(response?.created_at).toLocaleDateString(),
            foodItem: item.name,
            price: item.price,
            image: item.image,
          })
        );
        setTransactionsData(formattedData);
      } else {
        console.warn("No items found in API response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-4">
      <div className={classNames}>
        <h2 className="text-lg font-semibold mb-4 relative left-3">
          Last Transactions
          <span className="absolute top-10 right-3 w-full h-0.5 bg-[#DDCBBA]"></span>
        </h2>
        <div>
          {transactionsData && transactionsData.length > 0 ? (
            transactionsData.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center ml-4 mt-2">
                  <div className="relative w-10 h-10 rounded-lg mr-4 overflow-hidden">
                    <div
                      className="w-4 h-4 bg-orange-500 rounded-full mr-4 mt-2"
                      title={transaction.foodItem}
                    ></div>
                  </div>
                  <div>
                    <p className="text-base">{transaction.foodItem}</p>
                    <p className="text-sm">{transaction.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-base relative mr-4">
                    Rs.{Math.abs(transaction.price)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No transactions found</p> // Fallback if no data
          )}
        </div>
      </div>
    </div>
  );
};

export default LastTransactions;
