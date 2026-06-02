create extension if not exists pgcrypto;

create table if not exists public.grant_applications (
  id uuid primary key default gen_random_uuid(),
  reference_number text unique,
  owner_director_name text not null,
  email text not null,
  phone text not null,
  church_membership_confirmed boolean not null default false,
  church_group_or_department text,
  business_name text not null,
  business_registration_number text not null unique,
  business_address text not null,
  business_sector text not null,
  date_business_started date not null,
  business_description text not null,
  current_estimated_monthly_revenue text not null,
  projected_monthly_revenue_after_financing text not null,
  intended_use_of_funds text not null,
  revenue_growth_explanation text not null,
  declaration_accepted boolean not null default false,
  status text not null default 'submitted',
  internal_notes text,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint grant_applications_status_check check (
    status in (
      'submitted',
      'under_review',
      'shortlisted',
      'rejected',
      'approved',
      'awarded'
    )
  )
);

create table if not exists public.grant_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.grant_applications(id) on delete cascade,
  document_type text not null,
  original_filename text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint,
  uploaded_at timestamptz not null default now()
);

create index if not exists grant_applications_reference_number_idx
  on public.grant_applications(reference_number);

create index if not exists grant_applications_business_registration_number_idx
  on public.grant_applications(business_registration_number);

create index if not exists grant_applications_status_idx
  on public.grant_applications(status);

create index if not exists grant_documents_application_id_idx
  on public.grant_documents(application_id);

alter table public.grant_applications enable row level security;
alter table public.grant_documents enable row level security;

drop policy if exists "No public grant application access" on public.grant_applications;
drop policy if exists "No public grant document access" on public.grant_documents;

create policy "No public grant application access"
  on public.grant_applications
  for all
  using (false)
  with check (false);

create policy "No public grant document access"
  on public.grant_documents
  for all
  using (false)
  with check (false);

comment on table public.grant_applications is
  'Ebenezer Grant applications. Accessed by the Next.js server with the Supabase service role key.';

comment on table public.grant_documents is
  'Private document metadata for Ebenezer Grant applications. Files are stored in a private Supabase Storage bucket.';
