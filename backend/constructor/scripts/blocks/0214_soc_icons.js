BLOCKS[214] = {
    name: 'Социальные иконки',
    id_categories:[
        EnumCategories.SOC_NETWORKS
    ],
    settings: [
        ['html_variant', 'Социальные иконки'],
    ],
    tags:[
        {
            tag: '',
            class: '.social-icons',
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
            class: '.section-h2',
            text: 'Мы в социальных сетях',
            title: 'Заголовок',
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
            class: '.slider-list',
            title: 'Список',
            li_html: `<div class="column-3-block column">
                        <a href="" class="image-wrp ${EnumLiTargeting.HREF}"><img class="${EnumLiTargeting.IMAGE}" /></a>
                    </div>`,
            li_array :  [
                {href:['qq'], images : ['/resource/img/constructor_default/214/Instagram.svg']},
                {href:['www'], images : ['/resource/img/constructor_default/214/Telegram.svg']},
                {href:['ee'], images : ['/resource/img/constructor_default/214/WhatsApp.svg']},
                {href:['fff'], images : ['/resource/img/constructor_default/214/YouTube.svg']},
                
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'auto',unit:''}],
                [EnumOption.MARGIN_LEFT, {val:'auto',unit:''}],
                [EnumOption.WIDTH_MAX, {val:780}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                
            ]
        },
        {
            tag: '',
            class: '.slider-list li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:70}],
                [EnumOption.PADDING, {val:5}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:70}],
            ]
        },
        {
            class: '.image-wrp',
            title: 'Фон - стили',
            tags_options: [
                [EnumOption.WIDTH_MAX, {val:170}],
                [EnumOption.HEIGHT, {val:60}],
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
            class: '.image-wrp img',
            title: 'Фон - стили',
            tags_options: [
                [EnumOption.WIDTH_MAX, {val:50}],                            
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_MAX, {val:50}], 
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_MAX, {val:50}], 
            ]
        },
    ],
    html_variants: [
        [
            'Социальные иконки',
            `
            <div class="social-icons">
                <div class="container">
                    <h2 class="section-h2" contenteditable></h2>
                        <div>
                            <ul class="slider-list"></ul>
                        </div>
                </div>
            </div>
            `
        ],

    ]

};
