import TagsOptionNumeric from "@/classes/TagsOptionNumeric";

export default class TagsOptionPercent extends TagsOptionNumeric {
    constructor(params, parent) {
        params["unit"] = params.unit ?? "%";
        super(params, parent);
    }
}
