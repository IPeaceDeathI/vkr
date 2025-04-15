BLOCKS[1] = {
    name: "Пункты",
    id_categories: [EnumCategories.ABOUT_THE_PROJECT, EnumCategories.BENEFITS],
    settings: [["html_variant", "Лист"]],
    html_variants: [
        [
            "Лист",
            `   
                ${set_iframe("hdqidhqdqd")}
                <div class="wrp-block-1">
                    <h2 contenteditable></h2>
                    <!-- left -->
                    <div class="wrp-left-1">
                        <h3 contenteditable></h3>
                        <ul class="list-good">
                        </ul>
                        <div class="arrow">
                            <img src="/resource/img/constructor_default/block_1/arrow-up-blue.png">
                        </div>
                        <div class="bottom-txt-1" contenteditable></div>
                    </div>
                    <!-- right -->
                    <div class="wrp-right-2">
                        <h3 contenteditable></h3>
                        <ul class="list-bad">
                        </ul>
                        <div class="arrow">
                            <img src="/resource/img/constructor_default/block_1/arrow-up-red.png">
                        </div>
                        <div class="bottom-txt-2" contenteditable></div>
                    </div>
                </div>
            `,
        ],
    ],
    tags: [
        {
            tag: "frame_content",
            class: ".hdqidhqdqd",
            title: "Фрейм",
            entity_id: null,
            id: null,
            tags_options: [
                [EnumOption.WIDTH, { val: "100", unit: "%" }],
                [EnumOption.HEIGHT, { val: "100", unit: "%" }],
            ],
        },
        {
            tag: "",
            class: ".wrp-block-1",
            title: "Главный блок",
            tags_options: [
                [EnumOption.FONT_SIZE],
                [EnumOption.TEXT_DECORATION],
                [EnumOption.BACKGROUND_COLOR],
                [EnumOption.BACKGROUND_IMAGE],
                [EnumOption.BACKGROUND_REPEAT],
                [EnumOption.BACKGROUND_POSITION],
                [EnumOption.BACKGROUND_SIZE, { val: 50, unit: "px" }],
                [EnumOption.MARGIN_TOP],
                [EnumOption.MARGIN_BOTTOM],
                [EnumOption.MARGIN_RIGHT],
                [EnumOption.PADDING_TOP],
                [EnumOption.PADDING_BOTTOM],
                [EnumOption.PADDING_RIGHT],
                [EnumOption.PADDING_LEFT],
                [EnumOption.MARGIN_LEFT],
                [EnumOption.WIDTH, { val: "auto" }],
                [EnumOption.HEIGHT, { val: "auto" }],
                [EnumOption.TOP, { val: "auto" }],
                [EnumOption.LEFT, { val: "auto" }],
                [EnumOption.BACKGROUND_POSITION_X],
                [EnumOption.BACKGROUND_POSITION_Y],
                [EnumOption.HEIGHT_MIN, { val: 100 }],
                [EnumOption.HEIGHT_MAX, { val: 100 }],
                [EnumOption.WIDTH_MIN, { val: 100 }],
                [EnumOption.WIDTH_MAX, { val: 100 }],
                [EnumOption.FONT_WEIGHT, { val: 100 }],
                [EnumOption.TEXT_ALIGN],
                [EnumOption.COLOR],
                [EnumOption.FLOAT],
                [EnumOption.Z_INDEX],
                [EnumOption.LINE_HEIGHT],
                [EnumOption.TEXT_TRANSFORM],
                [EnumOption.DISPLAY],
                [EnumOption.IMAGE],
                [EnumOption.HREF, { val: "4242423424" }],
                [EnumOption.ATTR],
                [EnumOption.BORDER, { val: [1, "none", "#FFFFFF"] }],
                [EnumOption.CURSOR],
                [EnumOption.POINTER_EVENTS],
                [EnumOption.OVERFLOW],
                [EnumOption.OVERFLOW_Y],
                [EnumOption.OVERFLOW_X],
                [EnumOption.OPACITY],
                [EnumOption.ALIGN_CONTENT],
                [EnumOption.BORDER_COLOR],
                [EnumOption.BORDER_WIDTH],
                [EnumOption.BORDER_STYLE],
                [EnumOption.BORDER_RADIUS],

                [EnumOption.FLEX_DIRECTION],
                [EnumOption.ALIGN_ITEMS],
                [EnumOption.JUSTIFY_CONTENT],
                [EnumOption.FLEX_WRAP],
                [EnumOption.FLEX_BASIS],
                [EnumOption.POSITION],
                [EnumOption.FONT_FAMILY],

                ////-----

                // [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                // [EnumOption.FLEX_WRAP, {val:'wrap', edit_option: EnumEditOption.NONEDITABLE}],
                // [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
                // [EnumOption.FONT_SIZE, {val:20}],
                // [EnumOption.TEXT_DECORATION],
                // [EnumOption.TEXT_ALIGN],
                // [EnumOption.COLOR, {val: '#ffffff'}],
                // [EnumOption.MARGIN_BOTTOM, { unit:'auto' }],
                // [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_1/1681142072_64343138b50b9.jpg'}],
                // [EnumOption.BACKGROUND_COLOR],
                // [EnumOption.ATTR, {name: "fsfsfs", val:"fdfsdfsdfsd"}],
                // [EnumOption.TEXT_DECORATION],

                // [EnumOption.PADDING, {val:[40,0,40,0]}],
            ],
        },
        // {
        //     tag: '',
        //     class: 'h2',
        //     title: 'Главный заголовок',
        //     text: 'И ОПЯТЬ ЖЕ...',
        //     tags_options: [
        //         [EnumOption.FLEX_BASIS, {val:100, edit_option : EnumEditOption.NONEDITABLE}],
        //         [EnumOption.TEXT_ALIGN],
        //         [EnumOption.FONT_SIZE, {val:40}],
        //         [EnumOption.Z_INDEX, {val:40}],
        //         [EnumOption.COLOR, {val:'#ffffff'}],
        //     ]
        // },
        {
            tag: "ul",
            class: ".list-good",
            title: "Списки good",
            li_html: `<div class="icon-good"></div>
            <div class="fsfsfsfs ${EnumLiTargeting.STRING}"></div>
            <div class="${EnumLiTargeting.STRING}"></div>
            <div class="${EnumLiTargeting.HTML}"></div>
            <img class="${EnumLiTargeting.IMAGE}"></img>
            <a  class="${EnumLiTargeting.HREF}"></a>`,
            li_array: [
                {
                    hrefs: ["sfsfsfsfs", "11fsfsfsfs"],
                    strings: ["sfsfsfsfs", "111fsfsfsfs"],
                    images: ["sfsfsfsfs", "11fsfsfsfs"],
                    htmls: [
                        '<input class="fsfsfsfs" value="fsffsfsfsfsfsfsfsffsf"><select><option>test</option></select>',
                    ],
                },
            ],
            tags_options: [
                [
                    EnumOption.LIST_STYLE_TYPE,
                    { edit_option: EnumEditOption.NONEDITABLE },
                ],
            ],
        },
        // {
        //     tag: 'ul',
        //     class: '.list-bad',
        //     title: 'Списки goobad',
        //     li_html: `<div class="icon-good"></div>
        //     <div class="fsfsfsfs ${EnumLiTargeting.STRING}"></div>
        //     <div class="${EnumLiTargeting.STRING}"></div>
        //     <div class="${EnumLiTargeting.HTML}"></div>
        //     <img class="${EnumLiTargeting.IMAGE}"></img>
        //     <a  class="${EnumLiTargeting.HREF}"></a>`,
        //     li_array : [
        //         {
        //             hrefs:["sfsfsfsfs","11fsfsfsfs"],
        //             strings:["sfsfsfsfs","111fsfsfsfs"],
        //             images:["sfsfsfsfs","11fsfsfsfs"],
        //             htmls:['<input class="fsfsfsfs" value="fsffsfsfsfsfsfsfsffsf"><select><option>test</option></select>']
        //         },
        //     ],
        //     tags_options: [
        //         [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
        //     ]
        // },
        // {
        //     class: ".fsfsfsfs",
        //     title: 'Пунктыfff',
        //     tags_options: [
        //         [EnumOption.TEXT_ALIGN],

        //         [EnumOption.BACKGROUND_COLOR, {val:'#3366c'}],
        //     ]
        // },

        // {
        //     tag: '',
        //     class: 'li',
        //     title: 'Пункты',
        //     tags_options: [
        //         [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
        //         [EnumOption.HEIGHT, {val:30}],
        //         [EnumOption.WIDTH, {val:230}],

        //     ]
        // },
        // {
        //     tag:'',
        //     class: '.icon-good',
        //     title: 'Иконки левого блока',
        //     tags_options: [
        //         [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_1/good.png', edit_option : EnumEditOption.NONEDITABLE}],
        //         [EnumOption.PADDING, {val:[20,20,20,20]}],
        //         [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat', edit_option : EnumEditOption.NONEDITABLE}]
        //     ]
        // },
        // {
        //     tag:'',
        //     class: '.icon-bad',
        //     title: 'Иконки правого блока',
        //     tags_options: [
        //         [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_1/bad.png', edit_option : EnumEditOption.NONEDITABLE}],
        //         [EnumOption.PADDING, {val:[20,20,20,20]}],
        //         [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat', edit_option : EnumEditOption.NONEDITABLE}]
        //     ]
        // },
        // {
        //     tag: '',
        //     class: '.wrp-left-1 > h3',
        //     title: 'Заголовок слева',
        //     text: 'ВАЖНО:',
        //     tags_options: [
        //         [EnumOption.COLOR, {val:'#1212f4'}],
        //         [EnumOption.FONT_SIZE, {val:40}],
        //     ]
        // },
        // {
        //     tag: '',
        //     class: '.wrp-right-2 > h3',
        //     title: 'Заголовок справа',
        //     text: 'НЕ ВАЖНО:',
        //     tags_options: [
        //         [EnumOption.COLOR, {val:'#f32a2a'}],
        //         [EnumOption.FONT_SIZE, {val:40}],
        //     ]
        // },
        // {
        //     tag: '',
        //     class: '.arrow',
        //     title: 'Стрелки',
        //     tags_options: [
        //         [EnumOption.DISPLAY, {val:'flex', show: ['none', 'flex']}],
        //         [EnumOption.JUSTIFY_CONTENT, {val:'center', show: ['start', 'center']}],
        //     ]
        // },
        // {
        //     tag: '',
        //     class: '[class^=bottom-txt]',
        //     title: 'Нижние сообщения',
        //     tags_options: [
        //         [EnumOption.DISPLAY, {val:'flex', show: ['block', 'flex', 'none']}],
        //         [EnumOption.JUSTIFY_CONTENT, {val:'center', show: ['start', 'center']}],
        //     ]
        // },
        // {
        //     tag: '',
        //     class: '.bottom-txt-1',
        //     title: 'Текст слева',
        //     text: 'Когда умеешь делать это',
        //     tags_options: [
        //         [EnumOption.DISPLAY, {val:'flex', show: ['block', 'flex', 'none']}],
        //         [EnumOption.JUSTIFY_CONTENT, {val:'center', show: ['start', 'center']}],
        //     ]
        // },
        // {
        //     tag: '',
        //     class: '.bottom-txt-2',
        //     title: 'Текст справо',
        //     text: 'Это становится ненужным',
        //     tags_options: [
        //         [EnumOption.DISPLAY, {val:'flex', show: ['block', 'flex', 'none']}],
        //         [EnumOption.JUSTIFY_CONTENT, {val:'center', show: ['start', 'center']}],
        //     ]
        // },
    ],
};
