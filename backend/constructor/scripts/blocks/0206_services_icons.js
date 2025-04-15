BLOCKS[206] = {
    name: 'Услуги иконки',
    id_categories:[
        EnumCategories.ABOUT_THE_PROJECT
    ],
    settings: [
        ['html_variant', 'Услуги иконки'],
    ],
    tags:[
        {
            tag: '',
            class: '.pluses-2',
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
            text: 'Услуги с иконками',
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
            text: 'наши преимущества',
            title: 'Подзаголовок',
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
        },
        {
            tag: 'ul',
            class: '.slider-list',
            title: 'Список слайдов',
            li_html: `<div class="column-3-block column column-item-1">
                        <div class="image-wrp image-wrp1" ><img class="${EnumLiTargeting.IMAGE}" /></div>
                        <div class="container-text container-text-1">
                            <div class="title column-title-1 ${EnumLiTargeting.STRING}"></div>
                            <div class="text column-text-1 ${EnumLiTargeting.STRING}"></div> 
                        </div>
                    </div>`,
            li_array :  [
                {strings : ['Колонка 1 Заголовок','1Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],images : ['/resource/img/constructor_default/services_item/calculator.svg'],},
                {strings : ['Колонка 2 Заголовок','2Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],images : ['/resource/img/constructor_default/services_item/calculator.svg'],},
                {strings : ['Колонка 3 Заголовок','3Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],images : ['/resource/img/constructor_default/services_item/calculator.svg'],},
                {strings : ['Колонка 4 Заголовок','4Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],images : ['/resource/img/constructor_default/services_item/calculator.svg'],},
                {strings : ['Колонка 5 Заголовок','5Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],images : ['/resource/img/constructor_default/services_item/calculator.svg'],},
                {strings : ['Колонка 6 Заголовок','6Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],images : ['/resource/img/constructor_default/services_item/calculator.svg'],},
                
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                
            ]
        },
        {
            tag: '',
            class: '.slider-list li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:33,unit: '%'}],
                [EnumOption.PADDING, {val:15}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
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
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
                [EnumOption.BORDER_RADIUS, {val:50,unit:'%'}],
                [EnumOption.FONT_SIZE, {val:20}],
                            
            ],
        },
        {
            class: '.title',
            title: 'Заголовок - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.FONT_WEIGHT, {val:700}],
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
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                
            ],
            tags_options_mobile: [
                [EnumOption.PADDING, {val:15}],
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
    ],
    html_variants: [
        [
            'Услуги иконки',
            `
            <div class="pluses-2">
                <div class="container">
                    <h2 class="section-h2" contenteditable></h2>
                        <div class="sub_title" contenteditable></div>
                            <ul class="slider-list"></ul>
                        </div>
                </div>
            </div>
            `
        ],

    ]

};
