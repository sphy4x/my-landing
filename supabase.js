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

  const { data, error } = await supabaseClient
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};

window.sendComment = async function(author, text) {
  if (!supabaseClient) {
    throw new Error("Supabase not configured");
  }

  const { data, error } = await supabaseClient
    .from("comments")
    .insert([{ author, text }]);

  if (error) {
    throw error;
  }

  return data;
};