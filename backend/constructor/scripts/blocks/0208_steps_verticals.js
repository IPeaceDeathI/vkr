BLOCKS[208] = {
    name: 'Этапы Вертикальный',
    id_categories:[
        EnumCategories.STAGES
    ],
    settings: [
        ['html_variant', 'Этапы Вертикальный'],
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
            text: 'Из каких этапов состоит ремонт?',
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
            title: 'Этапы контейнер',
            li_html: `<div class="column">
                            <div class="image-wrp ${EnumLiTargeting.STRING}"></div>
                            <div class="container-text container-text-1">
                                <div class="title ${EnumLiTargeting.STRING}"></div>
                                <div class="text ${EnumLiTargeting.STRING}"></div> 
                            </div>
                        </div>`,
            li_array :  [
                {strings : ['1','Заявка','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {strings : ['2','Расчет стоимости','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {strings : ['3','Строительство','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {strings : ['4','Сдача проекта','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
            ],
            tags_options: [
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_MAX, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.sub_title',
            title: 'Подзаголовок',
            text: 'Из каких этапов состоит ремонт подзаголовок',
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
            class: '.column',
            title: 'Колонка',
            tags_options: [
                [EnumOption.PADDING, {val:0}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING, {val:[15, 0, 15, 0]}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            class: '.image-wrp',
            title: 'Фон - стили',
            tags_options: [
                [EnumOption.WIDTH, {val:50}],
                [EnumOption.HEIGHT, {val:50}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.MARGIN_RIGHT, {val:10}],
                [EnumOption.BORDER_RADIUS, {val:50,unit:'%'}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.BACKGROUND_COLOR, {val:'#ff822e',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER, {val:[3, 'solid', '#ffffff'],edit_option: EnumEditOption.NONEDITABLE}], 
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}], 
                [EnumOption.Z_INDEX, {val:2,edit_option: EnumEditOption.NONEDITABLE}],                
            ],
        },

        {
            class: '.title',
            title: 'Заголовок - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.FONT_WEIGHT, {val:700}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
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
                [EnumOption.PADDING, {val:[0, 0, 15, 60]}],
                [EnumOption.WIDTH, {val:100,unit: '%'}],
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
            class: '.line',
            title: 'Линия',
            tags_options: [
                [EnumOption.POSITION, {val:'absolute',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:76,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:2}],
                [EnumOption.BORDER_BOTTOM, {val:[3, 'solid', '#ff822e'],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.Z_INDEX, {val:1,edit_option: EnumEditOption.NONEDITABLE}],  
                [EnumOption.TOP, {val:37,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:25,edit_option: EnumEditOption.NONEDITABLE}],  
                [EnumOption.BACKGROUND_COLOR, {val:'#ff822e'}],
            ],
            tags_options_tablet: [
                [EnumOption.LEFT, {val:25,edit_option: EnumEditOption.NONEDITABLE}],  
            ],
            tags_options_mobile: [
                [EnumOption.BORDER_BOTTOM, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_RIGHT, {val:[3, 'solid', '#ff822e'],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:2,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:77,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:23,edit_option: EnumEditOption.NONEDITABLE}],  
            ]
        },
    ],
    html_variants: [
        [
            'Этапы Вертикальный',
            `
            <div class="steps">
                <div class="container">
                    <div class="section_h2" contenteditable></div>
                        <div class="sub_title" contenteditable></div>
                        <div class="wrp-steps">
                            <div class="line"></div>
                            <ul class="steps-wrp"></ul>
                        </div>
                        
                    </div>
                </div>
            </div>
            `
        ],

    ]

};
