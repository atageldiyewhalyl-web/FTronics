create table if not exists public.ft_lead_anfragen (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  customer_type text,
  message text not null,
  form_name text not null,
  page_url text,
  configurator jsonb not null default '{}'::jsonb,
  notify_emails text,
  status text not null default 'new',
  email_sent_at timestamptz,
  email_error text
);

alter table public.ft_lead_anfragen enable row level security;

create index if not exists ft_lead_anfragen_created_at_idx
  on public.ft_lead_anfragen (created_at desc);

create index if not exists ft_lead_anfragen_email_idx
  on public.ft_lead_anfragen (email);

create index if not exists ft_lead_anfragen_subject_idx
  on public.ft_lead_anfragen (subject);
