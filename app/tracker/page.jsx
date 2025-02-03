import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import ProgressTrackerHeader from "./components/ProgressTrackerHeader";
import AddCategoryModal from "./components/AddCategoryModal";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getCategoryData } from "./actions/getCategoryData";
import { CategoryCard } from "./components/CategoryCard";
import { addEntry } from "./actions/addEntry";

export default async function Tracker({ searchParams }) {
  console.log('searchParams: ', searchParams);
  const { start_date = "2025-02-01", end_date = "2025-02-05" } = searchParams;

  const { data } = await getCategoryData({ start_date, end_date });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProgressTrackerHeader>
        <div className="flex items-center space-x-4">
          <Calendar className="h-5 w-5" />
          <form method="GET" action="/tracker">
            <Input
              type="date"
              name="start_date"
              defaultValue={start_date}
              className="w-auto"
            />
            <button type="submit" className="hidden">
              Submit
            </button>
          </form>
        </div>
        <AddCategoryModal />
      </ProgressTrackerHeader>
      <div className="grid gap-6">
        {data ? (
          data?.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))
        ) : (
          <></>
        )}
      </div>

      {/* Show categories */}
    </div>
  );
}
