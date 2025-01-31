import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import ProgressTrackerHeader from "./components/ProgressTrackerHeader";
import AddCategoryModal from "./components/AddCategoryModal";

export default async function Tracker() {
  //   const supabase = await createClient();

  //   const { data, error } = await supabase.auth.getUser();
  //   if (error || !data?.user) {
  //     redirect("/login");
  //   }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProgressTrackerHeader>
        <AddCategoryModal />
      </ProgressTrackerHeader>
    </div>
  );
}
