// TODO after checking tinymce unsupport "current_text_editor"

import { ModalHelper } from "@/helpers/modal";
import BlocksViewSpace from "@/services/BlocksViewSpace";
import BlocksModel from "@/models/Blocks";
import PageModel from "@/models/Page";
import Buffer from "@/services/Buffer";
import MessagesIndicator from "@/services/MessagesIndicator";
import EventHanger from "@/services/EventHanger";
import PopUpItems from "@/classes/PopUpItems";
import { Menu } from "@/menus/Menu";
import LeftMenu from "@/menus/LeftMenu";
import TopMenu from "@/menus/TopMenu";
import { BlockMenuTablet, BlockMenuMobile, BlockMenu } from "@/menus/BlockMenu";
import { unhashBase } from "@/helpers/helpers";
import { Page, Template } from "@/classes/ProjectEntities";
import Api from "@/classes/Api";
import { get_site_preview } from "@/services/services";
import BlockEditor from "@/editors/BlockEditor";
import { EnumMessagesStatus } from "@/services/MessagesIndicator";
import { AutosaveManager } from "./services/LocalStorageManagers";
// import { zero_editor_app } from "#/app/zero_editor";
// import { tempFuncSetBlock } from "@/services/blocks";

class MainState {
    get_width_scroll() {
        var min = this.get_min_width();
        var max = this.get_width();
        var box = $(`<div class="el-range">`);
        const range = $(`<input type="range" value="${max}" 
                          min="${min}" 
                          max="${max}"/>`).css("background-size", max * 1.5);
        const number = $(`<input type="number" value="${max}">`);
        range.on("input", function () {
            var val = $(this).val();
            window.main.blocks_view_space().resize(val);
        });
        number.on("change", function () {
            var val = $(this).val();
            window.main.blocks_view_space().resize(val);
        });
        range.appendTo(box);
        number.appendTo(box);
        return box;
    }
    reset_width(width) {
        if (width < this.get_min_width()) {
            this.change_to_smaller();
        } else if (width > this.get_width()) {
            this.change_to_biggest();
        }
    }
    prepare_view() {
        window.main.menu_top.set_scroll_in_wrapper(this.get_width_scroll());
        this.select_button();
        window.main.blocks_view_space().resize(this.get_width());
    }
    select_button() {
        var _class = this._get_button_class();
        window.main.menu_top.select_toolbal_button(_class);
    }
    get_min_width() {}
    get_width() {}
    change_to_smaller() {}
    change_to_biggest() {}
    _get_button_class() {}
}
export class MainStateMobile extends MainState {
    change_to_smaller() {
        return;
    }
    change_to_biggest() {
        window.main.change_main_state(new MainStateTablet());
    }
    get_width() {
        return 430;
    }
    create_block_menu(block) {
        return new BlockMenuMobile(block);
    }
    get_min_width() {
        return 0;
    }
    _get_button_class() {
        return "btn-change-mobile";
    }
}

export class MainStateTablet extends MainState {
    change_to_smaller() {
        window.main.change_main_state(new MainStateMobile());
    }
    change_to_biggest() {
        window.main.change_main_state(new MainStateDesktop());
    }
    get_width() {
        return 1024;
    }
    get_min_width() {
        return 430 + 1;
    }
    create_block_menu(block) {
        return new BlockMenuTablet(block);
    }
    _get_button_class() {
        return "btn-change-tablet";
    }
}

