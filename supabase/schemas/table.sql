create table public.product (
    id bigint generated always as identity primary key,
    title text not null,
    description text not null,
    status text default 'draft',
    thumbnail text,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null
)

create table public.product_category (
    id bigint generated always as identity primary key,
    name text not null,
    description text not null,
    parent_id bigint references public.product_category (id),
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    deleted_at timestamp with time zone
)

create table public.product_option (
    id bigint generated always as identity primary key,
    title text not null,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    deleted_at timestamp with time zone,
    product_id bigint references public.product (id) not null
)

create table public.product_option_value (
    id bigint generated always as identity primary key,
    value text not null,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    deleted_at timestamp with time zone,
    option_id bigint references public.product_option (id)
)
create table public.product_variant (
    id bigint generated always as identity primary key,
    title text not null,
    sku text,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    deleted_at timestamp with time zone,
    product_id bigint references public.product (id)
)

insert into
    public.product (
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
        'Medusa Shorts',
        'shorts',
        'Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.',
        'published',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png',
        '400',
        false,
        true
    )