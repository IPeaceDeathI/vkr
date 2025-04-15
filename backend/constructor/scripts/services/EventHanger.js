import UndoManager from "@/classes/UndoManager";
import PopUpItems from "@/classes/PopUpItems";
import { MoveBlocksCommand } from "@/classes/Command";

export default class EventHanger {
    static beforeunload() {
        $(window).on("beforeunload", function () {
            return "Вы уверены, что хотите выйти";
        });
    }
    //for sortable on element box
    static hang_sortable() {
        let before = 0;
        $(".sort-box").sortable({
            cancel: ".sort-disable", // Блоки которые нельзя переместить
            connectWith: ".sort-connected", // В какой блок можно перемещать
            placeholder: "sort-placeholder", // Появляется под перетаскиваемым блоком
            items: ".sort-element", // Что передаскивается
            handle: ".sort-handle",
            start: function (event, ui) {
                // Как только взялись перемещать
                var elem = ui.item;
                console.log("до переноса", elem.index());
                // При перемещении делает элемент меньше
                elem.addClass("sort-move-element");
                before = elem.index();
            },
            update: function (event, ui) {
                // Все перемещения блоки в моменте
                const after = ui.item.index();
                new UndoManager().push(new MoveBlocksCommand(before, after));
            },
            stop: function (event, ui) {
                // Перенос на страницу / преобразуем в блок
                var elem = ui.item;

                elem.removeClass("sort-move-element");
                if (ui.item.hasClass("menu-element")) {
                    $(".sort-box").sortable("cancel");
                } // Отменяем перенос
            },
        });
    }
    static hang_overlay() {
        $(".constructor-overlay").on("click", function () {
            window.main.blocks_model.remove_focus_from_block();
        });
    }

    static undo_manager() {
        $(document).keydown(function (e) {
            if (e.which === 90 && (e.ctrlKey || e.metaKey)) {
                new UndoManager().execute();
            }
        });
    }

    static close_text_editor() {
        // trumbowyg-modal
        $(document).mouseup(function (e) {
            // событие клика по веб-документу
            var text_editor = window.main.get_text_editor(); // тут указываем ID элемента
            if (text_editor == null) return;
            text_editor = text_editor.parent().parent();
            let modal = $(".trumbowyg-modal");
            if (
                text_editor.is(e.target) ||
                modal.is(e.target) || // если клик был не по нашему блоку
                text_editor.has(e.target).length !== 0 ||
                modal.has(e.target).length !== 0
            ) {
                // и не по его дочерним элементам
                e.stopPropagation();
            } else {
                window.main.close_text_editor(); // скрываем его
            }
        });
    }
    static backgroundPlaceholder() {
        $(document).off("focusout", "[contenteditable]");
        $(document).on("focusout", "[contenteditable]", function () {
            if ($(this).html().trim() == "") $(this).addClass("field-empty");
            else $(this).removeClass("field-empty");
        });
    }
    static clickContentEditable() {
        $(document).off("click", "[contenteditable]");
        $(document).on("click", "[contenteditable]", function () {
            $(this).focus();
        });
        $(document).on("click", ".trumbowyg-dropdown", function () {
            console.log("pifor");
        });
    }
    static widowResize() {
        onresize = () => {
            window.main
                .blocks_view_space()
                .resize(
                    document.querySelector(".constructor-page").clientWidth
                );
        };
    }
    static disabledTagAEvent() {
        $(document).off("click", ".constructor-page a");
        $(document).on("click", ".constructor-page a", function (e) {
            e.preventDefault();
        });
    }
    static disabledTagButtonEvent() {
        $(document).off("click", ".constructor-page button");
        $(document).on("click", ".constructor-page button", function (e) {
            e.preventDefault();
        });
    }

    static btnShowPopUpBlocks() {
        $(document).off(
            "click",
            ".add-new-block-up, .add-new-block-bottom, .main-button-new-block.add-new-block-first"
        );
        $(document).on(
            "click",
            ".add-new-block-up, .add-new-block-bottom, .main-button-new-block.add-new-block-first",
            function () {
                PopUpItems.wrapper = $(this).closest("div.element-wrapper[id]");
                PopUpItems.id_wrapper = PopUpItems.wrapper.attr("id");
                PopUpItems.class = $(this).attr("class");
                PopUpItems.selectTab(
                    PopUpItems.el.find('[data-tab-name="blocks"]')
                );
                PopUpItems.el.addClass("show-popup");
            }
        );
    }
}
