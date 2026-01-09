-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- USERS TABLE (Extends auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  role text check (role in ('player', 'club', 'admin')) default 'player',
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for users
alter table public.users enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.users for select
  using ( true );

create policy "Users can update their own profile."
  on public.users for update
  using ( auth.uid() = id );

-- TRIGGER: Auto-create public user on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- PLAYERS TABLE
create table public.players (
  id uuid references public.users(id) not null primary key,
  position text,
  birth_date date,
  height numeric, -- in cm
  weight numeric, -- in kg
  dominant_foot text check (dominant_foot in ('left', 'right', 'both')),
  bio text,
  pps_score numeric default 0,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.players enable row level security;

create policy "Players profiles are viewable by everyone."
  on public.players for select
  using ( true );

create policy "Players can update their own profile."
  on public.players for update
  using ( auth.uid() = id );

create policy "Players can insert their own profile."
  on public.players for insert
  with check ( auth.uid() = id );


-- CLUBS TABLE
create table public.clubs (
  id uuid references public.users(id) not null primary key,
  name text not null,
  location text,
  description text,
  website text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.clubs enable row level security;

create policy "Clubs profiles are viewable by everyone."
  on public.clubs for select
  using ( true );

create policy "Clubs can update their own profile."
  on public.clubs for update
  using ( auth.uid() = id );

create policy "Clubs can insert their own profile."
  on public.clubs for insert
  with check ( auth.uid() = id );


-- POSTS TABLE (Social Feed)
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  content text,
  media_urls text[], -- Array of URLs
  likes_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.posts enable row level security;

create policy "Posts are viewable by everyone."
  on public.posts for select
  using ( true );

create policy "Users can insert their own posts."
  on public.posts for insert
  with check ( auth.uid() = user_id );

create policy "Users can update/delete their own posts."
  on public.posts for all
  using ( auth.uid() = user_id );


-- OPPORTUNITIES TABLE (Jobs/Trials)
create table public.opportunities (
  id uuid default uuid_generate_v4() primary key,
  club_id uuid references public.clubs(id) not null,
  title text not null,
  description text,
  type text check (type in ('trial', 'contract', 'academy', 'other')),
  location text,
  deadline date,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.opportunities enable row level security;

create policy "Opportunities are viewable by everyone."
  on public.opportunities for select
  using ( true );

create policy "Clubs can insert their own opportunities."
  on public.opportunities for insert
  with check ( auth.uid() = club_id );

create policy "Clubs can update their own opportunities."
  on public.opportunities for update
  using ( auth.uid() = club_id );


-- APPLICATIONS TABLE
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  opportunity_id uuid references public.opportunities(id) not null,
  player_id uuid references public.players(id) not null,
  status text check (status in ('pending', 'reviewed', 'accepted', 'rejected')) default 'pending',
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(opportunity_id, player_id)
);

alter table public.applications enable row level security;

create policy "Players can see their own applications."
  on public.applications for select
  using ( auth.uid() = player_id );

create policy "Clubs can see applications for their opportunities."
  on public.applications for select
  using ( exists (
    select 1 from public.opportunities
    where id = applications.opportunity_id
    and club_id = auth.uid()
  ));

create policy "Players can apply."
  on public.applications for insert
  with check ( auth.uid() = player_id );


-- STORAGE BUCKETS (Script cannot create buckets via SQL in Supabase usually, but we can set RLS for them if they exist in `storage.objects`)
-- Note: Create buckets 'avatars', 'post-media', 'cvs' in the Dashboard.

-- Storage Policies (Example for 'avatars')
-- create policy "Avatar images are publicly accessible."
--   on storage.objects for select
--   using ( bucket_id = 'avatars' );

-- create policy "Anyone can upload an avatar."
--   on storage.objects for insert
--   with check ( bucket_id = 'avatars' );
