import React from "react";
import Image from "next/image";
import { specialtiesData } from "@/data/userData";

interface SpecialtiesProps {
  className?: string;
}

const Specialties: React.FC<SpecialtiesProps> = ({ className }) => {
  return (
    <div
      className={`relative rounded-lg shadow-lg bg-white p-6 mt-10 ${className}`}
    >
      <h2 className="text-lg font-semibold mb-6">Specialties Sales</h2>
      <span className="absolute   left-0 right-0 w-full h-0.5 bg-[#DDCBBA]"></span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialtiesData.map((specialty) => (
          <div key={specialty.id} className="flex flex-col items-center">
            <div className="relative w-32 h-32 mt-4">
              <Image
                src={specialty.image}
                alt={specialty.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="text-center">
              <p style={{ color: "#FF8942" }}>{specialty.popularity}%</p>
              <p>{specialty.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specialties;
