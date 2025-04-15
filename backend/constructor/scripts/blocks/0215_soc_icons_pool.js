BLOCKS[215] = {
    name: 'Социальные иконки - плавающие',
    id_categories:[
        EnumCategories.SOC_NETWORKS
    ],
    settings: [
        ['html_variant', 'Социальные иконки - плавающие'],
    ],
    tags:[
        {
            tag: '',
            class: '.social-icons',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff00'}],
                [EnumOption.RIGHT, {val:0}],
                [EnumOption.LEFT, {val:'auto'}],
                [EnumOption.TOP, {val:75}],
                [EnumOption.BOTTOM, {val:'auto'}],
                [EnumOption.POSITION, {val:'fixed',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.Z_INDEX, {val:10,edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },       
        {
            tag: 'ul',
            class: '.slider-list',
            title: 'Список',
            li_html: `<div class="column-3-block column">
                        <a href="" class="image-wrp ${EnumLiTargeting.HREF}" ><img class="${EnumLiTargeting.IMAGE}" /></a>
                    </div>`,
            li_array :  [
                {href:['qq'], images : ['/resource/img/constructor_default/214/Instagram.svg']},
                {href:['www'], images : ['/resource/img/constructor_default/214/Telegram.svg']},
                {href:['ee'], images : ['/resource/img/constructor_default/214/WhatsApp.svg']},
                {href:['fff'], images : ['/resource/img/constructor_default/214/YouTube.svg']},
                
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:80,edit_option: EnumEditOption.NONEDITABLE}],  
            ]
        },
        {
            tag: '',
            class: '.slider-list li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:70,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:5,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:70,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:70,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.image-wrp',
            title: 'Фон - стили',
            tags_options: [
                [EnumOption.WIDTH, {val:60}],
                [EnumOption.HEIGHT, {val:60}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                            
            ],
        },
        {
            class: '.image-wrp img',
            title: 'Иконка',
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
            'Социальные иконки - плавающие',
            `
            <div class="social-icons">
                <div>
                    <ul class="slider-list"></ul>
                </div>
            </div>
            `
        ],

    ]

};
