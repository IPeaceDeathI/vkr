import * as EditorsWrapperViews from "@/editors/EditorsWrapperViews";
import MenuDesigner from "@/classes/MenuDesigner";
import { rotateElement } from "@/helpers/helpers";
import Block from "@/classes/Block";
import { OptionBlock } from "@/menus/Menu";
import MessagesIndicator from "@/services/MessagesIndicator";
import { EnumMessagesStatus } from "@/services/MessagesIndicator";
import { AttributeEditor, BackgroundEditor } from "@/editors/TagEditors";

const BLOCK_MENU_MODE = {
    default: "default",
    zero: "zero",
};
class EditMode {
    menu;
    constructor(menu) {
        this.menu = menu;
    }
    preset() {
        this.menu.editors = [];
    }
    render() {
        return;
    }
    unset() {}
}
class EditModeDefault extends EditMode {
    constructor(menu) {
        super(menu);
    }
    render() {
        this.menu.render_settiong_options();
        this.menu.render_tags_options();
        this.menu.render_information();
    }
    unset() {
        this.menu.block.tags.forEach((tag) => {
            tag.get_jq().off("click.openEditor");
            tag.get_jq().off("contextmenu");
            tag.get_jq().off("mouseout.constructorFocus");
            tag.get_jq().off("mouseover.constructorFocus");
        });
        this.menu.editors.forEach(function (editor) {
            try {
                editor.delete();
            } catch {
                console.error(editor);
            }
        });
        this.menu.cleare_wrapper();
    }
}
class EditModeZero extends EditMode {
    constructor(menu) {
        super(menu);
    }
    render() {}
}

