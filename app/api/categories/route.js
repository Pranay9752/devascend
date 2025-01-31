import { createClient } from "@/utils/supabase/server";

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

    console.log("user: ", user.user.id, name, icon, minTarget);
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
