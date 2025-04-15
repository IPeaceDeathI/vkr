BLOCKS[101] = {
    name: 'Текст - Картинка',
    id_categories: [
        EnumCategories.IMAGE,
        EnumCategories.COLUMNS,
    ],
    settings:[
        ['html_variant', 'Текст - Картинка'],
    ],
    html_variants:[
        [
            'Текст - Картинка',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="img-1"><img/></div>
                        <div class="wrp-content padding-right">
                            <div class="content">
                                <h2 contenteditable></h2>
                                <div class="text"></div>
                            </div>
                        </div>
                        <div class="img"></div>
                    </div>
                </div>
            `
        ],
    ],
    tags:[
        {
            class: '.wrp-block',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around'}],
                [EnumOption.PADDING, {val:[0,0,0,0], edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT_MIN, {val:500,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.POSITION, {val:'relative', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-between',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:1000,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0,16,0,16],edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.wrp-content',
            title: 'Блок текст',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:50,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[32,0,32,0]}],
                [EnumOption.MARGIN_TOP, {val:300, edit_option: EnumEditOption.NONEDITABLE}],

            ]
        },
        {
            class: '.img',
            title: 'Блок картинка',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:50,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: '.img-1',
            title: 'Картинка контейнер',
            tags_options: [
	            [EnumOption.POSITION, {val:'absolute', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TOP, {val:0,unit:'%', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:50,unit:'%', edit_option: EnumEditOption.NONEDITABLE}],
	            [EnumOption.WIDTH_PERCENT, {val:50}],
	            [EnumOption.HEIGHT_PERCENT, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                // [EnumOption.POSITION, {val:'relative', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_PERCENT, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:300, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:0,unit:'%', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.img-1 img',
            title: 'Картинка',
            tags_options: [
                [EnumOption.OBJECT_FIT, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/0101/1682953071_644fd36f68589.jpg'}],
            ],
            tags_options_mobile: [
            ],
        },
        {
            class: '.padding-right',
            title: 'Отступ второго блока',
            tags_options: [
                [EnumOption.PADDING_RIGHT, {val:50}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING_RIGHT, {val:32}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING_RIGHT, {val:0}],
                [EnumOption.PADDING_TOP, {val:32}],
            ],
        },
        {
            class: 'h2',
            title: 'Заголовок',
            text: `Simplicity is about subtracting the obvious and adding the meaningful`,
            tags_options: [
                [EnumOption.FONT_SIZE, {val:30}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.MARGIN_BOTTOM, {val:16}],
            ]
        },
        {
            class: '.text',
            title: 'Текст',
            text: `Before incorporating visual aids into speeches, the speaker should understand that if used incorrectly, the visual will be a distraction.`,
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
            ]
        },
    ],
};