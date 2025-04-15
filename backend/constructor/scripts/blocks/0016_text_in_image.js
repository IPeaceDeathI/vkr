BLOCKS[16] = {
    name: 'О нас',
    id_categories: [
        EnumCategories.ABOUT_THE_PROJECT,
        EnumCategories.TEXT_BLOCK,
    ],
    settings:[
        ['html_variant', 'О нас'],
    ],
    html_variants:[
        [
            'О нас',
            `
                <div class="wrp-block">
                    <div class="container">
                        <h2 contenteditable></h2>
                        <div contenteditable class="text"></div>
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
                [EnumOption.BACKGROUND_COLOR, {val:'#3366сс'}],
                [EnumOption.PADDING, {val:[40,0,40,0]}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_7/1681476351_64394aff310f1.png'}],
                [EnumOption.BACKGROUND_REPEAT,{edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_modile: [
                [EnumOption.WIDTH, {val:380}],
            ],
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.FLEX_DIRECTION, {val:'column'}],
                [EnumOption.WIDTH, {val:600}],
                [EnumOption.PADDING, {val:80}],
                [EnumOption.BORDER_RADIUS, {val:[0,0,0,0]}],
                [EnumOption.OPACITY, {val:90}],
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
            class: 'h2',
            title: 'Главный заголовок',
            text: 'О нас',
            tags_options: [
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.FONT_SIZE, {val:36}],
                [EnumOption.TEXT_TRANSFORM, {val:'uppercase'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.MARGIN, {val:[0,0,32,0]}],
            ]
        },
        {
            class: '.text',
            title: 'Текст',
            text: 'An advertising agency is a service-based business that creates, plans and processes advertisements and other forms of promotion and marketing. An advertising agency generally provides an independent third-party perspective on the effort to promote and sell the client`s products or services.',
            tags_options: [
                [EnumOption.DISPLAY, {val:'block'}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.TEXT_TRANSFORM, {val:'none'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
    ],
};