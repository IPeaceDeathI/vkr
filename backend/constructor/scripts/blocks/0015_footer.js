BLOCKS[15] = {
    name: 'Подвал',
    id_categories: [
        EnumCategories.FOOTER,
    ],
    settings: [
        ['html_variant', 'Подвал'],
    ],
    html_variants: [
        [
            'Подвал',
            `
                <footer>
                    <div class="container">
                        <div class="row">
                            <div class="column-main-1">
                                <div class="column-footer column-footer-1">
                                    <div class="title title1" contenteditable></div>
                                    <ul class="list-footer list-footer-1">
                                    
                                    </ul>
                                </div>
                                <div class="column-footer column-footer-2">
                                    <div class="title title2" contenteditable></div>
                                    <ul class="list-footer list-footer-2">
                                    
                                    </ul>
                                </div>
                                <div class="column-footer column-footer-3">
                                    <div class="title title3" contenteditable></div>
                                    <ul class="list-footer list-footer-3">
                                    
                                    </ul>
                                </div>
                                <div class="column-footer column-footer-4">
                                    <div class="title title4" contenteditable></div>
                                    <ul class="list-footer list-footer-4">
                                    
                                    </ul>
                                </div>
                                
                            </div>
                            <div class="column-main-2">
                                <div class="title title5" contenteditable></div>
                                <a class="phone" href="tel:" contenteditable></a>
                                <a class="mail" href="mailto:" contenteditable></a>
                                <div class="soc_list">
                                 <ul></ul>
                                </div>
                            </div>

                        </div>
                        <div>
                        <a class="logo_link" contenteditable></a>
                        </div>
                    </div>
                </footer>
            `
        ],
    ],
    tags:[
        {
            tag: '',
            class: 'footer',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#2F2F38'}],
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
            class: '.row',
            title: 'Контейнер Колонки',
            tags_options: [
                // [EnumOption.WIDTH_MAX, {val:475}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.MARGIN, {val:[0, -15, 0 ,-15]}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ],
            tags_options_tablet: [
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            tag: 'ul',
            class: '.list-footer-1',
            title: 'Список столбец 1',
            li_html: `<a href="" class="${EnumLiTargeting.HREF} ${EnumLiTargeting.STRING}"></a>`,
            li_array :  [{strings : ['Команда'],hrefs : ['link']},
                        {strings : ['Отзывы'],hrefs : ['link']},
                        {strings : ['Галерея'],hrefs : ['link']},
                        {strings : ['Контакты'],hrefs : ['link']}],
            tags_options: [
                // [EnumOption.WIDTH_MAX, {val:475}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none'}],
            ],
            tags_options_mobile: [
                [EnumOption.MARGIN_TOP, {val:0}],
            ]
        },
        {
            tag: 'ul',
            class: '.list-footer-2',
            title: 'Список столбец 2',
            li_html: `<a href="" class="${EnumLiTargeting.HREF} ${EnumLiTargeting.STRING}"></a>`,
            li_array :  [{strings : ['Видео'],hrefs : ['link']},
                        {strings : ['Галерея'],hrefs : ['link']},
                        {strings : ['О проекте'],hrefs : ['link']},
                        {strings : ['Преимущества'],hrefs : ['link']}],
            tags_options: [
                // [EnumOption.WIDTH_MAX, {val:475}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none'}],
            ],
        },
        {
            tag: 'ul',
            class: '.list-footer-3',
            title: 'Список столбец 3',
            li_html: `<a href="" class="${EnumLiTargeting.HREF} ${EnumLiTargeting.STRING}"></a>`,
            li_array :  [{strings : ['О компании'],hrefs : ['link']},
                        {strings : ['Команада'],hrefs : ['link']},
                        {strings : ['Портфолио'],hrefs : ['link']},
                        {strings : ['Наши работы'],hrefs : ['link']}],
            tags_options: [
                // [EnumOption.WIDTH_MAX, {val:475}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none'}],
                [EnumOption.MARGIN_TOP, {val:10}],
            ],
        },
        {
            tag: 'ul',
            class: '.list-footer-4',
            title: 'Список столбец 4',
            li_html: `<a href="" class="${EnumLiTargeting.HREF} ${EnumLiTargeting.STRING}"></a>`,
            li_array :  [{strings : ['Наши преимущества'],hrefs : ['link']},
                        {strings : ['Отзывы'],hrefs : ['link']},
                        {strings : ['Контакты'],hrefs : ['link']},
                        {strings : ['Услуги'],hrefs : ['link']}],
            tags_options: [
                [EnumOption.PADDING, {val:0}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none'}],
            ],
        },
        {
            tag: '',
            class: '.column-footer-1',
            title: 'Колонка 1',
            tags_options: [
                [EnumOption.WIDTH, {val:25,unit: '%'}],
                [EnumOption.DISPLAY, {val:'initial',show:['none','initial']}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:50,unit: '%'}],
            ]
        },
        {
            tag: '',
            class: '.column-footer-2',
            title: 'Колонка 2',
            tags_options: [
                [EnumOption.WIDTH, {val:25,unit: '%'}],
                [EnumOption.DISPLAY, {val:'initial',show:['none','initial']}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:50,unit: '%'}],
            ]
        },
        {
            tag: '',
            class: '.column-footer-3',
            title: 'Колонка 3',
            tags_options: [
                [EnumOption.WIDTH, {val:25,unit: '%'}],
                [EnumOption.DISPLAY, {val:'initial',show:['none','initial'],hidden:['flex']}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:50,unit: '%'}],
            ]
        },
        {
            tag: '',
            class: '.column-footer-4',
            title: 'Колонка 4',
            tags_options: [
                [EnumOption.WIDTH, {val:25,unit: '%'}],
                [EnumOption.DISPLAY, {val:'initial',show:['none','initial']}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:50,unit: '%'}],
            ]
        },
        {
            tag: '',
            class: '.column-footer .title',
            title: 'Заголовок',
            tags_options: [
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_WEIGHT, {val:700}],
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.LINE_HEIGHT, {val:1.2}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:11}],
            ]
        },
        {
            tag: '',
            class: '.column-main-1',
            title: 'Колонка Контейнер 1',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.WIDTH, {val:80,unit: '%'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ]
        },
        {
            tag: '',
            class: '.column-footer-1 .list-footer',
            title: 'Колонка Контейнер 1',
            tags_options: [
                [EnumOption.PADDING, {val:0}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none'}],
            ],
        },
        {
            tag: '',
            class: '.list-footer a',
            title: 'Ссылка',
            tags_options: [
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.TEXT_DECORATION, {val:'none'}],
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.LINE_HEIGHT, {val:22,unit:'px'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:11}],
            ]
        },
        {
            tag: '',
            class: '.title',
            text: 'Бесплатный звонок по России',
            title: 'Заголовок 5 Колонка',
            tags_options: [
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.LINE_HEIGHT, {val:22,unit:'px'}],
            ],
            
        },
        {
            tag: '',
            class: '.title1',
            text:'Заголовок 1',
            title: 'Заголовок 1',
            tags_options: []
        },
        {
            tag: '',
            class: '.title2',
            text:'Заголовок 2',
            title: 'Заголовок 2',
            tags_options: []
        },
        {
            tag: '',
            class: '.title3',
            text:'Заголовок 3',
            title: 'Заголовок 3',
            tags_options: []
        },
        {
            tag: '',
            class: '.title4',
            text:'Заголовок 4',
            title: 'Заголовок 4',
            tags_options: []
        },
        {
            tag: '',
            class: '.column-main-2 .phone',
            title: 'Ссылка Номер телефона',
            text: '+7(800)200-51-47',
            tags_options: [
                [EnumOption.HREF, {val:''}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.LINE_HEIGHT, {val:22,unit:'px'}],
                [EnumOption.FONT_WEIGHT, {val:700}],
                [EnumOption.DISPLAY, {val:'block'}],
                [EnumOption.TEXT_DECORATION, {val:'none'}],
                [EnumOption.MARGIN, {val:[15,0,15,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.MARGIN, {val:[2,0,2,0]}],
            ]
        },
        {
            tag: '',
            class: '.column-main-2 .mail',
            text:'support@lpmotor.ru',
            title: 'Ссылка mail',
            tags_options: [
                [EnumOption.HREF, {val:''}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.LINE_HEIGHT, {val:22,unit:'px'}],
                [EnumOption.FONT_WEIGHT, {val:700}],
                [EnumOption.DISPLAY, {val:'block'}],
                [EnumOption.TEXT_DECORATION, {val:'none'}],
            ],
        },
        {
            tag: 'ul',
            class: '.column-main-2 .soc_list ul',
            title: 'Список социальных сетей список',
            li_html: `<a href="" class="${EnumLiTargeting.HREF}"><img class="${EnumLiTargeting.IMAGE}"/></a>`,
            li_array :  [{hrefs : ['#tg'],images : ['/resource/img/constructor_default/footer/telegram.svg']},
                        {hrefs : ['#vk'],images : ['/resource/img/constructor_default/footer/vk.svg']},
                        {hrefs : ['#ytb'],images : ['/resource/img/constructor_default/footer/ytb.svg']}],
            tags_options: [
                // [EnumOption.WIDTH_MAX, {val:475}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none'}],
                [EnumOption.DISPLAY, {val:'flex'}],
            ],
        },
        {
            class: '.column-main-2 .soc_list ul a',
            title: 'Список социальных стили',
            tags_options: [
                [EnumOption.PADDING, {val:0}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff00'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.WIDTH, {val:34}],
                [EnumOption.HEIGHT, {val:34}],
                [EnumOption.MARGIN_RIGHT, {val:10}],
                [EnumOption.BORDER_RADIUS, {val:50,unit:'%'}],
                [EnumOption.OVERFLOW, {val:'hidden'}],

            ],
        },
        {
            class: '.logo_link',
            title: 'Логотип иконка',
            tags_options: [
                [EnumOption.HREF, {val:'/'}],
                [EnumOption.BACKGROUND_SIZE, {val:'contain'}],
                [EnumOption.WIDTH, {val:70}],
                [EnumOption.HEIGHT, {val:45}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:''}],
                [EnumOption.BACKGROUND_IMAGE, {val: '/resource/img/constructor_default/footer/logo2.svg', edit_option : EnumEditOption.EDITABLE}],
            ],
        },
        
        
        
        
    ],
};