import TagsOption from "@/classes/TagsOption";

export default class TagsOptionsPackage {
    /**
     * Array (TagOption) / Array (TagOptionPackage)
     */
    constructor(arrayTagOptions) {
        this.storage = arrayTagOptions;
    }
    unpack_as_array() {
        if (this.storage[0] instanceof TagsOption) return this.storage;
        let arr = [];
        this.storage.forEach((el) => {
            arr = arr.concat(el.unpack_as_array());
        });
        return arr;
    }
}
