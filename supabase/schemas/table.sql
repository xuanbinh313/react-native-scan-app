create table public.product(
  id text primary key,
  title text not null,
  handle text not null,
  description text not null,
  status text default 'draft',
  thumbnail text,
  weight text,
  is_giftcard boolean not null,
  discountable boolean not null,
  created_at timestamp with time zone default timezone('utc'::text,now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text,now()) not null,
  constraint product_status_check check (status in ('draft', 'proposed', 'published', 'rejected'))
)

create table public.product_category (
  id text primary key,
  name text not null,
  hanlde text not null,
  mpath text not null,
  description text not null,
  is_active boolean not null,Hey, Cortana. URIA. The Rock said. Alternatively, Cortana. Hey, Cortana. 
  is_internal boolean not null,
  rank int4 not null default 0,
  parent_id text references public.product_category(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone
)
create table public.product_option(
  id text primary key,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone,
  product_id text references public.product(id) not null
)

create table public.product_option_value(
  id text primary key,
  value text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone,
  option_id text references public.product_option(id)
)
create table public.product_variant(
  id text primary key,
  title text not null,
  sku text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone,
  product_id text references public.product(id)
)

create table public.product_category_product(
  product_id text not null references public.product(id) on delete cascade,
  product_category_id text not null references public.product_category(id) on delete cascade
)


insert into
    public.product (
        "id",
        "title",
        "handle",
        "description",
        "status",
        "thumbnail",
        "weight",
        "is_giftcard",
        "discountable"
    )
values (
        'prod_01K8HTJTFX0EE5891M0N192E4Y',
        'Medusa T-Shirt',
        't-shirt',
        'Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.',
        'published',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png',
        '400',
        false,
        true
    ),
    (
        'prod_01K8HTJTFXBMJ3S49WAKQQ54TX',
        'Medusa Sweatshirt',
        'sweatshirt',
        'Reimagine the feeling of a classic sweatshirt. With our cotton sweatshirt, everyday essentials no longer have to be ordinary.',
        'published',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png',
        '400',
        false,
        true
    ),
    (
        'prod_01K8HTJTFXE1Y118PYQ8S9C0XB',
        'Medusa Sweatpants',
        'sweatpants',
        'Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.',
        'published',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png',
        '400',
        false,
        true
    ),
    (
        'prod_01K8HTJTFXHT9HY2XGDV8X4WN1',
        'Medusa Shorts',
        'shorts',
        'Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.',
        'published',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png',
        '400',
        false,
        true
    )


insert into
    public.product_category (
        "id",
        "name",
        "handle",
        "mpath",
        "is_active",
        "rank",
        "description",
        "is_internal"
    )
values (
        'pcat_01K8HTJTEZWPAHTJ804VD6C16V',
        'Shirts',
        'shirts',
        'pcat_01K8HTJTEZWPAHTJ804VD6C16V',
        true,
        0,
        '',
        false
    ),
    (
        'pcat_01K8HTJTF0Y06MRD0D8A1BMJT8',
        'Sweatshirts',
        'sweatshirts',
        'pcat_01K8HTJTF0Y06MRD0D8A1BMJT8',
        true,
        1,
        '',
        false
    ),
    (
        'pcat_01K8HTJTF126HPZ76Y915YAN06',
        'Pants',
        'pants',
        'pcat_01K8HTJTF126HPZ76Y915YAN06',
        true,
        2,
        '',
        false
    ),
    (
        'pcat_01K8HTJTF3YBGK6C12BXJK0HWP',
        'Merch',
        'merch',
        'pcat_01K8HTJTF3YBGK6C12BXJK0HWP',
        true,
        3,
        '',
        false
    )