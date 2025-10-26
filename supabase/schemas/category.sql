create table public.categories (
  id bigint generated always as identity primary key,
  name text not null,
  parent_id bigint references public.categories(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default null
);
