export const addCategory = async (categoryData) => {
  try {
    // const { data: {user} } = await supabase.auth.getUser()
    // console.log('user: ', user);

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Send token with the request
      },
      body: JSON.stringify({
        name: categoryData.name,
        icon: categoryData.icon,
        minTarget: categoryData.minTarget,
      }),
    });

    const newCategory = await response.json();
    return newCategory;
  } catch (error) {
    console.error("Error adding category:", error.message);
  }
};
