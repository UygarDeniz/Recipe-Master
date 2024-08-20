"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategoryFilterProps = {
  selectedCategory: string;
};

export default function CategoryFilter({
  selectedCategory,
}: CategoryFilterProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="text-sm md:text-xl">
      <label
        htmlFor="category"
        className="block font-medium text-gray-700 dark:text-gray-300"
      >
        Filter by Category
      </label>
      <select
        id="category"
        name="category"
        className="mt-1 block w-full pl-3 pr-10 py-2  border border-gray-300 dark:bg-gray-800 dark:border-gray-400 focus:outline-none  rounded-md"
        onChange={(e) => handleCategoryChange(e.target.value)}
        defaultValue={selectedCategory}
      >
        <option value="">All</option>
        <option value="BREAKFAST">Breakfast</option>
        <option value="LUNCH">Lunch</option>
        <option value="DINNER">Dinner</option>
        <option value="DESSERT">Dessert</option>
        <option value="SNACK">Snack</option>
        <option value="DRINK">Drink</option>
        <option value="OTHER">Other</option>
      </select>
    </div>
  );
}
