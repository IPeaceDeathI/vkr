BLOCKS[217] = {
    name: 'Контакты',
    settings: [
        ['html_variant', 'Контакты'],
    ],
    id_categories:[
        EnumCategories.CONTACTS
    ],
    tags:[
        {
            tag: '',
            class: '.section',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.PADDING, {val:[45, 0, 45, 0]}],
            ],
        },
        {
            tag: '',
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.PADDING, {val:[0, 15, 0, 15]}],
                [EnumOption.WIDTH_MAX, {val:1170}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
            ],
        },
        {
            tag: '',
            class: '.section_h2',
            title: 'Заголовок',
            text: 'Контакты',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:46}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:35}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
        {
            tag: 'ul',
            class: '.list_info',
            title: 'Список',
            li_html: `<div class="info">
                        <a href="" class="image-wrp ${EnumLiTargeting.HREF} ${EnumLiTargeting.STRING}" ></a>
                      </div>`,
            li_array :  [
                {href:['+7(999) 999 99 99'], strings : ['+7(999) 999 99 99']},
                {href:['+7(999) 888 99 99'], strings : ['+7(999) 888 99 99']},
                {href:['mail@gm.gm'], strings : ['mail@gm.gm']},
            ],
            tags_options: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0,0,0,0],edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:18}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:16}],
            ]
        },
        {
            tag: '',
            class: '.list_info li',
            title: 'Список li',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[2, 0, 2, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:18}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:16}],
            ]
        },
        {
            tag: '',
            class: '.list_info li a',
            title: 'Ссылка',
            tags_options: [
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_DECORATION, {val:'none'}],
                
            ],
        },
        
        {
            class: '.adress_map',
            title: 'Адрес',
            text: 'Котельническая набережная, 31',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.PADDING, {val:[2, 0, 2, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:18}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:16}],
            ]
        },
        {
            class: '.column-1',
            title: 'Колонка 1',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_DIRECTION, {val:'column',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0, 15, 0, 15],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
            ],
            tags_options_tablet: [
                
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: 'ul',
            class: '.slider-list',
            title: 'Список социальных сетей',
            li_html: `<div class="column-3-block column">
                        <a href="" class="image-wrp ${EnumLiTargeting.HREF}"><img class="${EnumLiTargeting.IMAGE}" /></a>
                    </div>`,
            li_array :  [
                {href:['qq'], images : ['/resource/img/constructor_default/214/Instagram_black.svg']},
                {href:['www'], images : ['/resource/img/constructor_default/214/Telegram_black.svg']},
                {href:['ee'], images : ['/resource/img/constructor_default/214/WhatsApp_black.svg']},
                {href:['fff'], images : ['/resource/img/constructor_default/214/YouTube_black.svg']},
                
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'auto',unit:''}],
                [EnumOption.MARGIN_LEFT, {val:'auto',unit:''}],
                [EnumOption.WIDTH_MAX, {val:780}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
            ]
        },
        {
            tag: '',
            class: '.slider-list li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:50}],
                [EnumOption.PADDING, {val:5}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:50}],
            ]
        },
        {
            class: '.slider-list .image-wrp',
            title: 'Фон - стили',
            tags_options: [
                [EnumOption.WIDTH_MAX, {val:40}],
                [EnumOption.HEIGHT, {val:40}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
                [EnumOption.BORDER_RADIUS, {val:6}],
                [EnumOption.FONT_SIZE, {val:20}],
                            
            ],
        },
        {
            class: '.slider-list .image-wrp img',
            title: 'Фон - стили',
            tags_options: [
                [EnumOption.WIDTH_MAX, {val:40}],                            
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_MAX, {val:40}], 
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_MAX, {val:40}], 
            ]
        },

    ],
    html_variants: [
        [
            'Контакты',
            `
            <div class="section">
                <div class="container">
                    <div class="column-1">
                        <h2 class="section_h2" contenteditable></h2>
                        <ul class="list_info"></ul>
                        <div class="adress_map" contenteditable></div>
                        <div class="soc">
                            <ul class="slider-list"></ul>
                        </div>

                    </div>
                </div>
            </div>
            `
        ],

    ]

};
                // [EnumOption.HREF, {val:'#popup:noksquiz_1'}],