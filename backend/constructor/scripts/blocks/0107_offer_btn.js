BLOCKS[107] = {
    name: 'Оффер с кнопкой',
    id_categories: [
        EnumCategories.COVER,
        EnumCategories.BUTTON,
    ],
    settings:[
        ['html_variant', 'Оффер с кнопкой'],
    ],
    html_variants:[
        [
            'Оффер с кнопкой',
            `
                <div class="wrp">
                    <div class="wrp-shadow">
                        <div class="container">
                            <div class="left">
                                <h2 class="section-h2" contenteditable></h2>
                                <h3 contenteditable></h3>
                                <div class="btn-wrp">
                                    <div contenteditable class="btn"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        ],
    ],
    tags:[
        {
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/0107/1683044950_64513a564b05b.jpg'}],
                [EnumOption.BACKGROUND_REPEAT,{edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.wrp-shadow',
            title: 'Затемнение блока с картинкой',
            tags_options: [
                [EnumOption.HEIGHT, {val:600}],
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_COLOR, {val:'#000000c5'}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:450}],
            ],
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.WIDTH, {val:1000}],
                [EnumOption.HEIGHT_PERCENT, {val:100}],
                [EnumOption.Z_INDEX, {val:100}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING, {val:[0,16,0,16]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
        {
            class: '.left',
            title: 'Форма',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_DIRECTION, {val:'column'}],
            ],
        },
        {
            class: 'h2',
            title: 'Заголовок',
            text: 'Обезопасьте свой дом с помощью Super Safer',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:46}],
                [EnumOption.MARGIN, {val:[0,0,0,0]}],
                [EnumOption.COLOR, {val:'#ffffff'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:35}],
            ]
        },
        {
            class: 'h3',
            title: 'Описание',
            text: 'Стоимость оборудования с установкой от 9 900 руб.',
            tags_options: [
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:22}],
                [EnumOption.FONT_WEIGHT, {val:400}],
                [EnumOption.MARGIN, {val:[16,0,24,0]}],
            ],
        },
        {
            class: '.btn',
            title: 'Кнопка',
            text: 'Рассчитать стоимость',
            tags_options: [
                [EnumOption.HREF, {val:'#popup:noksform_1'}],
                [EnumOption.DISPLAY, {val:'inline-block', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_RADIUS, {val:15}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.BACKGROUND_COLOR, {val:'#55a2ba'}],
                [EnumOption.PADDING, {val:[16,40,16,40]}],
                [EnumOption.CURSOR, {val:'pointer', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
    ],
};