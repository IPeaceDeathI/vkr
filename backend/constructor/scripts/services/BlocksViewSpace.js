import PopUpItems from "@/classes/PopUpItems";

//Хранит в себе все блоки
export default class BlocksViewSpace {
    constructor() {
        this.wrapper = $(
            `<div class="element-box sort-connected sort-box ui-sortable">`
        );
        this.wrapper.appendTo(".constructor-page");
        this.hint_templates = $(
            '<div class="add-new-block-first hint-block"><div class="hint-block-blocks-text">Добавить шаблон</div><div class="hint-block-blocks-svg"><svg viewBox="0 0 32 32" ><defs><style>.cls-1{fill:none;}</style></defs><title/><path fill="currentColor" d="M26,6v4H6V6H26m0-2H6A2,2,0,0,0,4,6v4a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z"/><path fill="currentColor" d="M10,16V26H6V16h4m0-2H6a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V16a2,2,0,0,0-2-2Z"/><path fill="currentColor" d="M26,16V26H16V16H26m0-2H16a2,2,0,0,0-2,2V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V16a2,2,0,0,0-2-2Z"/><rect class="cls-1"/></svg></div></div>'
        ).on("click", () => {
            PopUpItems.wrapper = this.hint_templates.closest(
                "div.element-wrapper[id]"
            );
            PopUpItems.class = this.hint_templates.attr("class");
            PopUpItems.selectTab(
                PopUpItems.el.find('[data-tab-name="templates"]')
            );
            PopUpItems.el.addClass("show-popup");
        });
        this.hint_blocks = $(
            '<div class="add-new-block-first hint-block hint-block-blocks"><div class="hint-block-blocks-text">Добавить блок</div><div class="hint-block-blocks-svg"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,11H17.5V3a1,1,0,0,0-1-1h-9a1,1,0,0,0-1,1v8H3a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V12A1,1,0,0,0,21,11ZM11,20H4V13h7ZM8.5,11V4h7v7ZM20,20H13V13h7Z"/></svg></div></div>'
        ).on("click", () => {
            PopUpItems.wrapper = this.hint_blocks.closest(
                "div.element-wrapper[id]"
            );
            PopUpItems.class = this.hint_blocks.attr("class");
            PopUpItems.selectTab(
                PopUpItems.el.find('[data-tab-name="blocks"]')
            );
            PopUpItems.el.addClass("show-popup");
        });
        this.hint = $(`<div class="main-hint-wrapper">
                           
                       </div>`);
        this.hint_blocks.appendTo(this.hint);
        this.hint_templates.appendTo(this.hint);
        this.hint.appendTo(this.wrapper);
    }
    add_block(block, jq_landmark, jq_position) {
        jq_landmark = jq_landmark ?? this.wrapper;
        block.show(jq_landmark, jq_position);
        this.hint.css("display", "none");
    }
    remove_block(block) {
        block.get_jq().animate(
            {
                height: "hide",
            },
            300,
            function () {
                $(this).remove();
            }
        );
        if (window.main.blocks_model.get_number_of_block() < 1) {
            setTimeout(() => {
                this.hint.css("display", "flex");
            }, 300);
        }
    }
    get_wrapper() {
        return this.wrapper;
    }
    resize(width) {
        width = Math.round(width);
        window.main.get_state().reset_width(width);
        this.#set_width(width);
        window.main.menu_top.set_value_scroll_in_wrapper(width);
    }
    #set_width(width) {
        this.wrapper.css("width", `${width}px`);
    }
}
