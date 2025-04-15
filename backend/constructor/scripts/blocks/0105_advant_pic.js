BLOCKS[105] = {
    name: 'Текст - Картинка',
    id_categories: [
        EnumCategories.TEXT_BLOCK,
        EnumCategories.IMAGE,
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
                        <div class="img-1"><img></div>
                        <div class="wrp-content padding-right">
                            <div class="content">
                                <ul class="list"></ul>
                            </div>
                        </div>
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
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around'}],
                [EnumOption.PADDING, {val:[0,0,0,0], edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT_MIN, {val:500}],
                [EnumOption.POSITION, {val:'relative', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
            ]
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-between'}],
                [EnumOption.WIDTH, {val:1000}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[0,16,0,16]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ],
        },
        {
            class: '.wrp-content',
            title: 'Блок текст',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:50}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
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
                [EnumOption.WIDTH_PERCENT, {val:50}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: '.img-1',
            title: 'Контейнер картинки',
            tags_options: [
	            [EnumOption.POSITION, {val:'absolute', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TOP, {val:0,unit:'%', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:50,unit:'%', edit_option: EnumEditOption.NONEDITABLE}],
	            [EnumOption.WIDTH_PERCENT, {val:50}],
	            [EnumOption.HEIGHT_PERCENT, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
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
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/0105/1683035531_6451158b1a406.jpg'}],
            ],
        },
        {
            class: '.padding-right',
            title: 'Отступ второго блока',
            tags_options: [
                [EnumOption.PADDING_RIGHT, {val:32}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING_RIGHT, {val:32}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING_RIGHT, {val:0}],
                [EnumOption.PADDING_TOP, {val:16}],
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
        {
            tag: 'ul',
            class: 'ul.list',
            title: 'Список преимуществ',
            li_html: `<div class="li-box">
                <div class="li-img">
                    <img class="img ${EnumLiTargeting.IMAGE}">
                </div>
                <div class="li-data">
                    <div class="li-title ${EnumLiTargeting.STRING}"></div>
                    <div class="li-text ${EnumLiTargeting.STRING}"></div>
                </div>
            </div>`,
            li_array :  [
                {strings: ['Защита от проникновения и нападения','В случае тревоги датчики движения сработают, злоумышленники будут пойманы и переданы в полицию.'], images:['/resource/img/constructor_default/0105/1683033425_64510d5126f98.png'] },
                {strings: ['Защита от пожара и утечек','В комплект датчиков могут входить датчики для обнаружения возгораний, утечек воды и задымления.'], images:['/resource/img/constructor_default/0105/1683033428_64510d54eb07f.png'] },
                {strings: ['Оперативный выезд группы реагрования','В случае тревоги группа быстрого реагирования приедет в течение 5 минут и осмотрит объект на предмет взлома.'], images:['/resource/img/constructor_default/0105/1683033432_64510d58173b4.png'] },
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0, edit_option : EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.li-box',
            title: 'Элемент списка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'flex-start', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[32,0,32,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.MARGIN, {val:[16,0,16,0]}],
            ],
        },
        {
            class: '.li-img',
            title: 'Блок иконки списка',
            tags_options: [
                [EnumOption.MARGIN_RIGHT, {val:16}], 
                [EnumOption.WIDTH, {val:48}], 
            ]
        },
        {
            class: '.li-img img',
            title: 'Иконки списка',
            tags_options: [
                [EnumOption.WIDTH, {val:48}],
            ]
        },
        {
            class: '.li-title',
            title: 'Заголовок элемента списка',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.FONT_WEIGHT, {val:'bold'}],
            ]
        },
        {
            class: '.li-text',
            title: 'Текст элемента списка',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.PADDING_TOP, {val:8}],
            ]
        },
    ],
};