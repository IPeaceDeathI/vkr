BLOCKS[213] = {
    name: 'Новости компании',
    settings: [
        ['html_variant', 'Новости компании'],
    ],
    id_categories:[
        EnumCategories.OTHER,
        EnumCategories.IMAGE
    ],
    tags:[
        {
            tag: '',
            class: '.services',
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
            text: 'Новости компании',
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
            text: 'Расскажем наши новости',
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
            tag: 'ul',
            class: '.card-list',
            title: 'Список карточек',
            li_html: `<div class="column">
                        <div class="image-wrp"><img class="${EnumLiTargeting.IMAGE}" /></div>
                        <div class="container-text">
                            <div>
                                
                                <div class="title ${EnumLiTargeting.STRING}"></div>
                                <div class="text ${EnumLiTargeting.STRING}"></div>
                                <div class="date-card ${EnumLiTargeting.STRING}"></div>
                            </div>
                        </div>
                        
                    </div>`,
            li_array :  [
                {strings : ['Колонка 1 Заголовок','1Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','15.05.2023'],images : ['/resource/img/constructor_default/services/img1.jpg'],},
                {strings : ['Колонка 2 Заголовок','2Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','15.05.2023'],images : ['/resource/img/constructor_default/services/img1.jpg'],},
                {strings : ['Колонка 3 Заголовок','3Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','15.05.2023'],images : ['/resource/img/constructor_default/services/img1.jpg'],},
                {strings : ['Колонка 4 Заголовок','4Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','15.05.2023'],images : ['/resource/img/constructor_default/services/img1.jpg'],},
                {strings : ['Колонка 5 Заголовок','5Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','15.05.2023'],images : ['/resource/img/constructor_default/services/img1.jpg'],},
                {strings : ['Колонка 6 Заголовок','6Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','15.05.2023'],images : ['/resource/img/constructor_default/services/img1.jpg'],},
                
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0,0,0,0],edit_option: EnumEditOption.NONEDITABLE}],
                
            ]
        },
        {
            tag: '',
            class: '.card-list li',
            title: 'Колонка карточки',
            tags_options: [
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[10, 15,10,15],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_BOTTOM, {val:[1, 'solid', '#c9c3c3']}],
                
            ],
        },
        {
            class: '.container-text',
            title: 'Текстовая колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:70, unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'left'}],
                [EnumOption.POINTER_EVENTS, {val:'pointer-events'}],
                [EnumOption.PADDING, {val:[0,0,0,30]}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
                
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH, {val:70, unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.PADDING, {val:[0,0,0,30]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:70, unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0,0,0,30]}],
            ]
        },

        {
            class: '.image-wrp',
            title: 'Услуга Фото - стили',
            tags_options: [
                [EnumOption.BACKGROUND_SIZE, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:190,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:150,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                
            ],
        },
        {
            class: '.image-wrp img',
            title: 'Новости Фото - стили',
            tags_options: [
                [EnumOption.BACKGROUND_SIZE, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100, unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100, unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
            ]
        },
        {
            class: '.title',
            title: 'Заголовок - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:28}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 10, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 10, 0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 10, 0]}],
            ]
        },
        {
            class: '.text',
            title: 'Описание - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[10, 0, 20, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.COLOR, {val:'left'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ]
        },
        {
            class: '.date-card',
            title: 'Дата - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[10, 0, 10, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 0, 0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 0, 0]}],
            ]
        },
        {
            class: '.column',
            title: 'Колонка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
            ],
           
        },

        
        
        
        
    ],
    html_variants: [
        [
            'Новости компании',
            `
            <div class="services">
                <div class="container">
                    <h2 class="section_h2" contenteditable></h2>
                    <div class="sub_title" contenteditable></div>
                        <ul class="card-list"></ul>
                </div>
            </div>
            `
        ],

    ]

};
                // [EnumOption.HREF, {val:'#popup:noksquiz_1'}],