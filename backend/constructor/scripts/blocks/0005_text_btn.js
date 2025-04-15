BLOCKS[5] = {
        name: 'Текст - кнопка',
        id_categories: [
            EnumCategories.BUTTON,
        ],
        settings:[
            ['html_variant', 'Текст - кнопка'],
        ],
        tags:[
            {
                class: '.wrp-block',
                title: 'Главный блок',
                tags_options: [
                    [EnumOption.DISPLAY, {val:'flex'}],
                    [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                    [EnumOption.HEIGHT_MIN, {val:220}],
                    [EnumOption.BACKGROUND_COLOR, {val:'#f3f3f3'}],
                    [EnumOption.FONT_SIZE, {val:20}],
                    [EnumOption.COLOR, {val:'#000000'}],
                    [EnumOption.PADDING, {val:[20,5,20,5]}],
                ],
                tags_options_mobile: [
                    [EnumOption.FLEX_DIRECTION, {val:'column'}],
                    [EnumOption.ALIGN_ITEMS, {val:'center'}],
                ]
            },
            {
                class: '.wrp-text',
                title: 'Блок контента',
                tags_options: [
                    [EnumOption.DISPLAY, {val:'flex'}],
                    [EnumOption.WIDTH, {val:700}],
                    [EnumOption.ALIGN_ITEMS, {val:'center'}],
                    [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                    [EnumOption.PADDING, {val:[0,50,0,50]}],
                ],
                tags_options_mobile: [
                    [EnumOption.WIDTH, {val:380}],
                    [EnumOption.PADDING, {val:[15,50,30,50]}],
                ]
            },
            {
                class: '.wrp-btn',
                title: 'Блок кнопки',
                tags_options: [
                    [EnumOption.DISPLAY, {val:'flex'}],
                    [EnumOption.ALIGN_ITEMS, {val:'center'}],
                    [EnumOption.WIDTH, {val:700}],
                    [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                ]
            },
            {
                class: '.up',
                title: 'Сообщение 1',
                text: 'Пройдите тест и запишитесь на оценку ремонта вашего помещения.',
                tags_options: [
                    [EnumOption.DISPLAY, {val:'block'}],
                    [EnumOption.FONT_SIZE, {val:22}],
                ],
                tags_options_mobile: [
                ]
            },
            {
                class: '.bottom',
                title: 'Сообщение 2',
                text: 'Лживых скидок не будет',
                tags_options: [
                    [EnumOption.DISPLAY, {val:'block'}],
                    [EnumOption.FONT_WEIGHT],
                    [EnumOption.FONT_SIZE, {val:22}],
                ]
            },
            {
                class: 'a',
                title: 'Кнопка',
                text: 'Пройти тест',
                tags_options: [
                    [EnumOption.FONT_SIZE, {val:16}],
                    [EnumOption.COLOR, {val:'#ffffff'}],
                    [EnumOption.DISPLAY, {val:'flex'}],
                    [EnumOption.BACKGROUND_COLOR, {val:'#fc7256'}],
                    [EnumOption.PADDING, {val:15}],
                    [EnumOption.ALIGN_ITEMS, {val:'center'}],
                    [EnumOption.HEIGHT, {val:60}],
                    [EnumOption.WIDTH, {val:220}],
                    [EnumOption.TEXT_ALIGN, {val:'center'}],
                    [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                    [EnumOption.HREF, {val:'#popup:noksquiz_1'}],
                    [EnumOption.POINTER_EVENTS, {val:'pointer-events'}],
                    [EnumOption.TEXT_DECORATION, {val:'none'}],
                ]
            },
        ],
        html_variants:[
            [
                'Текст - кнопка',
                `
                    <div class="wrp-block">
                        <div class="wrp-text">
                            <div class="content">
                                <b class="up" contenteditable="true"></b>
                                <b class="bottom" contenteditable="true"></b>
                            </div>
                        </div>
                        <div class="wrp-btn">
                            <a class="btn"></a>
                        </div>
                    </div>
                `
            ],
            [
                'Кнопка - текст',
                `
                    <div class="wrp-block">
                        <div class="wrp-btn">
                            <a class="btn"></a>
                        </div>
                        <div class="wrp-text">
                            <div class="content">
                                <b class="up" contenteditable="true"></b>
                                <b class="bottom" contenteditable="true"></b>
                            </div>
                        </div>
                    </div>
                `
            ],
        ]
    };