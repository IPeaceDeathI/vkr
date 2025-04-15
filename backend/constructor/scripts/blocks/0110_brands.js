BLOCKS[110] = {
    name: 'Бренды',
    id_categories: [
        EnumCategories.PARTNERS,
    ],
    settings:[
        ['html_variant', 'Бренды'],
    ],
    html_variants:[
        [
            'Бренды',
            `
                <div class="wrp-block">
                    <div class="container">
                        <ul class="list"></ul>
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
                [EnumOption.PADDING, {val:[0,0,0,0], edit_option: EnumEditOption.NONEDITABLE}],
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
                [EnumOption.WIDTH, {val:1000}],
                [EnumOption.PADDING, {val:[32,0,32,0]}],
            ],
            tags_options_tablet: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH_PERCENT, {val:100}],
                [EnumOption.PADDING, {val:[32,16,32,16]}],
            ],
        },
        {
            tag: 'ul',
            class: 'ul.list',
            title: 'Список логотипов',
            li_html: `<div class="li-box">
                <div class="li-img">
                    <img class="img ${EnumLiTargeting.IMAGE}">
                </div>
            </div>`,
            li_array :  [
                {images:['/resource/img/constructor_default/0110/1683220588_6453e86c442fe.png'] },
                {images:['/resource/img/constructor_default/0110/1683220772_6453e92417eda.png'] },
                {images:['/resource/img/constructor_default/0110/1683220588_6453e86c442fe.png'] },
                {images:['/resource/img/constructor_default/0110/1683220665_6453e8b93465e.png'] },
                {images:['/resource/img/constructor_default/0110/1683220588_6453e86c442fe.png'] },
                {images:['/resource/img/constructor_default/0110/1683220772_6453e92417eda.png'] },
                {images:['/resource/img/constructor_default/0110/1683220665_6453e8b93465e.png'] },
                {images:['/resource/img/constructor_default/0110/1683220772_6453e92417eda.png'] },
                {images:['/resource/img/constructor_default/0110/1683220665_6453e8b93465e.png'] },
            ],
            tags_options: [
                [EnumOption.PADDING, {val:0, edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.FLEX_WRAP, {val:'wrap', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
            ]
        },
        {
            class: 'ul li',
            title: 'Элемент списка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
            ],
        },
        {
            class: '.li-box',
            title: 'Элемент списка',
            tags_options: [
                [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.ALIGN_ITEMS, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option: EnumEditOption.NONEDITABLE}],
                [EnumOption.PADDING, {val:[32,32,32,32], edit_option : EnumEditOption.NONEDITABLE}],
            ],
            tags_options_mobile: [
                [EnumOption.PADDING, {val:[16,0,16,0]}],
            ],
        },
        {
            class: '.li-img img',
            title: 'Иконки списка',
            tags_options: [
                [EnumOption.WIDTH, {val:120}],
                [EnumOption.MARGIN, {val:8}],
            ],
            tags_options_mobile: [
                [EnumOption.WIDTH, {val:100}],
                [EnumOption.MARGIN, {val:16}],
            ],
        },
    ],
};