const supabaseUrl = "https://pqraoevxcsltsjclqjuw.supabase.co";
const supabaseKey = "sb_publishable_y162yugl4DJLSgMrrFtQ8Q_Xw8gI3Cf";

// ВАЖНО: window.supabase
let supabaseClient = null;

if (supabaseUrl !== "ВСТАВЬ_URL" && supabaseKey !== "ВСТАВЬ_PUBLISHABLE_KEY") {
  supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
}

// Функции для работы с комментариями
window.loadComments = async function() {
  if (!supabaseClient) {
    console.log("Supabase not configured");
    return [];
  }

  try {
    const { data, error } = await supabaseClient
      .from("comments")
      .select("id, author, text, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading comments:", error);
      return [];
    }

    console.log("Comments loaded:", data);
    return data || [];
  } catch (err) {
    console.error("Exception in loadComments:", err);
    return [];
  }
};

window.sendComment = async function(author, text) {
  if (!supabaseClient) {
    throw new Error("Supabase not configured");
  }

  try {
    const { data, error } = await supabaseClient
      .from("comments")
      .insert([{ 
        author, 
        text
      }])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(error.message || 'Failed to save comment');
    }

    console.log("Comment saved:", data);
    return data;
  } catch (err) {
    console.error('Error in sendComment:', err);
    throw err;
  }
};