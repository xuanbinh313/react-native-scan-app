
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