export class MainStateDesktop extends MainState {
    change_to_smaller() {
        window.main.change_main_state(new MainStateTablet());
    }
    change_to_biggest() {
        return;
    }
    get_width() {
        var width = $(".constructor-page").width();
        if (width < this.get_min_width()) width = this.get_min_width();
        return width;
    }
    get_min_width() {
        return 1024 + 1;
    }
    create_block_menu(block) {
        return new BlockMenu(block);
    }
    _get_button_class() {
        return "btn-change-desktop";
    }
}
class App implements Main {
    current_text_editor;
    has_change;
    menu_is_hide;
    block_menu;
    id_page;
    id_tpl;
    id_site;
    state;
    blocks_view;
    blocks_model;
    page_model;
    buffer;
    message_indicator;
    menu_left;
    menu_top;
    main_menu;
    menus_is_hide;
    project_entity;
    env_params;
    constructor() {
        //Main
        this.id_page =
            new URL(document.location).searchParams.get("id_page") ?? false;
        this.id_tpl =
            new URL(document.location).searchParams.get("id_tpl") ?? false;
        this.id_site = $("[data-id-site]").val();

        this.project_entity = this.id_page ? new Page() : new Template();

        this.current_text_editor = null;
        this.has_change = false;
        this.menu_is_hide = false;
        //env params
        this.env_params = JSON.parse($("#env-params").text());
        //state
        this.state = new MainStateDesktop();
        //BlocksViewSpace
        this.blocks_view = new BlocksViewSpace();

        //BlocksModel
        this.blocks_model = new BlocksModel();

        //PageModel
        this.page_model = new PageModel();

        this.buffer = new Buffer();
        this.message_indicator = new MessagesIndicator();

        this.#hang_events();
    }

    //Menus
    create_left_menu() {
        this.menu_left = new LeftMenu();
    }
    get_page_hash_id(): number {
        return this.env_params.page_hash_id;
    }
    create_top_menu() {
        this.menu_top = new TopMenu();
        this.#prepare_view_to_change_state();
    }
    create_main_menu() {
        this.main_menu = new Menu(".menu-triple-two");
    }
    delete_main_menu() {
        this.main_menu.delete();
        delete this.main_menu;
    }
    create_block_menu(block) {
        if (this.block_menu != null) this.delete_block_menu();
        this.block_menu = this.state.create_block_menu(block);
    }
    delete_block_menu() {
        this.block_menu.delete();
        delete this.block_menu;
    }
    isUserAdmin() {
        return this.env_params.admin ?? false;
    }
    isUserTester() {
        return this.isUserAdmin() || (this.env_params.tester ?? false);
    }
    isUserBlockCreator() {
        return this.isUserAdmin() || (this.env_params.block_creator ?? false);
    }
    hide_menus() {
        this.block_menu?.hide();
        this.menu_left?.hide();
        this.main_menu?.hide();
        this.menu_top?.take_full_width();
        $(".body-table-main").css("margin", "0");
        this.blocks_view_space().resize(
            document.querySelector(".constructor-page").clientWidth
        );
        this.menus_is_hide = true;
    }
    show_menus() {
        this.block_menu?.show();
        this.menu_left?.show();
        this.main_menu?.show();
        this.menu_top?.take_standart_width();
        $(".body-table-main").css("margin-left", "288px");
        this.blocks_view_space().resize(
            document.querySelector(".constructor-page").clientWidth
        );
        this.menus_is_hide = false;
    }
    //End menus
    //Save
    async save_page() {
        ModalHelper.show_loading();

        const [url_save, ajax_method] =
            this.project_entity.get_url_for_save() ?? ["", ""];
        Api.save_project(
            ajax_method,
            url_save,
            await this.#collect_request_data()
        );

        ModalHelper.close_loading();
    }
    async #collect_request_data() {
        let request_data = {
            blocks_structure: JSON.stringify(
                window.main.blocks_model.get_model_as_json()
            ),
            pages_options: JSON.stringify(
                window.main.page_model.get_model_as_json()
            ),
        };
        const preview = await get_site_preview();
        if (preview) {
            request_data["preview_src"] = preview;
        }
        return request_data;
    }
    //End Save
    loading_zero_editor(): void {
        const focused_block_id = this.blocks_model.get_focused_block();
        if (focused_block_id !== null) {
            this.blocks_model
                .get_block_by_id(focused_block_id)
                .get_element_html()
                .append("<div noks-zero-editor-target></div>");
            zero_editor_app.mount("[noks-zero-editor-target]");
        }
    }
    //Render
    render_workspace() {
        this.create_main_menu();
        this.create_left_menu();
        this.create_top_menu();
        this.blocks_view_space().resize(
            document.querySelector(".constructor-page").clientWidth
        );
        PopUpItems.main();
    }
    primary_render_project() {
        let page_hash = unhashBase($("#json").text()) ?? {};
        page_hash = this.#support_old_version(page_hash);

        if (page_hash.blocks_structure != "") {
            this.blocks_model.set_model_from_json(page_hash.blocks_structure);
        }
        this.page_model.set_model_from_json(page_hash.pages_options);

        setTimeout(AutosaveManager.init, 1000);
    }
    prepare_workspace() {
        if (this.isUserBlockCreator()) {
            const block_id = localStorage.getItem("noksTesterLastEditedBlock");
            if (
                block_id &&
                JSON.parse(localStorage.getItem("noksAutoopenEditorChange"))
            ) {
                new BlockEditor(block_id);
            }
        }
    }
    #support_old_version(page_hash) {
        if (page_hash.blocks_structure == null) {
            const blocks_structure = page_hash;
            page_hash = {};
            page_hash.blocks_structure = blocks_structure;
        }
        if (page_hash.pages_options == null) {
            page_hash.pages_options = [
                {
                    id: EnumOption.FONT_FAMILY,
                    val: "Open Sans",
                },
            ];
        }
        return page_hash;
    }
    //End render
    //TextEditor
    has_text_editor() {
        return this.current_text_editor != null;
    }
    set_text_editor(text_editor) {
        if (this.current_text_editor != null) return;
        this.current_text_editor = text_editor;
    }
    close_text_editor() {
        if (this.current_text_editor === null) return;
        try {
            this.current_text_editor.trumbowyg("destroy");
            this.current_text_editor = null;
        } catch (error) {
            new MessagesIndicator().showPopUpMessage({
                message: `Произошла ошибка при закрытии редактора текста, пожалуйста,
                                                      попытайтесь сохранить текущие изменения и перезагрузите страницу`,
                status: EnumMessagesStatus.ERROR,
                timeout: 5000,
            });
        }
        this.current_text_editor = null;
    }
    get_text_editor() {
        return this.current_text_editor;
    }
    //End TextEditor
    get_state() {
        return this.state;
    }
    blocks_view_space() {
        return this.blocks_view;
    }
    //State
    change_main_state(state) {
        if (this.state.constructor.name == state.constructor.name) return;
        this.state = state;
        this.#prepare_view_to_change_state();
        this.blocks_model.re_render_all_block();
        if (this.block_menu != null) {
            var block = this.block_menu.block;
            this.delete_block_menu();
            this.create_block_menu(block);
            block.scroll_to_me();
        }
    }
    #prepare_view_to_change_state() {
        this.state.prepare_view();
    }

    #hang_events() {
        EventHanger.hang_overlay();
        EventHanger.hang_sortable();
        EventHanger.backgroundPlaceholder();
        EventHanger.disabledTagButtonEvent();
        EventHanger.disabledTagAEvent();
        EventHanger.clickContentEditable();
        EventHanger.btnShowPopUpBlocks();
        EventHanger.close_text_editor();
        EventHanger.undo_manager();
        EventHanger.widowResize();
    }
}

