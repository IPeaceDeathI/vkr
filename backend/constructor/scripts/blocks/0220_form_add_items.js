BLOCKS[220] = {
    name: 'Форма калькулятор',
    id_categories:[
        EnumCategories.CALCULATE,
        EnumCategories.FORMS
    ],
    settings: [
        ['html_variant', 'Форма калькулятор'],
    ],
    tags:[
        {
            tag: '',
            class: '.steps',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, {val:'#ffffff'}],
                [EnumOption.PADDING, {val:[45, 0, 45, 0]}],
            ],
        },
        {
            tag: '',
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.PADDING, {val:[0, 15, 0, 15]}],
                [EnumOption.WIDTH_MAX, {val:1170}],
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto'}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto'}],
            ],
        }, 
        {
            tag: '',
            class: '.section-h2',
            text: 'О нашей компании',
            title: 'Заголовок',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:42}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:30}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },
        {
            tag: '',
            class: '.sub_title',
            title: 'Подзаголовок',
            text: 'О нашей компании мы расскажем здесь',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:20}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:18}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:16}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
            ]
        },
        {
            tag: '',
            class: '.sub_title4',
            text: 'Заголовок калькулятора',
            title: 'Заголовок калькулятора',
            tags_options: [
                [EnumOption.FONT_SIZE, {val:32}],
                [EnumOption.MARGIN, {val:[0,0,9,0]}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
            ],
            tags_options_tablet: [
                [EnumOption.FONT_SIZE, {val:30}],
                [EnumOption.MARGIN, {val:[0,0,34,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.MARGIN, {val:[0,0,20,0]}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ]
        },       
        {
            tag: '',
            class: '.column-1',
            title: 'Колонка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.WIDTH, {val:50,unit: '%'}],
                [EnumOption.PADDING, {val:15}],
                [EnumOption.FLEX_DIRECTION, {val:'column'}],
            ],
            tags_options_tablet: [
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
            ]
        },
        {
            tag: 'ul',
            class: '.list',
            title: 'Список инпутов',
            li_html: `<div class="li-box">
                            <div class="li-title ${EnumLiTargeting.STRING}"></div>
                            <span class="li-html ${EnumLiTargeting.HTML}"></span>
                        </div>`,
            li_array :  [
                
                {strings: ['Метраж помещения'], htmls: [`
                    <div class="metr-box">
                        <input type="text" value="70" html-id="mert-room-val">
                    </div>
                `] },
                {strings: ['Укажите тип дома'], htmls: [`
                    <div class="metr-box">
                        <input type="text" value="70" html-id="mert-type-dom">
                    </div>
                `] },
                {strings: ['Количество комнат'], htmls: [`
                    <div class="metr-box">
                        <input type="text" value="70" html-id="mert-type-dom">
                    </div>
                `] },
                {strings: ['Укажите тип ремонта'], htmls: [`
                    <div class="metr-box">
                        <input type="text" value="70" html-id="mert-type-dom">
                    </div>
                `] },
                {strings: ['Дополнительно нужно'], htmls: [`
                    <div class="metr-box">
                        <input type="text" value="70" html-id="mert-type-dom">
                    </div>
                `] },
            ],
            tags_options: [
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:0, edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ]
        },
        {
            class: '.list li',
            title: 'Ячейки для инпутов',
            tags_options: [
                [EnumOption.POSITION, {val:'relative', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.FONT_SIZE, {val:15, edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.COLOR, {val:'#000000', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.TEXT_ALIGN, {val:'left', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[0, 10, 0, 10]}],
                [EnumOption.WIDTH, {val:100,unit: '%', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'block', edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[5,0,5,0], edit_option : EnumEditOption.NONEDITABLE}],
                
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.PADDING_LEFT, {val:55}],
            ]
        },
        {
            class: '.li-box input',
            title: 'Текстовый блок - стили',
            tags_options: [
                [EnumOption.POSITION, {val:'relative'}],
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.PADDING, {val:[0, 10, 0, 10]}],
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.BORDER_RADIUS, {val:12}],
                [EnumOption.BORDER, {val:[1, 'solid', '#000000']}],
                [EnumOption.HEIGHT, {val:45}],
            ],
            tags_options_mobile: [
            ]
        },
        {
            class: '.container-text',
            title: 'Текстовый блок - стили',
            tags_options: [
                [EnumOption.POSITION, {val:'relative'}],
                [EnumOption.FONT_SIZE, {val:15}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.PADDING, {val:15}],
                [EnumOption.WIDTH, {val:80,unit: '%'}],
                
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100,unit: '%'}],
                [EnumOption.PADDING_LEFT, {val:55}],
            ]
        },
        {
            tag: '',
            class: '.row',
            title: 'Контейнер Колонки',
            tags_options: [
                // [EnumOption.WIDTH_MAX, {val:475}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN, {val:[0, -15, 0 ,-15],edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap',edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.MARGIN_RIGHT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.MARGIN_LEFT, {val:'',unit:'auto',edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.column-images .item',
            title: 'Стили слайдов',
            tags_options: [
                [EnumOption.POSITION, {val:'relative',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH_MAX, {val:100,unit:'%',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:5,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.OVERFLOW, {val:'hidden',edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BORDER_RADIUS, {val:5,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.HEIGHT, {val:220,edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:150,edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT, {val:150,edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: '.item-img-1 ',
            title: 'Картинка Контейнер',
                tags_options: [
                    [EnumOption.HEIGHT_PERCENT, {val:100}],
                ]

        },
        {
            class: '.item-img-1 .item-img',
            title: 'Фоновая картинка',
                tags_options: [
                    [EnumOption.IMAGE, {val:'/resource/img/constructor_default/portfolio/img1.jpg'}],
                    [EnumOption.WIDTH_PERCENT, {val:100}],
                    [EnumOption.HEIGHT_PERCENT, {val:100}],
                    [EnumOption.BACKGROUND_SIZE, {val:'cover'}],
                ]

        },
        {
            tag: '',
            class: '.btn',
            title: 'Кнопка',
            text: 'Отправить',
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

   
    ],
    html_variants: [
        [
            'Форма калькулятор',
            `
            <div class="steps">
                <div class="container">
                    <h2 class="section-h2" contenteditable></h2>
                    <div class="sub_title" contenteditable></div>
                    <div class="row">
                        <div class="column-1">
                            <div class="item item-img-1">
                                <img class="item-img" contenteditable/>
                            </div>
                        </div>
                        <div class="column-1">
                            <div class="sub_title4" contenteditable></div>
                            <ul class="list"></ul>
                            <a href="" contenteditable class="btn"></a>
                        </div>
                    </div>
                </div>
            </div>
            `
        ],

    ]

};
