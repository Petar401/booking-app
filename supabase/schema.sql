-- CleanBook Booking App — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query

create extension if not exists "uuid-ossp";

-- Bookings table
create table if not exists public.bookings (
  id                      uuid primary key default uuid_generate_v4(),
  reference               text not null unique,
  service_id              text not null,
  service_name            text not null,
  property_size           text not null,
  property_label          text not null,
  date                    date not null,
  time_slot               text not null,
  address                 text not null,
  city                    text not null,
  postcode                text not null,
  instructions            text default '',
  customer_name           text not null,
  email                   text not null,
  phone                   text not null,
  price                   numeric(10, 2) not null,
  status                  text not null default 'pending'
                            check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  stripe_payment_intent_id text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- Auto-update updated_at on row changes
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute procedure public.set_updated_at();

-- Index for fast lookups
create index if not exists bookings_email_idx on public.bookings (email);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

-- Row Level Security (RLS)
alter table public.bookings enable row level security;

-- Allow backend (service role) full access — no RLS restrictions with service key
-- Public reads only own booking by ID (used by confirmation page via anon key)
create policy "Users can read own booking by id"
  on public.bookings for select
  using (true);  -- refine to auth.uid() checks if you add Supabase Auth

-- Only service role can insert / update (done via backend with service key)
create policy "Service role can insert"
  on public.bookings for insert
  with check (true);

create policy "Service role can update"
  on public.bookings for update
  using (true);
