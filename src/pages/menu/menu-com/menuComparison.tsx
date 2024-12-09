import React, { useEffect, useState } from "react";
import ProgressCircle from "@/app/common-components/ProgressCircle";
import { RootState, AppDispatch } from "@/store/root-store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAsync,
  selectAllCategories,
  CategoryItems
} from "@/store/slice/categoriesSlice";

const MenuComparison = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const [topCategories, setTopCategories] = useState<CategoryItems[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (categories && categories.length > 0) {
     
      const sortedCategories = [...categories].sort((a, b) => b.count - a.count);
    
      const topThreeCategories = sortedCategories.slice(0, 3);
      setTopCategories(topThreeCategories);
      // Calculate total count of all categories and than used for avg
      const totalCount = categories.reduce((acc, curr) => acc + curr.count, 0);
      setTotalCount(totalCount);
    }
  }, [categories]);
  
  const colors = ['#d15f10', '#f9a267', '#f3a79f'];
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-wrap justify-center">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-wrap justify-center">
            {topCategories.map((category,index) => (
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
