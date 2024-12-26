import React, { useEffect, useState } from "react";
import ProgressCircle from "@/app/common-components/ProgressCircle";
import { RootState, AppDispatch } from "@/store/root-store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAsync,
  selectAllCategories,
  CategoryItems,
} from "@/store/slice/categoriesSlice";
import { fetchAllCategories } from "../../../api/salesreport-api";

const MenuComparison = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const [topCategories, setTopCategories] = useState<CategoryItems[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [mainBalance, setMainBalance] = useState<any[]>([]);

  const getData = async () => {
    try {
      const response = await fetchAllCategories();
      if (response) {
        const backendData = response?.results.map((item: any) => ({
          id: item.id,
          name: item.name,
          count: item.count,
        }));
        setMainBalance(backendData);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (mainBalance && mainBalance.length > 0) {
      // Sort categories based on count and pick the top 3
      const sortedCategories = [...mainBalance].sort(
        (a, b) => b.count - a.count
      );
      const topThreeCategories = sortedCategories.slice(0, 3);
      setTopCategories(topThreeCategories);

      // Calculate the total count for all categories
      const totalCount = mainBalance.reduce(
        (acc, curr) => acc + curr.count,
        0
      );
      setTotalCount(totalCount);
    }
  }, [mainBalance]);

  const colors = ["#d15f10", "#f9a267", "#f3a79f"];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-wrap justify-center">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-wrap justify-center">
            {topCategories.map((category, index) => (
              <ProgressCircle
                key={category.id}
                color={colors[index]}
                itemName={category.name}
                percent={Math.round((category.count / totalCount) * 100)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuComparison;
