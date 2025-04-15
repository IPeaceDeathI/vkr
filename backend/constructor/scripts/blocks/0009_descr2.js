BLOCKS[9] = {
    name: 'Описание c преимуществами',
    id_categories: [
        EnumCategories.ABOUT_THE_PROJECT,
        EnumCategories.BENEFITS,
        EnumCategories.BUTTON,
    ],
    settings:[
        ['html_variant', 'Описание c преимуществами'],
    ],
    tags:[
        {
            tag: '',
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.BACKGROUND_COLOR, {val:'#F2FBFF'}],
                [EnumOption.HEIGHT_MIN, {val:600}],
                [EnumOption.PADDING, {val:[0,0,30,0]}],
            ],
        },
        {
            tag: '',
            class: '.conteiner',
            title: 'контейнер',
            tags_options: [
                [EnumOption.MARGIN, {val:[30,0,0,0]}],
                [EnumOption.WIDTH, {val:1000}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:320}],
            ],
        },
        {
            tag: '',
            class: '.content-1',
            title: 'контейнер 1',
            tags_options: [
                [EnumOption.WIDTH, {val:60,unit:'%'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit:'%'}],
            ],
        },
        {
            tag: '',
            class: '.content-2',
            title: 'контейнер 2',
            tags_options: [
                [EnumOption.WIDTH, {val:39,unit:'%'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit:'%'}],
                [EnumOption.DISPLAY, {val:'none'}],
            ],
        },
        {
            tag: '',
            class: '.two-headers',
            title: 'Блок с заголовками',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FONT_SIZE, {val:26}],
                [EnumOption.MARGIN, {val:[20,0,20,0]}],
                
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],

            ],
        },
        {
            tag: '',
            class: '.header-1',
            title: 'Первый заголовок',
            text: '260+ готовых шаблонов сайтов',
            tags_options: [

            ],
            tags_options_mobile: [
                [EnumOption.MARGIN, {val:[10,0,10,0]}],
            ]
        },
        {
            tag: '',
            class: '.header-2',
            title: 'Второй заголовок',
            text: '260+ готовых шаблонов сайтов',
            tags_options: [

            ],
            tags_options_mobile: [
                [EnumOption.MARGIN, {val:[10,0,10,0]}],
            ]
        },
        {
            tag: '',
            class: '.desc-1',
            title: 'Второй заголовок',
            text: 'Все шаблоны проверены на реальных продажах. На текущий момент у нас более 600+ успешных кейсов различных нишах',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:22}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:18}],
            ],
        },
        {
            tag: '',
            class: '.wrp-three-block',
            title: 'Три блока',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#FFFFFF'}],
                [EnumOption.BORDER_RADIUS, {val:10}],
                [EnumOption.HEIGHT_MIN, {val:220}],
                [EnumOption.MARGIN, {val:[20,0,20,0]}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ]
        },
        {
            tag: '',
            class: '.wrp-three-block > div',
            title: 'Блоки',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.WIDTH, {val:170}],
                [EnumOption.HEIGHT_MIN, {val:180}],
            ],
            tags_options_mobile: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.HEIGHT_MIN, {val:100}],
            ]
        },
        {
            tag: '',
            class: '[class^="icon-"]',
            title: 'Общие настройки иконок',
            tags_options: [
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat'}],
                [EnumOption.BACKGROUND_POSITION, {val:'center'}],
                [EnumOption.HEIGHT, {val:80}],
                [EnumOption.WIDTH, {val:80}],
            ],
        },
        {
            tag: '',
            class: '[class^="text-"]',
            title: 'Общие настройки Текста',
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:200}],
            ],
        },
        {
            tag: '',
            class: '.icon-1',
            title: 'Первая иконка',
            tags_options: [
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_9/1681806911_643e563f5a58f.png', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.text-1',
            title: 'Текст 1',
            text: 'Легко создавать без навыков программирования и привлечения дизайнеров',
            tags_options: [
            ],
        },
        {
            tag: '',
            class: '.icon-2',
            title: 'Вторая иконка',
            tags_options: [
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_9/1681806941_643e565da1905.png', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.text-2',
            title: 'Текст 2',
            text: 'В пару кликов замените картинки, тексты, фотографии и разместите контактные формы',
            tags_options: [

            ],
        },
        {
            tag: '',
            class: '.icon-3',
            title: 'Третья иконка',
            tags_options: [
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_9/1681806961_643e5671df8f4.png', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            tag: '',
            class: '.text-3',
            title: 'Текст 3',
            text: 'Все готово! Сразу начинайте продавать',
            tags_options: [
                
            ],
        },
        {
            tag: '',
            class: '.btn',
            title: 'Кнопка',
            text: 'Выбрать шаблон',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.BORDER, {val:[1, 'none', '#FFFFFF']}],
                [EnumOption.BORDER_RADIUS, {val:70}],
                [EnumOption.COLOR, {val:'#ffffff'}],
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.HEIGHT, {val:45}],
                [EnumOption.WIDTH_PERCENT, {val:50}],
                [EnumOption.BACKGROUND_COLOR, {val:'#E20C07'}],
                [EnumOption.MARGIN, {val:[10,0,10,0]}],
                [EnumOption.CURSOR, {val:'pointer'}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            tag: '',
            class: '.container-flex',
            title: 'Контейнер колонок',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                
            ],
        },
        {
            tag: '',
            class: '.content-2 img',
            title: 'Картинки',
            tags_options: [
                [EnumOption.IMAGE, {val:'/resource/img/constructor_default/0105/1683035531_6451158b1a406.jpg'}],
                [EnumOption.OBJECT_FIT, {val:'cover',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:100,unit: '%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat',edit_option: EnumEditOption.NONEDITABLE}],
                
            ],
        },
        
        
    ],
    html_variants:[
        [
            'Описание c преимуществами',
            `
                <div class="wrp">
                    <div class="conteiner">
                        <div class="container-flex">
                            <div class="content-1">
                                <div class="two-headers">
                                    <h2 contenteditable class="header-1"></h2>
                                    <h2 contenteditable class="header-2"></h2>
                                </div>

                                <div contenteditable class="desc-1"></div>

                                <div class="wrp-three-block">
                                    <div>
                                        <div class="icon-1"></div>
                                        <div contenteditable class="text-1"></div>
                                    </div>
                                    <div>
                                        <div class="icon-2"></div>
                                        <div contenteditable class="text-2"></div>
                                    </div>
                                    <div>
                                        <div class="icon-3"></div>
                                        <div contenteditable class="text-3"></div>
                                    </div>
                                </div>

                                <div contenteditable class="btn"></div>
                            </div>
                            <div class="content-2"><img></div>
                        </div>
                    </div>
                </div>
            `
        ],
    ]
};