create table if not exists public.cms_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_products (
  id text primary key,
  content jsonb not null,
  published boolean not null default false,
  featured boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_articles (
  id text primary key,
  content jsonb not null,
  published boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_gallery (
  id text primary key,
  content jsonb not null,
  published boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_settings (
  id integer primary key check (id = 1),
  enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

insert into public.cms_settings (id, enabled)
values (1, false)
on conflict (id) do nothing;

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.cms_admins
    where user_id = (select auth.uid())
  );
$$;

alter table public.cms_admins enable row level security;
alter table public.cms_products enable row level security;
alter table public.cms_articles enable row level security;
alter table public.cms_gallery enable row level security;
alter table public.cms_settings enable row level security;

grant select on public.cms_admins to authenticated;
grant select on public.cms_products, public.cms_articles, public.cms_gallery to anon, authenticated;
grant insert, update, delete on public.cms_products, public.cms_articles, public.cms_gallery to authenticated;
grant select on public.cms_settings to anon, authenticated;
grant update on public.cms_settings to authenticated;

create policy "Admins can read their own approval"
on public.cms_admins for select to authenticated
using (user_id = (select auth.uid()));

create policy "Published products are public and admins can read all"
on public.cms_products for select to anon, authenticated
using (published or (select public.is_cms_admin()));
create policy "Admins can insert products"
on public.cms_products for insert to authenticated
with check ((select public.is_cms_admin()));
create policy "Admins can update products"
on public.cms_products for update to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));
create policy "Admins can delete products"
on public.cms_products for delete to authenticated
using ((select public.is_cms_admin()));

create policy "Published articles are public and admins can read all"
on public.cms_articles for select to anon, authenticated
using (published or (select public.is_cms_admin()));
create policy "Admins can insert articles"
on public.cms_articles for insert to authenticated
with check ((select public.is_cms_admin()));
create policy "Admins can update articles"
on public.cms_articles for update to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));
create policy "Admins can delete articles"
on public.cms_articles for delete to authenticated
using ((select public.is_cms_admin()));

create policy "Published gallery is public and admins can read all"
on public.cms_gallery for select to anon, authenticated
using (published or (select public.is_cms_admin()));
create policy "Admins can insert gallery items"
on public.cms_gallery for insert to authenticated
with check ((select public.is_cms_admin()));
create policy "Admins can update gallery items"
on public.cms_gallery for update to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));
create policy "Admins can delete gallery items"
on public.cms_gallery for delete to authenticated
using ((select public.is_cms_admin()));

create policy "CMS activation setting is public to read"
on public.cms_settings for select to anon, authenticated
using (true);
create policy "Admins can update CMS activation setting"
on public.cms_settings for update to authenticated
using ((select public.is_cms_admin()))
with check ((select public.is_cms_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cms-media', 'cms-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

create policy "CMS media is publicly readable"
on storage.objects for select to anon, authenticated
using (bucket_id = 'cms-media');
create policy "Admins can upload CMS media"
on storage.objects for insert to authenticated
with check (bucket_id = 'cms-media' and (select public.is_cms_admin()));
create policy "Admins can update CMS media"
on storage.objects for update to authenticated
using (bucket_id = 'cms-media' and (select public.is_cms_admin()))
with check (bucket_id = 'cms-media' and (select public.is_cms_admin()));
create policy "Admins can delete CMS media"
on storage.objects for delete to authenticated
using (bucket_id = 'cms-media' and (select public.is_cms_admin()));
