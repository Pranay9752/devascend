import { createClient } from "@/utils/supabase/server";

export const addEntry = async ({
  categoryId,
  topic,
  resource,
  timeSpent,
  notes,
  difficulty,
}) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user.id;

    // Validate required fields
    if (
      !userId ||
      !categoryId ||
      !topic ||
      !resource ||
      !timeSpent ||
      !difficulty
    ) {
      return { error: "Missing required fields", data: [] };
    }

    // Insert the new entry into the database
    const { data, error } = await supabase.from("entries").insert([
      {
        user_id: userId,
        category_id: categoryId,
        topic,
        resource,
        timespent: timeSpent, // Store interval as string like '1 hour', '30 minutes'
        notes,
        difficulty,
      },
    ]);

    // Check for errors in the insertion
    if (error) {
      return { error: "Server Error!", data: [] };
    }

    // Respond with the newly inserted data
    return { data };
  } catch (error) {
    // Catch any unexpected errors
    return { error: "Server Error!", data: [] };
  }
};
