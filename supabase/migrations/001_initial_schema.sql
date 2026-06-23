-- Articles
create table public.articles (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  content     text,
  excerpt     text,
  image_url   text,
  category    text,
  status      text not null default 'draft'
                check (status in ('published', 'draft')),
  published_at timestamptz,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Événements
create table public.events (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  description       text,
  date              date not null,
  time              time,
  location          text,
  image_url         text,
  registration_url  text,
  created_at        timestamptz default now()
);

-- Messages de contact
create table public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  read       boolean default false,
  created_at timestamptz default now()
);

-- Paramètres du site
create table public.settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

-- Triggers updated_at automatique
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger articles_updated_at
  before update on articles
  for each row execute function update_updated_at();
