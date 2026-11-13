create type public.app_role as enum ('student', 'teacher');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  project_topic text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  milestone_key text not null,
  status text not null default 'not_started' check (status in ('not_started','in_progress','done')),
  updated_at timestamptz not null default now(),
  unique (user_id, milestone_key)
);
grant select, insert, update, delete on public.milestones to authenticated;
grant all on public.milestones to service_role;

create table public.app_settings (
  key text primary key,
  value text not null
);
grant all on public.app_settings to service_role;
insert into public.app_settings (key, value) values ('teacher_code', '370072');

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role text := coalesce(new.raw_user_meta_data->>'role', 'student');
  provided_code text := coalesce(new.raw_user_meta_data->>'teacher_code', '');
  assigned_role public.app_role;
begin
  if requested_role = 'teacher' and exists (
    select 1 from public.app_settings where key = 'teacher_code' and value = provided_code
  ) then
    assigned_role := 'teacher';
  else
    assigned_role := 'student';
  end if;
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  insert into public.user_roles (user_id, role) values (new.id, assigned_role);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.milestones enable row level security;

create policy "Users read own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Teachers read all profiles" on public.profiles for select to authenticated using (public.has_role(auth.uid(), 'teacher'));
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = id);

create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create policy "Users read own milestones" on public.milestones for select to authenticated using (auth.uid() = user_id);
create policy "Teachers read all milestones" on public.milestones for select to authenticated using (public.has_role(auth.uid(), 'teacher'));
create policy "Users insert own milestones" on public.milestones for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own milestones" on public.milestones for update to authenticated using (auth.uid() = user_id);