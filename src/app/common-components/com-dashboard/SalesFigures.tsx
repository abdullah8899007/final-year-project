import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { fetchMonthlySales } from "../../../api/salesreport-api";


interface ProductSalesProps {
  className?: string;
}

const SalesFigures: React.FC<ProductSalesProps> = ({ className }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [mainBalance, setMainBalance] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchMonthlySales();
      setMainBalance(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const labels = mainBalance.map((item) => item.month.slice(0, 3));
    const salesData = mainBalance.map((item) => item.total_sales);

    const data = {
      labels: labels,
      datasets: [
        {
          type: "bar",
          backgroundColor: "#EA6A12",
          data: salesData,
          yAxisID: "bar-y-axis",
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
        tooltip: {
          mode: "index",
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
            display: false,
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          id: "bar-y-axis",
          ticks: {
            color: textColorSecondary,
            stepSize: 500,
            beginAtZero: true,
            callback: (value: number) => (value > 1 ? value : ""),
          },
          grid: {
            display: false,
          },
          borderWidth: 1,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [mainBalance]);

  return (
    <div
      className={`rounded-lg shadow-lg bg-white user-list p-5 mt-5 ${className}`}
    >
      <h2 className="text-lg font-semibold mb-4 relative left-3">Sales</h2>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default SalesFigures;
