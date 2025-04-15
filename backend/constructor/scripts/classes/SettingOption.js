import { nameOptionsTest } from "@/constant";
import Options from "@/classes/Options";

export default class SettingOption extends Options {
    constructor(name, val) {
        super(val);
        this.name = name;
        this.title = nameOptionsTest[this.name];
    }
    get_stuctrure_as_json() {
        var structure = new Object();
        structure["name"] = this.name;
        structure["val"] = this.val;
        return structure;
    }
    set_stuctrure_from_json(json) {
        this.val = json["val"];
    }
    get_editor(html_variants, approach_id) {
        // if(html_variants)
        var box = $("<select>");
        var instance = this;
        // Варианты
        html_variants.forEach((val, html_variant) => {
            $(
                `<option value="${html_variant}"${
                    html_variant == instance.val ? "selected" : ""
                }></option>`
            )
                .text(html_variant)
                .appendTo(box);
        });
        box.on("change", function () {
            instance.val = box.val();
            window.main.blocks_model.re_render_block(approach_id);
        });
        return box;
    }
}
