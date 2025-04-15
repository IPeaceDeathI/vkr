import Api from "@/classes/Api";
import MessagesIndicator from "@/services/MessagesIndicator";
import BlockEditor from "@/editors/BlockEditor";
import { EnumMessagesStatus } from "@/services/MessagesIndicator";

export default class PopUpItems {
    static wrapper;
    static id_wrapper;
    static class;
    static obj_main;
    static el;
    static #tabs = {
        blocks: "Блоки",
        templates: "Шаблоны",
        favourite: "Избранное",
        my_blocks: "Мои блоки",
    };
    static #names = {
        block: "block",
        template: "template",
        favourite: "favourite",
        my_blocks: "my_blocks",
    };
    static set_favorite_status_to_block(block_id, status) {
        let wrapper = $(document).find(".wrp-items");
        let block = wrapper.find(`[data-id-item="${block_id}"]`);
        block = block.find(".data-favourites-item");
        let fav_class = "favourites";

        if (status == null) {
            fav_class = "no-favourites";
        }
        block.removeClass("favourites");
        block.removeClass("no-favourites");
        block.addClass(fav_class);
        block.removeAttr("disabled");
    }
    static eventSelectCategory() {
        // category
        $(document).off("click", ".wrp-popup-blocks .category");
        $(document).on("click", ".wrp-popup-blocks .category", (e) => {
            let el = $(e.currentTarget);
            el.closest(".items").find(".category").removeClass("active-cat");
            el.addClass("active-cat");
            this.selectCategory(
                el.attr("data-id-category"),
                el.attr("data-name")
            );
        });
    }
    static eventFavourite(e) {
        $(document).off("click", ".wrp-items .data-favourites-item");
        $(document).on(
            "click",
            ".wrp-items .data-favourites-item",
            function (e) {
                e.stopPropagation();
                if ($(this).attr("disabled") != "disabled") {
                    $(this).attr("disabled", "true");
                    if ($(this).hasClass("favourites")) {
                        //delete from favourite
                        Api.delete_block_from_favorite(
                            $(this)
                                .closest("[data-id-item]")
                                .attr("data-id-item")
                        );
                    } else if ($(this).hasClass("no-favourites")) {
                        //  add to favorite
                        Api.add_block_to_favorite(
                            $(this)
                                .closest("[data-id-item]")
                                .attr("data-id-item")
                        );
                    }
                }
            }
        );
    }
    static eventInsert() {
        $(document).off("click", ".wrp-popup-blocks .block");
        $(document).on("click", ".wrp-popup-blocks .block", (e) => {
            let el = $(e.currentTarget);
            this.insert(el.attr("data-id-item"), el.attr("data-name"));
        });
    }

    static eventBtnHidden() {
        $(document).off("click", ".wrp-popup-blocks .popup-close");
        $(document).on("click", ".wrp-popup-blocks .popup-close", () => {
            this.#actionHidden();
        });
    }

    static eventBgrHidden() {
        // спрятать попап
        $(document).off("click", ".wrp-popup-blocks .hidden-popup");
        $(document).on("click", ".wrp-popup-blocks .hidden-popup", (e) => {
            let target = $(e.target);
            if (target.hasClass("hidden-popup")) this.#actionHidden();
        });
    }

    static eventSelectTab() {
        $(document).off("click", "[data-tab-name]");
        $(document).on("click", "[data-tab-name]", (e) => {
            let el = $(e.currentTarget);
            if (el.hasClass("active")) return;
            this.selectTab(el);
        });
    }

    static #actionHidden() {
        this.el.removeClass("show-popup");
    }

    static main() {
        this.el = $(".hidden-popup");
        this.eventBgrHidden();
        this.eventBtnHidden();
        this.eventSelectTab();
        this.eventSelectCategory();
        this.eventInsert();
        this.eventFavourite();

        this.renderBtnTab();
        this.renderTabs();
    }

    static insert(id, name) {
        let position, approach_id, tpl_structure;
        switch (name) {
            case "my_blocks":
            case "favourite":
            case "block":
                approach_id = this.obj_main.blocks_model.add_block(id);
                position = this.#definePosition();
                if (position === "prependTo")
                    this.obj_main.blocks_model.show_block(
                        approach_id,
                        this.obj_main.blocks_view_space().wrapper,
                        position
                    );
                else
                    this.obj_main.blocks_model.show_block(
                        approach_id,
                        this.wrapper,
                        position
                    );
                this.#actionHidden();
                break;
            case "template":
                tpl_structure = this.obj_main.buffer.get_template_by_id(id);
                tpl_structure = JSON.parse(tpl_structure);
                if (tpl_structure.blocks_structure != null) {
                    tpl_structure = tpl_structure.blocks_structure;
                }
                tpl_structure = tpl_structure.reverse();
                position = this.#definePosition();
                if (position === "prependTo")
                    tpl_structure.forEach((block) => {
                        this.obj_main.blocks_model.add_block_from_json(
                            block,
                            position,
                            this.obj_main.blocks_view_space().wrapper
                        );
                    });
                else
                    tpl_structure.forEach((block) => {
                        this.obj_main.blocks_model.add_block_from_json(
                            block,
                            position,
                            this.wrapper
                        );
                    });
                this.#actionHidden();
                break;
        }
    }

    static #definePosition() {
        switch (true) {
            case this.class.includes("-first"):
                return "prependTo";
            case this.class.includes("-up"):
                return "before";
            case this.class.includes("-bottom"):
                return "after";
            default:
                throw `"${this.class}" Не удалось найти класс для определения позиции`;
        }
    }

    static async selectTab(el) {
        var i, tabcontent, tablinks, tabName;
        tabName = el.attr("data-tab-name");
        await this.renderElemsTab(tabName);

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            $(tabcontent[i]).css("display", "none");
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            $(tablinks[i]).removeClass("active");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        $('[data-tab="' + tabName + '"]').css("display", "block");
        el.addClass("active");
    }

    static async selectCategory(id, name) {
        let data;
        data = await this.obj_main.buffer.get_blocks_from_category(id);
        this.#clearBlocks();
        if (name == this.#names.block) this.renderItems(data, name);
        else if (name == this.#names.template) {
            data = await this.obj_main.buffer.get_templates_from_category(id);
            this.renderItems(data, name);
        } else if (name == this.#names.favourite) {
            this.renderFavouriteItems(data, name);
        } else if (name == this.#names.my_blocks) {
            data = this.obj_main.buffer.get_my_blocks_from_category(id);
            this.renderMyBlocksItems(data, name);
        } else {
            throw `"${name}" Не определена сущность категории`;
        }
    }

    // рендеры

    static async renderElemsTab(tabName) {
        try {
            let caregories, items;
            this.#clearAll();
            switch (tabName) {
                case "blocks":
                    caregories =
                        await this.obj_main.buffer.get_all_categories();
                    items = await this.obj_main.buffer.get_blocks_from_category(
                        caregories[0].category_id
                    );
                    this.renderCategories(caregories, this.#names.block);
                    this.renderItems(items, this.#names.block);
                    break;
                case "templates":
                    caregories =
                        await this.obj_main.buffer.get_all_template_categories();
                    items =
                        await this.obj_main.buffer.get_templates_from_category(
                            caregories[0].category_id
                        );
                    this.renderCategories(caregories, this.#names.template);
                    this.renderItems(items, this.#names.template);
                    break;
                case "favourite":
                    caregories =
                        await this.obj_main.buffer.get_all_categories();
                    items = await this.obj_main.buffer.get_blocks_from_category(
                        caregories[0].category_id
                    );
                    this.renderCategories(caregories, this.#names.favourite);
                    this.renderFavouriteItems(items, this.#names.favourite);
                    break;
                case "my_blocks":
                    caregories =
                        await this.obj_main.buffer.get_all_categories();
                    items = this.obj_main.buffer.get_my_blocks_from_category(
                        caregories[0].category_id
                    );
                    this.renderCategories(caregories, this.#names.my_blocks);
                    this.renderMyBlocksItems(items, this.#names.my_blocks);
                    break;
            }
            this.selectFirstBtnCategory(tabName);
        } catch (error) {
            console.error(error);
        }
    }

    static selectFirstBtnCategory(tabName) {
        this.el
            .find('[data-tab="' + tabName + '"] [data-id-category]')
            .eq(0)
            .addClass("active-cat");
    }

    static renderTabs() {
        this.el.find("[data-area-tab]").html("");
        for (const [name, showName] of Object.entries(this.#tabs)) {
            this.el.find("[data-area-tab]").append(this.#elemTab(name));
        }
    }

    static renderBtnTab() {
        this.el.find(".tab").html("");
        for (const [name, showName] of Object.entries(this.#tabs)) {
            if (name === "my_blocks" && !window.main.isUserBlockCreator())
                continue; // do not show my block if user are not admin or block creator
            this.el.find(".tab").append(this.#elemBtnTab(name, showName));
        }
    }

    static renderItems(data, name) {
        for (const [key, value] of Object.entries(data)) {
            this.el.find(".wrp-items").append(this.#elemItem(value, name));
        }
    }
    static renderFavouriteItems(data, name) {
        for (const [key, value] of Object.entries(data)) {
            if (value[3] == null) continue;
            this.el.find(".wrp-items").append(this.#elemItem(value, name));
        }
    }
    static renderMyBlocksItems(data, name) {
        for (const [key, value] of Object.entries(data)) {
            const elem = this.#myElemItem(value, name);
            this.el.find(".wrp-items").append(elem);
            elem.find(".data-edit-item").on("click", (e) => {
                e.stopPropagation();
                new BlockEditor(value[1]);
                $(".wrp-popup-blocks .popup-close").trigger("click");
            });
        }

        //btn for add block
        const tmp_btn = $(
            '<button class="block">Добавить блок в категорию</buttom>'
        ).on("click", async function () {
            tempDisabledElem($(this), true);
            Api.update_block(
                null,
                {
                    name: "" + Math.floor(Math.random() * 100),
                    tags: [123, 123],
                    settings: [123, 123],
                    html_variants: [123, 123],
                },
                [$(".active-cat").attr("data-id-category")],
                "fsfs"
            )
                .then((result) => {
                    location.reload();
                })
                .catch((err) => {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Не получилось добавить блок `,
                        status: EnumMessagesStatus.ERROR,
                    });
                })
                .finally(() => {
                    tempDisabledElem($(this), false);
                });
        });
        this.el.find(".wrp-items").append(tmp_btn);
    }
    static #clearBlocks() {
        this.el.find(".wrp-items").html("");
    }
    static #clearCategories() {
        this.el.find(".wrp-categories .items").html("");
    }
    static #clearAll() {
        this.#clearBlocks();
        this.#clearCategories();
    }

    static renderCategories(data, name) {
        for (const [index, value] of Object.entries(data)) {
            this.el
                .find(".wrp-categories .items")
                .append(this.#elemCategory(value, name));
        }
    }

    // элементы

    static #elemCategory(data, name) {
        return $(
            `<div data-id-category="${data.category_id}" data-name="${name}" class="category">${data.category_name}</div>`
        );
    }

    static #elemTab(name) {
        return $(`<div data-tab="${name}" class="tabcontent">
            <div class="wrp">
                <div class="wrp-categories">
                    <div class="title">Категории</div>
                    <div class="items"></div>
                </div>
                <div class="wrp-items"></div>
            </div>
        </div>`);
    }

    static #elemBtnTab(name, showName) {
        return $(
            `<button class="tablinks" data-tab-name="${name}">${showName}</button>`
        );
    }

    static #elemItem(data, name) {
        // data[0] - Название
        // data[1] - id
        // data[2] - ссылка до картинки
        // data[3] - null, если не в избранном
        
        return $(`<div data-id-item="${
            data[1]
        }" data-name="${name}" class="block">
            <div class="preview" style="background-image: url(${
                data[2]
            });"></div>
            <div class="wrp-name-add">
                <div class="name">${data[0]}</div>
                <div class="btns">
                    <div class="data-favourites-item ${
                        data[3] !== null ? "favourites" : "no-favourites"
                    }"></div>
                    <div class="id">${data[1]}</div>
                    <div data-add-item class="add">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <path fill="currentColor" fill-rule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>`);
    }

    static #myElemItem(data, name) {
        return $(`<div data-id-item="${data[1]}" data-name="${name}" class="block">
        <div class="preview" style="background-image: url(${data[2]});"></div>
        <div class="wrp-name-add">
            <div class="name">${data[0]}</div>
            <div class="btns">
                <div class="data-edit-item">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 386.375 386.375" style="enable-background:new 0 0 386.375 386.375;"
                        xml:space="preserve">
                    <path fill="currentColor" d="M21.05,286.875l76.5,76.5l-1.9,3.8l-95.6,19.2l19.1-95.6L21.05,286.875z M34.65,272.775l77.1,77.1l216.4-216.399
                        l-77.101-77.1L34.65,272.775z M374.85,34.375l-23-22.9c-15.3-15.3-38.199-15.3-53.5,0l-32.5,32.5l76.5,76.5l32.5-32.5
                        C390.15,72.675,390.15,47.775,374.85,34.375z"/>
                    </svg>
                </div>
                <div class="id">${data[1]}</div>
                <div data-add-item class="add">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path fill="currentColor" fill-rule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>`);
    }
}
