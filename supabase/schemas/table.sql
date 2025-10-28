create table public.product (
    id text primary key,
    title text not null,
    handle text not null,
    description text not null,
    status text default 'draft',
    thumbnail text,
    weight text,
    is_giftcard boolean not null,
    discountable boolean not null,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    constraint product_status_check check (
        status in (
            'draft',
            'proposed',
            'published',
            'rejected'
        )
    )
)

create table public.product_category (
    id text primary key,
    name text not null,
    hanlde text not null,
    mpath text not null,
    description text not null,
    is_active boolean not null,
    Hey,
    Cortana.URIA.The Rock said.Alternatively,
    Cortana.Hey,
    Cortana.is_internal boolean not null,
    rank int4 not null default 0,
    parent_id text references public.product_category (id),
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    deleted_at timestamp with time zone
)
create table public.product_option (
    id text primary key,
    title text not null,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    deleted_at timestamp with time zone,
    product_id text references public.product (id) not null
)

create table public.product_option_value (
    id text primary key,
    value text not null,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    deleted_at timestamp with time zone,
    option_id text references public.product_option (id)
)
create table public.product_variant (
    id text primary key,
    title text not null,
    sku text,
    created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone ('utc'::text, now()) not null,
    deleted_at timestamp with time zone,
    product_id text references public.product (id)
)

