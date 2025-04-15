BLOCKS[102] = {
    name: 'Текст в две колонки',
    id_categories: [
        EnumCategories.TEXT_BLOCK,
        EnumCategories.COLUMNS,
    ],
    settings:[
        ['html_variant', 'Текст в две колонки'],
    ],
    html_variants:[
        [
            'Текст в две колонки',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="wrp-content">
                            <div class="content padding-right">
                                <h2 contenteditable></h2>
                                <div contenteditable class="descr"></div>
                                <div contenteditable class="text text-1"></div>
                            </div>
                             <div class="content padding-left">
                                <div contenteditable class="text text-2"></div>
                            </div>
                        </div>
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
            class: '.wrp-content',
            title: 'Блок текст',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex'}],
                [EnumOption.ALIGN_ITEMS, {val:'flex-start'}],
            ],
            tags_options_mobile: [
                [EnumOption.FLEX_DIRECTION, {val:'column'}],
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ]
        },
        {
            class: '.padding-right',
            title: 'Отступ первого блока',
            tags_options: [
                [EnumOption.PADDING_RIGHT, {val:16, edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING_RIGHT, {val:16, edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING_RIGHT, {val:0, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING_TOP, {val:0}],
            ],
        },
        {
            class: '.padding-left',
            title: 'Отступ второго блока',
            tags_options: [
                [EnumOption.PADDING_LEFT, {val:16, edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.PADDING_LEFT, {val:16, edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING_LEFT, {val:0, edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING_TOP, {val:12}],
            ],
        },
        {
            class: 'h2',
            title: 'Заголовок',
            text: `Simplicity is about subtracting the obvious and adding the meaningful`,
            tags_options: [
                [EnumOption.FONT_SIZE, {val:30}],
                [EnumOption.TEXT_ALIGN, {val:'left'}],
                [EnumOption.PADDING, {val:0}],
                [EnumOption.MARGIN_BOTTOM, {val:16}],
            ]
        },
        {
            class: '.descr',
            title: 'Подзаголовок',
            text: `Projection equipment: slide projectors, presentations, overhead projectors, and computer projectors.`,
            tags_options: [
                [EnumOption.FONT_SIZE, {val:14}],
                [EnumOption.MARGIN, {val:[0,0,32,0]}],
                [EnumOption.COLOR, {val:'#cccccc'}],
            ]
        },
        {
            class: '.content',
            title: 'Колонки',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:50, edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100, edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.text',
            title: 'Текст',
            text: `Visual aids are often used to help audiences of informative and persuasive speeches understand the topic being presented. Visual aids can play a large role in how the audience understands and takes in information that is presented. There are many different types of visual aids that range from handouts to presentations. The type of visual aid a speaker uses depends on their preference and the information they are trying to present.Each type of visual aid has pros and cons that must be evaluated to ensure it will be beneficial to the overall presentation. Before incorporating visual aids into speeches, the speaker should understand that if used incorrectly, the visual will not be an aid, but a distraction.`,
            tags_options: [
                [EnumOption.FONT_SIZE, {val:16}], 
            ],
        },
        {
            class: '.text-1',
            title: 'Текст слева',
            text: `Book design is the art of incorporating the content, style, format, design, and sequence of the various components of a book into a coherent whole. In the words of Jan Tschichold, book designer, "methods and rules upon which it is impossible to improve, have been developed over centuries. To produce perfect books, these rules have to be brought back to life and applied."`,
        },
        {
            class: '.text-2',
            title: 'Текст справа',
            text: `Visual aids are often used to help audiences of informative and persuasive speeches understand the topic being presented. Visual aids can play a large role in how the audience understands and takes in information that is presented. There are many different types of visual aids that range from handouts to presentations. The type of visual aid a speaker uses depends on their preference and the information they are trying to present.Each type of visual aid has pros and cons that must be evaluated to ensure it will be beneficial to the overall presentation. Before incorporating visual aids into speeches, the speaker should understand that if used incorrectly, the visual will not be an aid, but a distraction.`,
        },
    ],
};