import React from "react";

interface ProgressCircleProps {
  percent: number;
  color: string;
  itemName: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percent,
  color,
  itemName,
}) => {
  const circleRadius = 90;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-4">
        <svg className="transform -rotate-60 w-72 h-72">
          <circle
            cx="145"
            cy="145"
            r={circleRadius}
            stroke="currentColor"
            strokeWidth="30"
            fill="transparent"
            className="text-[#fdfdfb] border"
          />
          <circle
            cx="145"
            cy="145"
            r={circleRadius}
            stroke={color}
            strokeWidth="50"
            fill="transparent"
            className="shadow-2xl"
            strokeDasharray={circumference}
            strokeDashoffset={(
              circumference -
              (percent / 100) * circumference
            ).toString()}
          />
        </svg>
        <span className="absolute text-5xl text-black">{`${percent}%`}</span>
      </div>
      <h1 className="text-xl font-bold text-black">{itemName}</h1>
    </div>
  );
};

export default ProgressCircle;
