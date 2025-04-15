BLOCKS[201] = {
    name: 'Портфолио',
    id_categories:[
        EnumCategories.GALLERY,
        EnumCategories.IMAGE
    ],
    settings: [
        ['html_variant', 'Портфолио'],
    ],
    tags:[
        {
            tag: '',
            class: '.portfolio',
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
            text: 'Наши работы',
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
            text: 'Примеры выполненных работ, которыми гордится наша команда',
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
            li_html: `<div class="column-4 ">
                            <div class="image-wrp"><img class="${EnumLiTargeting.IMAGE}" /></div>
                        </div>`,
            li_array :  [
                {images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
                {images : ['/resource/img/constructor_default/portfolio/img2.jpg']},
                {images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
                {images : ['/resource/img/constructor_default/portfolio/img2.jpg']},
                {images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
                {images : ['/resource/img/constructor_default/portfolio/img2.jpg']},
                {images : ['/resource/img/constructor_default/portfolio/img1.jpg']},
                {images : ['/resource/img/constructor_default/portfolio/img2.jpg']},
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
                [EnumOption.FLEX_WRAP, {val:'nowrap',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:1600,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
            ],
            tags_options_mobile: [
                [EnumOption.FLEX_WRAP, {val:'nowrap',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:800}],
            ]
        },
        {
            tag: '',
            class: '.list li',
            title: 'Слайд',
            tags_options: [
                [EnumOption.WIDTH, {val:24,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH, {val:300,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:300,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },      
        {
            tag: '',
            class: '.portfolio-wrp',
            title: 'Контейнер слайдера',
            tags_options: [
                [EnumOption.PADDING, {val:[0, 15, 0, 15]}],
                [EnumOption.WIDTH_MAX, {val:1920}],
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_RIGHT, {unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                
                [EnumOption.OVERFLOW_X, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                
            ],
            tags_options_mobile: [
                [EnumOption.OVERFLOW_X, {val:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },               

        {
            tag: '',
            class: '.column-4',
            title: 'Колонка',
            tags_options: [
                [EnumOption.PADDING, {val:10}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_DIRECTION, {val:'column',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.DISPLAY, {val:'block',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:5,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.image-wrp',
            title: 'Фото - Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_SIZE, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:448,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:448,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:200,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:100,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.image-wrp img',
            title: 'Фото',
            tags_options: [
                [EnumOption.OBJECT_FIT, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:448,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:448,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:200,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:100,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: '',
            class: '.scroll',
            title: 'Контейнер Скролл',
            tags_options: [
                [EnumOption.OVERFLOW_X, {val:'hidden',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.OVERFLOW_X, {val:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.OVERFLOW_X, {val:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        
    ],
    html_variants: [
        [
            'Портфолио',
            `
            <div class="portfolio">
                <div class="container">
                    <h2 class="section_h2" contenteditable></h2>
                    <div class="sub_title" contenteditable></div>
                </div>
                <div class="portfolio-wrp">
                    <div class="scroll">
                        <ul class="list"></ul>
                        
                    </div>
                </div>
            </div>
            `
        ],

    ]

};