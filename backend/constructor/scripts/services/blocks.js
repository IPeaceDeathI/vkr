import Api from "@/classes/Api";
import { getRandomInt } from "@/helpers/helpers";
import { ModalHelper } from "@/helpers/modal";

async function addIdTags(tags) {
    tags.forEach((val, ind) => {
        val.id = val.class;
    });
    return tags;
}

export async function save_block_in_db(id, block, category_id = [1]) {
    ModalHelper.show_loading();
    let preview_src;
    block.tags = await addIdTags(block.tags);
    let json = await JSON.parse(JSON.stringify(block));
    preview_src = await get_block_preview(id, block);

    Api.update_block(id, json, category_id, preview_src)
        .then((result) => {
            ModalHelper.close_loading();
        })
        .catch((error) => {});
}

async function get_block_preview(id, json) {
    window.main.buffer.set_json_block(id, json);
    var approach_id = window.main.blocks_model.add_block(id);
    window.main.blocks_model.show_block(
        approach_id,
        window.main.blocks_view_space().wrapper,
        "appendTo"
    );
    window.main.blocks_model.add_class_to_block(approach_id, `id_${id}`);
    let result = false;
    const BLOCK_PREVIEW_WIDTH = 350;
    const width_scale = BLOCK_PREVIEW_WIDTH / $(`.id_${id}`).width();

    await html2canvas(document.querySelector(`.id_${id}`), {
        letterRendering: 1,
        allowTaint: true,
        useCORS: true,
        scale: width_scale,
    })
        .then((canvas) => {
            window.main.blocks_model.delete_block(approach_id);
            return Api.save_images_from_base64(canvas);
        })
        .then((image_src) => {
            result = image_src;
        })
        .catch((error) => {
            console.error(error);
        });
    return result;
}

export async function tempFuncSetBlock(block) {
    let id = getRandomInt();
    block.tags = await addIdTags(block.tags);
    window.main.buffer.set_json_block(id, block);
    var approach_id = window.main.blocks_model.add_block(id);
    window.main.blocks_model.show_block(
        approach_id,
        window.main.blocks_view_space().wrapper,
        "appendTo"
    );
}
export function show_all_block_from_db() {
    Api.getAllPublishedIds()
        .then((blocks_id) => {
            blocks_id.forEach(function (key) {
                const block_id = key["block_id"];
                try {
                    const approach_id =
                        window.main.blocks_model.add_block(block_id);
                    window.main.blocks_model.show_block(
                        approach_id,
                        window.main.blocks_view_space().wrapper,
                        "appendTo"
                    );
                } catch (error) {
                    console.log(`Не удалось вывести блок ${block_id}`);
                    console.log(error);
                }
            });
        })
        .catch((error) => {});
}
export async function save_allblocks_in_db(id_start = 0) {
    var blocks_names = [];
    for (var name in TMP_BLOCKS) {
        if (name < id_start) continue;
        blocks_names.push(name);
    }
    let index = 1;
    while (true) {
        console.log(
            "save block",
            index,
            blocks_names[index - 1],
            TMP_BLOCKS[blocks_names[index - 1]]
        );
        if (index > blocks_names.length) {
            break;
        }
        await save_block_in_db(null, TMP_BLOCKS[blocks_names[index - 1]]);
        index++;
    }
}

