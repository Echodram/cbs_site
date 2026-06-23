-- Bucket images articles (public)
insert into storage.buckets (id, name, public)
values ('articles', 'articles', true);

-- Bucket images événements (public)
insert into storage.buckets (id, name, public)
values ('events', 'events', true);

-- Politique : upload auth, lecture publique
create policy "Upload articles auth seulement"
  on storage.objects for insert
  with check (bucket_id = 'articles'
    and auth.role() = 'authenticated');

create policy "Lecture articles publique"
  on storage.objects for select
  using (bucket_id = 'articles');

create policy "Upload events auth seulement"
  on storage.objects for insert
  with check (bucket_id = 'events'
    and auth.role() = 'authenticated');

create policy "Lecture events publique"
  on storage.objects for select
  using (bucket_id = 'events');
