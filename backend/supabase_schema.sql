-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Users Table
create table users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password text not null, -- Storing plain/hashed password (migration step: consider hashing if not already)
  role text check (role in ('founder', 'investor')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Startups Table
create table startups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  "oneLiner" text,
  description text,
  image text,
  pitch_video_url text,
  stage text,
  equity numeric,
  "fundingAmount" numeric,
  verified boolean default false,
  "isUserCreated" boolean default false,
  tags jsonb default '[]'::jsonb,
  hiring jsonb default '[]'::jsonb,
  team jsonb default '[]'::jsonb,
  stats jsonb default '{"views": 0, "swipeRightRatio": 0, "investorMatches": 0, "talentApplications": 0}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (Optional but recommended, for now we can leave open for backend access)
alter table users enable row level security;
alter table startups enable row level security;

-- Create policies to allow full access for now (since we use service key/backend)
-- OR just leave RLS enabled but with no policies if using SERVICE_ROLE_KEY.
-- If using ANON KEY, we need policies.
-- Let's create a public read policy for startups for simplicity in development
create policy "Public Startups" on startups for select using (true);
create policy "Public Insert Startups" on startups for insert with check (true);

-- Users policy
create policy "Public Users" on users for select using (true);
create policy "Public Insert Users" on users for insert with check (true);

-- STORAGE POLICIES (Required for Video Uploads)
-- 1. Allow public uploads to 'videos' bucket
create policy "Allow public uploads"
on storage.objects
for insert
to public
with check ( bucket_id = 'videos' );

-- 2. Allow public downloads/viewing from 'videos' bucket
create policy "Allow public viewing"
on storage.objects
for select
to public
using ( bucket_id = 'videos' );