const TMP_BLOCKS = [
    {
        name: "Пункты",
        id_categories: [
            EnumCategories.ABOUT_THE_PROJECT,
            EnumCategories.BENEFITS,
        ],
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
                    [EnumOption.BACKGROUND_SIZE],
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
        ],
    },
    {
        name: "Заголовок с фоном",
        id_categories: [EnumCategories.COVER, EnumCategories.HEADING],
        settings: [["html_variant", "Заголовок с фоном"]],
        html_variants: [
            [
                "Заголовок с фоном",
                `
                    ${set_iframe("hdqidhqdqd")}
                    <div class="wrp-block">
                        <div class="conteiner">
                            <h1 contenteditable></h1>
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
                    [EnumOption.HEIGHT, { val: 100, unit: "%" }],
                    [EnumOption.WIDTH, { val: 100, unit: "%" }],
                ],
            },
            {
                tag: "",
                class: ".wrp-block",
                title: "Главный блок",
                tags_options: [
                    [
                        EnumOption.BACKGROUND_COLOR,
                        {
                            val: "#ffffff",
                            edit_option: EnumEditOption.NONEDITABLE,
                        },
                    ],
                    [
                        EnumOption.BACKGROUND_IMAGE,
                        {
                            val: "/resource/img/constructor_default/2/posledovatelnost-rem.jpeg",
                        },
                    ],
                    [
                        EnumOption.BACKGROUND_POSITION,
                        {
                            val: "center",
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
                        EnumOption.BACKGROUND_SIZE,
                        {
                            val: "cover",
                            edit_option: EnumEditOption.NONEDITABLE,
                        },
                    ],
                ],
                tags_options_tablet: [],
                tags_options_mobile: [],
            },
            {
                tag: "",
                class: ".conteiner",
                title: "Затемнение",
                tags_options: [
                    [EnumOption.PADDING, { val: [0, 10, 0, 10] }],
                    [EnumOption.HEIGHT, { val: 700 }],
                    [EnumOption.BACKGROUND_COLOR, { val: "#000000cc" }],
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.ALIGN_ITEMS, { val: "center" }],
                ],
                tags_options_mobile: [[EnumOption.HEIGHT, { val: 400 }]],
            },
            {
                tag: "",
                class: "h1",
                title: "Заголовок",
                text: "КАК НЕ ОШИБИТЬСЯ ПРИ ВЫБОРЕ ФИРМЫ ПО РЕМОНТУ КВАРТИРЫ",
                tags_options: [
                    [
                        EnumOption.WIDTH_PERCENT,
                        { val: 100, edit_option: EnumEditOption.NONEDITABLE },
                    ],
                    [EnumOption.COLOR, { val: "#ffffff" }],
                    [EnumOption.TEXT_ALIGN, { val: "center" }],
                    [EnumOption.FONT_SIZE, { val: 40 }],
                    [EnumOption.MARGIN, { val: 0 }],
                ],
                tags_options_tablet: [[EnumOption.FONT_SIZE, { val: 30 }]],
                tags_options_mobile: [[EnumOption.FONT_SIZE, { val: 25 }]],
            },
        ],
    },
    {
        name: "Картинка - Текст",
        id_categories: [EnumCategories.TEXT_BLOCK, EnumCategories.IMAGE],
        settings: [["html_variant", "Картинка - Текст"]],
        html_variants: [
            [
                "Картинка - Текст",
                `
                    <div class="wrp-block">
                        <div class="container">
                            <div class="img"><img></div>
                            <div class="wrp-content padding-left">
                                <div class="content">
                                    <h2 contenteditable></h2>
                                    <div contenteditable class="text"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
            ],
            [
                "Текст - Картинка",
                `
                    <div class="wrp-block">
                        <div class="container">
                            <div class="wrp-content">
                                <div class="content">
                                    <h2 contenteditable></h2>
                                    <div contenteditable class="text"></div>
                                </div>
                            </div>
                            <div class="img padding-left"><img></div>
                        </div>
                    </div>
                `,
            ],
        ],
        tags: [
            {
                class: ".wrp-block",
                title: "Главный блок",
                tags_options: [
                    [EnumOption.BACKGROUND_COLOR, { val: "#ffffff" }],
                    [EnumOption.HEIGHT_MIN, { val: 500 }],
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.JUSTIFY_CONTENT, { val: "space-around" }],
                    [EnumOption.PADDING, { val: [32, 0, 32, 0] }],
                ],
                tags_options_mobile: [
                    [EnumOption.WIDTH_PERCENT, { val: 100 }],
                    [EnumOption.ALIGN_ITEMS, { val: "center" }],
                ],
            },
            {
                class: ".container",
                title: "Контейнер",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.JUSTIFY_CONTENT, { val: "space-between" }],
                    [EnumOption.WIDTH, { val: 1000 }],
                ],
                tags_options_tablet: [
                    [EnumOption.WIDTH_PERCENT, { val: 100 }],
                    [EnumOption.PADDING, { val: [0, 16, 0, 16] }],
                ],
                tags_options_mobile: [
                    [EnumOption.WIDTH_PERCENT, { val: 100 }],
                    [EnumOption.FLEX_WRAP, { val: "wrap" }],
                ],
            },
            {
                class: ".img",
                title: "Блок картинка",
                tags_options: [
                    [EnumOption.WIDTH_PERCENT, { val: 50 }],
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.ALIGN_ITEMS, { val: "center" }],
                ],
                tags_options_mobile: [[EnumOption.WIDTH_PERCENT, { val: 100 }]],
            },
            {
                class: "img",
                title: "Картинка",
                tags_options: [
                    [
                        EnumOption.IMAGE,
                        {
                            val: "/resource/img/constructor_default/portfolio/img1.jpg",
                        },
                    ],
                    [EnumOption.WIDTH_PERCENT, { val: 100 }],
                ],
            },
            {
                class: ".wrp-content",
                title: "Блок текст",
                tags_options: [
                    [EnumOption.WIDTH_PERCENT, { val: 50 }],
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.ALIGN_ITEMS, { val: "center" }],
                ],
                tags_options_mobile: [[EnumOption.WIDTH_PERCENT, { val: 100 }]],
            },
            {
                class: ".padding-left",
                title: "Отступ второго блока",
                tags_options: [[EnumOption.PADDING_LEFT, { val: 50 }]],
                tags_options_tablet: [[EnumOption.PADDING_LEFT, { val: 32 }]],
                tags_options_mobile: [
                    [EnumOption.PADDING_LEFT, { val: 0 }],
                    [EnumOption.PADDING_TOP, { val: 32 }],
                ],
            },
            {
                class: ".text",
                title: "Текст",
                text: `Несколько слов о том, кто написал данный текст. Меня зовут Костин Сергей Евгеньевич.
                    Я эксперт в ремонтах и строительстве.
                    Проживаю в Москве.
                    Выпускник Московского Государственного Строительного Университета.
                    Мне 50 лет.
                    Женат, двое детей.
                    Дружу и сотрудничаю с Мусиным Ришатом и Лесконогом Юрием.
                    Ришат с 90 года в строительстве,
                    Юрий имеет учёную степень
                    кандидата технических наук.
                    У нас подобралась дружная команда профессионалов, имеющая большой опыт в профильной специальности.`,
                tags_options: [[EnumOption.FONT_SIZE, { val: 20 }]],
            },
            {
                class: "h2",
                title: "Заголовок",
                text: `Здравствуйте`,
                tags_options: [
                    [EnumOption.FONT_SIZE, { val: 30 }],
                    [EnumOption.TEXT_ALIGN, { val: "center" }],
                    [EnumOption.PADDING, { val: 0 }],
                    [EnumOption.MARGIN_BOTTOM, { val: 16 }],
                ],
            },
        ],
    },
    {
        name: "Три заголовка",
        id_categories: [EnumCategories.HEADING],
        settings: [["html_variant", "Три заголовка"]],
        html_variants: [
            [
                "Три заголовка",
                `
                    <div class="wrp-block">
                        <div class="container">
                            <b contenteditable class="up"></b>
                            <h2 class="section-h2" contenteditable></h2>
                            <b contenteditable class="bottom"></b>
                        </div>
                    </div>
                `,
            ],
        ],
        tags: [
            {
                tag: "",
                class: ".wrp-block",
                title: "Главный блок",
                tags_options: [
                    [EnumOption.BACKGROUND_COLOR, { val: "#ffffff" }],
                    [EnumOption.PADDING, { val: [40, 0, 40, 0] }],
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.JUSTIFY_CONTENT, { val: "center" }],
                ],
                tags_options_modile: [[EnumOption.WIDTH, { val: 380 }]],
            },
            {
                class: ".container",
                title: "Контейнер",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.JUSTIFY_CONTENT, { val: "center" }],
                    [EnumOption.FLEX_DIRECTION, { val: "column" }],
                    [EnumOption.WIDTH, { val: 1000 }],
                ],
                tags_options_tablet: [
                    [EnumOption.WIDTH_PERCENT, { val: 100 }],
                    [EnumOption.PADDING, { val: [0, 16, 0, 16] }],
                ],
                tags_options_mobile: [
                    [EnumOption.WIDTH_PERCENT, { val: 100 }],
                    [EnumOption.FLEX_WRAP, { val: "wrap" }],
                ],
            },
            {
                tag: "",
                class: "b.up",
                title: "Верхний заголовок",
                text: "Полезно понимать",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "block" }],
                    [EnumOption.COLOR, { val: "#000000" }],
                    [EnumOption.FONT_SIZE, { val: 20 }],
                    [EnumOption.TEXT_TRANSFORM, { val: "uppercase" }],
                    [EnumOption.TEXT_ALIGN, { val: "center" }],
                ],
            },
            {
                tag: "",
                class: "h2",
                title: "Главный заголовок",
                text: "Про форумы. Ремонтные и не только",
                tags_options: [
                    [EnumOption.COLOR, { val: "#000000" }],
                    [EnumOption.FONT_SIZE, { val: 36 }],
                    [EnumOption.TEXT_TRANSFORM, { val: "uppercase" }],
                    [EnumOption.TEXT_ALIGN, { val: "center" }],
                    [EnumOption.MARGIN, { val: [16, 0, 16, 0] }],
                ],
            },
            {
                tag: "",
                class: "b.bottom",
                title: "Нижний заголовок",
                text: "Или почему всем интересно почитать",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "block" }],
                    [EnumOption.COLOR, { val: "#000000" }],
                    [EnumOption.FONT_SIZE, { val: 20 }],
                    [EnumOption.TEXT_TRANSFORM, { val: "none" }],
                    [EnumOption.TEXT_ALIGN, { val: "center" }],
                ],
            },
        ],
    },
    {
        name: "Текст - кнопка",
        id_categories: [EnumCategories.BUTTON],
        settings: [["html_variant", "Текст - кнопка"]],
        tags: [
            {
                class: ".wrp-block",
                title: "Главный блок",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.JUSTIFY_CONTENT, { val: "center" }],
                    [EnumOption.HEIGHT_MIN, { val: 220 }],
                    [EnumOption.BACKGROUND_COLOR, { val: "#f3f3f3" }],
                    [EnumOption.FONT_SIZE, { val: 20 }],
                    [EnumOption.COLOR, { val: "#000000" }],
                    [EnumOption.PADDING, { val: [20, 5, 20, 5] }],
                ],
                tags_options_mobile: [
                    [EnumOption.FLEX_DIRECTION, { val: "column" }],
                    [EnumOption.ALIGN_ITEMS, { val: "center" }],
                ],
            },
            {
                class: ".wrp-text",
                title: "Блок контента",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.WIDTH, { val: 700 }],
                    [EnumOption.ALIGN_ITEMS, { val: "center" }],
                    [EnumOption.JUSTIFY_CONTENT, { val: "center" }],
                    [EnumOption.PADDING, { val: [0, 50, 0, 50] }],
                ],
                tags_options_mobile: [
                    [EnumOption.WIDTH, { val: 380 }],
                    [EnumOption.PADDING, { val: [15, 50, 30, 50] }],
                ],
            },
            {
                class: ".wrp-btn",
                title: "Блок кнопки",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.ALIGN_ITEMS, { val: "center" }],
                    [EnumOption.WIDTH, { val: 700 }],
                    [EnumOption.JUSTIFY_CONTENT, { val: "center" }],
                ],
            },
            {
                class: ".up",
                title: "Сообщение 1",
                text: "Пройдите тест и запишитесь на оценку ремонта вашего помещения.",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "block" }],
                    [EnumOption.FONT_SIZE, { val: 22 }],
                ],
                tags_options_mobile: [],
            },
            {
                class: ".bottom",
                title: "Сообщение 2",
                text: "Лживых скидок не будет",
                tags_options: [
                    [EnumOption.DISPLAY, { val: "block" }],
                    [EnumOption.FONT_WEIGHT],
                    [EnumOption.FONT_SIZE, { val: 22 }],
                ],
            },
            {
                class: "a",
                title: "Кнопка",
                text: "Пройти тест",
                tags_options: [
                    [EnumOption.FONT_SIZE, { val: 16 }],
                    [EnumOption.COLOR, { val: "#ffffff" }],
                    [EnumOption.DISPLAY, { val: "flex" }],
                    [EnumOption.BACKGROUND_COLOR, { val: "#fc7256" }],
                    [EnumOption.PADDING, { val: 15 }],
                    [EnumOption.ALIGN_ITEMS, { val: "center" }],
                    [EnumOption.HEIGHT, { val: 60 }],
                    [EnumOption.WIDTH, { val: 220 }],
                    [EnumOption.TEXT_ALIGN, { val: "center" }],
                    [EnumOption.JUSTIFY_CONTENT, { val: "center" }],
                    [EnumOption.HREF, { val: "#popup:noksquiz_1" }],
                    [EnumOption.POINTER_EVENTS, { val: "pointer-events" }],
                    [EnumOption.TEXT_DECORATION, { val: "none" }],
                ],
            },
        ],
        html_variants: [
            [
                "Текст - кнопка",
                `
                    <div class="wrp-block">
                        <div class="wrp-text">
                            <div class="content">
                                <b class="up" contenteditable="true"></b>
                                <b class="bottom" contenteditable="true"></b>
                            </div>
                        </div>
                        <div class="wrp-btn">
                            <a class="btn"></a>
                        </div>
                    </div>
                `,
            ],
            [
                "Кнопка - текст",
                `
                    <div class="wrp-block">
                        <div class="wrp-btn">
                            <a class="btn"></a>
                        </div>
                        <div class="wrp-text">
                            <div class="content">
                                <b class="up" contenteditable="true"></b>
                                <b class="bottom" contenteditable="true"></b>
                            </div>
                        </div>
                    </div>
                `,
            ],
        ],
    },
];
