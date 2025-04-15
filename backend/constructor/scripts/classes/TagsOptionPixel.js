import TagsOptionNumeric from "@/classes/TagsOptionNumeric";

export default class TagsOptionPixel extends TagsOptionNumeric {
    constructor(params, parent) {
        params["unit"] = params.unit ?? "px";
        super(params, parent);
    }
}
