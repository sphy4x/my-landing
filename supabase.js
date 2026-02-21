const supabaseUrl = "https://pqraoevxcsltsjclqjuw.supabase.co";
const supabaseKey = "sb_publishable_y162yugl4DJLSgMrrFtQ8Q_Xw8gI3Cf";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function loadComments() {
  const { data, error } = await supabaseClient
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("comments");
  container.innerHTML = "";

  data.forEach(c => {
    const div = document.createElement("div");
    div.innerHTML = `<b>${c.author}</b><p>${c.text}</p>`;
    container.appendChild(div);
  });
}

async function sendComment() {
  const author = document.getElementById("name").value.trim();
  const text = document.getElementById("comment").value.trim();

  if (!author || !text) {
    alert("Заполни поля");
    return;
  }

  await supabaseClient
    .from("comments")
    .insert([{ author, text }]);

  document.getElementById("comment").value = "";
  loadComments();
}

loadComments();