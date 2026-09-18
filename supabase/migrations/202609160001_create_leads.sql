create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  company text check (company is null or char_length(company) <= 160),
  email text not null check (char_length(email) <= 180),
  whatsapp text not null check (char_length(whatsapp) <= 40),
  interest text not null check (char_length(interest) <= 100),
  message text not null check (char_length(message) between 2 and 4000),
  source text not null default 'landing-page' check (char_length(source) <= 60),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

revoke all on public.leads from anon, authenticated;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

