import MenuDesigner from "@/classes/MenuDesigner";
import { TextWrapper } from "@/editors/EditorsWrapperViews";
import { rotateElement } from "@/helpers/helpers";
import {
    AutosaveManager,
    AdvancedUserManager,
} from "@/services/LocalStorageManagers";
//Menu
//TODO переделать нахуй ООП арзитектуру таблиц, пока слишком много дублирования
//кода и концепция family неочень
export class Menu {
    constructor(wrapper) {
        this.editors = [];

        this.wrapper = $(wrapper);
        this.#render();
    }
    delete() {
        this.wrapper.remove();
        this.tag.get_jq().off("dblclick");
        this.tag.get_jq().off("contextmenu");
        this.editors.forEach(function (editor) {
            try {
                editor.delete();
            } catch {
                console.log(editor);
            }
        });
    }
    hide() {
        this.wrapper.css("display", "none");
    }
    show() {
        this.wrapper.css("display", "block");
    }
    #render() {
        this.tag = window.main.page_model.get_tag();

        this.#add_back_button(
            window.main.project_entity.get_back_btn_title() ?? ""
        );
        this.#add_settings_wrapper();
        this.#add_advanced_user_checkbox();
        this.#add_page_style_editors();
        this.#add_autosave_checkbox();
    }
    #add_back_button(slot) {
        var span = $(`<span><<span>`).css("float", "left");
        var btn = $(
            `<a class="menu-main-btn" href=${
                window.main.project_entity.get_back_btn_ref() ?? "/"
            }>${slot}</a>`
        ).prepend(span);
        console.log();
        btn.appendTo(this.wrapper);
    }
    #add_settings_wrapper() {
        this.settings_wrapper = $(
            `<div class="menu-triple-two-category-wrapper settings"></div>`
        ).appendTo(this.wrapper);
        let title = $(`<div>Настройки</div>`);
    }
    #add_page_style_editors() {
        var select_block = this.#add_panel_select(); //Блок для всего содержимого менб
        if (!this.tag.editable()) return;
        var option_block = this.#add_option_block(select_block, this.tag);
        var panel_edit_box = $(`<div class="panel-edit-box">`);
        let object = new TextWrapper(this.tag.tags_options);
        var wrapper = object.get_wrapper_view();
        this.editors.push(object);
        if (wrapper) {
            wrapper.appendTo(option_block.options_wrapper);
        }
        if (option_block.options_wrapper.html() != "")
            option_block.option_block.appendTo(select_block);
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
    #add_panel_select() {
        var select_block = MenuDesigner.get_panel_select_block();
        select_block.appendTo(this.wrapper);
        return select_block;
    }
    #add_autosave_checkbox() {
        var box = $("<label>");
        box.appendTo(this.settings_wrapper);
        const checkbox = $(`
		<label class="checkbox-ios top-menu-hide-menus-checkbox">
			<input type="checkbox" checked>
			<span class="checkbox-ios-switch"></span>
		</label>
		`);
        AutosaveManager.isEnabled()
            ? checkbox.find("input").prop("checked", true)
            : checkbox.find("input").prop("checked", false);
        checkbox.find("input").change(function () {
            if (this.checked == true) {
                AutosaveManager.enable();
            } else {
                AutosaveManager.disable();
            }
        });
        let text = $(`<span>Автосохранение</span>`).appendTo(box);
        checkbox.appendTo(box);
    }
    #add_advanced_user_checkbox() {
        var box = $("<label>");
        box.appendTo(this.settings_wrapper);
        const checkbox_wrapper = $(`
		<label class="checkbox-ios top-menu-hide-menus-checkbox style="padding-top=0">
			<input type="checkbox" checked>
			<span class="checkbox-ios-switch"></span>
		</label>
		`);
        const checkbox = checkbox_wrapper.find("input");
        AdvancedUserManager.isEnabled()
            ? checkbox.prop("checked", true)
            : checkbox.prop("checked", false);
        checkbox.change(function () {
            if (this.checked == true) {
                AdvancedUserManager.enable();
            } else {
                AdvancedUserManager.disable();
            }
        });
        let text = $(`<span>Для продвинутых пользователей</span>`).appendTo(
            box
        );
        checkbox_wrapper.appendTo(box);

        // check_box.text("Продвинутый пользователь")
    }
}

//Вспомогательный класс
export class OptionBlock {
    constructor(option) {
        var tmp = MenuDesigner.get_option_block_title(option.title);
        this.options_wrapper = MenuDesigner.get_option_block_wrapper();
        this.title = tmp[1];
        this.span = tmp[0];
        this.option_block = MenuDesigner.get_option_block();
        this.option_block.append(this.title);
        this.option_block.append(this.options_wrapper);
    }
}
