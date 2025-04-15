BLOCKS[6] = {
    name: 'Меню',
    id_categories: [
        EnumCategories.MENU,
    ],
    settings:[
        ['html_variant', 'Меню'],
    ],
    tags:[
        {
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
            ]
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-between', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:1000}],
            ],
             tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[0,16,0,16]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ],
        },
        {
            class: '.wrp-header',
            title: 'Шапка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_COLOR, {val:'#2F2F38', edit_option : EnumEditOption.EDITABLE}],
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.COLOR, {val: '#ffffff'}],
                [EnumOption.HEIGHT, { val: 70 }],
                [EnumOption.BORDER_BOTTOM, { val: [1, 'solid', '#63636A'] }],
            ]
        },
        {
            class: '.logo',
            title: 'Лого',
            tags_options: [
                [EnumOption.BACKGROUND_IMAGE, {val: '/resource/img/constructor_default/block_6/1681317086_6436dcdef0cae.png', edit_option : EnumEditOption.EDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'contain'}],
                [EnumOption.WIDTH, {val:50}],
                [EnumOption.HEIGHT, {val:40}],
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.menu',
            title: 'Меню',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: 'ul',
            class: 'ul.list-1',
            title: 'Список ссылок',
            li_html: `<div class="li-box">
                <a class="link ${EnumLiTargeting.STRING} ${EnumLiTargeting.HREF}"></a>
            </div>`,
            li_array :  [
                {hrefs: ['#1'], strings: ['О нас']},
                {hrefs: ['#2'], strings: ['Тарифы']},
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.li-box a',
            title: 'Ссылки',
            tags_options: [
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.TEXT_DECORATION, {val:'none'}],
                [EnumOption.MARGIN_LEFT, {val:'20'}],
            ]
        },
        {
            class: '.btn-create',
            title: 'Кнопка',
            tags_options: [
                [EnumOption.BORDER_RADIUS, {val:30}],
                [EnumOption.PADDING, {val:[10,15,10,15]}],
                [EnumOption.BORDER, {val:[1, 'solid', '#ffffff']}],
                [EnumOption.HREF, {val:'#9'}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.TEXT_DECORATION, {val:'none'}],
                [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:30}],
            ]
        },
        {
            class: '.btn-create span',
            title: 'Кнопка',
            text: 'Создать сайт',
            tags_options: [
            ]
        },
    ],
    html_variants:[
        [
            'Меню',
            `
                <div class="wrp">
                    <div class="wrp-header">
                        <div class="container">
                            <div class="logo"></div>
                            <div class="menu">
                                <ul class="list-1"></ul>
                                <a class="btn-create">
                                    <span contenteditable></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `
        ],
    ]
};