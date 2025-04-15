BLOCKS[209] = {
    name: 'О компании Цифры',
    id_categories:[
        EnumCategories.STAGES,
        EnumCategories.ABOUT_THE_PROJECT,
    ],
    settings: [
        ['html_variant', 'О компании Цифры'],
    ],
    tags:[
        {
            tag: '',
            class: '.steps',
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
            text: 'О компании',
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
            tag: '',
            class: '.sub_title',
            title: 'Подзаголовок',
            text: 'О компании в цифрах',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:30}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:26}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
            ]
        }, 
        {
            tag: '',
            class: '.wrp-steps',
            title: 'Этапы Контейнер',
            tags_options: [
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:50,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_MAX, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: 'ul',
            class: '.steps-wrp',
            title: 'Items контейнер',
            li_html: `<div class="column">
                            <div class="number ${EnumLiTargeting.STRING}"></div>
                            <div class="container-text container-text-1">
                                <div class="title ${EnumLiTargeting.STRING}"></div>
                                
                            </div>
                        </div>`,
            li_array :  [
                {strings : ['1000','Выполненных заказов'],},
                {strings : ['1000','Клиентов'],},
                {strings : ['1000','Заявок'],},
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.MARGIN, {val:[0, -15, 0 ,-15]}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_MAX, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },      
        {
            tag: '',
            class: '.number',
            title: 'Текст верхний',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:52}],
                [EnumOption.BORDER_BOTTOM, {val:[1, 'solid', '#aba8a7']}],
            ],
            tags_options_tablet: [
    
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:32}],
            ]
        },
        {
            class: '.title',
            title: 'Заголовок - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.MARGIN, {val:[0, 0, 10, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ]
        },
        {
            class: '.container-text',
            title: 'Текстовый блок - стили',
            tags_options: [
                [EnumOption.POSITION, {val:'relative'}],
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.PADDING, {val:15}],
                
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.PADDING_LEFT, {val:55}],
            ]
        },
        {
            class: '.text',
            title: 'Описание - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 0, 0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
            ]
        },

        {
            tag: '',
            class: '.steps-wrp li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:33,unit: '%'}],
                [EnumOption.PADDING, {val:15}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],

            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
            ]
        },
        {
            tag: '',
            class: '.wrp-steps',
            title: 'Этапы контейнер',
            tags_options: [
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.line',
            title: 'Линия',
            tags_options: [
                [EnumOption.POSITION, {val:'absolute',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:78,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_BOTTOM, {val:[3, 'solid', '#ff822e'],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.Z_INDEX, {val:1,edit_option: EnumEditOption.NONEDITABLE}],  
                [EnumOption.TOP, {val:37,edit_option: EnumEditOption.NONEDITABLE}],  
                [EnumOption.LEFT, {val:42,edit_option: EnumEditOption.NONEDITABLE}],  
            ],
            tags_options_tablet: [
                [EnumOption.LEFT, {val:30,edit_option: EnumEditOption.NONEDITABLE}],  
                [EnumOption.WIDTH, {val:76,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.BORDER_BOTTOM, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_RIGHT, {val:[3, 'solid', '#ff822e'],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:2,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:77,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:40,edit_option: EnumEditOption.NONEDITABLE}],  
            ]
        },
        
   
    ],
    html_variants: [
        [
            'О компании Цифры',
            `
            <div class="steps">
                <div class="container">
                        <div class="section_h2" contenteditable></div>
                        <div class="sub_title" contenteditable></div>
                            <div class="wrp-steps">
                                <ul class="steps-wrp"></ul>
                            </div>
                        </div>
                </div>
            </div>
            `
        ],

    ]

};
