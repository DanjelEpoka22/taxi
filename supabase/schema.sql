-- taxi elbasan — supabase schema
-- run this once in the supabase sql editor (project -> sql editor -> new query)
-- after this runs, the site can read/write data. see README.md for the full setup steps.

-- 1. destinations: known routes with distance, duration and price
create table if not exists destinations (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name_al text not null,
  name_en text not null,
  name_it text not null,
  distance_km numeric not null,
  duration_min integer not null,
  price_eur numeric not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2. faqs
create table if not exists faqs (
  id bigint generated always as identity primary key,
  q_al text not null,
  q_en text not null,
  q_it text not null,
  a_al text not null,
  a_en text not null,
  a_it text not null,
  keywords text[] default '{}',
  created_at timestamptz not null default now()
);

-- 3. settings: single key/value store for site-wide config
create table if not exists settings (
  key text primary key,
  value jsonb not null
);

-- 4. bookings: every booking request submitted from the site
create table if not exists bookings (
  id bigint generated always as identity primary key,
  name text,
  phone text not null,
  pickup text,
  destination text,
  date date,
  time text,
  passengers integer,
  luggage text,
  message text,
  child_seat boolean default false,
  pet_friendly boolean default false,
  meet_greet boolean default false,
  recurring boolean default false,
  promo_code text,
  flight_number text,
  status text not null default 'pending', -- pending | confirmed | on_the_way | completed
  created_at timestamptz not null default now()
);

-- 5. newsletter subscribers
create table if not exists newsletter_subscribers (
  id bigint generated always as identity primary key,
  email text unique not null,
  created_at timestamptz not null default now()
);

-- row level security: the browser only ever uses the anon key, so we lock
-- down what anonymous visitors can do. the admin panel uses the service
-- role key from the server, which bypasses these policies entirely.

alter table destinations enable row level security;
alter table faqs enable row level security;
alter table settings enable row level security;
alter table bookings enable row level security;
alter table newsletter_subscribers enable row level security;

-- anyone can read destinations, faqs and settings (needed for the public site)
create policy "public read destinations" on destinations for select using (true);
create policy "public read faqs" on faqs for select using (true);
create policy "public read settings" on settings for select using (true);

-- anyone can create a booking or subscribe to the newsletter, but cannot
-- read other people's bookings or emails back
create policy "public insert bookings" on bookings for insert with check (true);
create policy "public insert newsletter" on newsletter_subscribers for insert with check (true);

-- note: there is deliberately NO public "select" policy on bookings.
-- letting anyone select rows filtered by phone would still expose every
-- other customer's name/phone/destination to anyone using the anon key
-- directly (not just through the site's UI). instead, customers look up
-- their booking status through the function below, which only returns a
-- status and a timestamp — nothing else.

create or replace function get_booking_status(phone_input text)
returns table (status text, created_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select status, created_at
  from bookings
  where phone = phone_input
    and status <> 'completed'
  order by created_at desc
  limit 1;
$$;

grant execute on function get_booking_status(text) to anon;

-- seed data: destinations
insert into destinations (slug, name_al, name_en, name_it, distance_km, duration_min, price_eur, featured) values
  ('rinas-airport', 'Aeroporti i Rinasit', 'Rinas Airport', 'Aeroporto di Rinas', 65, 55, 40, true),
  ('tirana', 'Tiranë (qendër)', 'Tirana (city center)', 'Tirana (centro)', 54, 45, 35, true),
  ('durres', 'Durrës', 'Durrës', 'Durazzo', 76, 60, 45, true),
  ('cerrik', 'Cërrik', 'Cërrik', 'Cërrik', 15, 15, 10, false),
  ('peqin', 'Peqin', 'Peqin', 'Peqin', 20, 20, 12, false),
  ('librazhd', 'Librazhd', 'Librazhd', 'Librazhd', 30, 30, 15, false),
  ('gramsh', 'Gramsh', 'Gramsh', 'Gramsh', 45, 50, 20, false),
  ('pogradec', 'Pogradec', 'Pogradec', 'Pogradec', 65, 70, 30, false),
  ('berat', 'Berat', 'Berat', 'Berat', 60, 65, 30, true)
on conflict (slug) do nothing;

-- seed data: settings
insert into settings (key, value) values
  ('live_status', '"available"'),
  ('driver_eta_min', '15'),
  ('trips_count', '7800'),
  ('happy_percent', '98'),
  ('rating', '4.9'),
  ('whatsapp_number', '"355691234567"'),
  ('phone_number', '"+355691234567"'),
  ('email', '"info@taxielbasan.al"'),
  ('google_reviews_url', '"https://www.google.com/maps"'),
  ('google_maps_embed_url', '"https://www.google.com/maps?q=Elbasan,+Albania&output=embed"'),
  ('base_currency', '"EUR"'),
  ('eur_to_all_rate', '100')
on conflict (key) do nothing;

-- seed data: faqs
insert into faqs (q_al, q_en, q_it, a_al, a_en, a_it, keywords) values
  ('Sa kushton transferta për në Aeroportin e Rinasit?', 'How much does a transfer to Rinas Airport cost?', 'Quanto costa un trasferimento all''aeroporto di Rinas?',
   'Transferta nga Elbasani në Aeroportin e Rinasit fillon nga 40€, në varësi të orës dhe numrit të pasagjerëve.', 'A transfer from Elbasan to Rinas Airport starts from 40€, depending on time and passengers.', 'Un trasferimento da Elbasan all''aeroporto di Rinas parte da 40€, a seconda di orario e passeggeri.',
   array['aeroport','airport','rinas','çmim','price']),
  ('A pranoni pagesë me kartë?', 'Do you accept card payment?', 'Accettate pagamenti con carta?',
   'Po, pranojmë cash, kartë dhe transfertë bankare.', 'Yes, we accept cash, card and bank transfer.', 'Sì, accettiamo contanti, carta e bonifico.',
   array['kartë','card','pagesë','payment'])
on conflict do nothing;
