"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function DateField() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the initial date from URL or use today's date
  const defaultStartDate = searchParams.get("start_date") || new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(defaultStartDate);

  // Handle date change and update the URL
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setStartDate(newDate);
    router.push(`/tracker?start_date=${newDate}`, { scroll: false }); // Update URL without reloading
  };

  return <Input type="date" value={startDate} onChange={handleDateChange} className="w-auto" />;
}
