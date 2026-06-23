-- Activer RLS sur toutes les tables
alter table articles  enable row level security;
alter table events    enable row level security;
alter table messages  enable row level security;
alter table settings  enable row level security;

-- Articles : lecture publique si published, écriture auth seulement
create policy "Articles publics lisibles"
  on articles for select
  using (status = 'published');

create policy "Admin peut tout faire sur articles"
  on articles for all
  using (auth.role() = 'authenticated');

-- Événements : lecture publique totale
create policy "Événements publics lisibles"
  on events for select using (true);

create policy "Admin peut tout faire sur événements"
  on events for all
  using (auth.role() = 'authenticated');

-- Messages : insert public, lecture/modif auth seulement
create policy "Tout le monde peut envoyer un message"
  on messages for insert with check (true);

create policy "Admin peut lire et gérer les messages"
  on messages for all
  using (auth.role() = 'authenticated');

-- Settings : lecture publique, écriture auth seulement
create policy "Settings lisibles publiquement"
  on settings for select using (true);

create policy "Admin peut modifier les settings"
  on settings for all
  using (auth.role() = 'authenticated');
