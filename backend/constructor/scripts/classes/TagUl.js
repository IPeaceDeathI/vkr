import { DEFAULT_IMAGE, DEFAULT_REF, DEFAULT_HTML } from "@/constant";
import Tag from "@/classes/Tag";
import UndoManager from "@/classes/UndoManager";
import { set_targeting_event } from "@/services/services";
import UlEditor from "@/editors/UlEditor";
import {
    TagLiPopCommand,
    TagLiPushCommand,
    TagLiDeleteCommand,
    TagLiAddCommand,
} from "@/classes/Command";

export default class TagUl extends Tag {
    constructor(params) {
        super(params);
        if (params["li_array"] == null)
            throw "Для тега ul не указана обязательная опция li_array";
        else this.li_array = params["li_array"];
        if (params["li_html"] == null)
            throw "Для тега ul не указана обязательная опция li_html";
        else this.li_html = params["li_html"];
        this.li_array.forEach((element) => {
            if (element.strings == null) element["strings"] = [];
            if (element.images == null) element.images = [];
            if (element.hrefs == null) element.hrefs = [];
            if (element.htmls == null) element.htmls = [];
        });
    }
    pop_li(add_to_undo = true) {
        const item_li = this.li_array.pop();
        this.update_all_options();
        this.parent.reset_options();
        if (this.ul_editor) {
            this.ul_editor.re_render();
        }

        if (add_to_undo) {
            new UndoManager().push(
                new TagLiPushCommand(this.parent.approach_id, this.id, item_li)
            );
        }
    }
    push_li(
        add_to_undo = true,
        item_struct = {
            strings: [],
            images: [],
            hrefs: [],
            htmls: [],
        }
    ) {
        this.li_array.push(item_struct);
        this.parent.reset_options();
        if (this.ul_editor) {
            this.ul_editor.re_render();
        }
        if (add_to_undo) {
            new UndoManager().push(
                new TagLiPopCommand(this.parent.approach_id, this.id)
            );
        }
    }
    delete_element_from_li_array(index, add_to_undo = true) {
        const item_li = this.li_array[index];
        this.li_array.splice(index, 1);
        this.parent.reset_options();
        if (this.ul_editor) {
            this.ul_editor.re_render();
        }
        if (add_to_undo) {
            new UndoManager().push(
                new TagLiAddCommand(
                    this.parent.approach_id,
                    this.id,
                    index,
                    item_li
                )
            );
        }
    }
    add_element_to_li_array(
        index,
        item_struct = {
            strings: [],
            images: [],
            hrefs: [],
            htmls: [],
        },
        add_to_undo = true
    ) {
        this.li_array.splice(index, 0, item_struct);
        this.parent.reset_options();
        if (this.ul_editor) {
            this.ul_editor.re_render();
        }
        if (add_to_undo) {
            new UndoManager().push(
                new TagLiDeleteCommand(this.parent.approach_id, this.id, index)
            );
        }
    }
    _hook_after_get_structure(structure) {
        structure["li_array"] = this.li_array;
        structure["li_html"] = this.li_html;
    }
    _hook_after_set_structure(json) {
        this.li_array = json["li_array"];
        this.li_html = json["li_html"];
    }
    update_all_options_hook() {
        if (!this.li_array) return;
        this.jquery.html("");
        this.li_array.forEach((str) => {
            var li = $(`<li>${this.li_html}</li>`);
            li.find(`.${EnumLiTargeting.STRING}`).each(function (index) {
                if (str.strings[index] == null) str.strings.push("Text");
                var text = str.strings[index];
                $(this).text(text);
            });
            //render images
            li.find(`.${EnumLiTargeting.IMAGE}`).each(function (index) {
                if (str.images[index] == null) str.images.push(DEFAULT_IMAGE);
                $(this).attr("src", str.images[index]);
            });
            //render refs
            li.find(`.${EnumLiTargeting.HREF}`).each(function (index) {
                if (str.hrefs[index] == null) str.hrefs.push(DEFAULT_REF);
                $(this).attr("href", str.hrefs[index]);
            });
            //render htmls
            li.find(`.${EnumLiTargeting.HTML}`).each(function (index) {
                if (str.htmls[index] == null) str.htmls.push(DEFAULT_HTML);
                $(this).html(str.htmls[index]);
            });
            li.appendTo(this.jquery);
        });
    }
    editable() {
        return true;
    }
    // todo прОДУМАТЬ СТРУКТУРУ ДАННЫХ, КОТОРАЯ ПОЩВОЛИТЬ УДАЛЯТЬ БЛОКИ
    get_editor(panel_select) {
        this.ul_editor = new UlEditor(this);
        const box = this.ul_editor.get_editor_view();
        const list_icon = $(
            `<div class="ul-menu-icon" data-tooltip="Списки"><svg enable-background="new 0 0 32 32"  fill="none" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M29,16c0,1.104-0.896,2-2,2H11c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C28.104,14,29,14.896,29,16z" id="XMLID_352_"/><path d="M29,6c0,1.104-0.896,2-2,2H11C9.896,8,9,7.104,9,6s0.896-2,2-2h16C28.104,4,29,4.896,29,6z" id="XMLID_354_"/><path d="M29,26c0,1.104-0.896,2-2,2H11c-1.104,0-2-0.896-2-2s0.896-2,2-2h16C28.104,24,29,24.896,29,26z" id="XMLID_356_"/><path d="M3,6c0,1.103,0.897,2,2,2s2-0.897,2-2S6.103,4,5,4S3,4.897,3,6z" id="XMLID_358_"/><path d="M3,16c0,1.103,0.897,2,2,2s2-0.897,2-2s-0.897-2-2-2S3,14.897,3,16z" id="XMLID_360_"/><path d="M3,26c0,1.103,0.897,2,2,2s2-0.897,2-2s-0.897-2-2-2S3,24.897,3,26z" id="XMLID_362_"/></svg></div>`
        );
        list_icon.prependTo(panel_select.find(".panel-select-title-wrapper"));
        var panel_edit_box = $(`<div class="panel-edit-box">`);
        box.appendTo(panel_edit_box);
        // ---------------------------------
        set_targeting_event(this.jquery, panel_select);
        set_targeting_event(panel_select, this.jquery);
        // ---------------------------------
        return panel_edit_box;
    }
}
