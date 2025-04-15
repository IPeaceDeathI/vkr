import UndoManager from "@/classes/UndoManager";
import { MainStateMobile, MainStateTablet, MainStateDesktop } from "@/main";
import AdminPanel from "@/menus/_AdminPanel";

export default class TopMenu {
    constructor() {
        this.wrapper = $(
            '<div class = "body-table-menu menu-triple-four"></div>'
        );
        this.wrapper.prependTo(".constructor-page");
        this.toolbar = $('<div class="toolbar-wrapper"></div>');
        this.width_scroll_wrapper = $('<div class="width-scroll"></div>');
        this.#render();
    }
    #render() {
        this.toolbar.prependTo(this.wrapper);
        this.width_scroll_wrapper.appendTo(this.wrapper);
        this.#add_pop_from_undo_manager_button();
        this.#add_hide_menus_checkbox();
        this.#add_change_to_desktop_state_button();
        this.#add_change_to_tablet_state_button();
        this.#add_change_to_mobile_state_button();

        if (window.main.isUserAdmin()) {
            this.#add_admin_panel();
        }
    }
    set_value_scroll_in_wrapper(width) {
        if (this.width_scroll_wrapper.find("input").length !== 0)
            this.width_scroll_wrapper.find("input").each(function () {
                $(this).val(width);
            });
    }
    set_scroll_in_wrapper(scroll) {
        this.width_scroll_wrapper.html("").append(scroll);
    }
    select_toolbal_button(_class) {
        this.#unselected_toolbar();
        this.toolbar.find(`.${_class}`).addClass("btn-change-selected");
    }
    disable_btn_undo_manager() {
        this.btn_pop_undo_manager.addClass("disabled");
        this.btn_pop_undo_manager.attr("title", "");
    }
    take_full_width() {
        this.wrapper.css("left", "0");
    }
    take_standart_width() {
        this.wrapper.css("left", "127px");
    }
    /**
     *
     * @param {String} title - в Винительном падеже
     */
    set_title_btn_undo_manager(title) {
        let _title = `Отменить ${title}. (Cntr+z)`;
        this.btn_pop_undo_manager.removeClass("disabled");
        this.btn_pop_undo_manager.attr("title", _title);
    }
    #add_hide_menus_checkbox() {
        this.hide_menus_checkbox = $(`
		<label class="checkbox-ios top-menu-hide-menus-checkbox">
			<input type="checkbox" checked>
			<span class="checkbox-ios-switch"></span>
		</label>
		`);
        this.hide_menus_checkbox.find("input").change(function () {
            console.log(this.checked);
            if (this.checked == true) {
                window.main.show_menus();
            } else {
                window.main.hide_menus();
            }
        });
        this.width_scroll_wrapper.after(this.hide_menus_checkbox);
    }
    #add_pop_from_undo_manager_button() {
        this.btn_pop_undo_manager = $(
            `<button class="btn-pop-undo-manager"></button>`
        ).click(function () {
            new UndoManager().execute();
        });
        this.width_scroll_wrapper.after(this.btn_pop_undo_manager);
        this.disable_btn_undo_manager();
    }
    #unselected_toolbar() {
        this.toolbar.find("button").each(function () {
            $(this).removeClass("btn-change-selected");
        });
    }
    #add_change_to_mobile_state_button() {
        $(`<button class="btn-change-mobile"></button>`)
            .appendTo(this.toolbar)
            .click(function () {
                window.main.change_main_state(new MainStateMobile());
            });
    }
    #add_change_to_tablet_state_button() {
        $(`<button class="btn-change-tablet"></button>`)
            .appendTo(this.toolbar)
            .click(function () {
                window.main.change_main_state(new MainStateTablet());
            });
    }
    #add_change_to_desktop_state_button() {
        $(`<button class="btn-change-desktop"></button>`)
            .appendTo(this.toolbar)
            .click(function () {
                window.main.change_main_state(new MainStateDesktop());
            });
    }
    //admin
    #add_admin_panel() {
        $(`<button class="btn-admin-panel"></button>`)
            .prependTo(this.toolbar)
            .click(function () {
                new AdminPanel();
            });
    }
}
