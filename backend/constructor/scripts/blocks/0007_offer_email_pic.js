BLOCKS[7] = {
    name: 'Форма',
    id_categories: [
        EnumCategories.COVER,
        EnumCategories.FORMS,
    ],
    settings:[
        ['html_variant', 'Hero'],
    ],
    tags:[
        {
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.HEIGHT, {val:600}],
                [EnumOption.BACKGROUND_COLOR, {val:'#2B2B38'}],
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_7/dark.jpg'}],
                [EnumOption.BACKGROUND_REPEAT,{edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.PADDING, {val:[50,0,50,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING, {val:[30,0,30,0]}],
                [EnumOption.HEIGHT, {val:'auto'}],
                [EnumOption.BACKGROUND_POSITION, {val:'unset', edit_option: EnumEditOption.NONEDITABLE}],
            ]
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
            class: '.wrp-block',
            title: 'контейнер',
            tags_options: [
                [EnumOption.WIDTH, {val:100,unit:'%'}],
                [EnumOption.HEIGHT_PERCENT, {val:100}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:320}],
            ]
        },
        {
            class: '.left',
            title: 'Форма',
            tags_options: [
                [EnumOption.WIDTH, {val:50,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: 'frame_content',
            class: '.n-frame',
            title: 'Фрейм',
            entity_id: null,
            id : null,
            tags_options:[
                [EnumOption.WIDTH, {val:"100", unit:'%'}],
                [EnumOption.HEIGHT, {val:"100", unit:'%'}],
            ]
        },
        {
            tag: '',
            class: '.n-frame-wrp',
            title: 'Фрейм контейнер',
            tags_options:[
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit:'%'}],
                [EnumOption.WIDTH, {val:100,unit:'%'}],
            ]
        },
        {
            tag: '',
            class: '.right',
            title: 'Правая колонка',
            tags_options:[
                [EnumOption.WIDTH, {val: 50, unit:"%",edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: '',
            class: '.right img',
            title: 'Правый фон ',
            tags_options:[
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/block_7/laptop.png'}],
                [EnumOption.WIDTH, {val: 100, unit:"%",edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val: 100, unit:"%",edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.OBJECT_FIT, {val: 'contain',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
    ],
    html_variants:[
        [
            'Hero',
            `
                <div class="wrp">
                    <div class="container">
                        <div class="wrp-block">
                            <div class="left">
                                <div class="n-frame-wrp">${set_iframe('n-frame')}</div>             
                            </div>
                            <div class="right"><img></div>
                        </div>
                    </div>
                </div>
            `
        ],
    ]
};