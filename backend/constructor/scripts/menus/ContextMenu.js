export default class ContextMenu {
    constructor() {
        this.wrapper = $(`<div class="context-menu"></div>`);
        this.hide_menu();
    }
    hide_menu() {
        $(document).off("click.outsideContextMenu");
        $(document).off("contextmenu.outsideContextMenu");
        this.wrapper.css("display", "none");
        this.wrapper.children().remove();
        this.wrapper.off("mouseleave");
        this.hide = true;
    }
    show_menu(y, x) {
        if (!this.hide) return;
        this.hide = false;
        this.wrapper.css("display", "block");
        this.wrapper.css("top", `${y - 5}px`);
        this.wrapper.css("left", `${x - 5}px`);
        $(document).on("click.outsideContextMenu", () => {
            this.hide_menu();
        });
        $(document).on("contextmenu.outsideContextMenu", () => {
            this.hide_menu();
            return false;
        });
    }
    add(jquery_view, title_view, title) {
        this.wrapper.append(this.#get_item(jquery_view, title_view, title));
    }
    #get_item(jquery_view, title_view, title) {
        var item = $(`<div class="context-menu-item">${title}</div>`);
        item.on("mouseover", () => {
            jquery_view.addClass("tag-in-focus");
            title_view.addClass("tag-in-focus");
        });
        item.on("mouseout", () => {
            jquery_view.removeClass("tag-in-focus");
            title_view.removeClass("tag-in-focus");
        });
        item.on("click", (e) => {
            window.main.block_menu.hide_wrapers();
            window.main.block_menu.show_wrapper(title_view);
            e.stopPropagation();
        });
        return item;
    }
}