// точка входа
ModalHelper.show_loading();
window.main = new App();
PopUpItems.obj_main = window.main;
window.main.render_workspace();
window.main.prepare_workspace();
window.main.primary_render_project();
ModalHelper.close_loading();

// await window.navigator.clipboard.readText()
// tempFuncSetBlock({
//     name: "Пункты",
//     id_categories: [EnumCategories.ABOUT_THE_PROJECT, EnumCategories.BENEFITS],
//     settings: [["html_variant", "Лист"]],
//     html_variants: [
//         [
//             "Лист",
//             `
//             <div class="wrp-block-1"><div>
//             `,
//         ],
//     ],
//     tags: [
//         // {
//         //     tag: "frame_content",
//         //     class: ".hdqidhqdqd",
//         //     title: "Фрейм",
//         //     entity_id: null,
//         //     id: null,
//         //     tags_options: [
//         //         // [EnumOption.WIDTH, { val: "100", unit: "%" }],
//         //         // [EnumOption.HEIGHT, { val: "100", unit: "%" }],
//         //     ],
//         // },
//         {
//             tag: "",
//             class: ".wrp-block-1",
//             title: "Главный блок",
//             tags_options: [
//                 [EnumOption.BACKGROUND_COLOR,{val:"#ff0000"}],
//                 [EnumOption.BACKGROUND_GRADIENT,{val:"linear-gradient(to right, #3494E6 0.5%, #EC6EAD 99%)"}],
//                 [EnumOption.WIDTH, { val: "100", unit: "%" }],
//                 [EnumOption.HEIGHT, { val: "600"}],
//             ],
//         },
//                 // [EnumOption.BACKGROUND_IMAGE,{val:''}],
//                 // [EnumOption.BACKGROUND_REPEAT],
//                 // [EnumOption.BACKGROUND_POSITION],
//         //         [EnumOption.LIST_STYLE_TYPE],
//         //         [EnumOption.BACKGROUND_SIZE, { val: 50, unit: "px" }],
//         //         [EnumOption.MARGIN_TOP],
//         //         [EnumOption.MARGIN_BOTTOM],
//         //         [EnumOption.MARGIN_RIGHT],
//         //         [EnumOption.PADDING_TOP],
//         //         [EnumOption.PADDING_BOTTOM],
//         //         [EnumOption.PADDING_RIGHT],
//         //         [EnumOption.PADDING_LEFT],
//         //         [EnumOption.MARGIN_LEFT],
//         //         [EnumOption.WIDTH, { val: "auto" }],
//         //         [EnumOption.HEIGHT, { val: "auto" }],
//         //         [EnumOption.TOP, { val: "auto" }],
//         //         [EnumOption.LEFT, { val: "auto" }],
//         //         [EnumOption.BACKGROUND_POSITION_X],
//         //         [EnumOption.BACKGROUND_POSITION_Y],
//         //         [EnumOption.HEIGHT_MIN, { val: 100 }],
//         //         [EnumOption.HEIGHT_MAX, { val: 100 }],
//         //         [EnumOption.WIDTH_MIN, { val: 100 }],
//         //         [EnumOption.WIDTH_MAX, { val: 100 }],
//         //         [EnumOption.FONT_WEIGHT, { val: 100 }],
//         //         [EnumOption.TEXT_ALIGN],
//         //         [EnumOption.COLOR],
//         //         [EnumOption.FLOAT],
//         //         [EnumOption.Z_INDEX],
//         //         [EnumOption.LINE_HEIGHT],
//         //         [EnumOption.TEXT_TRANSFORM],
//         //         [EnumOption.DISPLAY],
//         //         [EnumOption.IMAGE],
//         //         [EnumOption.HREF, { val: "4242423424" }],
//         //         [EnumOption.ATTR],
//         //         [EnumOption.BORDER, { val: [1, "none", "#FFFFFF"] }],
//         //         [EnumOption.CURSOR],
//         //         [EnumOption.POINTER_EVENTS],
//         //         [EnumOption.OVERFLOW],
//         //         [EnumOption.OVERFLOW_Y],
//         //         [EnumOption.OVERFLOW_X],
//         //         [EnumOption.OPACITY],
//         //         [EnumOption.ALIGN_CONTENT],
//         //         [EnumOption.BORDER_COLOR],
//         //         [EnumOption.BORDER_WIDTH],
//         //         [EnumOption.BORDER_STYLE],
//         //         [EnumOption.BORDER_RADIUS],
//         //         [EnumOption.OBJECT_POSITION{val:"center"}],
//         //         [EnumOption.OBJECT_FIT,{val:"cover"}],

