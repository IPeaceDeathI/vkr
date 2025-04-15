BLOCKS[207] = {
    name: 'Команда круглые-квадратные',
    id_categories:[
        EnumCategories.TEAM
    ],
    settings: [
        ['html_variant', 'Команда круглые-квадратные'],
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
            text: 'Наша команда',
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
            text: 'о нашей команде',
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
            tag: 'ul',
            class: '.list',
            title: 'Контейнер Колонки',
            li_html: `<div class="column-3-block">
                            <div class="image-wrp image-wrp1"><img class="${EnumLiTargeting.IMAGE}" /></div>
                            <div class="container-text container-text-1">
                                <div class="title ${EnumLiTargeting.STRING}"></div>
                                <div class="text ${EnumLiTargeting.STRING}"></div> 
                            </div>
                        </div>`,
            li_array :  [
                {strings : ['Имя 1','Design Director'],images : ['/resource/img/constructor_default/reviews/images.jpg'],},
                {strings : ['Имя 1','Design Director'],images : ['/resource/img/constructor_default/reviews/images.jpg'],},
                {strings : ['Имя 1','Design Director'],images : ['/resource/img/constructor_default/reviews/images.jpg'],},
                {strings : ['Имя 1','Design Director'],images : ['/resource/img/constructor_default/reviews/images.jpg'],},
            ],
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[0, -15, 0 ,-15],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LIST_STYLE_TYPE, {val:'none',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.column',
            title: 'Колонка',
            tags_options: [
                [EnumOption.PADDING, {val:[25, 0, 25, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING, {val:[15, 0, 15, 0]}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            class: '.image-wrp',
            title: 'Фото - стили',
            tags_options: [
                [EnumOption.WIDTH, {val:200}],
                [EnumOption.HEIGHT, {val:200}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
                [EnumOption.BORDER_RADIUS, {val:50,unit:'%'}],
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.OVERFLOW, {val:'hidden'}],
                            
            ],
        },
        {
            class: '.image-wrp img',
            title: 'Фото - стили',
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
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.FONT_WEIGHT, {val:700}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.MARGIN, {val:[0, 0, 10, 0]}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:16}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
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
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.MARGIN, {val:[0, 0, 0, 0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:14}],
            ]
        },

        {
            tag: '',
            class: '.list li',
            title: 'Колонка',
            tags_options: [
                [EnumOption.WIDTH, {val:24,unit: '%'}],
                [EnumOption.PADDING, {val:15}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
            ]
        },
    
    
   
    ],
    html_variants: [
        [
            'Команда круглые-квадратные',
            `
            <div class="pluses-2">
                <div class="container">
                    <h2 class="section-h2" contenteditable></h2>
                        <div class="sub_title" contenteditable></div>
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