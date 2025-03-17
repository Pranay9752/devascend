import { createClient } from "@/utils/supabase/server";

export const getCategoryData = async ({ start_date, end_date }) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const user_id = user.id;
    if (!user_id || !start_date || !end_date) {
      return { error: "Missing user_id, start_date, or end_date", data: [] };
    }

    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", user_id);

    if (catError) {
      return { error: "No category availabe!", data: [] };
    }

    const { data: entries, error: entError } = await supabase
    .from("entries")
    .select("*")
    .eq("user_id", user_id)
    .gte("created_at", start_date)
    .lte("created_at", end_date);
    
    if (entError) {
      return { error: "Server Error!", data: [] };
    }

    // Map categories to their corresponding entries
    const result = categories.map((category) => ({
      ...category,
      entries: entries.filter((entry) => entry.category_id === category.id),
    }));

    return { data: result };
  } catch (error) {
    console.error("Error adding category:", error.message);
    return { error: error.message || "Server Error!", data: [] };
  }
};