//         //         [EnumOption.FLEX_DIRECTION],
//         //         [EnumOption.ALIGN_ITEMS],
//         //         [EnumOption.JUSTIFY_CONTENT],
//         //         [EnumOption.FLEX_WRAP],
//         //         [EnumOption.FLEX_BASIS],
//         //         [EnumOption.POSITION],
//         //         [EnumOption.FONT_FAMILY],

//         //         //-----

//         //         [EnumOption.DISPLAY, {val:'flex', edit_option: EnumEditOption.NONEDITABLE}],
//         //         [EnumOption.FLEX_WRAP, {val:'wrap', edit_option: EnumEditOption.NONEDITABLE}],
//         //         [EnumOption.JUSTIFY_CONTENT, {val:'center', edit_option : EnumEditOption.NONEDITABLE}],
//         //         [EnumOption.FONT_SIZE, {val:20}],
//         //         [EnumOption.TEXT_DECORATION],
//         //         [EnumOption.TEXT_ALIGN],
//         //         [EnumOption.COLOR, {val: '#ffffff'}],
//         //         [EnumOption.MARGIN_BOTTOM, { unit:'auto' }],
//         //         [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_1/1681142072_64343138b50b9.jpg'}],
//         //         [EnumOption.BACKGROUND_COLOR],
//         //         [EnumOption.ATTR, {name: "fsfsfs", val:"fdfsdfsdfsd"}],
//         //         [EnumOption.TEXT_DECORATION],

