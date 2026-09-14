-- Dear Governor '26 — public conversation comments.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
create table if not exists public.dg_comments (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 60),
  context     text check (char_length(context) <= 80),
  body        text not null check (char_length(body) between 3 and 2000),
  hidden      boolean not null default false
);

create index if not exists dg_comments_created_idx on public.dg_comments (created_at desc);

-- Only the server (service role) reads/writes. Anonymous access is blocked.
alter table public.dg_comments enable row level security;

-- To remove an inappropriate comment: Table Editor -> dg_comments -> set hidden = true.
