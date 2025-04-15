BLOCKS[3] = {
    name: 'Картинка - Текст',
    id_categories: [
        EnumCategories.TEXT_BLOCK,
        EnumCategories.IMAGE,
    ],
    settings:[
        ['html_variant', 'Картинка - Текст'],
    ],
    html_variants:[
        [
            'Картинка - Текст',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="img"><img></div>
                        <div class="wrp-content padding-left">
                            <div class="content">
                                <h2 contenteditable></h2>
                                <div contenteditable class="text"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        ],
        [
            'Текст - Картинка',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="wrp-content">
                            <div class="content">
                                <h2 contenteditable></h2>
                                <div contenteditable class="text"></div>
                            </div>
                        </div>
                        <div class="img padding-left"><img></div>
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
                [EnumOption.HEIGHT_MIN, {val:500}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around'}],
                [EnumOption.PADDING, {val:[32,0,32,0]}],
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
            class: '.img',
            title: 'Блок картинка',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:50}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}]
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: 'img',
            title: 'Картинка',
            tags_options: [
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/portfolio/img1.jpg'}],
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: '.wrp-content',
            title: 'Блок текст',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:50}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}]
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: '.padding-left',
            title: 'Отступ второго блока',
            tags_options: [
                [EnumOption.PADDING_LEFT, {val:50}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING_LEFT, {val:32}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING_LEFT, {val:0}],
                [EnumOption.PADDING_TOP, {val:32}],
            ],
        },
        {
            class: '.text',
            title: 'Текст',
            text: `Несколько слов о том, кто написал данный текст. Меня зовут Костин Сергей Евгеньевич.
                Я эксперт в ремонтах и строительстве.
                Проживаю в Москве.
                Выпускник Московского Государственного Строительного Университета.
                Мне 50 лет.
                Женат, двое детей.
                Дружу и сотрудничаю с Мусиным Ришатом и Лесконогом Юрием.
                Ришат с 90 года в строительстве,
                Юрий имеет учёную степень
                кандидата технических наук.
                У нас подобралась дружная команда профессионалов, имеющая большой опыт в профильной специальности.`,
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
            ]
        },
        {
            class: 'h2',
            title: 'Заголовок',
            text: `Здравствуйте`,
            tags_options: [
                [EnumOption.FONT_SIZE, {val:30}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.MARGIN_BOTTOM, {val:16}],
            ]
        },
    ],
};