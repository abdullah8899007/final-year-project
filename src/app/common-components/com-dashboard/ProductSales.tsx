import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

interface ProductSalesProps {
  className?: string;
}

const ProductSales: React.FC<ProductSalesProps> = ({ className }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const surfaceBorder = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--surface-border");
    const lowSalesColor = "#ed8035";
    const highSalesColor = "#fbe5d6";
    const fetchData = () => {
      // data fetching for delay//
      setTimeout(() => {
        const data = {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              type: "bar",
              label: "Food",
              backgroundColor: [
                highSalesColor,
                highSalesColor,
                highSalesColor,
                lowSalesColor,
                highSalesColor,
                highSalesColor,
                highSalesColor,
              ],
              data: [0.3, 1, 0.5, 2.1, 1, 0.4, 0.4],
            },
          ],
        };
        const options = {
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            tooltips: {
              mode: "index",
              intersect: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                color: surfaceBorder,
              },
            },
            y: {
              stacked: true,
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                color: surfaceBorder,
              },
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <div
      className={`rounded-lg shadow-lg bg-white product-sales-graph mt-3 ml-2${className}`}
    >
      <h1 className="text-lg font-semibold ml-3">Product Sales</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Chart type="bar" data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default ProductSales;
