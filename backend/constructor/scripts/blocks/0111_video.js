BLOCKS[111] = {
    name: 'Видео',
    id_categories: [
        EnumCategories.VIDEO,
    ],
    settings:[
        ['html_variant', 'Видео'],
    ],
    html_variants:[
        [
            'Видео',
            `
                <div class="wrp-block">
                    <div class="container">
                        <div class="iframe-box">
                            <iframe title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
                [EnumOption.BACKGROUND_IMAGE, {val:''}],
                [EnumOption.BACKGROUND_REPEAT,{edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.ADVANCED}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.ALIGN_ITEMS, {val:'center'}],
                [EnumOption.PADDING, {val:[32,0,32,0]}],
            ]
        },
        {
            class: '.container',
            title: 'Контейнер',
            tags_options: [
                [EnumOption.WIDTH, {val:1000}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[0,16,0,16]}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[0,0,0,0]}],
            ],
        },
        {
            class: '.iframe-box',
            title: 'Блок для видео',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'space-around', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_DIRECTION, {val:'row', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'nowrap', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.WIDTH, {val:1000}],
                [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/0111/1683307448_64553bb8cd988.jpeg'}],
                [EnumOption.BACKGROUND_REPEAT,{edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_SIZE, {val:'cover', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.BACKGROUND_POSITION, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ],
        },
        {
            class: 'iframe',
            title: 'Видео',
            tags_options: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.HEIGHT, {val:500}],
                [EnumOption.ATTR, {name:'src', val:''}],
            ],
            tags_options_mobile: [
                [EnumOption.HEIGHT, {val:240}],
            ],
        },
    ],
};