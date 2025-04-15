BLOCKS[11] = {
    name: 'Примеры сайтов',
    id_categories: [
        EnumCategories.GALLERY,
        EnumCategories.LIST_OF_PAGES,
    ],
    settings:[
        ['html_variant', 'Примеры сайтов'],
    ],
    tags:[
        {
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#F2FBFF'}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.PADDING, {val:[20,0,30,0]}],
            ],
        },
        {
            class: '.conteiner',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.MARGIN, {val:[30,0,0,0]}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_DIRECTION, {val:'column'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.HEIGHT_MIN, {val:400}],
                [EnumOption.WIDTH, {val:1000}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:340}],
                [EnumOption.COLOR, {val : '#ff0000'}]
            ]
        },
        {
            class: 'h2',
            title: 'Заголовок',
            text: 'Примеры сайтов наших клиентов',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:35}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:25}],
            ]
        },
        {
            class: '.wrp-items',
            title: 'Блок с элементами',
            tags_options: [
                [EnumOption.MARGIN, {val:[20,0,0,0]}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.MARGIN, {val:[20,0,20,0]}],
                [EnumOption.OVERFLOW_X, {val:'scroll'}],
                [EnumOption.OVERFLOW_Y, {val:'hidden'}],
                [EnumOption.HEIGHT, {val:300}],
                [EnumOption.JUSTIFY_CONTENT, {val:'normal'}],
                [EnumOption.FLEX_WRAP, {val:'nowrap'}],
            ]
        },
        {
            class: '.wrp-items > div',
            title: 'Элементы',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:33}],
                [EnumOption.HEIGHT_MIN, {val:200}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_MIN, {val:350}],
            ]
        },

        {
            class: '[class^="item-"] img',
            title: 'Свойства всех картинок',
            tags_options: [
                [EnumOption.WIDTH, {val:250}],
            ],
        },
        {
            class: '[class^="item-"] a',
            title: 'Свойства всех ссылок',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.COLOR, {val:'#118ED1'}],
                [EnumOption.DISPLAY, {val:'block'}],
            ],
        },
        // ITEMS START
        {
            class: '.item-1 img',
            title: 'Картинка 1',
            tags_options: [
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/block_11/1681828669_643eab3d31885.png'}],
            ],
        },
        {
            class: '.item-1 a',
            title: 'текст 1',
            text: 'Сайт визитка',
            tags_options: [
                [EnumOption.HREF, {val:''}],
            ],
        },
        {
            class: '.item-2 img',
            title: 'Картинка 2',
            tags_options: [
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/block_11/1681828669_643eab3d31885.png'}],
            ],
        },
        {
            class: '.item-2 a',
            title: 'текст 2',
            text: 'Сайт визитка',
            tags_options: [
                [EnumOption.HREF, {val:''}],
            ],
        },
        {
            class: '.item-3 img',
            title: 'Картинка 3',
            tags_options: [
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/block_11/1681828669_643eab3d31885.png'}],
            ],
        },
        {
            class: '.item-3 a',
            title: 'текст 3',
            text: 'Сайт визитка',
            tags_options: [
                [EnumOption.HREF, {val:''}],
            ],
        },
        {
            class: '.item-4 img',
            title: 'Картинка 4',
            tags_options: [
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/block_11/1681828669_643eab3d31885.png'}],
            ],
        },
        {
            class: '.item-4 a',
            title: 'текст 4',
            text: 'Сайт визитка',
            tags_options: [
                [EnumOption.HREF, {val:''}],
            ],
        },
        {
            class: '.item-5 img',
            title: 'Картинка 5',
            tags_options: [
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/block_11/1681828669_643eab3d31885.png'}],
            ],
        },
        {
            class: '.item-5 a',
            title: 'текст 5',
            text: 'Сайт визитка',
            tags_options: [
                [EnumOption.HREF, {val:''}],
            ],
        },
        {
            class: '.item-6 img',
            title: 'Картинка 6',
            tags_options: [
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/block_11/1681828669_643eab3d31885.png'}],
            ],
        },
        {
            class: '.item-6 a',
            title: 'текст 6',
            text: 'Сайт визитка',
            tags_options: [
                [EnumOption.HREF, {val:''}],
            ],
        },
        // ITEMS END
        {
            class: '.btn',
            title: 'Кнопка',
            text: 'Создать свой сайт',
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
                [EnumOption.MARGIN, {val:[30,0,10,0]}],
                [EnumOption.CURSOR, {val:'pointer'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.MARGIN, {val:[0,0,10,0]}],
            ]
        },
    ],
    html_variants:[
        [
            'Примеры сайтов',
            `
                <div class="wrp">
                    <div class="conteiner">
                        <h2 class="section-h2" contenteditable></h2>

                        <div class="wrp-items">

                            <div class="item-1">
                                <img>
                                <a contenteditable href=""></a>
                            </div>
                            <div class="item-2">
                                <img>
                                <a contenteditable href=""></a>
                            </div>
                            <div class="item-3">
                                <img>
                                <a contenteditable href=""></a>
                            </div>
                            <div class="item-4">
                                <img>
                                <a contenteditable href=""></a>
                            </div>
                            <div class="item-5">
                                <img>
                                <a contenteditable href=""></a>
                            </div>
                            <div class="item-6">
                                <img>
                                <a contenteditable href=""></a>
                            </div>

                        </div>

                        <div contenteditable class="btn"></div>
                    </div>
                </div>
            `
        ],
    ]
};