BLOCKS[17] = {
    name: 'Фото',
    id_categories: [
        EnumCategories.IMAGE,
        EnumCategories.COLUMNS,
    ],
    settings:[
        ['html_variant', 'Фото - 3 шт'],
    ],
    html_variants:[
        [
            'Фото - 1 шт',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="img"><img class="img-1"></div>
                    </div>
                </div>
            `
        ],
        [
            'Фото - 2 шт',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="img"><img class="img-1"></div>
                        <div class="img"><img class="img-2"></div>
                    </div>
                </div>
            `
        ],
        [
            'Фото - 3 шт',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="img"><img class="img-1"></div>
                        <div class="img"><img class="img-2"></div>
                        <div class="img"><img class="img-3"></div>
                    </div>
                </div>
            `
        ],
    ],
    tags:[
        {
            class: '.wrp-block',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around'}],
                [EnumOption.PADDING, {val:[32,0,32,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
            ]
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.FLEX_DIRECTION, {val:'row'}],
                [EnumOption.FLEX_WRAP, {val:'nowrap'}],
                [EnumOption.WIDTH, {val:1000}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[0,16,0,16]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ],
        },
        {
            class: '.img',
            title: 'Блок картинка',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:80}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.MARGIN, {val:[16,16,16,16]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: 'img',
            title: 'Картинка',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: '.img-1',
            title: 'Картинка 1',
            tags_options: [
                [EnumOption.IMAGE, {val:'https://thumb.tildacdn.com/tild3861-6333-4838-b237-313938643838/-/resize/560x/-/format/webp/photo_2023-03-23_18-.jpg'}],
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: '.img-2',
            title: 'Картинка 2',
            tags_options: [
                [EnumOption.IMAGE, {val:'https://thumb.tildacdn.com/tild3861-6333-4838-b237-313938643838/-/resize/560x/-/format/webp/photo_2023-03-23_18-.jpg'}],
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: '.img-3',
            title: 'Картинка 3',
            tags_options: [
                [EnumOption.IMAGE, {val:'https://thumb.tildacdn.com/tild3861-6333-4838-b237-313938643838/-/resize/560x/-/format/webp/photo_2023-03-23_18-.jpg'}],
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
    ],
};