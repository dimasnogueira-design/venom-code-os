create extension if not exists pgcrypto;

create table if not exists public.sessions (
  id uuid primary key,
  created_at timestamptz not null default now(),
  last_activity timestamptz not null default now(),
  status text not null default 'active' check (status in ('active', 'limited', 'closed')),
  ip_hash text not null check (char_length(ip_hash) = 64)
);

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null check (char_length(content) between 1 and 5000),
  ip_hash text check (ip_hash is null or char_length(ip_hash) = 64),
  created_at timestamptz not null default now()
);

create table if not exists public.briefings (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  structured_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id bigint generated always as identity primary key,
  session_id uuid references public.sessions(id) on delete set null,
  ip_hash text not null check (char_length(ip_hash) = 64),
  model text not null,
  input_tokens integer not null default 0 check (input_tokens >= 0),
  output_tokens integer not null default 0 check (output_tokens >= 0),
  duration_ms integer not null default 0 check (duration_ms >= 0),
  status text not null default 'ok' check (status in ('ok', 'error', 'blocked')),
  created_at timestamptz not null default now()
);

alter table public.leads add column if not exists session_id uuid references public.sessions(id) on delete set null;

alter table public.sessions enable row level security;
alter table public.messages enable row level security;
alter table public.briefings enable row level security;
alter table public.usage_events enable row level security;
alter table public.leads enable row level security;

revoke all on table public.sessions, public.messages, public.briefings, public.usage_events from anon, authenticated;
revoke all on table public.leads from anon, authenticated;
revoke all on sequence public.messages_id_seq, public.usage_events_id_seq from anon, authenticated;

create index if not exists sessions_last_activity_idx on public.sessions (last_activity desc);
create index if not exists sessions_ip_hash_idx on public.sessions (ip_hash, created_at desc);
create index if not exists messages_session_created_idx on public.messages (session_id, created_at);
create index if not exists briefings_session_created_idx on public.briefings (session_id, created_at desc);
create index if not exists usage_events_ip_created_idx on public.usage_events (ip_hash, created_at desc);
