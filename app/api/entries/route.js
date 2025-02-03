import { addEntry } from "@/app/tracker/actions/addEntry";


export async function POST(req) {
    try {
      const { categoryId, topic, resource, timeSpent, notes, difficulty } = await req.json();
  
      // Call the addEntry function to insert the new entry
      const response = await addEntry({
        categoryId,
        topic,
        resource,
        timeSpent,
        notes,
        difficulty,
      });
  
      if (response?.error) {
        return new Response(JSON.stringify({ error: response.error }), { status: 500 });
      }
  
      return new Response(JSON.stringify({ data: response.data }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Server Error!" }), { status: 500 });
    }
  }