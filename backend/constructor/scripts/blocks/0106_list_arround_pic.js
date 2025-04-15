BLOCKS[106] = {
    name: 'Список вокруг картинки',
    id_categories: [
        EnumCategories.BENEFITS,
        EnumCategories.IMAGE,
    ],
    settings:[
        ['html_variant', 'Список вокруг картинки'],
    ],
    html_variants:[
        [
            'Список вокруг картинки',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="wrp-content">
                            <div class="content">
                                <ul class="list-1"></ul>
                            </div>
                        </div>
                        <div class="wrp-img">
                            <div class="img-1"></div>
                        </div>
                        <div class="wrp-content">
                            <div class="content">
                                <ul class="list-2"></ul>
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
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around'}],
                [EnumOption.PADDING, {val:[24,0,24,0]}],
                [EnumOption.HEIGHT_MIN, {val:700}],
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
                [EnumOption.WIDTH, {val:1200}],
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
            title: 'Блок картинки',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
            ],
        },
        {
            class: '.wrp-img',
            title: 'Блок картинки',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:80}],
                [EnumOption.PADDING, {val:[0,24,0,24]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[24,0,24,0]}],
            ]
        },
        {
            class: '.img-1',
            title: 'Картинка',
            tags_options: [
	            [EnumOption.WIDTH_PERCENT, {val:100}],
	            [EnumOption.HEIGHT_PERCENT, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/0106/1683038961_645122f11b031.png'}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'contain'}],
                [EnumOption.PADDING, {val:[0,24,0,24]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:300, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:0,unit:'%', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:500}],
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
            class: 'ul.list-1',
            title: 'Список преимуществ 1',
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
                {strings: ['Будьте в курсе','Получайте моментальные оповещения в случае взлома, пожара или протечки.'], images:['/resource/img/constructor_default/0106/1683039640_645125980cba5.png'] },
                {strings: ['Используйте аналитику','Контролируйте работу оборудования и оценивайте энергопотребление.'], images:['/resource/img/constructor_default/0106/1683039643_6451259ba8f98.png'] },
                {strings: ['Подключите камеры','Используйте видеокамеры помощью интеграции с сервисом VideoOn.'], images:['/resource/img/constructor_default/0106/1683039646_6451259ee9fae.png'] },
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0, edit_option : EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: 'ul',
            class: 'ul.list-2',
            title: 'Список преимуществ 2',
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
                {strings: ['Подключайте близких','Подключите семью, соседей. Они могут получить сигнал тревоги и прийти на помощь.'], images:['/resource/img/constructor_default/0106/1683033425_64510d5126f98.png'] },
                {strings: ['Управляйте устройствами','Настраивайте работу домашних устройств по расписанию или по событию.'], images:['/resource/img/constructor_default/0106/1683033428_64510d54eb07f.png'] },
                {strings: ['Используйте сценарии','Управляйте устройствами и охраной помещений с помощью голосового помощника.'], images:['/resource/img/constructor_default/0106/1683033432_64510d58173b4.png'] },
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