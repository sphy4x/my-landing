import { createClient } from 'npm:@supabase/supabase-js@2.112.0';
import webpush from 'npm:web-push@3.6.7';

// Supabase Edge Function: deploy with JWT verification DISABLED so visitors
// can submit the public form. Database service key is NEVER sent to browsers.
// CORS restricts browser callers, but it is not an anti-bot security boundary.
const ALLOWED_ORIGINS = new Set(['https://technohome.gr', 'https://www.technohome.gr']);
const ALLOWED_SERVICES = new Set(['tiles', 'painting', 'plumbing', 'demolition', 'bathroom-renovation', 'home-renovation']);

const text = (value: unknown, limit: number): string =>
  typeof value === 'string' ? value.trim().slice(0, limit) : '';

function response(data: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': origin,
      'Vary': 'Origin',
      'Cache-Control': 'no-store'
    }
  });
}

async function ipDigest(secret: string, ip: string) {
  const input = new TextEncoder().encode(secret + ':' + ip);
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', input));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin') || '';
  if (!ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Max-Age': '600',
        'Vary': 'Origin'
      }
    });
  }
  if (req.method !== 'POST') return response({ ok: false }, 405, origin);
  if (!req.headers.get('content-type')?.startsWith('application/json')) return response({ ok: false }, 415, origin);
  if (Number(req.headers.get('content-length') || 0) > 5000) return response({ ok: false }, 413, origin);

  let payload: Record<string, unknown>;
  try { payload = await req.json(); } catch { return response({ ok: false }, 400, origin); }

  // Honeypot for simple bot traffic; not a substitute for a dedicated anti-bot service.
  if (payload.website) return response({ ok: true }, 200, origin);
  const name = text(payload.name, 81);
  const phone = text(payload.phone, 25);
  const service = text(payload.service, 40);
  const area = text(payload.area, 101);
  const details = text(payload.details, 701);
  const consent = payload.consent === true;

  if (!consent || name.length < 2 || name.length > 80 ||
    !/^[+0-9()\s-]{8,24}$/.test(phone) ||
    !ALLOWED_SERVICES.has(service) || area.length > 100 || details.length > 700) {
    return response({ ok: false, message: 'Ελέγξτε τα στοιχεία και τη συγκατάθεση.' }, 400, origin);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const rateSecret = Deno.env.get('TH_RATE_SECRET');
  if (!supabaseUrl || !serviceKey || !rateSecret) {
    console.error('Required TechnoHome backend configuration missing');
    return response({ ok: false, message: 'Προσωρινή τεχνική δυσκολία.' }, 503, origin);
  }

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const ip = (req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown').trim();
  const digest = await ipDigest(rateSecret, ip);
  const { data: accepted, error: limiterError } = await db.rpc('technohome_consume_rate_limit', { p_ip_digest: digest });
  if (limiterError) { console.error('Rate limit unavailable', limiterError.code); return response({ ok: false }, 503, origin); }
  if (!accepted) return response({ ok: false, message: 'Παρακαλώ δοκιμάστε ξανά αργότερα.' }, 429, origin);

  const { error: insertError } = await db.from('technohome_inquiries').insert({ name, phone, service, area, details });
  if (insertError) {
    console.error('Lead insert error', insertError.code);
    return response({ ok: false, message: 'Αποτυχία αποστολής.' }, 503, origin);
  }

  // Generic notification intentionally excludes PII from Android lock screens.
  const vapidPublic = Deno.env.get('TH_VAPID_PUBLIC_KEY');
  const vapidPrivate = Deno.env.get('TH_VAPID_PRIVATE_KEY');
  const vapidSubject = Deno.env.get('TH_VAPID_SUBJECT') || 'mailto:technohome.gr@gmail.com';
  if (vapidPublic && vapidPrivate) {
    try {
      webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);
      const { data: subscriptions } = await db.from('technohome_push_subscriptions').select('endpoint,payload').limit(30);
      for (const subscription of subscriptions || []) {
        try {
          await webpush.sendNotification(subscription.payload, JSON.stringify({ type: 'new-inquiry' }), {
            TTL: 86400
          });
        } catch (error) {
          const statusCode = Number((error as { statusCode?: number }).statusCode || 0);
          if ([404, 410].includes(statusCode)) {
            await db.from('technohome_push_subscriptions').delete().eq('endpoint', subscription.endpoint);
          } else {
            console.warn('Push failed (status)', statusCode);
          }
        }
      }
    } catch (error) { console.error('Push setup failed', error instanceof Error ? error.message : 'unknown'); }
  }

  return response({ ok: true }, 200, origin);
});
