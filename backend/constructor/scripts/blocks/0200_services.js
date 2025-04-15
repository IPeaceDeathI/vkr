BLOCKS[200] = {
    name: 'Услуги',
    settings: [
        ['html_variant', 'Услуги'],
    ],
    id_categories:[
        EnumCategories.GALLERY,
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
            text: 'Наши услуги ремонта',
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
            text: 'Мы выполняем три основных типа ремонтных работ.',
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
            class: '.list',
            title: 'Контейнер Колонки',
            li_html: `<div class="column-3">
                            <div class="image-wrp"><img class="${EnumLiTargeting.IMAGE}" /></div>
                            <div class="title ${EnumLiTargeting.STRING}"></div>
                            <div class="price ${EnumLiTargeting.STRING}"></div>
                            <div class="text ${EnumLiTargeting.STRING}"></div>   
                            <a href="" class="btn-2 ${EnumLiTargeting.HREF}"><span class="${EnumLiTargeting.STRING}"></span></a>
                        </div>`,
            li_array :  [
                {strings:['Заголовок 1','от 4000 р/м²','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','Рассчитать стоимость'], hrefs:['#form1'],images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
                {strings:['Заголовок 2','от 4000 р/м²','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','Рассчитать стоимость'], hrefs:['#form1'],images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
                {strings:['Заголовок 3','от 4000 р/м²','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.','Рассчитать стоимость'], hrefs:['#form1'],images : ['/resource/img/constructor_default/portfolio/img1.jpg']},  
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.DISPLAY, {val:'block',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
            ],
        },
        {
            tag: '',
            class: '.list li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:33,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:300,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_BOTTOM, {val:20}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_MAX, {val:300,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },      
        {
            class: '.image-wrp',
            title: 'Услуга Фото - стили',
            tags_options: [
                [EnumOption.BACKGROUND_SIZE, {val:'cover'}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat'}],
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.WIDTH_MAX, {val:360}],
                [EnumOption.HEIGHT, {val:260}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:''}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:200}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:100}],
            ]
        },
        {
            class: '.image-wrp img',
            title: 'Фото',
            tags_options: [
                [EnumOption.OBJECT_FIT, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}], 
            ],
        },
        {
            class: '.title',
            title: 'Заголовок - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:26}],
                [EnumOption.COLOR, {val:'#1A1A1D7a'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.MARGIN, {val:[10, 0, 10, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.COLOR, {val:'#1A1A1D7a'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.COLOR, {val:'#1A1A1D7a'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
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
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
        {
            class: '.price',
            title: 'Цена - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[5, 0, 5, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.COLOR, {val:'left'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
        {
            class: '.btn-2',
            title: 'Кнопка - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.BACKGROUND_COLOR, {val:'#ff822e'}],
                [EnumOption.PADDING, {val:15}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.HEIGHT, {val:60}],
                [EnumOption.WIDTH, {val:220}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.POINTER_EVENTS, {val:'pointer-events'}],
                [EnumOption.TEXT_DECORATION, {val:'none'}],
                [EnumOption.BORDER_RADIUS, {val:3}],
                [EnumOption.MARGIN_TOP, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.PADDING, {val:5}],
                [EnumOption.HEIGHT, {val:45}], 
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
            ]
        },
        {
            tag: '',
            class: '.column-3',
            title: 'Колонка',
            tags_options: [
                [EnumOption.PADDING, {val:30}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_DIRECTION, {val:'column'}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING, {val:0}],
                [EnumOption.DISPLAY, {val:'block'}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING, {val:15}],
            ]
        },

        
        
        
        
    ],
    html_variants: [
        [
            'Услуги',
            `
            <div class="services">
                <div class="container">
                    <h2 class="section_h2" contenteditable></h2>
                    <div class="sub_title" contenteditable></div>
                    <div class="scroll">
                        <ul class="list">
                        </ul>
                    </div>
                </div>
            </div>
            `
        ],

    ]

};
                // [EnumOption.HREF, {val:'#popup:noksquiz_1'}],