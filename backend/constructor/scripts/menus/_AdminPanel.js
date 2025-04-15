import BlockEditor from "@/editors/BlockEditor";
import {
    show_all_block_from_db,
    save_allblocks_in_db,
} from "@/services/blocks";
//TODO reamake :
// BlockEditor            CommonInterface
//      v          ->       v        v
// AdminPanel          AdminPanel  BlockEditor
export default class AdminPanel extends BlockEditor {
    constructor() {
        super(1); //after remake delete this
    }
    _set_block_structure() {
        return;
    }
    _hangingKyeCombinationButton() {
        return;
    }
    _render_content_wrapper() {
        this.cw_toolbar = $(
            '<div class="block-editor-toolbar"></div>'
        ).appendTo(this.content_wrapper);
        this.render_tb();
    }
    render_tb() {
        this.show_all_block_btn = $(
            '<div class="block-editor-button  beb-preview" title="Показать все блоки из БД"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                show_all_block_from_db();
            });
        this.save_block_in_db_btn = $(
            '<div class="block-editor-button beb-save" title="Заполнить БД"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                save_allblocks_in_db();
            });
    }
}
