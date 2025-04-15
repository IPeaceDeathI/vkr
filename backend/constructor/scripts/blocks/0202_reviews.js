BLOCKS[202] = {
    name: 'Отзывы',
    settings: [
        ['html_variant', 'Отзывы'],
    ],
    id_categories:[
        EnumCategories.REVIEWS
    ],
    tags:[
        {
            tag: '',
            class: '.reviews',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ededed'}],
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
            text: 'Заголовок',
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
            text: 'Подзаголовок',
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
            class: '.review_wrp',
            title: 'Контейнер Колонки',
            li_html: `<div class="column">
                        <div class="image-wrp"><img class="${EnumLiTargeting.IMAGE}"/></div>
                            <div class="container-text container-text-1">
                                <div class="rw"></div>
                                <div class="title ${EnumLiTargeting.STRING}"></div>
                                <div class="text ${EnumLiTargeting.STRING}"></div> 
                            </div>
                        </div>`,
            li_array :  [
                {images : ['/resource/img/constructor_default/reviews/images.jpg'],strings : ['Иванов Иван','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {images : ['/resource/img/constructor_default/reviews/images.jpg'],strings : ['Иванов Иван','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {images : ['/resource/img/constructor_default/reviews/images.jpg'],strings : ['Иванов Иван','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {images : ['/resource/img/constructor_default/reviews/images.jpg'],strings : ['Иванов Иван','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {images : ['/resource/img/constructor_default/reviews/images.jpg'],strings : ['Иванов Иван','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
                {images : ['/resource/img/constructor_default/reviews/images.jpg'],strings : ['Иванов Иван','Сметчик выезжает на замеры, расчитывает работу и материалы. В этот же день мы обговариваем сроки выполнения работ.'],},
            
            ],
        },       
        {
            tag: '',
            class: '.review_wrp li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.PADDING, {val:[25, 0, 25, 0]}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING, {val:[15, 0, 15, 0]}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            class: '.image-wrp',
            title: 'Услуга Фото - стили',
            tags_options: [
                [EnumOption.BACKGROUND_SIZE, {val:'contain'}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat'}],
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.WIDTH_MAX, {val:100}],
                [EnumOption.HEIGHT, {val:100}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:''}],
                [EnumOption.MARGIN_RIGHT, {val:30}],
                
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
            title: 'Фото - стили',
            tags_options: [
                [EnumOption.BACKGROUND_SIZE, {val:'contain'}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat'}],
                [EnumOption.WIDTH_MAX, {val:100,unit: '%'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:200}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:100}],
            ]
        },
        {
            class: '.title',
            title: 'Заголовок - стили',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.MARGIN, {val:[0, 0, 10, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#1A1A1D7a'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.COLOR, {val:'#1A1A1D7a'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ]
        },
        {
            class: '.container-text',
            title: 'Текстовый блок - стили',
            tags_options: [
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.PADDING, {val:25}],
                [EnumOption.WIDTH_MAX, {val:635}],
                [EnumOption.WIDTH, {val:80,unit: '%'}],
                
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:75,unit: '%'}],
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
        {
            class: '.rw',
            title: 'Иконка-стрелка',
            tags_options: [
                [EnumOption.POSITION, {val:'absolute',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TOP, {val:30,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:-10,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.OPACITY, {val:100,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:25,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:25,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_IMAGE, {val: '/resource/img/constructor_default/reviews/icon-bg.png', edit_option : EnumEditOption.EDITABLE}],
                
            ],
            tags_options_mobile: [
            ]
        },
        {
            class: '.column',
            title: 'Колонка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}]
            ],
        },
   
    ],
    html_variants: [
        [
            'Отзывы',
            `
            <div class="reviews">
                <div class="container">
                    <h2 class="section_h2" contenteditable></h2>
                        <div class="sub_title" contenteditable></div>
                        <ul class="review_wrp"></ul>
                </div>
            </div>
            `
        ],

    ]

};