begin;

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  text text not null,
  rating smallint not null default 5,
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  constraint comments_author_length_check
    check (char_length(btrim(author)) between 2 and 80),
  constraint comments_text_length_check
    check (char_length(btrim(text)) between 10 and 1000),
  constraint comments_rating_check
    check (rating between 1 and 5)
);

alter table public.comments enable row level security;

revoke all on table public.comments from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on table public.comments to anon, authenticated;
grant insert (author, text, rating) on table public.comments to anon, authenticated;

drop policy if exists comments_public_select on public.comments;
create policy comments_public_select
on public.comments
for select
to anon, authenticated
using (is_approved is true);

drop policy if exists comments_public_insert on public.comments;
create policy comments_public_insert
on public.comments
for insert
to anon, authenticated
with check (
  is_approved is false
  and char_length(btrim(author)) between 2 and 80
  and char_length(btrim(text)) between 10 and 1000
  and rating between 1 and 5
);

create index if not exists comments_approved_created_at_idx
on public.comments (created_at desc)
where is_approved is true;

comment on table public.comments is
  'Public TechnoHome reviews. New rows require manual approval before publication.';

commit;
