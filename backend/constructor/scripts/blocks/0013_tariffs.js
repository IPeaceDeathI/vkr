BLOCKS[13] = {
    name: 'Тарифы',
    id_categories: [
        EnumCategories.SERVICES,
        EnumCategories.RATES,
    ],
    settings:[
        ['html_variant', 'Тарифы'],
    ],
    html_variants:[
        [
            'Тарифы',
            `
                <div class="wrp">
                    <div class="conteiner">
                        <h2 class="section-h2" contenteditable></h2>

                        <div class="wrp-tarif">
                            <div class="bgr-tarif">

                                <div>
                                    <div contenteditable class="price-1"></div>
                                    <div contenteditable class="name-1"></div>
                                    <div class="list-1">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-1"></div>
                                    <div contenteditable class="btn-1"></div>
                                </div>
                                <div class="top">
                                    <div contenteditable class="price-2"></div>
                                    <div contenteditable class="name-2"></div>
                                    <div class="list-2">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-2"></div>
                                    <div contenteditable class="btn-2"></div>
                                </div>
                                <div>
                                    <div contenteditable class="price-3"></div>
                                    <div contenteditable class="name-3"></div>
                                    <div class="list-3">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-3"></div>
                                    <div contenteditable class="btn-3"></div>
                                </div>
                                <div>
                                    <div contenteditable class="price-4"></div>
                                    <div contenteditable class="name-4"></div>
                                    <div class="list-4">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-4"></div>
                                    <div contenteditable class="btn-4"></div>
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
            tag: '',
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#F2FBFF'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
            ],
        },
        {
            tag: '',
            class: '.conteiner',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.MARGIN, {val:[30,0,30,0]}],
                [EnumOption.HEIGHT_MIN, {val:400}],
                [EnumOption.WIDTH, {val:1000}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:340}],
            ]
        },
        {
            tag: '',
            class: 'h2',
            title: 'Заголовок',
            text: 'Тарифные планы',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:35}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:25}],
            ]
        },
        {
            tag: '',
            class: '.wrp-tarif',
            title: 'Контейнер блока тариф',
            tags_options: [
                [EnumOption.MARGIN, {val:[20,0,0,0]}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            tag: '',
            class: '.bgr-tarif',
            title: 'Блок тариф',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            tag: '',
            class: '.bgr-tarif > div',
            title: 'элемент',
            tags_options: [
                [EnumOption.MARGIN, {val:[20,0,0,0]}],
                [EnumOption.WIDTH_PERCENT, {val:25}],
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_DIRECTION, {val:'column'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.HEIGHT_MIN, {val:585}],
                [EnumOption.HEIGHT_PERCENT, {val:100}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            tag: '',
            class: '.bgr-tarif > div:last-child',
            title: 'элемент последний',
            tags_options: [
                [EnumOption.BORDER_BOTTOM_RIGHT_RADIUS, {val:10}],
                [EnumOption.BORDER_TOP_RIGHT_RADIUS, {val:10}],
                [EnumOption.BORDER_LEFT, {val:[1, 'solid', '#9BC9DD']}],
            ],
        },
        {
            tag: '',
            class: '.bgr-tarif > div:first-child',
            title: 'элемент первый',
            tags_options: [
                [EnumOption.BORDER_BOTTOM_LEFT_RADIUS, {val:10}],
                [EnumOption.BORDER_TOP_LEFT_RADIUS, {val:10}],
            ],
        },
        {
            tag: '',
            class: '[class^="price-"]',
            title: 'стиль - цена',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.MARGIN, {val:[10,0,10,0]}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            tag: '',
            class: '[class^="list-"]',
            title: 'стиль - список',
            tags_options: [
            ],
            tags_options_mobile: [
            ]
        },
        {
            tag: '',
            class: '[class^="name-"]',
            title: 'стиль - название',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.COLOR, {val:'#118ED1'}],
                [EnumOption.BACKGROUND_COLOR, {val:'#E3F5FF'}],
                [EnumOption.BORDER_RADIUS, {val:10}],
                [EnumOption.PADDING, {val:[10,10,10,10]}],
                [EnumOption.MARGIN, {val:[10,0,10,0]}],
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.WIDTH_MAX, {val: 200}],
                [EnumOption.WIDTH_MIN, {val: 200}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
            ]
        },
        
        {
            tag: '',
            class: '.dot-white',
            title: 'Точки',
            tags_options: [
                [EnumOption.WIDTH, {val:1}],
                [EnumOption.HEIGHT, {val:1}],
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.BORDER_RADIUS, {val:10}],
            ],
        },
        {
            tag: '',
            class: 'li',
            title: 'Списки',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.MARGIN, {val:[10,0,10,0]}],
            ],
        },
        {
            tag: '',
            class: '.top',
            title: 'TOP',
            tags_options: [
                [EnumOption.HEIGHT, {val:625}],
                [EnumOption.MARGIN, {val:[0,0,0,0]}],
                [EnumOption.PADDING, {val:[20,0,0,0]}],
                [EnumOption.BORDER_RADIUS, {val:10}],
            ],
        },
        {
            tag: '',
            class: '[class^="desc-"]',
            title: 'стиль - описание',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.COLOR, {val:'#1A1A1D7a'}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            tag: '',
            class: '[class^="btn-"]',
            title: 'стиль - кнопка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.BORDER, {val:[1, 'none', '#FFFFFF']}],
                [EnumOption.BORDER_RADIUS, {val:70}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.HEIGHT, {val:45}],
                [EnumOption.WIDTH, {val:200}],
                [EnumOption.BACKGROUND_COLOR, {val:'#E20C07'}],
                [EnumOption.MARGIN, {val:[20,0,20,0]}],
                [EnumOption.CURSOR, {val:'pointer'}],
            ],
            tags_options_mobile: [
            ]
        },
        // item 1
        {
            tag: '',
            class: '.price-1',
            title: 'Кнопка',
            text: '14 дней',
        },
        {
            tag: '',
            class: '.name-1',
            title: 'Кнопка',
            text: 'Тестовый',
        },
        {
            tag: '',
            class: '.desc-1',
            title: 'Кнопка',
            text: '14 дней бесплатный тестовый период',
        },
        {
            tag: '',
            class: '.btn-1',
            title: 'Кнопка',
            text: 'Купить',
        },
        // item 2
        {
            tag: '',
            class: '.price-2',
            title: 'Кнопка',
            text: '490 руб / месяц',
        },
        {
            tag: '',
            class: '.name-2',
            title: 'Кнопка',
            text: 'Базовый',
        },
        {
            tag: '',
            class: '.desc-2',
            title: 'Кнопка',
            text: '14 дней бесплатный тестовый период',
        },
        {
            tag: '',
            class: '.btn-2',
            title: 'Кнопка',
            text: 'Купить',
        },
        // item 3
        {
            tag: '',
            class: '.price-3',
            title: 'Кнопка',
            text: '890 руб / месяц',
        },
        {
            tag: '',
            class: '.name-3',
            title: 'Кнопка',
            text: 'Расширенный',
        },
        {
            tag: '',
            class: '.desc-3',
            title: 'Кнопка',
            text: '',
        },
        {
            tag: '',
            class: '.btn-3',
            title: 'Кнопка',
            text: 'Купить',
        },
        // item 4
        {
            tag: '',
            class: '.price-4',
            title: 'Кнопка',
            text: '1790 руб / месяц',
        },
        {
            tag: '',
            class: '.name-4',
            title: 'Кнопка',
            text: 'Максимальный',
        },
        {
            tag: '',
            class: '.desc-4',
            title: 'Кнопка',
            text: '',
        },
        {
            tag: '',
            class: '.btn-4',
            title: 'Кнопка',
            text: 'Купить',
        },
    ],
};