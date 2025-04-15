BLOCKS[103] = {
    name: 'Два заголовка',
    id_categories: [
        EnumCategories.HEADING,
    ],
    settings:[
        ['html_variant', 'Два заголовка'],
    ],
    html_variants:[
        [
            'Два заголовка',
            `
                <div class="wrp-block">
                    <div class="container">
                        <h2 contenteditable></h2>
                        <div contenteditable class="descr"></div>
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
                [EnumOption.PADDING, {val:[60,0,60,0]}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
            ],
            tags_options_modile: [
                [EnumOption.WIDTH, {val:380}],
            ],
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.FLEX_DIRECTION, {val:'column'}],
                [EnumOption.WIDTH, {val:1000}],
                [EnumOption.PADDING, {val:[0,16,0,16]}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ],
        },
        {
            class: 'h2',
            title: 'Главный заголовок',
            text: 'Установка охранной сигнализации в квартире и загородном доме',
            tags_options: [
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.FONT_SIZE, {val:48}],
                [EnumOption.TEXT_TRANSFORM, {val:'normal'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:32}],
            ],
        },
        {
            class: '.descr',
            title: 'Подзаголовок',
            text: 'Безопасно дома и спокойно на душе',
            tags_options: [
                [EnumOption.DISPLAY, {val:'block'}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.TEXT_TRANSFORM, {val:'none'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.MARGIN_TOP, {val:24}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:20}],
            ],
        },
    ],
};