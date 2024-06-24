// src/components/CategoryFilter.tsx
import React from "react";
import { useAppDispatch } from "../hooks";
import { fetchArticles, setCategory } from "../store/articleSlice";

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = ["general", "business", "technology", "entertainment"];

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
    dispatch(fetchArticles({ category, page: 1 }));
  };

  return (
    <div className="flex space-x-4 justify-center mb-5">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
