import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import ProgressTrackerHeader from "./components/ProgressTrackerHeader";
import AddCategoryModal from "./components/AddCategoryModal";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getCategoryData } from "./actions/getCategoryData";
import { CategoryCard } from "./components/CategoryCard";
import { addEntry } from "./actions/addEntry";
import { format } from "date-fns";
import DateField from "./components/DateField";

export default async function Tracker({ searchParams }) {
  const {
    start_date = format(new Date(), "yyyy-MM-dd"),
    end_date = format(new Date(), "yyyy-MM-dd"),
  } = searchParams;
  const { data } = await getCategoryData({ start_date, end_date: start_date });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProgressTrackerHeader>
        <div className="flex items-center space-x-4">
          <DateField />
        </div>
        <AddCategoryModal />
      </ProgressTrackerHeader>
      <div className="grid gap-6">
        {data ? (
          data?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
