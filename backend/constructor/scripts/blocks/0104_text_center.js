BLOCKS[104] = {
    name: 'Текст в центре',
    id_categories: [
        EnumCategories.TEXT_BLOCK,
    ],
    settings:[
        ['html_variant', 'Текст в центре'],
    ],
    html_variants:[
        [
            'Текст в центре',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div contenteditable class="descr"></div>
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
                [EnumOption.PADDING, {val:[60,0,60,0]}],
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_modile: [
                [EnumOption.WIDTH, {val:380}],
            ],
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_DIRECTION, {val:'column', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:1000}],
                [EnumOption.PADDING, {val:[0,16,0,16]}],
                [EnumOption.WIDTH_PERCENT, {val:60}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:80}], 
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.FLEX_WRAP, {val:'wrap'}],
            ],
        },
        {
            class: '.descr',
            title: 'Текст',
            text: 'Беспроводная охранная система — лучший способ защиты вашей квартиры от ограбления, пожара и утечек. Выберите нужные функции, управляйте домом и контролируйте его состояние через смартфон.',
            tags_options: [
                [EnumOption.DISPLAY, {val:'block', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.COLOR, {val:'#000000'}],
                [EnumOption.FONT_SIZE, {val:24}],
                [EnumOption.TEXT_TRANSFORM, {val:'none'}],
                [EnumOption.TEXT_ALIGN, {val:'center'}],
            ],
            tags_options_mobile: [
                [EnumOption.FONT_SIZE, {val:20}],
            ],
        },
    ],
};