new Object({
    name: "Картинка - описание",
    id_categories: [
        EnumCategories.IMAGE,
        EnumCategories.ABOUT_THE_PROJECT,
        EnumCategories.BENEFITS,
    ],
    settings: [["html_variant", "Картинка - описание"]],
    tags: [
        {
            tag: "",
            class: ".wrp",
            title: "Главный блок",
            tags_options: [
                [EnumOption.BACKGROUND_COLOR, { val: "#F2FBFF" }],
                [EnumOption.DISPLAY, { val: "flex" }],
                [EnumOption.JUSTIFY_CONTENT, { val: "center" }],
            ],
        },
        {
            tag: "",
            class: ".conteiner",
            title: "Контейнер",
            tags_options: [
                [EnumOption.PADDING, { val: [10, 0, 10, 10] }],
                [EnumOption.DISPLAY, { val: "flex" }],
                [EnumOption.JUSTIFY_CONTENT, { val: "flex-start" }],
                [EnumOption.HEIGHT_MIN, { val: 400 }],
                [EnumOption.WIDTH, { val: 1000 }],
                [EnumOption.PADDING, { val: [48, 0, 48, 0] }],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, { val: 100 }],
                [EnumOption.PADDING, { val: [48, 16, 48, 16] }],
            ],
            tags_options_mobile: [[EnumOption.WIDTH_PERCENT, { val: 100 }]],
        },
        {
            tag: "",
            class: ".img",
            title: "Картинка",
            tags_options: [
                [
                    EnumOption.BACKGROUND_IMAGE,
                    {
                        val: "/resource/img/constructor_default/block_10/1681813940_643e71b470964.png",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_REPEAT,
                    {
                        val: "no-repeat",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_POSITION,
                    { val: "center", edit_option: EnumEditOption.NONEDITABLE },
                ],
                [
                    EnumOption.BACKGROUND_SIZE,
                    { val: "contain", edit_option: EnumEditOption.EDITABLE },
                ],
                [EnumOption.WIDTH_PERCENT, { val: 30 }],
                [EnumOption.WIDTH_MIN, { val: 300 }],
            ],
            tags_options_tablet: [
                [
                    EnumOption.BACKGROUND_SIZE,
                    { val: "contain", edit_option: EnumEditOption.NONEDITABLE },
                ],
                [EnumOption.WIDTH_MIN, { val: 300 }],
            ],
            tags_options_mobile: [[EnumOption.DISPLAY, { val: "none" }]],
        },
        {
            tag: "",
            class: ".wrp-items",
            title: "Правый блок",
            tags_options: [
                [EnumOption.DISPLAY, { val: "flex" }],
                [EnumOption.FLEX_WRAP, { val: "wrap" }],
            ],
            tags_options_mobile: [[EnumOption.FLEX_WRAP, { val: "wrap" }]],
        },
        {
            tag: "",
            class: "h2",
            title: "Заголовок",
            text: "094804824093840932820984209809",
            tags_options: [[EnumOption.FONT_SIZE, { val: 35 }]],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, { val: 25 }],
                [EnumOption.MARGIN, { val: [0, 0, 0, 20] }],
            ],
        },
        {
            tag: "",
            class: ".wrp-right",
            title: "Правый блок",
            tags_options: [
                [EnumOption.MARGIN, { val: [0, 0, 0, 20] }],
                [EnumOption.DISPLAY, { val: "flex" }],
                [EnumOption.ALIGN_ITEMS, { val: "center" }],
                [EnumOption.FLEX_WRAP, { val: "wrap" }],
                [EnumOption.ALIGN_CONTENT, { val: "center" }],
            ],
            tags_options_mobile: [[EnumOption.MARGIN, { val: 0 }]],
        },
        {
            tag: "",
            class: ".wrp-items > div",
            title: "Блоки",
            tags_options: [
                [EnumOption.MARGIN, { val: [0, 10, 0, 10] }],
                [EnumOption.WIDTH, { val: 150 }],
                [EnumOption.HEIGHT_PERCENT, { val: 100 }],
            ],
            tags_options_mobile: [
                [EnumOption.DISPLAY, { val: "flex" }],
                [EnumOption.WIDTH_PERCENT, { val: 100 }],
                [EnumOption.MARGIN, { val: 0 }],
                [EnumOption.HEIGHT, { val: 80 }],
            ],
        },
        {
            tag: "",
            class: ".icon-1",
            title: "Иконка 1",
            tags_options: [
                [EnumOption.WIDTH, { val: 100 }],
                [EnumOption.HEIGHT, { val: 100 }],
                [
                    EnumOption.BACKGROUND_IMAGE,
                    {
                        val: "/resource/img/constructor_default/block_10/1681815349_643e773584135.png",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_REPEAT,
                    {
                        val: "no-repeat",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_POSITION,
                    { val: "center", edit_option: EnumEditOption.NONEDITABLE },
                ],
            ],
        },
        {
            tag: "",
            class: ".icon-2",
            title: "Иконка 2",
            tags_options: [
                [EnumOption.WIDTH, { val: 100 }],
                [EnumOption.HEIGHT, { val: 100 }],
                [
                    EnumOption.BACKGROUND_IMAGE,
                    {
                        val: "/resource/img/constructor_default/block_10/1681815360_643e7740a125d.png",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_REPEAT,
                    {
                        val: "no-repeat",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_POSITION,
                    { val: "center", edit_option: EnumEditOption.NONEDITABLE },
                ],
            ],
        },
        {
            tag: "",
            class: ".icon-3",
            title: "Иконка 3",
            tags_options: [
                [EnumOption.WIDTH, { val: 100 }],
                [EnumOption.HEIGHT, { val: 100 }],
                [
                    EnumOption.BACKGROUND_IMAGE,
                    {
                        val: "/resource/img/constructor_default/block_10/1681815368_643e7748a28c1.png",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_REPEAT,
                    {
                        val: "no-repeat",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_POSITION,
                    { val: "center", edit_option: EnumEditOption.NONEDITABLE },
                ],
            ],
        },
        {
            tag: "",
            class: ".icon-4",
            title: "Иконка 4",
            tags_options: [
                [EnumOption.WIDTH, { val: 100 }],
                [EnumOption.HEIGHT, { val: 100 }],
                [
                    EnumOption.BACKGROUND_IMAGE,
                    {
                        val: "/resource/img/constructor_default/block_10/1681815379_643e77534836e.png",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_REPEAT,
                    {
                        val: "no-repeat",
                        edit_option: EnumEditOption.NONEDITABLE,
                    },
                ],
                [
                    EnumOption.BACKGROUND_POSITION,
                    { val: "center", edit_option: EnumEditOption.NONEDITABLE },
                ],
            ],
        },
        {
            tag: "",
            class: '[class^="text-"]',
            title: "Текста",
            tags_options: [[EnumOption.FONT_SIZE, { val: 15 }]],
            tags_options_mobile: [
                [EnumOption.DISPLAY, { val: "flex" }],
                [EnumOption.ALIGN_ITEMS, { val: "center" }],
                [EnumOption.WIDTH_PERCENT, { val: 60 }],
            ],
        },
        {
            tag: "",
            class: ".text-1",
            title: "Текст 1",
            text: "Готовое решение для организация отдела продаж и обработки лидов",
            tags_options: [],
        },
        {
            tag: "",
            class: ".text-2",
            title: "Текст 2",
            text: "Гибкость настройки под каждую нишу. Создание собственных полей и статусов",
            tags_options: [],
        },
        {
            tag: "",
            class: ".text-3",
            title: "Текст 3",
            text: "Отслеживание эффективности отдела продаж",
            tags_options: [],
        },
        {
            tag: "",
            class: ".text-4",
            title: "Текст 4",
            text: "Права доступа для разных ролей сотрудников",
            tags_options: [],
        },
    ],
    html_variants: [
        [
            "Картинка - описание",
            `
                    <div class="wrp">
                        <div class="conteiner">
                            <div class="img"></div>

                            <div class="wrp-right">
                                <h2 contenteditable></h2>
                                <div class="wrp-items">
                                
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
                                    <div>
                                        <div class="icon-4"></div>
                                        <div contenteditable class="text-4"></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                `,
        ],
        [
            "Описание - картинка",
            `
                    <div class="wrp">
                        <div class="conteiner">

                            <div class="wrp-right">
                                <h2 contenteditable></h2>
                                <div class="wrp-items">
                                
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
                                    <div>
                                        <div class="icon-4"></div>
                                        <div contenteditable class="text-4"></div>
                                    </div>

                                </div>
                            </div>

                            <div class="img"></div>

                        </div>
                    </div>
                `,
        ],
    ],
});
