import React from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";

const ProgressTrackerHeader = async ({ children }) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  return (
    <div className="flex justify-between items-center gap-5">
      <h1 className="text-2xl font-bold mr-auto">
        {data.user.email || "Dev Ascend"}
      </h1>
      <div className="flex items-center space-x-4">
        <Calendar className="h-5 w-5" />
        <Input
          type="date"
          // value={selectedDate}
          // onChange={(e) => setSelectedDate(e.target.value)}
          className="w-auto"
        />
      </div>
      {children}
    </div>
  );
};
export default ProgressTrackerHeader;
