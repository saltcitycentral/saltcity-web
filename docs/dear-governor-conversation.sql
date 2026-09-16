-- Dear Governor '26 — replies + likes for the public conversation.
-- Run once in Supabase (project lhvsehwouwuvlfngjhoa): SQL Editor -> New query -> paste -> Run.
-- Safe to re-run. Existing comments are kept; they simply start with 0 likes.

-- 1. Replies and like counts on comments
alter table public.dg_comments
  add column if not exists parent_id  uuid references public.dg_comments(id) on delete cascade,
  add column if not exists like_count integer not null default 0;

create index if not exists dg_comments_parent_idx on public.dg_comments (parent_id);

-- 2. One like per visitor per comment (visitor = anonymous id stored in a cookie)
create table if not exists public.dg_likes (
  comment_id uuid not null references public.dg_comments(id) on delete cascade,
  voter      text not null check (char_length(voter) between 16 and 64),
  created_at timestamptz not null default now(),
  primary key (comment_id, voter)
);

alter table public.dg_likes enable row level security;

-- 3. Atomic like toggle, called only by the website's server
create or replace function public.dg_toggle_like(p_comment uuid, p_voter text)
returns table (is_liked boolean, likes integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted integer;
begin
  insert into dg_likes (comment_id, voter)
  values (p_comment, p_voter)
  on conflict do nothing;
  get diagnostics inserted = row_count;

  if inserted = 1 then
    update dg_comments set like_count = like_count + 1 where id = p_comment;
    is_liked := true;
  else
    delete from dg_likes where comment_id = p_comment and voter = p_voter;
    update dg_comments set like_count = greatest(like_count - 1, 0) where id = p_comment;
    is_liked := false;
  end if;

  select c.like_count into likes from dg_comments c where c.id = p_comment;
  return next;
end;
$$;

revoke all on function public.dg_toggle_like(uuid, text) from public, anon, authenticated;
grant execute on function public.dg_toggle_like(uuid, text) to service_role;

notify pgrst, 'reload schema';

-- Moderation: Table Editor -> dg_comments -> set hidden = true.
-- Hiding a comment also hides its replies on the site.
