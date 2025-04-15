BLOCKS[2] = {
    name: 'Заголовок с фоном',
    id_categories: [
        EnumCategories.COVER,
        EnumCategories.HEADING,
    ],
    settings:[
        ['html_variant', 'Заголовок с фоном'],
    ],
    html_variants:[
        [
            'Заголовок с фоном',
            `
                <div class="wrp-block">
                    <div class="conteiner">
                        <h1 contenteditable></h1>
                    </div>
                </div>
            `
        ],
    ],
    tags:[
        {
            tag: '',
            class: '.wrp-block',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/2/posledovatelnost-rem.jpeg'}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                
            ],
            tags_options_mobile: [
                
            ]
        },
        {
            tag: '',
            class: '.conteiner',
            title: 'Затемнение',
            tags_options: [
                [EnumOption.PADDING, {val:[0,10,0,10]}],
                [EnumOption.HEIGHT, {val:700}],
                [EnumOption.BACKGROUND_COLOR, {val:'#000000cc'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
            ],
            tags_options_mobile:[
                [EnumOption.HEIGHT, {val:400}],
            ]
        },
        {
            tag: '',
            class: 'h1',
            title: 'Заголовок',
            text: 'КАК НЕ ОШИБИТЬСЯ ПРИ ВЫБОРЕ ФИРМЫ ПО РЕМОНТУ КВАРТИРЫ',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.FONT_SIZE, {val:40}],
                [EnumOption.MARGIN, {val:0}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:30}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:25}],
            ]
        },
    ],
};