export class BlockMenu {
    /**
     *
     * @param {Block} block
     * @param {BLOCK_MENU_MODE} mode
     */
    constructor(block, mode = BLOCK_MENU_MODE.default) {
        if (!(block instanceof Block))
            throw "ТЫ пытааешься создать меню блока, но передаешь не блок";
        this.block = block;
        this.wrapper = $(`<div class="menu-options-element overflow-wrapper">
							<div class="overflow-box"></div>
						 </div>`).appendTo($(".menu-triple-box"));
        if (window.main.menus_is_hide) {
            this.hide();
        }
        this.#set_mode(mode);
        this.mode.preset();
        this.#render();
    }
    #set_mode(mode) {
        switch (mode) {
            case BLOCK_MENU_MODE.default:
                this.mode = new EditModeDefault(this);
                break;
            case BLOCK_MENU_MODE.zero:
                this.mode = new EditModeZero(this);
                break;
        }
    }
    cleare_wrapper() {
        this.wrapper.html("");
        this.#add_back_button();
    }
    delete() {
        this.wrapper.remove();
        this.mode.unset();
        window.main.menu_left.delete_device();
        window.main.menu_left.delete_zero_editor_button();
    }
    hide() {
        this.wrapper.css("display", "none");
    }
    show() {
        this.wrapper.css("display", "block");
    }
    hide_wrapers() {
        this.wrapper.find(".panel-select-div").each(function () {
            var options_wrapper = $(this).siblings(".tag-options-wrapper");
            if (options_wrapper.css("display") == "block") {
                options_wrapper.slideUp(0);
                rotateElement($(this).find("span"), 0);
            }
        });
    }
    show_wrapper(wrapper) {
        wrapper = wrapper.siblings(".tag-options-wrapper");
        var select = wrapper.siblings(".panel-select-div");
        if (wrapper.css("display") == "none") {
            wrapper.slideDown(0);
            rotateElement(select.find("span"), 180);
        }
        //TODO Тут неочень
        var top = Math.round(select.position().top);
        this.wrapper.animate({ scrollTop: top });
        // var top = Math.round(select.position().top);
        // console.log(11111, top);
        // this.wrapper.scrollTop(top);
        // console.log(11111, this.wrapper.scrollTop());
        // })
    }

    add_tag_option_to_wrapper_template(tag, option_block) {
        this._add_tag_option_to_wrapper(option_block, tag.tags_options, tag);
    }
    _add_tag_option_to_wrapper(option_block, tags_options, tag) {
        //Display
        var object = new EditorsWrapperViews.DisplayWrapperView(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        //Flex
        var object = new EditorsWrapperViews.FlexWrapperView(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        //Transform
        var object = new EditorsWrapperViews.TransformWrapper(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        //INDENT
        object = new EditorsWrapperViews.IdnentWrapper(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        //Stroke
        object = new EditorsWrapperViews.StrokeWrapperView(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        // Filling
        object = new EditorsWrapperViews.FillingWrapper(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        // if (wrapper) {
        //     wrapper.appendTo(option_block.options_wrapper);
        // }
        //Text
        object = new EditorsWrapperViews.TextWrapper(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        //Content
        object = new EditorsWrapperViews.ContentWrapperView(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        //Customization
        object = new EditorsWrapperViews.CustomizationWrapperView(tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        wrapper = null;
        //goals
        if (option_block.options_wrapper.html() != "") {
            new AttributeEditor(tag).render(option_block.options_wrapper);
        }
        //TODO  переделывай логиу нахуй
        tags_options.forEach((values) => {
            try {
                var tmp_array = values.get_editor(option_block.title);
                if (tmp_array == null) return;
                var panel_edit_box = tmp_array.panel_edit_box;
                var object = tmp_array.object;
                if (object != null) {
                    this.editors.push(object);
                }
                if (panel_edit_box == null) return;
                panel_edit_box.appendTo(option_block.options_wrapper);
            } catch (error) {
                console.log(error, values);
            }
        });
        let koztil = false;
        tags_options.forEach((option) => {
            if (option.editable()) {
                koztil = true;
                return;
            }
        });
        if (koztil) {
            //add_event
            option_block.title.on("mouseover", () => {
                this.block.wrapper.find(tag.class).addClass("tag-in-focus");
            });
            option_block.title.on("mouseout", () => {
                this.block.wrapper.find(tag.class).removeClass("tag-in-focus");
            });
            tag.jquery.on("mouseover.constructorFocus", (e) => {
                option_block.title.addClass("tag-in-focus");
                this.block.wrapper.find(tag.class).addClass("tag-in-focus");
                e.stopPropagation();
            });
            tag.jquery.on("mouseout.constructorFocus", (e) => {
                option_block.title.removeClass("tag-in-focus");
                this.block.wrapper.find(tag.class).removeClass("tag-in-focus");
                e.stopPropagation();
            });
            tag.get_jq().on("contextmenu", () => {
                tag.parent.add_to_context_menu(
                    tag.get_jq(),
                    option_block.title,
                    tag.title
                );
            });
            tag.get_jq().on("click.openEditor", (event) => {
                event.preventDefault(); // for tag a and button
                event.stopPropagation();
                window.main.block_menu.hide_wrapers();
                option_block.title.trigger("click");
            });
        }
    }
    #add_option_block(select_block, option) {
        var block = new OptionBlock(option);
        //Ивент для разворота опций внутри тега
        block.title.on("click", () => {
            if (block.options_wrapper.css("display") == "block") {
                block.options_wrapper.slideUp(200);
                rotateElement(block.span, 0);
            } else {
                block.options_wrapper.slideDown(200);
                rotateElement(block.span, 180);
            }
        });
        return block;
    }

    #render() {
        //TODO Избаиться от дублирования кода
        this.#add_back_button();
        window.main.menu_left.add_device(
            this.get_class_icons(),
            this.get_text_for_description()
        );
        window.main.menu_left.add_zero_editor_button();
        this.mode.render();
    }
    #add_back_button() {
        var span = $(`<span><<span>`).css("float", "left");
        var btn = MenuDesigner.get_block_menu_main_button(
            `${this.block.name} ${this.block.getBlockBDId()}`
        ).prepend(span);
        btn.appendTo(this.wrapper);
        btn.click(function () {
            window.main.blocks_model.remove_focus_from_block();
        });
    }
    #add_panel_select() {
        var select_block = MenuDesigner.get_panel_select_block();
        select_block.appendTo(this.wrapper);
        return select_block;
    }

    get_text_for_description() {
        return "Свойства применяются для всех устройств";
    }

    get_class_icons() {
        return "btn-change-desktop";
    }

    //for DEFAULT MODE
    render_settiong_options() {
        if (this.block.html_variants.size < 2) return;
        var select_block = this.#add_panel_select(); //Блока для всего содержимого менб
        this.block.settings.forEach((option) => {
            var option_block = this.#add_option_block(select_block, option);
            var panel_edit_box = $(`<div class="panel-edit-box">`);
            option
                .get_editor(this.block.html_variants, this.block.approach_id)
                .appendTo(panel_edit_box);
            panel_edit_box.appendTo(option_block.options_wrapper);
            option_block.option_block.appendTo(select_block);
        });
    }
    render_tags_options() {
        var select_block = this.#add_panel_select(); //Блок для всего содержимого менб

        this.block.tags.forEach((tag) => {
            var option_block = this.#add_option_block(select_block, tag);
            if (!tag.editable()) return;
            var panel_edit_box = $(`<div class="panel-edit-box">`);
            //get ul selector (КОСТЫЛЬ!!!)
            if (tag.tag == "ul") {
                tag.get_editor(option_block.title).appendTo(
                    option_block.options_wrapper
                );
            } else if (tag.tag == "frame_content") {
                this.editors.push(tag.set_click_event());
                return;
            }
            option_block.option_block.appendTo(select_block);
            this.add_tag_option_to_wrapper_template(tag, option_block);
            if (option_block.options_wrapper.html() == "") {
                option_block.option_block.remove();
            }
        });
    }

    render_information() {
        this.client_id_wrapper = $(
            `<div style="display:flex; flex-direction:column" class="panel-select-div">
                <span>id блока (для якорных ссылок)</span>
                <div style="display:flex;">
                    <span class="menu-client-id-viewer">${this.block.get_client_id()}</span>
                    <span class="menu-client-id-viewer-copy"></span>
                </div>
            </div>`
        );
        this.client_id_wrapper
            .find(".menu-client-id-viewer")
            .on("click", () => {
                this.#copy_client_id_information();
            });
        this.client_id_wrapper
            .find(".menu-client-id-viewer-copy")
            .on("click", () => {
                this.#copy_client_id_information();
            });
        const select_block = this.#add_panel_select(); //Блока для всего содержимого менб
        this.client_id_wrapper.appendTo(select_block);
    }
    async #copy_client_id_information() {
        try {
            await window.navigator.clipboard.writeText(
                this.block.get_client_id()
            );
            new MessagesIndicator().showPopUpMessage({
                message: "Скопировано",
                status: EnumMessagesStatus.NEUTRAL,
                timeout: 1000,
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export class BlockMenuTablet extends BlockMenu {
    constructor(block) {
        super(block);
    }
    add_tag_option_to_wrapper_template(tag, option_block) {
        this._add_tag_option_to_wrapper(
            option_block,
            tag.tags_options_tablet,
            tag
        );
    }

    get_text_for_description() {
        return "Свойства применяются для устройств шириной меньше 991";
    }
    get_class_icons() {
        return "btn-change-tablet";
    }
}
export class BlockMenuMobile extends BlockMenu {
    constructor(block) {
        super(block);
    }
    add_tag_option_to_wrapper_template(tag, option_block) {
        this._add_tag_option_to_wrapper(
            option_block,
            tag.tags_options_mobile,
            tag
        );
    }

    get_text_for_description() {
        return "Свойства применяются для устройств шириной меньше 767";
    }
    get_class_icons() {
        return "btn-change-mobile";
    }
}
