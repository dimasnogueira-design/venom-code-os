-- Apply only to a dedicated private Commander staging Supabase project.
-- Never apply to the VENOM commercial CRM project.
create table if not exists public.commander_engineer_results (
  job_id uuid primary key,
  source_message_id text not null,
  mission_digest text not null check (mission_digest ~ '^[a-fA-F0-9]{64}$'),
  result jsonb not null check (
    result->>'jobId' = job_id::text
    and result->>'agent' = 'VENOM_AI_ENGINEER'
    and result->>'mode' = 'OFFLINE_PLAN'
    and result->>'status' = 'PLAN_ONLY_NOT_EXECUTED'
    and not (result ? 'mission')
  ),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

alter table public.commander_engineer_results enable row level security;
revoke all on public.commander_engineer_results from anon, authenticated;
grant all on public.commander_engineer_results to service_role;

create index if not exists commander_engineer_results_expires_at_idx
  on public.commander_engineer_results (expires_at);