create table public.product_category_product (
    product_id text not null references public.product (id) on delete cascade,
    product_category_id text not null references public.product_category (id) on delete cascade
)
create table if not exists public.image (
    id text not null,
    url text not null,
    rank int not null default 0,
    metadata jsonb null,
    product_id text not null references public.product (id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    deleted_at timestamptz null,
    constraint "image_pkey" primary key ("id")
);

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
insert into
    public.product_option ("id", "title", "product_id")
values (
        'opt_01K8HTJTG0S3WS2QXDMBK5A4WQ',
        'Size',
        'prod_01K8HTJTFX0EE5891M0N192E4Y'
    ),
    (
        'opt_01K8HTJTG058K9ZEH44JPRN1WC',
        'Color',
        'prod_01K8HTJTFX0EE5891M0N192E4Y'
    ),
    (
        'opt_01K8HTJTG2AFZ3TR4PDNXB1B44',
        'Size',
        'prod_01K8HTJTFXBMJ3S49WAKQQ54TX'
    ),
    (
        'opt_01K8HTJTG3NCR4HCJA6Z5V7APN',
        'Size',
        'prod_01K8HTJTFXE1Y118PYQ8S9C0XB'
    ),
    (
        'opt_01K8HTJTG43T61ZBRXVY5CGH8V',
        'Size',
        'prod_01K8HTJTFXHT9HY2XGDV8X4WN1'
    )
insert into
    public.product_option_value ("id", "value", "option_id")
values (
        'optval_01K8HTJTFZ594HWQ2VAZP54DAE',
        'S',
        'opt_01K8HTJTG0S3WS2QXDMBK5A4WQ'
    ),
    (
        'optval_01K8HTJTFZVM6KSV70SPEJAEEE',
        'M',
        'opt_01K8HTJTG0S3WS2QXDMBK5A4WQ'
    ),
    (
        'optval_01K8HTJTFZQX1HE68NWT7CD9CD',
        'L',
        'opt_01K8HTJTG0S3WS2QXDMBK5A4WQ'
    ),
    (
        'optval_01K8HTJTFZMJSHZ3ARQ03SKBHA',
        'XL',
        'opt_01K8HTJTG0S3WS2QXDMBK5A4WQ'
    ),
    (
        'optval_01K8HTJTG0CW8T82VZ2AJ7744M',
        'Black',
        'opt_01K8HTJTG058K9ZEH44JPRN1WC'
    ),
    (
        'optval_01K8HTJTG0GF023H6FQTCD0SCX',
        'White',
        'opt_01K8HTJTG058K9ZEH44JPRN1WC'
    ),
    (
        'optval_01K8HTJTG1ZX0ZG9Q395DB56CD',
        'S',
        'opt_01K8HTJTG2AFZ3TR4PDNXB1B44'
    ),
    (
        'optval_01K8HTJTG15XFT6P2T729M8C6A',
        'M',
        'opt_01K8HTJTG2AFZ3TR4PDNXB1B44'
    ),
    (
        'optval_01K8HTJTG2NPV7Y1GSVR9VKKAQ',
        'L',
        'opt_01K8HTJTG2AFZ3TR4PDNXB1B44'
    ),
    (
        'optval_01K8HTJTG25ZMNDRGVSWWC4PQ4',
        'XL',
        'opt_01K8HTJTG2AFZ3TR4PDNXB1B44'
    ),
    (
        'optval_01K8HTJTG2FRKDKCEMGX8RAHVH',
        'S',
        'opt_01K8HTJTG3NCR4HCJA6Z5V7APN'
    ),
    (
        'optval_01K8HTJTG223EESA6A3CREWAHX',
        'M',
        'opt_01K8HTJTG3NCR4HCJA6Z5V7APN'
    ),
    (
        'optval_01K8HTJTG3KM0Q0AF2FGGP3WCF',
        'L',
        'opt_01K8HTJTG3NCR4HCJA6Z5V7APN'
    ),
    (
        'optval_01K8HTJTG3B7H4RM3A1A5B1ZY8',
        'XL',
        'opt_01K8HTJTG3NCR4HCJA6Z5V7APN'
    ),
    (
        'optval_01K8HTJTG32FQ6153V45RCAMZD',
        'S',
        'opt_01K8HTJTG43T61ZBRXVY5CGH8V'
    ),
    (
        'optval_01K8HTJTG3A6QX3HNEWYMRR7B2',
        'M',
        'opt_01K8HTJTG43T61ZBRXVY5CGH8V'
    ),
    (
        'optval_01K8HTJTG3ASW5M8YJWFCSX135',
        'L',
        'opt_01K8HTJTG43T61ZBRXVY5CGH8V'
    ),
    (
        'optval_01K8HTJTG3VFY6JW51Q6848YGY',
        'XL',
        'opt_01K8HTJTG43T61ZBRXVY5CGH8V'
    )
insert into
    public.image (
        "id",
        "url",
        "rank",
        "product_id"
    )
values (
        'img_01K8HTJTG0HBTZ4DP0ZPM3R25V',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png',
        0,
        'prod_01K8HTJTFX0EE5891M0N192E4Y'
    ),
    (
        'img_01K8HTJTG0223CCQN11J9E3ZW2',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png',
        1,
        'prod_01K8HTJTFX0EE5891M0N192E4Y'
    ),
    (
        'img_01K8HTJTG1VCM4TBMJVF7PHM88',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png',
        2,
        'prod_01K8HTJTFX0EE5891M0N192E4Y'
    ),
    (
        'img_01K8HTJTG1KQ4M6BMKHQPTW3BE',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png',
        3,
        'prod_01K8HTJTFX0EE5891M0N192E4Y'
    ),
    (
        'img_01K8HTJTG2XG6ERYG97AJEEJ34',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png',
        0,
        'prod_01K8HTJTFXBMJ3S49WAKQQ54TX'
    ),
    (
        'img_01K8HTJTG2B13JPACSR21ER6B8',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png',
        1,
        'prod_01K8HTJTFXBMJ3S49WAKQQ54TX'
    ),
    (
        'img_01K8HTJTG3YNHB1W070Z1Q9B8B',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png',
        0,
        'prod_01K8HTJTFXE1Y118PYQ8S9C0XB'
    ),
    (
        'img_01K8HTJTG3B3Y6GH0RBXB9XJP6',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png',
        1,
        'prod_01K8HTJTFXE1Y118PYQ8S9C0XB'
    ),
    (
        'img_01K8HTJTG46362J8MBPC59JV8R',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png',
        0,
        'prod_01K8HTJTFXHT9HY2XGDV8X4WN1'
    ),
    (
        'img_01K8HTJTG40FJC93ZVD0NJ6ECK',
        'https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-back.png',
        1,
        'prod_01K8HTJTFXHT9HY2XGDV8X4WN1'
    )