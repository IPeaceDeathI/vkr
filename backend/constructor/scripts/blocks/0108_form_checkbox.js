BLOCKS[108] = {
    name: 'Форма с галочками',
    id_categories: [
        EnumCategories.FORMS,
        EnumCategories.BUTTON,
    ],
    settings:[
        ['html_variant', 'Форма с галочками'],
    ],
    html_variants:[
        [
            'Форма с галочками',
            `
                <div class="wrp">
                    <div class="wrp-shadow"></div>
                    <div class="container">
                        <div class="left">
                            <h2 contenteditable></h2>
                            <h3 contenteditable></h3>
                            <ul class="list"></ul>
                            <div contenteditable class="btn-wrp">
                                <div contenteditable class="btn"></div>
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
                [EnumOption.BACKGROUND_COLOR, {val:'#eeeeee'}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.BACKGROUND_IMAGE, {val:''}],
                [EnumOption.BACKGROUND_REPEAT,{edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.POSITION, {val:'relative', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.BACKGROUND_POSITION, {val:'unset', edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.wrp-shadow',
            title: 'Затемнение блока с картинкой',
            tags_options: [
                [EnumOption.POSITION, {val:'absolute', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TOP, {val:0, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BOTTOM, {val:0, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.LEFT, {val:0, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.RIGHT, {val:0, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_COLOR, {val:'#000000'}],
                [EnumOption.OPACITY, {val:0}],
            ],
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:1000}],
                [EnumOption.Z_INDEX, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.PADDING, {val:[48,0,48,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[32,16,32,16]}],
            ]
        },
        {
            class: '.left',
            title: 'Форма',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_DIRECTION, {val:'column', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: 'h2',
            title: 'Заголовок',
            text: 'Рассчитайте стоимость охранной системы',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:46}],
                [EnumOption.MARGIN, {val:[0,0,0,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:35}],
            ]
        },
        {
            class: 'h3',
            title: 'Описание',
            text: 'Стоимость охранной системы будет зависеть от количества необходимых вам функций',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:22}],
                [EnumOption.FONT_WEIGHT, {val:400}],
                [EnumOption.MARGIN, {val:[16,0,24,0]}],
            ],
        },
        {
            tag: 'ul',
            class: 'ul.list',
            title: 'Список функций',
            li_html: `<label>
                        <input type="checkbox" name="1">
                        <span class="li-title ${EnumLiTargeting.STRING}"></span>
                    </label>`,
            li_array :  [
                {strings: ['Внутренняя IP-видеокамера Wi-Fi (от 4 990 руб.)'] },
                {strings: ['Оповещение о возгорании (от 3000 руб.)'] },
                {strings: ['Оповещение об утечке воды (от 2500 руб.)'] },
                {strings: ['Оповещение об утечке угарного газа / дыма (от 5000 руб.)'] },
                {strings: ['Датчик открытия дверей (от 1500 руб.)'] },
                {strings: ['Датчик движения с иммунитетом к животным (от 2300 руб.)'] },
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0, edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: 'label',
            title: 'Элемент списка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'block'}],
                [EnumOption.PADDING, {val:[8,0,8,0]}],
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.CURSOR, {val:'pointer', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: 'label input',
            title: 'Галочка элемента списка',
            tags_options: [
                [EnumOption.MARGIN_RIGHT, {val:16}],
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
                [EnumOption.MARGIN_TOP, {val:24}],
            ],
        },
    ],
};