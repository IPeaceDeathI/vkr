BLOCKS[224] = {
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
                        <h2 contenteditable></h2>

                        <div class="wrp-tarif">
                            <div class="bgr-tarif">

                                <div class="price-item">
                                    <div contenteditable class="price-1"></div>
                                    <div contenteditable class="name-1"></div>
                                    <div class="list list-1">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-1"></div>
                                    <a href="" contenteditable class="btn-1"></a>
                                </div>
                                <div class="price-item top">
                                    <div contenteditable class="price-2"></div>
                                    <div contenteditable class="name-2"></div>
                                    <div class="list list-2">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-2"></div>
                                    <a href="" contenteditable class="btn-2"></a>
                                </div>
                                <div class="price-item">
                                    <div contenteditable class="price-3"></div>
                                    <div contenteditable class="name-3"></div>
                                    <div class="list list-3">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-3"></div>
                                    <a href="" contenteditable class="btn-3"></a>
                                </div>
                                <div class="price-item">
                                    <div contenteditable class="price-4"></div>
                                    <div contenteditable class="name-4"></div>
                                    <div class="list list-4">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-4"></div>
                                    <a href="" contenteditable class="btn-4"></a>
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
                [EnumOption.OVERFLOW_X, {val:'auto'}],
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
                [EnumOption.JUSTIFY_CONTENT, {val:'flex-start'}],
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
                [EnumOption.WIDTH_PERCENT, {val:70}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            tag: 'ul',
            class: '.list-1 ul',
            title: 'Тариф 1',
            li_html: `<span class="dot-blue"><span class="dot-white"></span></span>
            <span class="li_text ${EnumLiTargeting.STRING}"></span>`,
            li_array :  [{strings : [' Сайты компаний'],},
                        {strings : ['Лендинги продуктов или услуг'],}],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: 'ul',
            class: '.list-2 ul',
            title: 'Тариф 2',
            li_html: `<span class="dot-blue"><span class="dot-white"></span></span>
            <span class="li_text ${EnumLiTargeting.STRING}"></span>`,
            li_array :  [{strings : [' Сайты компаний'],},
                        {strings : ['Полная коллекция блоков'],},
                        {strings : ['подключение своего домена'],},
                        {strings : ['Лендинги продуктов или услуг'],},
                        {strings : ['Интернет-магазины'],},
                        {strings : ['Промостраницы мероприятий'],}],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: 'ul',
            class: '.list-3 ul',
            title: 'Тариф 3',
            li_html: `<span class="dot-blue"><span class="dot-white"></span></span>
            <span class="li_text ${EnumLiTargeting.STRING}"></span>`,
            li_array :  [{strings : [' Сайты компаний'],},
            {strings : ['Полная коллекция блоков'],},
            {strings : ['подключение своего домена'],},
            {strings : ['Лендинги продуктов или услуг'],},
            {strings : ['Интернет-магазины'],},
            {strings : ['Промостраницы мероприятий'],}],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: 'ul',
            class: '.list-4 ul',
            title: 'Тариф 4',
            li_html: `<span class="dot-blue"><span class="dot-white"></span></span>
            <span class="li_text ${EnumLiTargeting.STRING}"></span>`,
            li_array :  [{strings : [' Сайты компаний'],},
            {strings : ['Полная коллекция блоков'],},
            {strings : ['подключение своего домена'],},
            {strings : ['Лендинги продуктов или услуг'],},
            {strings : ['Интернет-магазины'],},
            {strings : ['Промостраницы мероприятий'],}],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            tag: '',
            class: '.dot-blue',
            title: 'Точки',
            tags_options: [
                [EnumOption.MARGIN, {val:[6,4,0,0]}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.WIDTH, {val:5}],
                [EnumOption.HEIGHT, {val:5}],
                [EnumOption.BACKGROUND_COLOR, {val:'#118ED1'}],
                [EnumOption.BORDER_RADIUS, {val:50}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
                [EnumOption.FLOAT, {val:'left'}],
            ],
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
                [EnumOption.TEXT_DECORATION, {val:'none'}],
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
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
            ]
        },
        {
            tag: '',
            class: '.name-1',
            title: 'Кнопка',
            text: 'Тестовый',
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            tag: '',
            class: '.desc-1',
            title: 'Кнопка',
            text: '14 дней бесплатный тестовый период',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,10,0]}],
                [EnumOption.MARGIN_TOP, {val:'',unit:'auto'}],
            ],
        },
        {
            tag: '',
            class: '.btn-1',
            title: 'Кнопка',
            text: 'Купить',
            tags_options: [
                [EnumOption.MARGIN, {val:[10,0,20,0]}],
            ],
        },
        // item 2
        {
            tag: '',
            class: '.price-2',
            title: 'Кнопка',
            text: '490 руб / месяц',
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
            ]
        },
        {
            tag: '',
            class: '.name-2',
            title: 'Кнопка',
            text: 'Базовый',
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            tag: '',
            class: '.desc-2',
            title: 'Кнопка',
            text: '14 дней бесплатный тестовый период',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,10,0]}],
                [EnumOption.MARGIN_TOP, {val:'',unit:'auto'}],
            ],
        },
        {
            tag: '',
            class: '.btn-2',
            title: 'Кнопка',
            text: 'Купить',
            tags_options: [
                [EnumOption.MARGIN, {val:[10,0,30,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.MARGIN, {val:[10,0,20,0]}],
            ]
        },
        // item 3
        {
            tag: '',
            class: '.price-3',
            title: 'Кнопка',
            text: '890 руб / месяц',
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
            ]
            
        },
        {
            tag: '',
            class: '.name-3',
            title: 'Кнопка',
            text: 'Расширенный',
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            tag: '',
            class: '.desc-3',
            title: 'Кнопка',
            text: '',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,10,0]}],
                [EnumOption.MARGIN_TOP, {val:'',unit:'auto'}],
            ],
        },
        {
            tag: '',
            class: '.btn-3',
            title: 'Кнопка',
            text: 'Купить',
            tags_options: [
                [EnumOption.MARGIN, {val:[10,0,20,0]}],
            ],
        },
        // item 4
        {
            tag: '',
            class: '.price-4',
            title: 'Кнопка',
            text: '1790 руб / месяц',
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
            ]
        },
        {
            tag: '',
            class: '.name-4',
            title: 'Кнопка',
            text: 'Максимальный',
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            tag: '',
            class: '.desc-4',
            title: 'Кнопка',
            text: '',
            tags_options: [
                [EnumOption.MARGIN, {val:[0,0,10,0]}],
                [EnumOption.MARGIN_TOP, {val:'',unit:'auto'}],
            ],
        },
        {
            tag: '',
            class: '.btn-4',
            title: 'Кнопка',
            text: 'Купить',
            tags_options: [
                [EnumOption.MARGIN, {val:[10,0,20,0]}],
            ],
        },
        {
            tag: '',
            class: '.price-item',
            title: 'Вкладка такрифа ',
            tags_options: [
                [EnumOption.BORDER, {val:[1, 'solid', '#eeeeee']}],
                [EnumOption.HEIGHT, {val:'',unit:'auto'}],
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:'',unit:'auto'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:290}],
                [EnumOption.PADDING, {val:[20,15,20,15]}],
                [EnumOption.HEIGHT_MIN, {val:'',unit:'auto'}],
                [EnumOption.MARGIN, {val:[0, 5, 0, 5]}],
            ]
        },
        {
            tag: '',
            class: '.list',
            title: 'Вкладка такрифа ',
            tags_options: [
                [EnumOption.PADDING, {val:[0,0,0,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING, {val:[0,0,0,0]}],
            ]
        },
        {
            tag: '',
            class: '.list > ul',
            title: 'Список',
            tags_options: [
                [EnumOption.PADDING, {val:[0,0,0,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING, {val:[0,0,0,10]}],
            ]
        },
        
        
    ],
    html_variants:[
        [
            'Тарифы',
            `
                <div class="wrp">
                    <div class="conteiner">
                        <h2 class="section_h2" contenteditable></h2>
                        <div class="wrp-tarif">
                            <div class="bgr-tarif">
                                <div class="price-item">
                                    <div contenteditable class="price-1"></div>
                                    <div contenteditable class="name-1"></div>
                                    <div class="list list-1">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-1"></div>
                                    <a href="" contenteditable class="btn-1"></a>
                                </div>
                                <div class="price-item top">
                                    <div contenteditable class="price-2"></div>
                                    <div contenteditable class="name-2"></div>
                                    <div class="list list-2">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-2"></div>
                                    <a href="" contenteditable class="btn-2"></a>
                                </div>
                                <div class="price-item">
                                    <div contenteditable class="price-3"></div>
                                    <div contenteditable class="name-3"></div>
                                    <div class="list list-3">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-3"></div>
                                    <a href="" contenteditable class="btn-3"></a>
                                </div>
                                <div class="price-item">
                                    <div contenteditable class="price-4"></div>
                                    <div contenteditable class="name-4"></div>
                                    <div class="list list-4">
                                        <ul></ul>
                                    </div>
                                    <div contenteditable class="desc-4"></div>
                                    <a href="" contenteditable class="btn-4"></a>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            `
        ],
    ]
};