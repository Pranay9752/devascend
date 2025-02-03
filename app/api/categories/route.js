import { createClient } from "@/utils/supabase/server";

export async function GET(req) {
  try {
    const supabase = await createClient();
    const { searchParams } = req.nextUrl;
    const user_id = searchParams.get("user_id");
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");

    // Validate query parameters
    if (!user_id || !start_date || !end_date) {
      return new Response(
        JSON.stringify({ error: "Missing user_id, start_date, or end_date" }),
        { status: 400 }
      );
    }

    // Fetch categories for the given user
    const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user_id);
    
    if (catError) {
      return new Response(JSON.stringify({ error: catError.message }), {
        status: 500,
      });
    }

    // Fetch entries within the date range
    const { data: entries, error: entError } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", user_id)
      .gte("created_at", start_date)
      .lte("created_at", end_date);

    if (entError) {
      return new Response(JSON.stringify({ error: entError.message }), {
        status: 500,
      });
    }

    // Map categories to their corresponding entries
    const result = categories.map((category) => ({
      ...category,
      entries: entries.filter((entry) => entry.category_id === category.id),
    }));

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const supabase = await createClient();

    const { data: user } = await supabase.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
      });
    }

    const { name, icon, minTarget } = await req.json();

    if (!name || !minTarget) {
      return new Response(
        JSON.stringify({ error: "Name and minimum target are required" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([{ user_id: user.user.id, name, icon, min_target: minTarget }])
      .single();

    console.log("error: ", error);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
