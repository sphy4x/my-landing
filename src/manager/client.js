import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_TH_MANAGER_SUPABASE_URL || 'https://ilbvnkuubwmqpahtjiio.supabase.co';
// Publishable keys are designed to be public; RLS controls all client access.
export const supabaseKey = import.meta.env.VITE_TH_MANAGER_SUPABASE_KEY || 'sb_publishable_tXduYMXym42xnUmfft0IKw_kdxvpUEW';
export const vapidPublicKey = import.meta.env.VITE_TH_MANAGER_VAPID_PUBLIC_KEY || '';
export const isConfigured = Boolean(supabaseUrl && supabaseKey);

export const managerDb = isConfigured
  ? createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: 'implicit' }
  })
  : null;

export function clientPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith('30')) return digits;
  if (digits.startsWith('0')) return '30' + digits.slice(1);
  if (digits.length === 10) return '30' + digits;
  return digits;
}

export function humanService(value) {
  return ({
    tiles: 'Πλακάκια',
    painting: 'Βάψιμο',
    plumbing: 'Υδραυλικά',
    demolition: 'Αποξηλώσεις',
    'bathroom-renovation': 'Ανακαίνιση Μπάνιου',
    'home-renovation': 'Ανακαίνιση Σπιτιού'
  })[value] || value || 'Άλλη εργασία';
}

function base64ToUint8Array(value) {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), (letter) => letter.charCodeAt(0));
}

export async function enableManagerPush(userId) {
  if (!vapidPublicKey) throw new Error('Δεν έχουν ρυθμιστεί ακόμη οι ειδοποιήσεις.');
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Η συσκευή ή ο browser δεν υποστηρίζει push.');
  }
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Χρειάζεται άδεια ειδοποιήσεων από τον browser.');
  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(vapidPublicKey)
    });
  }
  const { error } = await managerDb.from('technohome_push_subscriptions').upsert({
    endpoint: subscription.endpoint,
    user_id: userId,
    payload: subscription.toJSON()
  }, { onConflict: 'endpoint' });
  if (error) throw error;
}
