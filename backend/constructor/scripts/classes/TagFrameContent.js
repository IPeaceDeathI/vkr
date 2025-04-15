import FrameContentEditor from "@/editors/FrameContentEditor";
import Tag from "@/classes/Tag";
import { TagOptionMap } from "@/constant";

class TagFrameContentEditor {
    constructor(opener) {
        this.opener = opener;
    }
    delete() {
        this.opener.remove();
    }
}

export default class TagFrameContent extends Tag {
    constructor(params) {
        super(params);
        this.entity = params["entity"] ?? null;
        this.entity_id = params["entity_id"] ?? null;

        var tag_option_params = { val: "flex", parent: this };
        var option = TagOptionMap(EnumOption.DISPLAY)(tag_option_params);
        option.unpack_as_array().forEach((el) => {
            this.tags_options.set(el.id, el);
            el.set_device_type(TagOptionsType.DESKTOP);
        });
        var tag_option_params = { val: "center", parent: this };
        var option = TagOptionMap(EnumOption.ALIGN_ITEMS)(tag_option_params);
        option.unpack_as_array().forEach((el) => {
            this.tags_options.set(el.id, el);
            el.set_device_type(TagOptionsType.DESKTOP);
        });
        var tag_option_params = { val: "center", parent: this };
        var option = TagOptionMap(EnumOption.JUSTIFY_CONTENT)(
            tag_option_params
        );
        option.unpack_as_array().forEach((el) => {
            this.tags_options.set(el.id, el);
            el.set_device_type(TagOptionsType.DESKTOP);
        });
    }

    editable() {
        return true;
    }
    _hook_after_get_structure(structure) {
        structure["entity"] = this.entity;
        structure["entity_id"] = this.entity_id;
    }
    _hook_after_set_structure(json) {
        this.entity = json["entity"];
        this.entity_id = json["entity_id"];
    }
    update_all_options_hook() {
        this.#update_frame_src();
    }
    set_param(param) {
        this.entity = param.entity ?? null;
        this.entity_id = param.entity_id ?? null;
        this.#update_frame_src();
    }
    set_click_event() {
        const opener = $(`<div class=frame-content-editor-opener></div>`);
        this.jquery.before(opener);
        opener.off("click.frame_content");
        opener.on("click.frame_content", () => {
            const editor = new FrameContentEditor({
                tag_parent: this,
                param: { entity: this.entity, entity_id: this.entity_id },
            }).get_pop_up();
            window.main.blocks_view_space().wrapper.append(editor);
        });
        return new TagFrameContentEditor(opener);
    }
    #update_frame_src() {
        if (this.entity != null && this.entity_id != null) {
            if (this.entity == EnumFrameContent.QUIZ) {
                this.jquery.attr(
                    "src",
                    `/${this.entity}/preview/${this.entity_id}`
                );
            } else if (this.entity == EnumFrameContent.FORM) {
                this.jquery.attr(
                    "src",
                    `/${this.entity}/preview/${this.entity_id}`
                );
            }
        } else {
            this.jquery.attr("src", ``);
            // const preview = $(`<div class=frame-content-editor-preview></div>`);
            // this.jquery.before(preview);
            console.log("заглушка для пустого фрейма");
        }
    }
}
