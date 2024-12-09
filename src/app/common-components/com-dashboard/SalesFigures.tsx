import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

interface ProductSalesProps {
  className?: string;
}


const SalesFigures: React.FC<ProductSalesProps> = ({ className }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          type: 'bar',
          backgroundColor: '#EA6A12', 
          data: [1131, 1180, 1114, 1109, 1112, 1061, 1337, 1014, 1119, 1251, 1137, 1289],
          yAxisID: 'bar-y-axis', 
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1.6, 
      plugins: {
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'bar-y-axis',
            ticks: {
              color: textColorSecondary,
              max: 500,
              stepSize: 100,
            },
            grid: {
              color: surfaceBorder,
            },
            borderWidth: 1,
          },
        ],
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className={`rounded-lg shadow-lg bg-white user-list  p-5 mt-5 ${className}`}>
      <h2 className="text-lg font-semibold mb-4 relative left-3">Sales</h2>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
}

export default SalesFigures;
