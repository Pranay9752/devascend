import React from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import WavingHand from "@/components/ui/waving_hand";

const ProgressTrackerHeader = async ({ children }) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <div className="flex justify-start items-center gap-5">
      <div className="flex items-center justify-start mr-auto">
        <h1 className="text-2xl font-bold mr-auto">
          {(user?.user_metadata?.display_name || user?.email) && "Hello, "}{" "}
          {user?.user_metadata?.display_name || user?.email || "Dev Ascend"}
        </h1>
        <WavingHand />
      </div>

      {children}
    </div>
  );
};
export default ProgressTrackerHeader;
