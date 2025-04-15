import Tag from "@/classes/Tag";

export default class PageModel {
    constructor() {
        this.#init_tag();
    }
    #init_tag() {
        const tag_json = {
            id: null,
            tag: "",
            class: null,
            text: null,
            title: "Стиль всей страницы",
            tags_options: [[EnumOption.FONT_FAMILY]],
            parent: this,
        };
        this.tag = new Tag(tag_json);
        this.tag.tags_options.forEach((option) => {
            option.set_device_type(TagOptionsType.COMMON);
        });
    }
    get_tag() {
        return this.tag;
    }
    get_model_as_json() {
        var model = [];
        model.push(this.tag.get_stuctrure_as_json());
        return model;
    }
    set_model_from_json(json) {
        json.forEach((element) => {
            this.tag.set_stuctrure_from_json(element);
        });

        this.tag.update_all_options(window.main.blocks_view_space().wrapper);
    }
}
