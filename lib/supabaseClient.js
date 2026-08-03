import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dubkthkfebmoakmpxumh.supabase.co';
const supabasePublishableKey = 'sb_publishable_VtHecpJHQ_z8MnAKOxjoMg_AyrZWT6q';

const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

export async function loadApprovedReviews() {
  const { data, error } = await supabase
    .from('comments')
    .select('id, author, text, rating, created_at')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(12);

  if (error) throw error;
  return data ?? [];
}

export async function submitReview({ author, text, rating }) {
  const { error } = await supabase.from('comments').insert({
    author: author.trim(),
    text: text.trim(),
    rating
  });

  if (error) throw error;
}
