create table if not exists public.rate_limits (
  scope text not null check (scope in ('venom-ai', 'leads')),
  key_hash text not null check (char_length(key_hash) = 64),
  request_count integer not null default 1 check (request_count > 0),
  window_started_at timestamptz not null default now(),
  expires_at timestamptz not null,
  primary key (scope, key_hash)
);

alter table public.rate_limits enable row level security;
revoke all on table public.rate_limits from public, anon, authenticated;

create index if not exists rate_limits_expires_at_idx
  on public.rate_limits (expires_at);

create or replace function public.consume_rate_limit(
  p_key_hash text,
  p_scope text,
  p_limit integer,
  p_window_seconds integer
)
returns table (allowed boolean, remaining integer, retry_after integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_count integer;
  current_expiry timestamptz;
  current_time timestamptz := clock_timestamp();
begin
  if char_length(p_key_hash) <> 64
    or p_scope not in ('venom-ai', 'leads')
    or p_limit < 1 or p_limit > 100
    or p_window_seconds < 10 or p_window_seconds > 86400 then
    raise exception 'invalid_rate_limit_arguments';
  end if;

  insert into public.rate_limits (
    scope, key_hash, request_count, window_started_at, expires_at
  )
  values (
    p_scope, p_key_hash, 1, current_time,
    current_time + make_interval(secs => p_window_seconds)
  )
  on conflict (scope, key_hash) do update
  set request_count = case
        when public.rate_limits.expires_at <= current_time then 1
        else public.rate_limits.request_count + 1
      end,
      window_started_at = case
        when public.rate_limits.expires_at <= current_time then current_time
        else public.rate_limits.window_started_at
      end,
      expires_at = case
        when public.rate_limits.expires_at <= current_time
          then current_time + make_interval(secs => p_window_seconds)
        else public.rate_limits.expires_at
      end
  returning request_count, expires_at into current_count, current_expiry;

  delete from public.rate_limits
  where expires_at < current_time - interval '5 minutes';

  return query select
    current_count <= p_limit,
    greatest(0, p_limit - current_count),
    case when current_count <= p_limit then 0
      else greatest(1, ceil(extract(epoch from (current_expiry - current_time)))::integer)
    end;
end;
$$;

revoke all on function public.consume_rate_limit(text, text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_rate_limit(text, text, integer, integer)
  to service_role;
