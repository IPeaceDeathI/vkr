import TagsOption from "@/classes/TagsOption";
import { hexToRgba } from "@/helpers/helpers";
import { ColorEditor } from "@/editors/Editors";

export default class TagsOptionColor extends TagsOption {
    constructor(params, parent) {
        super(
            {
                id: params["id"],
                type: "css",
                name: params["name"],
                val: params["val"],
                edit_option: params["edit_option"],
                unit: "#",
                title: params["title"],
            },
            parent
        );
        this.valid_val();
    }
    set_option() {
        if (this.parent_jq == null) return;
        this.parent_jq.css(this.name, hexToRgba(this.val));
    }
    template_editor() {
        return new ColorEditor({ tag_option: this }).get_editor_view();
    }
    hook_before_set_value() {
        this.valid_val();
    }
    hook_before_set_value_without_notify() {
        this.valid_val();
    }
    valid_val() {
        var opacity = "ff";
        if (this.val.length < 3) return;
        else if (this.val.length <= 6) {
            this.val = this.val.substring(1);
            var hex = "#";
            for (; this.val.length != 7 - hex.length; ) {
                var first_char = this.val.substring(0, 1);
                hex += "0" + first_char;
                this.val = this.val.substring(1);
            }
            this.val = hex + this.val + opacity;
        } else if (this.val.length == 7) {
            this.val = this.val + opacity;
        } else {
            var opacity = this.val.substring(7, this.val.length);
            if (opacity.length == 1) opacity = "0" + opacity;
            else if (opacity.length > 2) opacity = opacity.substring(0, 2);
            this.val = this.val.substring(0, 7) + opacity;
        }
        var tmp = "#";
        for (let index = 1; index < this.val.length; index++) {
            if (this.val[index] > "f") tmp += "f";
            else if (this.val[index] < 0) tmp += "0";
            else tmp += this.val[index];
        }
        this.val = tmp;
    }
    get_color() {
        return this.val.substring(0, 7);
    }
    set_color(val, add_to_undo_manager = true) {
        this.val = val + this.val.substring(7, 9);
        this.set_value(this.val, add_to_undo_manager);
    }
    get_opacity(customval = null) {
        if (customval) {
            var a = "0x" + customval[7] + customval[8];
            a = +(a / 255).toFixed(3);
            return a;
        }
        var a = "0x" + this.val[7] + this.val[8];
        a = +(a / 255).toFixed(3);
        return a;
    }
    set_opacity(val) {
        var r = Math.round(val * 255)
            .toString(16)
            .substring(0, 2);
        this.val = this.get_color() + r;
        this.valid_val();
        this.set_option();
    }
}
