import { variantSelectors } from "@/constant";
import TagsOption from "@/classes/TagsOption";
import { SelectorEditor } from "@/editors/Editors";

export default class TagsOptionSelect extends TagsOption {
    constructor(params, parent) {
        super(
            {
                id: params["id"],
                type: "css",
                name: params["name"],
                val: params["val"],
                unit: "select",
                edit_option: params["edit_option"],
                title: params["title"],
            },
            parent
        );

        if (params["variants"] == null) {
            this.variants = variantSelectors[params["name"]];
            this.possible_variants = variantSelectors[params["name"]];
        } else {
            this.variants = params["variants"];
            this.possible_variants = params["variants"];
        }
        if (params["show"] != null) this.filterProperties(params["show"]);
        if (params["hidden"] != null)
            this.filterProperties(params["hidden"], false);
    }

    filterProperties(propetriesShow, invert = true) {
        let variants = [];
        for (const [key, val] of Object.entries(this.variants)) {
            if (propetriesShow.includes(val.value) === invert)
                variants.push(val);
        }
        this.variants = variants;
    }

    template_editor() {
        this.editor = new SelectorEditor({ tag_option: this });
        return this.editor;
    }
}
