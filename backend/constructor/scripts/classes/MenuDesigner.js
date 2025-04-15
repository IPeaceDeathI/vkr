export default class MenuDesigner {
    static get_block_menu_main_button(slot) {
        return $(`<div class="menu-main-btn">${slot}</div>`);
    }
    static get_block_title(slot) {
        return $(`<div class= "panel-select-title">
                      ${slot}
                  </div>)`);
    }
    static get_panel_select_block() {
        return $(`<div class="panel-select-block"></div>`);
    }
    static get_option_block() {
        return $(`<div class="menu-option-block"></div>`);
    }
    static get_option_block_title(title) {
        var span =
            $(`<span class="hide-span"><svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00009 5.50205C4.93429 5.50243 4.86906 5.48981 4.80814 5.46493C4.74722 5.44005 4.69181 5.40339 4.64509 5.35705L0.645093 1.35705C0.598473 1.31043 0.561493 1.25508 0.536263 1.19417C0.511033 1.13326 0.498047 1.06798 0.498047 1.00205C0.498047 0.868895 0.550941 0.741197 0.645093 0.647046C0.739245 0.552894 0.866942 0.5 1.00009 0.5C1.13324 0.5 1.26094 0.552894 1.35509 0.647046L5.00009 4.29705L8.64509 0.647046C8.73924 0.552894 8.86694 0.5 9.00009 0.5C9.13324 0.5 9.26094 0.552894 9.35509 0.647046C9.44924 0.741197 9.50214 0.868895 9.50214 1.00205C9.50214 1.1352 9.44924 1.26289 9.35509 1.35705L5.35509 5.35705C5.30837 5.40339 5.25296 5.44005 5.19205 5.46493C5.13113 5.48981 5.0659 5.50243 5.00009 5.50205Z" fill="#C0C0C0"/>
                      </svg></span>`).css("float", "right");
        return [
            span,
            $(
                `<div class= "panel-select-div"><div class = "panel-select-title-wrapper">${title}<div></div>`
            ).append(span),
        ];
    }
    static get_option_block_wrapper() {
        return $('<div class= "tag-options-wrapper"></div>');
    }
}
