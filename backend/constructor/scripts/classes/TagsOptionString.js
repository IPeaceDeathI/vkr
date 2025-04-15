import TagsOption from "@/classes/TagsOption";

export default class TagsOptionString extends TagsOption {
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
    }
    set_option() {
        if (this.parent_jq == null) return;
        this.parent_jq.css(this.name, this.val);
    }
}
