import React from "react";
import Image from "next/image";
import SausagePizzaImage from '@/assets/dashboardAssets/pizza1.svg';
import PepperoniPizzaImage from '@/assets/dashboardAssets/pizza2.svg';
import VeggiePizzaImage from '@/assets/dashboardAssets/pizza3.svg';
import BBQChickenPizzaImage from '@/assets/dashboardAssets/pizza4.svg';
import MeatPizzaImage from '@/assets/dashboardAssets/pizza6.svg';
import SupremePizzaImage from '@/assets/dashboardAssets/pizza7.svg';

interface Transaction {
  id: string;
  date: string;
  foodItem: string;
  price: number;
  image: any;
}

interface LastTransactionsProps {
  className: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "2024-02-17",
    foodItem: "Sausage Pizza",
    price: -115,
    image: SausagePizzaImage,
  },
  {
    id: "2",
    date: "2024-02-16",
    foodItem: "Pepperoni Pizza",
    price: -120,
    image: PepperoniPizzaImage,
  },
  {
    id: "3",
    date: "2024-02-15",
    foodItem: "Veggie Pizza",
    price: -140,
    image: VeggiePizzaImage,
  },
  {
    id: "4",
    date: "2024-02-14",
    foodItem: "BBQ Pizza",
    price: -150,
    image: BBQChickenPizzaImage,
  },
  {
    id: "5",
    date: "2024-02-14",
    foodItem: "Meat Pizza",
    price: -130,
    image: MeatPizzaImage,
  },
  {
    id: "6",
    date: "2024-02-14",
    foodItem: "Supreme Pizza",
    price: -130,
    image: SupremePizzaImage,
  },
];

const LastTransactions: React.FC<LastTransactionsProps> = ({ className = '' }) => {
  const classNames = `rounded-lg shadow-lg bg-white last-transactions ${
    className || ""
  }`;

  return (
    <div className="mt-4">
      <div className={classNames}>
        <h2 className="text-lg font-semibold mb-4 relative left-3">
          Last Transactions
          <span className="absolute top-10 right-3 w-full h-0.5 bg-[#DDCBBA]"></span>
        </h2>
        <div>
          {TRANSACTIONS.map((transaction) => (
            // Check if all required fields exist and are valid//
            transaction.id && transaction.date && transaction.foodItem && transaction.price && transaction.image &&
            <div
              key={transaction.id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center ml-4 mt-2">
                <div className="relative w-10 h-10 rounded-lg mr-4 overflow-hidden">
                  <Image
                    src={transaction.image}
                    alt={transaction.foodItem}
                    layout="fill"
                    objectFit="cover"
                  />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default LastTransactions;