//         //         // [EnumOption.PADDING, {val:[40,0,40,0]}],
//             // ],
//         // },
//         // // {
//         // //     tag: '',
//         // //     class: 'h2',
//         // //     title: 'Главный заголовок',
//         // //     text: 'И ОПЯТЬ ЖЕ...',
//         // //     tags_options: [
//         // //         [EnumOption.FLEX_BASIS, {val:100, edit_option : EnumEditOption.NONEDITABLE}],
//         // //         [EnumOption.TEXT_ALIGN],
//         // //         [EnumOption.FONT_SIZE, {val:40}],
//         // //         [EnumOption.Z_INDEX, {val:40}],
//         // //         [EnumOption.COLOR, {val:'#ffffff'}],
//         // //     ]
//         // // },
//         // {
//         //     tag: "ul",
//         //     class: ".list-good",
//         //     title: "Списки good",
//         //     li_html: `<div class="icon-good"></div>
//         //     <div class="fsfsfsfs ${EnumLiTargeting.STRING}"></div>
//         //     <div class="${EnumLiTargeting.STRING}"></div>
//         //     <div class="${EnumLiTargeting.HTML}"></div>
//         //     <img class="${EnumLiTargeting.IMAGE}"></img>
//         //     <a  class="${EnumLiTargeting.HREF}"></a>`,
//         //     li_array: [
//         //         {
//         //             hrefs: ["sfsfsfsfs", "11fsfsfsfs"],
//         //             strings: ["sfsfsfsfs", "111fsfsfsfs"],
//         //             images: ["sfsfsfsfs", "11fsfsfsfs"],
//         //             htmls: [
//         //                 '<input class="fsfsfsfs" value="fsffsfsfsfsfsfsfsffsf"><select><option>test</option></select>',
//         //             ],
//         //         },
//         //     ],
//         //     tags_options: [
//         //         [
//         //             EnumOption.LIST_STYLE_TYPE, { edit_option: EnumEditOption.NONEDITABLE },
//         //         ],
//         //     ],
//         // },
//         // {
//         //     tag: 'ul',
//         //     class: '.list-bad',
//         //     title: 'Списки goobad',
//         //     li_html: `<div class="icon-good"></div>
//         //     <div class="fsfsfsfs ${EnumLiTargeting.STRING}"></div>
//         //     <div class="${EnumLiTargeting.STRING}"></div>
//         //     <div class="${EnumLiTargeting.HTML}"></div>
//         //     <img class="${EnumLiTargeting.IMAGE}"></img>
//         //     <a  class="${EnumLiTargeting.HREF}"></a>`,
//         //     li_array : [
//         //         {
//         //             hrefs:["sfsfsfsfs","11fsfsfsfs"],
//         //             strings:["sfsfsfsfs","111fsfsfsfs"],
//         //             images:["sfsfsfsfs","11fsfsfsfs"],
//         //             htmls:['<input class="fsfsfsfs" value="fsffsfsfsfsfsfsfsffsf"><select><option>test</option></select>']
//         //         },
//         //     ],
//         //     tags_options: [
//         //         [EnumOption.LIST_STYLE_TYPE, {edit_option : EnumEditOption.NONEDITABLE}],
//         //     ]
//         // },
//         // {
//         //     class: ".fsfsfsfs",
//         //     title: 'Пунктыfff',
//         //     tags_options: [
//         //         [EnumOption.TEXT_ALIGN],

