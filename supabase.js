const supabaseUrl = "https://pqraoevxcsltsjclqjuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcmFvZXZ4Y3NsdHNqY2xxanV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMzU5OTksImV4cCI6MTkxNDc4NzU5OX0.test";

// Wait for supabase library to load
let supabaseClient = null;
let initPromise = null;

const initSupabase = async () => {
  if (supabaseClient) return supabaseClient;
  
  // Wait for window.supabase to be available
  let attempts = 0;
  while (!window.supabase && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }
  
  if (!window.supabase) {
    console.error('Supabase library failed to load');
    return null;
  }
  
  try {
    if (supabaseUrl && supabaseKey && supabaseUrl !== "ВСТАВЬ_URL") {
      supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
      console.log('Supabase initialized successfully');
    }
  } catch (err) {
    console.error('Error initializing Supabase:', err);
  }
  
  return supabaseClient;
};

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupabase);
} else {
  initSupabase();
}

// Функции для работы с комментариями
window.loadComments = async function() {
  const client = await initSupabase();
  if (!client) {
    console.log("Supabase not configured");
    return [];
  }

  try {
    const { data, error } = await client
      .from("comments")
      .select("id, author, text, rating, created_at")
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

window.sendComment = async function(author, text, rating = 5) {
  const client = await initSupabase();
  if (!client) {
    throw new Error("Supabase not configured");
  }

  try {
    const { data, error } = await client
      .from("comments")
      .insert([{ 
        author, 
        text,
        rating: rating || 5
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