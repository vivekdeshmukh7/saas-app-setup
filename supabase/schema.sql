-- Create users table extensions
create extension if not exists "uuid-ossp";

-- Create custom types
create type subscription_status as enum ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid');
create type subscription_plan as enum ('free', 'pro', 'enterprise');

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Create subscriptions table
create table subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  status subscription_status default 'incomplete',
  plan subscription_plan default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create usage_logs table
create table usage_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  action text not null,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table subscriptions enable row level security;
alter table usage_logs enable row level security;

-- Create policies
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can view own subscription"
  on subscriptions for select
  using ( auth.uid() = user_id );

create policy "Users can view own usage logs"
  on usage_logs for select
  using ( auth.uid() = user_id );

-- Create function to handle new user signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  insert into public.subscriptions (user_id, plan)
  values (new.id, 'free');
  
  return new;
end;
$$;

-- Create trigger for new user signups
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
