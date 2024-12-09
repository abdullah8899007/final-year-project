import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface TotalProfitProps {
  className: string;
  data: { month: string; profit: number }[];
}

const TotalProfit: React.FC<TotalProfitProps> = ({ className, data }) => {
  const totalProfitRs = data.reduce((acc, entry) => acc + entry.profit, 0);

  const pieChartData = [
    { name: 'Profit', value: totalProfitRs },
    { name: 'Remaining', value: 10000 - totalProfitRs }, 
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  
  return (
    <div className={`rounded-lg shadow-lg bg-white ${className} mt-5 p-4 h-[20rem]`}>
      <h3 className="text-lg font-bold mb-4">Total Profit</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {`${(value / 10000 * 100).toFixed(2)}%`}
              </text>
            );
          }}
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="mt-4 flex items-center justify-center">
        <p className="text-lg font-semibold">Total Profit: {totalProfitRs}</p>
      </div>
      <div>
      
      </div>
    </div>
  );
};

export default TotalProfit;
