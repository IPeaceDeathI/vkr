BLOCKS[210] = {
    name: 'Шапка',
    id_categories: [
        EnumCategories.MENU,
    ],
    settings:[
        ['html_variant', 'Шапка'],
    ],
    tags:[
        {
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#2F2F38', edit_option : EnumEditOption.EDITABLE}],
                [EnumOption.HEIGHT, { val: 70 }],
                [EnumOption.BORDER_BOTTOM, { val: [1, 'solid', '#63636A'] }],
                [EnumOption.PADDING, {val:[15,0,15,0],edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-between'}],
                [EnumOption.WIDTH, {val:1170}],
                [EnumOption.MARGIN, {val:[0,0,0,0],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
             tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[0,15,0,15]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ],
        },
        {
            class: '.logo',
            title: 'Лого',
            tags_options: [
                [EnumOption.BACKGROUND_IMAGE, {val: '/resource/img/constructor_default/block_6/1681317086_6436dcdef0cae.png', edit_option : EnumEditOption.EDITABLE}],
                [EnumOption.BACKGROUND_REPEAT],
                [EnumOption.BACKGROUND_SIZE, {val:'contain'}],
                [EnumOption.WIDTH, {val:50}],
                [EnumOption.HEIGHT, {val:40}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:''}],
            ]
        },
        {
            tag: 'ul',
            class: '.list1',
            title: 'Список ссылок',
            li_html: `
                        <a class="title ${EnumLiTargeting.STRING} ${EnumLiTargeting.HREF}"></a>
                    `,
            li_array :  [
                {strings : ['Link1'],href:['#']},
                {strings : ['Link2'],href:['#']},
                {strings : ['Link3'],href:['#']},
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
                
            ],
            tags_options_mobile: [
                [EnumOption.DISPLAY, {val:'block'}],
            ],
        },
        {
            tag: '',
            class: '.list1.open',
            title: 'Список ссылок открыт',
            tags_options: [
            ],
            tags_options_mobile: [
                [EnumOption.DISPLAY, {val:'block'}],
            ],
        },
        {
            class: '.list1 a',
            title: 'Ссылки Стили',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,15,0,15]}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.TEXT_DECORATION, {val:'none'}],
                [EnumOption.FONT_SIZE, {val:13}],
                [EnumOption.COLOR, {val: '#ffffff'}],
            ],
            tags_options_mobile: [
                [EnumOption.MARGIN, {val:[0,5,0,3]}],
            ],
        },
        {
            class: '.icon',
            title: 'Мобильное меню кнопка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'none'}],
                [EnumOption.COLOR, {val: '#ffffff'}],
                [EnumOption.FONT_SIZE, {val:25}],
            ],
            tags_options_mobile: [
                [EnumOption.DISPLAY, {val:'block'}],
            ],
        },
        {
            class: '.wrp-menu-src',
            title: 'Мобильное меню скрипт',
            tags_options: [
                [EnumOption.DISPLAY, {val:'none', edit_option : EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.DISPLAY, {val:'none', edit_option : EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.wrp-menu',
            title: 'Мобильное меню Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'none', edit_option : EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.DISPLAY, {val:'none', edit_option : EnumEditOption.NONEDITABLE}],
            ],
        },
        
    ],
    html_variants:[
        [
            'Шапка',
            `
                <header class="wrp">
                    <div class="nav">
                        <div class="container">
                            <div class="logo"></div>
                            <div class="icon">
                                <span class="toggle">☰</span>
                            </div>
                            <div class="wrp-list"><ul class="list1"></ul></div>
                            
                        </div>
                    </div>
                    <div class="wrp-menu-src">
                    <script>
                    jQuery('.toggle').on('click',function () {
                        "use strict";
                        jQuery('nav > ul').slideToggle();
                    });
                    
                    </script>
                    </div>
                </header>
            `
        ],
    ]
};