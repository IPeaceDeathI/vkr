import TagsOption from "@/classes/TagsOption";
import { ImageEditor } from "@/editors/Editors";

export default class TagsOptionSrc extends TagsOption {
    constructor(params, parent) {
        super(
            {
                id: params["id"],
                type: "attr",
                name: "src",
                val: params["val"],
                edit_option: params["edit_option"],
                title: params["title"],
            },
            parent
        );
    }

    template_editor() {
        var popa = new ImageEditor({ tag_option: this }).get_editor_view();
        return popa;
    }
}
