import { nameOptionsTest, unitOptionsTest } from "@/constant";
import Options from "@/classes/Options";
import UndoManager from "@/classes/UndoManager";
import { ChangeValueTagOptCommand } from "@/classes/Command";
import { AdvancedUserManager } from "@/services/LocalStorageManagers";
import {TagsOptionType} from "@/classes/types"
export default class TagsOption extends Options implements TagsOptionType {
    constructor(params, parent) {
        super(params["val"]);
        this.id = params["id"];
        if (params["type"] == null) throw "Не передан тип опции при создании";
        this.type = params.type;
        if (params["name"] == null)
            throw "Не передано название опции при создании";
        this.name = params.name;
        if (params["edit_option"] == null)
            this.edit_option = EnumEditOption.EDITABLE;
        else this.edit_option = params["edit_option"];

        if (params.extra_unit != null) this.extra_unit = params.extra_unit;
        else this.extra_unit = [];
        if (params["unit"] == null) {
            this.unit = unitOptionsTest[params["name"]];
            if (this.unit == null) this.unit = "text";
        } else this.unit = params["unit"];
        if (params["title"] == null)
            this.title = nameOptionsTest[params["name"]];
        else this.title = params["title"];
        this.parent = parent;
        this.has_in_new_menu = false;
        this.old_unit = this.unit;
    }
    set_device_type(device_type) {
        this.device_type = device_type;
    }
    delete_editor() {
        try {
            this.editor.delete();
        } catch (error) {
            console.log(error);
        }
    }
    editable() {
        if (this.edit_option == EnumEditOption.NONEDITABLE) return false;
        if (
            this.edit_option == EnumEditOption.ADVANCED &&
            !AdvancedUserManager.isEnabled()
        ) {
            return false;
        }
        return true;
    }
    unpack_as_array() {
        return [this];
    }
    set_parent_jq(parent_jq) {
        this.parent_jq = parent_jq;
    }
    async get_editor(panel_select) {
        //Template Method
        if (this.parent_jq == null || !this.editable() || this.has_in_new_menu)
            return null;

        // var panel_edit_box = $(`<div class="panel-edit-box">`);
        // if (this.title)
        //     $(`<label>${this.title}</label>`).appendTo(panel_edit_box);
        // box.appendTo(panel_edit_box);
        // // ---------------------------------
        // panel_select.on("mouseover", () => {
        //     this.parent.parent.wrapper
        //         .find(this.parent.class)
        //         .addClass("tag-in-focus");
        // });
        // panel_select.on("mouseout", () => {
        //     this.parent.parent.wrapper
        //         .find(this.parent.class)
        //         .removeClass("tag-in-focus");
        //     console.log(this.parent.parent.wrapper.find(this.parent.class));
        // });
        // this.parent_jq.on("mouseover", (e) => {
        //     this.parent.parent.wrapper
        //         .find(this.parent.class)
        //         .addClass("tag-in-focus");
        //     panel_select.addClass("tag-in-focus");
        //     console.log(this.parent.parent.wrapper.find(this.parent.class));
        //     e.stopPropagation();
        // });
        // this.parent_jq.on("mouseout", (e) => {
        //     this.parent.parent.wrapper
        //         .find(this.parent.class)
        //         .removeClass("tag-in-focus");
        //     panel_select.removeClass("tag-in-focus");
        //     e.stopPropagation();
        // });
        // // ---------------------------------
        // return { object: object, panel_edit_box: panel_edit_box };
    }
    template_editor() {
        var box = $(`<div class="el-range">`);
        switch (this.unit) {
            case "text":
                box = $(`<input type="text"  value="${this.val}">`);
                box.on("change", () => {
                    var value = box.val();
                    this.val = value;
                    this.set_option();
                });
                break;
            case "text":
                box = $(`<input type="text"  value="${this.val}">`);
                box.on("change", () => {
                    var value = box.val();
                    this.val = value;
                    this.set_option();
                });
                break;
            default:
                throw `Указан неверний unit: ${this.unit} для создания editor'а`;
        }
        return box;
    }
    set_option() {
        if (this.parent_jq == null) return;
        switch (this.type) {
            case "attr":
                this.parent_jq.attr(this.name, this.val);
                break;
            case "css":
                var val = this.val;

                if (this.unit == "huy") val = `url('${this.val}')`; //TODO ALERT ТУТ ХУЙНЯ НУЖНО ДУМАТь С Е.И.
                this.parent_jq.css(this.name, val);
                break;
            default:
                console.log(
                    `tags_option ${this.name} имеет неверный тип ${this.type}`
                );
        }
    }
    set_value(val, add_to_undo_manager = true) {
        let old_val = this.old_val;
        this.old_val = val;
        this.val = val;
        this.hook_before_set_value();
        this.notify(this.val);
        this.set_option();
        if (add_to_undo_manager) {
            new UndoManager().push(
                new ChangeValueTagOptCommand(
                    this.parent.parent.approach_id,
                    this.parent.id,
                    this.id,
                    this.device_type,
                    old_val
                )
            );
        }
    }
    hook_before_set_value() {
        return;
    }
    set_value_without_notify(val) {
        this.val = val;
        this.hook_before_set_value_without_notify();
        this.set_option();
    }
    get_val() {
        return this.val;
    }
    hook_before_set_value_without_notify() {
        return;
    }
    get_stuctrure_as_json() {
        var structure = new Object();
        structure["id"] = this.id;
        structure["type"] = this.type;
        structure["name"] = this.name;
        structure["val"] = this.val;
        this.hook_get_structure_as_json(structure);
        return structure;
    }
    set_stuctrure_from_json(json) {
        this.hook_before_set_stuctrure_from_json(json);
        this.set_value(json["val"], false);
    }
    hook_before_set_stuctrure_from_json(json) {
        return;
    }
    hook_get_structure_as_json(structure) {
        return;
    }
}
