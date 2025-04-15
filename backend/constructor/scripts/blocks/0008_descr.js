BLOCKS[8] = {
    name: 'Заголовок с картинкой',
    id_categories: [
        EnumCategories.ABOUT_THE_PROJECT,
        EnumCategories.IMAGE,
    ],
    settings:[
        ['html_variant', 'Заголовок с картинкой'],
    ],
    tags:[
        {
            tag: '',
            class: '.wrp',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center'}],
                [EnumOption.PADDING, {val:5}],
            ],
        },
        {
            tag: '',
            class: '.wrp-blocks',
            title: 'Главный блок',
            tags_options: [
                [EnumOption.WIDTH, {val:1000}],
                [EnumOption.HEIGHT_MIN, {val:520}],
                [EnumOption.MARGIN, {val:[40,0,50,0]}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT_PERCENT, {val:100}],
                [EnumOption.WIDTH_MAX, {val:320}],
            ],
        },
        {
            tag: '',
            class: '.wrp-headers',
            title: 'Блок с заголовками',
            tags_options: [
                
            ],
            tags_options_mobile: [
            ],
        },
        {
            tag: '',
            class: 'h2',
            title: 'Заголовок',
            text: 'Всё, что вы искали в одном месте',
            tags_options: [
                [EnumOption.FONT_SIZE, {val: 46}],
                [EnumOption.COLOR],
                [EnumOption.PADDING, {val:5}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val: 24}],
            ],
        },
        {
            tag: '',
            class: 'h3',
            title: 'Заголовок',
            text: 'Конструктор сайта, система ведения клиентов и отдел продаж, мощная маркетинговая аналитика бизнес процессов',
            tags_options: [
                [EnumOption.COLOR],
                [EnumOption.PADDING, {val:5}],
                [EnumOption.FONT_SIZE, {val: 22}],
                [EnumOption.FONT_WEIGHT, {val: 400}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val: 17}],
            ],
        },
        {
            tag: '',
            class: '.img',
            title: 'Картинка',
            tags_options: [
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_8/1681471176_643936c843047.png'}],
                [EnumOption.WIDTH_PERCENT, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.HEIGHT_MIN, {val:400, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_REPEAT, {edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val: 'contain'}],
                [EnumOption.BACKGROUND_POSITION],
            ],
            tags_options_mobile: [
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_8/1681472048_64393a30b7709.png'}],
                [EnumOption.HEIGHT, {val:870, edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
    ],
    html_variants:[
        [
            'Заголовок с картинкой',
            `
                <div class="wrp">
                    <div class="wrp-blocks">
                        <div class="wrp-headers">
                            <h2 contenteditable></h2>
                            <h3 contenteditable></h3>
                        </div>
                        <div class="img"></div>
                    </div>
                </div>
            `
        ],
    ]
};