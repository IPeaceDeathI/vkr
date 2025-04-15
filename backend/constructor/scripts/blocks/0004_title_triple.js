BLOCKS[4] = {
    name: 'Три заголовка',
    id_categories: [
        EnumCategories.HEADING,
    ],
    settings:[
        ['html_variant', 'Три заголовка'],
    ],
    html_variants:[
        [
            'Три заголовка',
            `
                <div class="wrp-block">
                    <div class="container">
                        <b contenteditable class="up"></b>
                        <h2 class="section-h2" contenteditable></h2>
                        <b contenteditable class="bottom"></b>
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
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.PADDING, {val:[40,0,40,0]}],
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
            tag: '',
            class: 'b.up',
            title: 'Верхний заголовок',
            text: 'Полезно понимать',
            tags_options: [
                [EnumOption.DISPLAY, {val:'block'}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.TEXT_TRANSFORM, {val:'uppercase'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
        {
            tag: '',
            class: 'h2',
            title: 'Главный заголовок',
            text: 'Про форумы. Ремонтные и не только',
            tags_options: [
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.FONT_SIZE, {val:36}],
                [EnumOption.TEXT_TRANSFORM, {val:'uppercase'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.MARGIN, {val:[16,0,16,0]}],
            ]
        },
        {
            tag: '',
            class: 'b.bottom',
            title: 'Нижний заголовок',
            text: 'Или почему всем интересно почитать',
            tags_options: [
                [EnumOption.DISPLAY, {val:'block'}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.TEXT_TRANSFORM, {val:'none'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
    ],
};