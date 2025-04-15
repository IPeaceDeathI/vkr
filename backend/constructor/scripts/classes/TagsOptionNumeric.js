import TagsOption from "@/classes/TagsOption";
import UndoManager from "@/classes/UndoManager";
import {} from "@/editors/Editors";
import { ChangeUnitTagOptCommand } from "@/classes/Command";
import { NumericEditor, NumericEditorWithUnit } from "@/editors/Editors";

const UnitWithoutValue = ["auto", "contain", "cover", "inherit", "none"];

export default class TagsOptionNumeric extends TagsOption {
    constructor(params, parent) {
        params["type"] = "css";
        if (UnitWithoutValue.includes(params.val)) {
            params["unit"] = params.val;
            params["val"] = 0;
        }
        params["unit"] ? params["unit"] : "px";
        super(params, parent);
    }

    set_unit(unit, add_to_undo_manager = true) {
        this.unit = unit;
        let old_unit = this.old_unit;
        this.old_unit = unit;
        this.unit = unit;
        this.notify({ unit: this.unit });
        this.set_option();
        if (add_to_undo_manager) {
            new UndoManager().push(
                new ChangeUnitTagOptCommand(
                    this.parent.parent.approach_id,
                    this.parent.id,
                    this.id,
                    this.device_type,
                    old_unit
                )
            );
        }
    }
    template_editor() {
        if (this.unit == null || this.unit == "") {
            var box = new NumericEditor({ tag_option: this }).get_editor_view();
        } else {
            var box = new NumericEditorWithUnit({
                tag_option: this,
            }).get_editor_view();
        }
        return box;
    }
    set_option() {
        if (this.parent_jq == null) return;
        if (
            UnitWithoutValue.includes(this.unit) &&
            this.extra_unit.includes(this.unit)
        ) {
            this.parent_jq.css(this.name, this.unit);
        } else if (
            this.unit != "px" &&
            this.unit != "%" &&
            this.unit != "" &&
            !this.extra_unit.includes(this.unit)
        ) {
            console.error(
                `${this.unit} не указан в extra_unit для опции ${this.name}`
            );
        } else {
            let val = `${this.val}${this.unit}`; //TODO ALERT ТУТ ХУЙНЯ НУЖНО
            try {
                this.parent_jq.css(this.name, val);
            } catch (error) {
                console.error(error);
            }
        }
    }
    hook_before_set_stuctrure_from_json(json) {
        if (json["unit"] != null) this.set_unit(json["unit"], false);
    }
    hook_get_structure_as_json(structure) {
        structure["unit"] = this.unit;
        if (UnitWithoutValue.includes(this.unit)) {
            structure["val"] = "";
        }
        return;
    }
}
