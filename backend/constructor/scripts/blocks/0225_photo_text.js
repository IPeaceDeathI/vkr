BLOCKS[225] = {
    name: 'Текст, фото и кнопка',
    id_categories:[
        EnumCategories.ABOUT_THE_PROJECT
    ],
    settings: [
        ['html_variant', 'Текст, фото и кнопка'],
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
            class: '.section-h2',
            text: 'О нашей компании',
            title: 'Заголовок',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:42}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:30}],
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
            text: 'О нашей компании мы расскажем здесь',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
            ]
        },       
        {
            tag: '',
            class: '.col-2',
            title: 'Колонка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.WIDTH, {val:50,unit: '%'}],
                [EnumOption.PADDING, {val:15}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
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
                [EnumOption.WIDTH, {val:80,unit: '%'}],
                
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.PADDING_LEFT, {val:55}],
            ]
        },

        {
            tag: '',
            class: '.row',
            title: 'Контейнер Колонки',
            tags_options: [
                // [EnumOption.WIDTH_MAX, {val:475}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[0, -15, 0 ,-15],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.column-images ',
            title: 'Список слайдов',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:'100%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[0,0,0,0],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0,0,0,0],edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.column-images .item',
            title: 'Стили слайдов',
            tags_options: [
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:49,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:220,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:220,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:5,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.OVERFLOW, {val:'hidden',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_RADIUS, {val:5,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:220,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:150,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:150,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.column-images img',
            title: 'Картинка',
            tags_options: [
                [EnumOption.OBJECT_FIT, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/portfolio/img1.jpg'}],
            ],
            tags_options_mobile: [
            ],
        },
        {
            tag: '',
            class: '.btn',
            title: 'стиль - кнопка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER, {val:[1, 'none', '#FFFFFF'],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_RADIUS, {val:70,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.COLOR, {val:'#ffffff',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FONT_SIZE, {val:16,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:45,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:200,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_COLOR, {val:'#E20C07',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[20,0,20,0],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.CURSOR, {val:'pointer',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
            ]
        },

   
    ],
    html_variants: [
        [
            'Текст, фото и кнопка',
            `
            <div class="steps">
                <div class="container">
                    <div class="row">
                        <div class="col-2">
                            <div class="column">
                                <h2 class="section-h2" contenteditable></h2>
                                <div class="sub_title" contenteditable></div>
                                <a class="btn">Заказать</a>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="column-images">
                               <img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        ],

    ]

};
