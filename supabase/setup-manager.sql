-- Techno Home Manager: run in a dedicated Supabase project. NEVER run against NOXA.
-- Access: only the technician's explicitly registered Auth user may view submissions.
create extension if not exists pgcrypto;

create table if not exists public.technohome_managers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.technohome_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (char_length(phone) between 8 and 24),
  service text not null check (service in ('tiles','painting','plumbing','demolition','bathroom-renovation','home-renovation')),
  area text not null default '' check (char_length(area) <= 100),
  details text not null default '' check (char_length(details) <= 700),
  status text not null default 'new' check (status in ('new','contacted','done')),
  consent_at timestamptz not null default now()
);

create index if not exists technohome_inquiries_created_at_idx
  on public.technohome_inquiries (created_at desc);

create table if not exists public.technohome_push_subscriptions (
  endpoint text primary key,
  user_id uuid not null references public.technohome_managers(user_id) on delete cascade,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint technohome_push_endpoint_limit check (char_length(endpoint) <= 2048)
);

create table if not exists public.technohome_rate_limits (
  ip_digest text not null,
  hour_start timestamptz not null,
  hits integer not null default 0,
  primary key (ip_digest, hour_start)
);

alter table public.technohome_managers enable row level security;
alter table public.technohome_inquiries enable row level security;
alter table public.technohome_push_subscriptions enable row level security;
alter table public.technohome_rate_limits enable row level security;

revoke all on public.technohome_managers from anon, authenticated;
revoke all on public.technohome_inquiries from anon, authenticated;
revoke all on public.technohome_push_subscriptions from anon, authenticated;
revoke all on public.technohome_rate_limits from anon, authenticated;

grant select on public.technohome_managers to authenticated;
grant select on public.technohome_inquiries to authenticated;
grant update(status) on public.technohome_inquiries to authenticated;
grant select, insert, update, delete on public.technohome_push_subscriptions to authenticated;

create policy "manager can read own membership"
  on public.technohome_managers for select to authenticated
  using (user_id = (select auth.uid()));

create policy "manager can read inquiries"
  on public.technohome_inquiries for select to authenticated
  using (exists (select 1 from public.technohome_managers where user_id = (select auth.uid())));

create policy "manager can change inquiry status"
  on public.technohome_inquiries for update to authenticated
  using (exists (select 1 from public.technohome_managers where user_id = (select auth.uid())))
  with check (exists (select 1 from public.technohome_managers where user_id = (select auth.uid())));

create policy "manager can select own push subscriptions"
  on public.technohome_push_subscriptions for select to authenticated
  using (user_id = (select auth.uid()));

create policy "manager can save own push subscriptions"
  on public.technohome_push_subscriptions for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "manager can update own push subscriptions"
  on public.technohome_push_subscriptions for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "manager can remove own push subscriptions"
  on public.technohome_push_subscriptions for delete to authenticated
  using (user_id = (select auth.uid()));

-- Atomic server-only spam threshold: 8 submissions per approximate client IP per hour.
-- Function in public is NOT executable by anonymous or authenticated clients.
create or replace function public.technohome_consume_rate_limit(p_ip_digest text)
returns boolean language plpgsql security definer
set search_path = ''
as $$
declare current_hits integer;
begin
  if char_length(p_ip_digest) <> 64 then return false; end if;
  insert into public.technohome_rate_limits(ip_digest, hour_start, hits)
  values (p_ip_digest, date_trunc('hour', now()), 1)
  on conflict (ip_digest, hour_start) do update
    set hits = public.technohome_rate_limits.hits + 1
  returning hits into current_hits;
  return current_hits <= 8;
end;
$$;

revoke all on function public.technohome_consume_rate_limit(text) from public, anon, authenticated;
grant execute on function public.technohome_consume_rate_limit(text) to service_role;

-- One-time setup: create the owner's account through Supabase Auth Users UI, then:
-- insert into public.technohome_managers(user_id) values ('OWNER_AUTH_USER_UUID');
-- Disable public Auth signups for this private manager app.
-- Add data retention policy / monthly cleanup (e.g. 12 months) before production go-live.