//         //         [EnumOption.BACKGROUND_COLOR, {val:'#3366c'}],
//         //     ]
//         // },

//         // {
//         //     tag: '',
//         //     class: 'li',
//         //     title: 'Пункты',
//         //     tags_options: [
//         //         [EnumOption.DISPLAY, {val:'flex', edit_option : EnumEditOption.NONEDITABLE}],
//         //         [EnumOption.HEIGHT, {val:30}],
//         //         [EnumOption.WIDTH, {val:230}],

//         //     ]
//         // },
//         // {
//         //     tag:'',
//         //     class: '.icon-good',
//         //     title: 'Иконки левого блока',
//         //     tags_options: [
//         //         [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_1/good.png', edit_option : EnumEditOption.NONEDITABLE}],
//         //         [EnumOption.PADDING, {val:[20,20,20,20]}],
//         //         [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat', edit_option : EnumEditOption.NONEDITABLE}]
//         //     ]
//         // },
//         // {
//         //     tag:'',
//         //     class: '.icon-bad',
//         //     title: 'Иконки правого блока',
//         //     tags_options: [
//         //         [EnumOption.BACKGROUND_IMAGE, {val:'/resource/img/constructor_default/block_1/bad.png', edit_option : EnumEditOption.NONEDITABLE}],
//         //         [EnumOption.PADDING, {val:[20,20,20,20]}],
//         //         [EnumOption.BACKGROUND_REPEAT, {val:'no-repeat', edit_option : EnumEditOption.NONEDITABLE}]
//         //     ]
//         // },
//         // {
//         //     tag: '',
//         //     class: '.wrp-left-1 > h3',
//         //     title: 'Заголовок слева',
//         //     text: 'ВАЖНО:',
//         //     tags_options: [
//         //         [EnumOption.COLOR, {val:'#1212f4'}],
//         //         [EnumOption.FONT_SIZE, {val:40}],
//         //     ]
//         // },
//         // {
//         //     tag: '',
//         //     class: '.wrp-right-2 > h3',
//         //     title: 'Заголовок справа',
//         //     text: 'НЕ ВАЖНО:',
//         //     tags_options: [
//         //         [EnumOption.COLOR, {val:'#f32a2a'}],
//         //         [EnumOption.FONT_SIZE, {val:40}],
//         //     ]
//         // },
//         // {
//         //     tag: '',
//         //     class: '.arrow',
//         //     title: 'Стрелки',
//         //     tags_options: [
//         //         [EnumOption.DISPLAY, {val:'flex', show: ['none', 'flex']}],
//         //         [EnumOption.JUSTIFY_CONTENT, {val:'center', show: ['start', 'center']}],
//         //     ]
//         // },
//         // {
//         //     tag: '',
//         //     class: '[class^=bottom-txt]',
//         //     title: 'Нижние сообщения',
//         //     tags_options: [
//         //         [EnumOption.DISPLAY, {val:'flex', show: ['block', 'flex', 'none']}],
//         //         [EnumOption.JUSTIFY_CONTENT, {val:'center', show: ['start', 'center']}],
//         //     ]
//         // },
//         // {
//         //     tag: '',
//         //     class: '.bottom-txt-1',
//         //     title: 'Текст слева',
//         //     text: 'Когда умеешь делать это',
//         //     tags_options: [
//         //         [EnumOption.DISPLAY, {val:'flex', show: ['block', 'flex', 'none']}],
//         //         [EnumOption.JUSTIFY_CONTENT, {val:'center', show: ['start', 'center']}],
//         //     ]
//         // },
//         // {
//         //     tag: '',
//         //     class: '.bottom-txt-2',
//         //     title: 'Текст справо',
//         //     text: 'Это становится ненужным',
//         //     tags_options: [
//         //         [EnumOption.DISPLAY, {val:'flex', show: ['block', 'flex', 'none']}],
//         //         [EnumOption.JUSTIFY_CONTENT, {val:'center', show: ['start', 'center']}],
//         //     ]
//         // },
//     ],
// })
