import React, { useEffect, useState } from "react";
import { LuClock12 } from "react-icons/lu";
import { AppDispatch, RootState } from "@/store/root-store";
import { FaCircle } from "react-icons/fa6";
import { CgAlarm } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  SalesReportItem,
  fetchMonthlyAsync,
  fetchSalesReportItemsAsync,
} from "../../../store/slice/salesReport";
const dataArray = [
  {
    date: "Monday",
    type: ["Lunch", "Dinner"],
    customer: [90, 157],
    covers: [90, 157],
    food: [90, 157],
    byWeek: "11.8%",
    other: "Estimated square Feet",
    extra: 3400,
  },
  {
    date: "Tuesday",
    type: ["Lunch", "Dinner"],
    customer: [90, 157],
    covers: [90, 157],
    food: [90, 157],
    byWeek: "11.8%",
    other: "Average Lunch Price",
    extra: 3300,
  },

  {
    date: "Wednesday",
    type: ["Lunch", "Dinner"],
    customer: [90, 157],
    covers: [90, 157],
    food: [90, 157],
    byWeek: "11.8%",
    other: "Average Dinner Price",
    extra: 1200,
  },

  {
    date: "Tuesday",
    type: ["Lunch", "Dinner"],
    customer: [90, 157],
    covers: [90, 157],
    food: [90, 157],
    byWeek: "11.8%",
    other: "Number of seats",
    extra: 1200,
  },
  {
    date: "Thursday",
    type: ["Lunch", "Dinner"],
    customer: [90, 157],
    covers: [90, 157],
    food: [90, 157],
    byWeek: "11.8%",
    extra: null,
  },
];
const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Covers",
    dataIndex: "covers",
    key: "covers",
  },
  {
    title: "Food",
    dataIndex: "food",
    key: "food",
  },
  {
    title: "By week",
    dataIndex: "byWeek",
    key: "byWeek",
  },
];
const data = [
  {
    January: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    February: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    March: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    April: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    May: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    June: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    July: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    August: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    September: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    October: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    November: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
    December: [
      {
        dinner: 0,
        lunch: 0,
      },
      {},
    ],
  },
];
const ReportTable: React.FC = ({ state }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const salesData = useSelector((state: RootState) => state.sales);
  const [dataSource, setDataSource] = useState<[] | any>([]);

  useEffect(() => {
    if (state === "monthly") {
      dispatch(fetchSalesReportItemsAsync());
    } else {
      dispatch(fetchMonthlyAsync());
    }
  }, [dispatch, state]);

  useEffect(() => {
    const newData = data.map((obj) => {
      return Object.entries(obj).map(([monthName, monthData]) => ({
        monthName,
        ...monthData[0],
      }));
    });
    if (data) {
      const value = newData[0].map((item: any, i) => {
        return [
          {
            month: item.monthName,
            type: ["Dinner", "Lunch"],
            customer: [item["dinner"], item["lunch"]],
            covers: ["-", "-"],
            food: ["-", "-"],
            byWeek: "-",
            extra: null,
          },
        ];
      });
      setDataSource(value);
    }
  }, [data]);

  return (
    <div>
      <div className="flex  w-full bg-[#fdfdfb]  border-none">
        <table className="w-full bg-[#fdfdfb]  border-none overflow-auto ">
          <thead className="!border-b border-gray-400">
            <tr className="!border-b ">
              {columns.map((item) => {
                return (
                  <th
                    key={item.key}
                    className="text-[rgba(0,0,0,0.898)] border font-semibold text-[1rem] p-[10px]"
                  >
                    {item.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <br />
          <tbody>
            {dataSource.map((item: any) => {
              return (
                <tr key={item[0].other} className="p-[10px]">
                  <td className=" bg-white  border-solid p-3">
                    {item[0].month}
                  </td>
                  <td className=" bg-white  border-solid p-3">
                    <div>
                      <span className="h-[12px] w-[12px] bg-[#82b941] !rounded-full !inline-block"></span>{" "}
                      {item[0].type[0]}
                    </div>
                    <div>
                      <span className="h-[12px] w-[12px] bg-[#ea6a12] !rounded-full !inline-block"></span>{" "}
                      {item[0].type[1]}
                    </div>
                  </td>
                  <td className=" bg-white border-solid p-3">
                    {item[0].customer[0]} <br /> {item[0].customer[1]}
                  </td>
                  <td className=" bg-white border-solid p-3">
                    {item[0].covers[0]} <br /> {item[0].covers[1]}
                  </td>
                  <td className=" bg-white border-solid p-3">
                    {item[0].food[0]} <br /> {item[0].food[1]}
                  </td>
                  <td className=" bg-white border-solid p-3">
                    {item[0].byWeek}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td className=" bg-white border-solid p-3 flex !items-center justify-between mt-[5px] ">
                Week Total
              </td>
            </tr>
          </tbody>
        </table>
        <table className=" bg-[#fdfdfb]  border-none  ">
          <thead className="!border-b border-gray-400">
            <tr className="!border-b ">
              {[
                {
                  title: "emptyColumns",
                  dataIndex: "emptyColumns",
                  key: "date",
                },
              ].map((item) => {
                return (
                  <th
                    key={item.key}
                    className=" border font-semibold text-[1rem] p-[10px]"
                  >
                    <span className="text-[#fdfdfb] select-none">
                      {item.title}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <br />
          <tbody>
            {[
              {
                feet: "Estimated square Feet",
                extra: 3300,
              },
              {
                feet: "Estimated square Feet",
                extra: 3120,
              },
              {
                feet: "Estimated square Feet",
                extra: 3200,
              },
            ].map((item) => {
              return (
                <tr key={item.extra} className="p-[10px] !mb-5">
                  <td className=" bg-white  border-solid p-3">{item.feet}</td>
                  <td className=" bg-white border-solid p-3">{item.extra}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
