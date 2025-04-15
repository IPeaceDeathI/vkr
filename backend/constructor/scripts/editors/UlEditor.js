import { IMAGES_TAG_OPTIONS_PATH } from "@/constant";
import Api from "@/classes/Api";
import { set_targeting_event } from "@/services/services";
import FrameContentEditor from "@/editors/FrameContentEditor";
class Li {
    strings = [];
    images = [];
    refs = [];
    htmls = [];
    strings_jq = [];
    htmls_jq = [];
    images_jq = [];
    refs_jq = [];
    jquery;
    IconType = {
        TEXT: 0,
        IMAGE: 1,
        HREF: 2,
        HTML: 3,
    };
    constructor(params, jquery, parent, index) {
        // console.log(params)
        this.parent = parent;
        this.index = index;
        if (params.strings != null) {
            this.strings = params.strings;
        }
        if (params.images != null) this.images = params.images;
        if (params.hrefs != null) this.refs = params.hrefs;
        if (params.htmls != null) this.htmls = params.htmls;
        this.jquery = jquery;

        this.render();
    }
    delete() {
        this.jquery.remove();
        if (this.editor != null) this.editor.remove();
    }
    render() {
        var instanse = this;
        //render strings
        this.jquery.find(`.${EnumLiTargeting.STRING}`).each(function (index) {
            instanse.strings_jq.push($(this));
        });
        //render images
        this.jquery.find(`.${EnumLiTargeting.IMAGE}`).each(function (index) {
            instanse.images_jq.push($(this));
        });
        //render refs
        this.jquery.find(`.${EnumLiTargeting.HREF}`).each(function (index) {
            instanse.refs_jq.push($(this));
        });
        //render htmls
        this.jquery.find(`.${EnumLiTargeting.HTML}`).each(function (index) {
            instanse.htmls_jq.push($(this));
        });
    }
    get_editor() {
        var wrapper = $(`<div class="li-wrapper"></div>`);
        wrapper.append(this.#get_strings_wrapper());
        wrapper.append(this.#get_images_wrapper());
        wrapper.append(this.#get_refs_wrapper());
        wrapper.append(this.#get_htmls_wrapper());
        return wrapper;
    }

    /**
     *
     * @param {this.IconType} icon_type
     */
    #get_icon(icon_type) {
        let icon = $(`<div class = "li-icon-wrapper"></div>`);
        switch (icon_type) {
            case this.IconType.TEXT:
                $(`<svg viewBox="0 0 7 8" fill="none">
                      <path d="M3.20794 8C3.13461 8 3.07227 7.978 3.02094 7.934C2.97694 7.88267 2.95494 7.82033 2.95494 7.747V1.279H0.842941C0.769608 1.279 0.707275 1.257 0.655941 1.213C0.611941 1.16167 0.589941 1.09933 0.589941 1.026V0.563999C0.589941 0.483333 0.611941 0.421 0.655941 0.377C0.707275 0.325666 0.769608 0.299999 0.842941 0.299999H6.14494C6.22561 0.299999 6.28794 0.325666 6.33194 0.377C6.38328 0.421 6.40894 0.483333 6.40894 0.563999V1.026C6.40894 1.09933 6.38328 1.16167 6.33194 1.213C6.28794 1.257 6.22561 1.279 6.14494 1.279H4.04394V7.747C4.04394 7.82033 4.01827 7.88267 3.96694 7.934C3.92294 7.978 3.86061 8 3.77994 8H3.20794Z" fill="#C0C0C0"/>
                   </svg>`).appendTo(icon);
                break;
            case this.IconType.IMAGE:
                icon.css(
                    "background-image",
                    `url("${IMAGES_TAG_OPTIONS_PATH}li_image.jpg")`
                );
                break;
            case this.IconType.HREF:
                $(`<svg  viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M9.75314 11H4.73974C4.50596 11 4.32412 10.8474 4.32412 10.6512C4.32412 10.1062 4.01241 9.801 3.54484 9.3214C3.28507 9.0598 2.99934 8.75461 2.7136 8.38401C1.93431 7.31582 1.23296 6.09502 1.0771 5.61542C0.921242 5.13582 1.02514 4.85243 1.181 4.67803C1.36284 4.46003 1.67455 4.35103 2.03822 4.35103C2.53176 4.35103 3.05129 4.69983 3.49288 5.15762V2.04639C3.49288 1.4578 4.06436 1 4.73974 1C5.41512 1 5.9866 1.4796 5.9866 2.04639V3.02124C6.11648 2.97764 6.24636 2.95584 6.40222 2.95584C6.84381 2.95584 7.23346 3.15203 7.46724 3.43543C7.64907 3.34823 7.85688 3.30463 8.09067 3.30463C8.66214 3.30463 9.15569 3.63163 9.28557 4.06763C9.41545 4.02403 9.57131 4.00223 9.75314 4.00223C10.4545 4.00223 11 4.48183 11 5.04862V6.09502C11 6.98882 10.7922 7.73001 10.5844 8.42761C10.3766 9.147 10.1688 9.801 10.1688 10.6294C10.1688 10.8256 9.98693 11 9.75314 11ZM5.15536 10.3024H9.3635C9.41545 9.5394 9.59729 8.90721 9.77912 8.27501C9.98693 7.57741 10.1688 6.90162 10.1688 6.09502V4.98323C10.1688 4.78703 9.98693 4.63443 9.75314 4.63443C9.51936 4.63443 9.33753 4.78703 9.33753 4.98323V5.39742C9.33753 5.59362 9.15569 5.74622 8.92191 5.74622C8.68812 5.74622 8.50629 5.59362 8.50629 5.39742V4.28563C8.50629 4.08943 8.32445 3.93684 8.09067 3.93684C7.85688 3.93684 7.67505 4.08943 7.67505 4.28563V5.04862C7.67505 5.24482 7.49322 5.39742 7.25943 5.39742C7.02565 5.39742 6.84381 5.24482 6.84381 5.04862V3.93684C6.84381 3.74064 6.66198 3.58804 6.42819 3.58804C6.19441 3.58804 6.01257 3.74064 6.01257 3.93684V4.69983C6.01257 4.89603 5.83074 5.04862 5.59695 5.04862C5.36317 5.04862 5.18134 4.89603 5.18134 4.69983V1.95919C5.18134 1.763 4.9995 1.61039 4.76572 1.61039C4.53193 1.61039 4.3501 1.763 4.3501 1.95919V6.79261C4.3501 6.98881 4.16826 7.14141 3.93448 7.14141C3.70069 7.14141 3.51886 6.98881 3.51886 6.79261V6.50922C3.15519 5.70262 2.32396 5.00503 2.06419 5.00503C1.96029 5.00503 1.90834 5.02683 1.88236 5.09223C1.85639 5.13583 1.83041 5.24482 1.88236 5.39742C2.01224 5.76802 2.66165 6.90162 3.46691 8.01341C3.72667 8.36221 3.98643 8.62381 4.24619 8.88541C4.66181 9.3214 5.02548 9.7138 5.15536 10.3024Z" fill="#C0C0C0"/>
                   </svg>`).appendTo(icon);
                break;
            case this.IconType.HTML:
                $(`<svg viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.18411 9.55225L9.55232 3.18408H6.36821L0 9.55225L6.36821 15.9204H9.55232L3.18411 9.55225ZM19.1046 3.18408H15.9205L22.2887 9.55225L15.9205 15.9204H19.1046L25.4729 9.55225L19.1046 3.18408ZM13.5325 0L9.55232 19.1046H11.9404L15.9205 0H13.5325Z" fill="#C0C0C0"/>
                </svg>`).appendTo(icon);
                break;
            default:
                console.log(
                    `Указан неверный тип иконки (${icon_type}) в ${this}`
                );
        }
        return icon;
    }
    #get_strings_wrapper() {
        var strings_wrappers = $(`<div class="under-li-wrapper"></div>`);
        this.strings.forEach((element, index) => {
            let string_wrapper = $(`<div class = "li-item-wrapper"></div>`);
            var text_area = $(`<textarea>${element}</textarea>`);
            text_area.on("input", () => {
                var text = text_area.val();
                this.strings_jq[index].text(text);
                this.strings[index] = text;
                this.parent.li_array[this.index].strings[index] = text;
            });
            set_targeting_event(text_area, this.strings_jq[index]);
            this.#get_icon(this.IconType.TEXT).appendTo(string_wrapper);
            text_area.appendTo(string_wrapper);
            string_wrapper.appendTo(strings_wrappers);
        });
        return strings_wrappers;
    }
    #get_images_wrapper() {
        var images_wrappers = $(`<div class="under-li-wrapper "></div>`);
        images_wrappers.append(images_wrappers);
        var instance = this;
        this.images.forEach((element, index) => {
            var image_wrapper = $(`<div class="li-item-wrapper"></div>`);
            var jq = this.images_jq[index];
            if (jq == null) return;
            var box = $(
                `<input type="file"  accept="image/png, image/jpeg, image/svg+xml">`
            ).css("display", "none");
            var image = $(`<img src=${element}></img>`);
            box.on("change", async () => {
                const input = box;
                const files = input.prop("files");
                const el_for_disable =
                    instance.images_jq[index].prop("tagName") == "img"
                        ? instance.images_jq[index]
                        : instance.images_jq[index].parent();
                const el2_for_disable =
                    image.prop("tagName") == "img" ? image : image.parent();
                tempDisabledElem(el_for_disable, true);
                tempDisabledElem(el2_for_disable, true);
                Api.save_images_from_files(files)
                    .then((results) => {
                        if (Array.isArray(results)) results = results[0];
                        image.attr("src", results);
                        instance.images[index] = results;
                        instance.images_jq[index].attr("src", results);
                        instance.parent.li_array[this.index].images[index] =
                            results;
                    })
                    .catch((results) => {
                        return;
                    })
                    .finally(() => {
                        tempDisabledElem(el_for_disable, false);
                        tempDisabledElem(el2_for_disable, false);
                    });
            });
            jq.off("click");
            jq.on("click", () => {
                box.trigger("click");
            });
            image.on("click", () => {
                box.trigger("click");
            });
            const clear_btn = $(
                '<div class="editors-button editors-close-button"></div>'
            ).on("click", () => {
                const results = "";
                image.attr("src", results);
                instance.images[index] = results;
                instance.images_jq[index].attr("src", results);
                instance.parent.li_array[this.index].images[index] = results;
            });
            set_targeting_event(image, jq);
            this.#get_icon(this.IconType.IMAGE).appendTo(image_wrapper);
            image.appendTo(image_wrapper);
            clear_btn.appendTo(image_wrapper);
            box.appendTo(image_wrapper);
            image_wrapper.appendTo(images_wrappers);
        });
        return images_wrappers;
    }
    #get_refs_wrapper() {
        var refs_wrappers = $(`<div class="under-li-wrapper"></div>`);
        this.refs.forEach((element, index) => {
            let ref_wrapper = $(`<div class = "li-item-wrapper"></div>`);
            var input = $(`<input value="${element}">`);
            var jq = this.refs_jq[index];
            if (jq == null) return;
            input.on("change", () => {
                this.refs[index] = input.val();
                jq.attr("href", input.val());
                this.parent.li_array[this.index].hrefs[index] = input.val();
            });
            this.#get_icon(this.IconType.HREF).appendTo(ref_wrapper);
            const open_editor_btn = $("<button>Форма/Квиз</button>").on(
                "click",
                () => {
                    const tmp = FrameContentEditor.parse_href_for_editor(
                        input.val()
                    );
                    const editor = new FrameContentEditor({
                        parent_input: input,
                        param: {
                            entity: tmp.entity,
                            entity_id: tmp.entity_id,
                        },
                    }).get_pop_up();
                    window.main.blocks_view_space().wrapper.append(editor);
                }
            );
            input.appendTo(ref_wrapper);
            open_editor_btn.appendTo(ref_wrapper);

            set_targeting_event(input, jq);
            ref_wrapper.appendTo(refs_wrappers);
        });
        return refs_wrappers;
    }
    #get_htmls_wrapper() {
        var htmls_wrappers = $(`<div class="under-li-wrapper"></div>`);
        this.htmls.forEach((element, index) => {
            let html_wrapper = $(`<div class = "li-item-wrapper"></div>`);
            var text_area = $(`<textarea>${element}</textarea>`);
            text_area.on("input", () => {
                var html = text_area.val();
                this.htmls_jq[index].html(html);
                this.htmls[index] = html;
                this.parent.li_array[this.index].htmls[index] = html;
            });
            text_area.on("change", () => {
                this.parent.tag.parent.reset_options();
            });
            set_targeting_event(text_area, this.htmls_jq[index]);
            this.#get_icon(this.IconType.HTML).appendTo(html_wrapper);
            text_area.appendTo(html_wrapper);
            html_wrapper.appendTo(htmls_wrappers);
        });
        return htmls_wrappers;
    }
}
export default class UlEditor {
    constructor(tag) {
        this.tag = tag;
        this.jquery = tag.jquery;
        this.li_array = tag.li_array;
        this.wrapper = $(`<div class ="editor-wrapper"></div>`);
    }
    get_editor_view() {
        this.wrapper = $(`<div class ="editor-wrapper"></div>`);
        this.wrapper.append(this.get_editor_view_template());
        return this.wrapper;
    }
    re_render() {
        this.wrapper.html("");
        this.wrapper.append(this.get_editor_view_template());
    }
    get_editor_view_template() {
        var editors_wrapper_ul = $(`<div class="editors-wrapper-ul"></div>`);
        this.tag.jquery.find("li").each((index, element) => {
            var li = new Li(
                this.tag.li_array[index],
                $(element),
                this,
                index
            ).get_editor();
            var btns = $(`<div class="add-delete-wrapper">`);
            btns.prependTo(li);
            this.#add_delete_btn(btns, index);
            this.#add_add_btn(btns, index);
            li.appendTo(editors_wrapper_ul);
        });
        var add_last = $('<div class="li-wrapper">');
        add_last.appendTo(editors_wrapper_ul);
        this.#get_add_delete_wrapper().appendTo(add_last);
        return editors_wrapper_ul;
    }
    #add_add_btn(wrapper, index) {
        wrapper.prepend(
            $('<div class="editors-button editors-add-button"></div>').on(
                "click",
                () => {
                    this.tag.add_element_to_li_array(index);
                }
            )
        );
    }
    #add_delete_btn(wrapper, index) {
        wrapper.prepend(
            $('<div class="editors-button editors-delete-button"></div>').on(
                "click",
                () => {
                    this.tag.delete_element_from_li_array(index);
                }
            )
        );
    }
    #get_add_delete_wrapper() {
        var add_delete_wrapper = $(`<div class="add-delete-wrapper"></div>`);
        var add_btn = $(
            `<div class="editors-button editors-add-button"></div>`
        ).appendTo(add_delete_wrapper);
        var delete_btn = $(
            `<div class="editors-button editors-delete-button"></div>`
        ).appendTo(add_delete_wrapper);

        add_btn.on("click", () => {
            this.tag.push_li();
        });
        delete_btn.on("click", () => {
            this.tag.pop_li();
        });
        return add_delete_wrapper;
    }
}
