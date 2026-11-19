-- Anonymous contact interactions on ftsicherheitstechnik.com (phone, email and
-- WhatsApp link clicks, configurator steps). No IP address, cookie or visitor
-- ID is stored, so the log works without marketing consent and can be counted
-- in client reports next to the form leads in ft_lead_anfragen.
create table if not exists public.ft_lead_interaktionen (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null check (event_type in (
    'phone_click', 'email_click', 'whatsapp_click',
    'configurator_start', 'configurator_final_step'
  )),
  page_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  from_google_ads boolean not null default false,
  device text check (device in ('mobile', 'tablet', 'desktop')),
  details jsonb not null default '{}'::jsonb
);

alter table public.ft_lead_interaktionen enable row level security;

create index if not exists ft_lead_interaktionen_created_at_idx
  on public.ft_lead_interaktionen (created_at desc);

create index if not exists ft_lead_interaktionen_event_type_idx
  on public.ft_lead_interaktionen (event_type, created_at desc);

-- Monthly totals for reports: form leads and interactions side by side.
create or replace view public.ft_lead_monatsuebersicht
with (security_invoker = true) as
select
  date_trunc('month', created_at at time zone 'Europe/Berlin')::date as monat,
  event_type as art,
  count(*) as anzahl
from public.ft_lead_interaktionen
group by 1, 2
union all
select
  date_trunc('month', created_at at time zone 'Europe/Berlin')::date,
  case when form_name = 'System-Konfigurator' then 'form_konfigurator' else 'form_anfrage' end,
  count(*)
from public.ft_lead_anfragen
group by 1, 2;

revoke all on public.ft_lead_monatsuebersicht from anon, authenticated;
