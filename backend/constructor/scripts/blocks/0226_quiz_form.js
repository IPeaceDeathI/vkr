BLOCKS[226] = {
    name: 'Квиз - Форма',
    id_categories:[
        EnumCategories.FORMS
    ],
    settings: [
        ['html_variant', 'Квиз - Форма'],
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
            text: 'Оставьте заявку',
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
            text: 'Мы вам перезвоним',
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
            tag: 'frame_content',
            class: '.n-frame',
            title: 'Фрейм',
            entity_id: null,
            id : null,
            tags_options:[
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: '',
            class: '.n-frame-wrp',
            title: 'Фрейм контейнер',
            tags_options:[
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:900}],
                [EnumOption.WIDTH, {val:100,unit:'%'}],
                [EnumOption.OVERFLOW_Y, {val:'auto'}],
            ]
        },    


   
    ],
    html_variants: [
        [
            'Квиз - Форма',
            `
            <div class="steps">
                <div class="container">
                    <h2 class="section-h2" contenteditable></h2>
                    <div class="sub_title" contenteditable></div>   
                    <div class="form-container"><div class="n-frame-wrp">${set_iframe('n-frame')}</div> </div>
                </div>
            </div>
            `
        ],

    ]

};
