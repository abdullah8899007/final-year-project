import React from "react";
import Image from "next/image";
import MargheritaPizzaImage from "@/assets/dashboardAssets/pizza1.svg";
import PepperoniPizzaImage from "@/assets/dashboardAssets/pizza2.svg";
import VeggiePizzaImage from "@/assets/dashboardAssets/pizza3.svg";
import MeatPizzaImage from "@/assets/dashboardAssets/pizza4.svg";
import SausagePizzaImage from "@/assets/dashboardAssets/pizza6.svg";

interface MenuItem {
  id: string;
  name: string;
  image: any;
  popularity: number;
}

interface TopMenuItemsProps {
  className?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    image: MargheritaPizzaImage,
    popularity: 30,
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    image: PepperoniPizzaImage,
    popularity: 70,
  },
  { id: "3", name: "Veggie Pizza", image: VeggiePizzaImage, popularity: 40 },
  { id: "4", name: "Meat Pizza", image: MeatPizzaImage, popularity: 30 },
  { id: "5", name: "Sausage Pizza", image: SausagePizzaImage, popularity: 50 },
];

const TopMenuItems: React.FC<TopMenuItemsProps> = ({ className }) => {
  return (
    <div className="">
      <div
        className={`rounded-lg shadow-lg bg-white top-menu-items h-[26rem] ${className}`}
      >
        <h2 className="text-lg font-semibold relative left-3 top-3">
          Top Menu Items
          <span className="absolute top-12 right-3 w-full h-0.5 mb-12 bg-[#DDCBBA]"></span>
        </h2>
        <div className="mt-12">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mt-4"
            >
              <div className="flex items-center ml-4">
                <div className="relative w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 mr-4 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <p className="text-base">{item.name}</p>
                  <div className="w-48 h-2 bg-gray-300 rounded-full mt-1">
                    <div
                      className="h-2 bg-orange-500 rounded-full"
                      style={{ width: `${item.popularity}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-xs mr-3">{`${item.popularity}%`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMenuItems;
