-- Comments on blog articles (same features as the Dear Governor conversation:
-- replies, likes, anonymous posting).
-- Run once in Supabase (project lhvsehwouwuvlfngjhoa): SQL Editor -> New query -> paste -> Run.
-- Safe to re-run.

create table if not exists public.blog_comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    text not null check (char_length(post_id) between 1 and 120),
  parent_id  uuid references public.blog_comments(id) on delete cascade,
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 60),
  context    text check (char_length(context) <= 80),
  body       text not null check (char_length(body) between 2 and 5000),
  like_count integer not null default 0,
  hidden     boolean not null default false
);

create index if not exists blog_comments_post_idx   on public.blog_comments (post_id, created_at desc);
create index if not exists blog_comments_parent_idx on public.blog_comments (parent_id);

-- Only the website's server reads and writes. Anonymous access is blocked.
alter table public.blog_comments enable row level security;

-- One like per visitor per comment (visitor = anonymous id stored in a cookie)
create table if not exists public.blog_likes (
  comment_id uuid not null references public.blog_comments(id) on delete cascade,
  voter      text not null check (char_length(voter) between 16 and 64),
  created_at timestamptz not null default now(),
  primary key (comment_id, voter)
);

alter table public.blog_likes enable row level security;

create or replace function public.blog_toggle_like(p_comment uuid, p_voter text)
returns table (is_liked boolean, likes integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted integer;
begin
  insert into blog_likes (comment_id, voter)
  values (p_comment, p_voter)
  on conflict do nothing;
  get diagnostics inserted = row_count;

  if inserted = 1 then
    update blog_comments set like_count = like_count + 1 where id = p_comment;
    is_liked := true;
  else
    delete from blog_likes where comment_id = p_comment and voter = p_voter;
    update blog_comments set like_count = greatest(like_count - 1, 0) where id = p_comment;
    is_liked := false;
  end if;

  select c.like_count into likes from blog_comments c where c.id = p_comment;
  return next;
end;
$$;

revoke all on function public.blog_toggle_like(uuid, text) from public, anon, authenticated;
grant execute on function public.blog_toggle_like(uuid, text) to service_role;

notify pgrst, 'reload schema';

-- Moderation: Table Editor -> blog_comments -> set hidden = true.
-- Hiding a comment also hides its replies on the site.
