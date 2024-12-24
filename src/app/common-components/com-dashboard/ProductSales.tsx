import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { fetchWeeklySales } from "../../../api/salesreport-api";

interface ProductSalesProps {
  className?: string;
}

const ProductSales: React.FC<ProductSalesProps> = ({ className }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [mainBalance, setMainBalance] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchWeeklySales();
      if (response.success) {
        setMainBalance(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const surfaceBorder = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--surface-border");
    const lowSalesColor = "#EA6A12";
    const highSalesColor = "#EA6A12";

    if (mainBalance.length) {
      const days = mainBalance.map((item) => item.day);
      const sales = mainBalance.map((item) => item.total_sales);

      const data = {
        labels: days, 
        datasets: [
          {
            type: "bar",
            label: "Food",
            backgroundColor: sales.map((sale) =>
              sale > 1 ? highSalesColor : lowSalesColor
            ),
            data: sales,
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
    }
  }, [mainBalance]);

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
