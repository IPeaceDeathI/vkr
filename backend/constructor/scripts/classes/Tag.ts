import Api from "@/classes/Api";
import { MainStateMobile, MainStateTablet } from "@/main";
import { TagOptionMap } from "@/constant";
import UndoManager from "@/classes/UndoManager";
import { ChangeTextTagCommand } from "@/classes/Command";
import WYSIWYGEditor from "@/services/wysiwyg";
import { Observable } from "@/classes/Observer";
import {TagsOptionType, TagAttributes, TagType} from "@/classes/types"
import {TagUpdateTagOption, TagRemoveTagOption, TagChangeTagOption TagUpdateAttribute, TagRemoveAttribute} from "@/classes/Command"
import TagBackgroundManager from "@/classes/TagBackgroundManager";

export default class Tag extends Observable implements TagType{
    id;
    tag;
    text;
    title;
    tags_options;
    tags_options_tablet;
    tags_options_mobile;
    parent;
    attributes = new Map<TagAttributes, string>;
    constructor({
        id,
        tag,
        text = null,
        title = "",
        tags_options = [],
        tags_options_tablet = [],
        tags_options_mobile = [],
        parent = null,
        ...args
    } : TagInitialParams) {
        super()
        this.id = id;
        this.tag = tag;
        this.class = args.class;
        this.text = text;
        this.title = title;
        this.tags_options = new Map();
        this.tags_options_tablet = new Map();
        this.tags_options_mobile = new Map();
        this.parent = parent;

        this.#set_to_options_map(
            tags_options,
            this.tags_options,
            TagOptionsType.DESKTOP
        );

        this.#set_to_options_map(
            tags_options_tablet,
            this.tags_options_tablet,
            TagOptionsType.TABLET
        );

        this.#set_to_options_map(
            tags_options_mobile,
            this.tags_options_mobile,
            TagOptionsType.MOBILE
        );
        this.manager = new TagBackgroundManager(this);
        // this.manager.set_color({val:'#ffffff', edit_option: EnumEditOption.NONEDITABLE});
        // this.manager.set_gradient({val:'linear-gradient(blue, pink)', edit_option: EnumEditOption.NONEDITABLE});
    }

    get_id() {
        return this.id;
    }

    set_id(value) {
        this.id = value;
    }

    get_tag() {
        return this.tag;
    }

    set_tag(value) {
        this.tag = value;
    }

    get_text_params() {
        return this.text;
    }

    set_text_params(value) {
        this.text = value;
    }

    get_title() {
        return this.title;
    }

    set_title(value) {
        this.title = value;
    }

    get_parent() {
        return this.parent;
    }

    get_tags_options() {
        return this.tags_options;
    }

    get_tags_options_tablet() {
        return this.tags_options_tablet;
    }

    get_tags_options_mobile()  {
        return this.tags_options_mobile;
    }

    get_attributes(){
        return this.attributes
    }
    update_attribute(key :  TagAttributes, value : string ) : void{
        const oldValue = this.get_attributes().get(key);
        const undoCommand = oldValue === undefined ? new TagRemoveAttribute(
            this.parent.get_approach_id(),
            this.get_id(),
            key,
        ) :   new TagUpdateAttribute(
            this.parent.get_approach_id(),
            this.get_id(),
            key,
            oldValue
        );
        if(this.update_attribute_not_undo(key, value)){
            new UndoManager().push(
                undoCommand
            )
        }
    }
    update_attribute_not_undo(key : TagAttributes, value : string) : Boolean {
        this.attributes.set(key, value);
        this.notify(null);
        return true
    }
    remove_attribute(key: TagAttributes):void{
        const attribute = this.remove_attribute_not_undo(key);
        if (attribute){
            new UndoManager().push(
                new TagUpdateAttribute(
                    this.parent.get_approach_id(),
                    this.get_id(),
                    key,
                    attribute
                )
            )
        }
    }
    remove_attribute_not_undo(key:  TagAttributes): string | Boolean{
        if(this.attributes && this.attributes.has(key)){
            const tmp = this.attributes.get(key)
            this.attributes.delete(key)
            this.notify(null);
            return tmp ? tmp : false
        }else{
            return false;
        }
    }
    update_tag_option(key : typeof EnumOption, value : TagsOptionType):void{
        if(this.update_tag_option_not_undo(key, value)){
            new UndoManager().push(
                new TagRemoveTagOption(
                    this.parent.get_approach_id(),
                    this.get_id(),
                    key,
                )
            );
        }
    }   
    update_tag_option_not_undo(key: typeof EnumOption, value : TagsOptionType):Boolean{
        try {
            this.tags_options.set(key, value);
            this.notify(null);
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }
    remove_tag_option(key : typeof EnumOption):void{
        const option = this.remove_tag_option_not_undo(key); 
        if (option){
             new UndoManager().push(
                 new TagUpdateTagOption(
                     this.parent.get_approach_id(),
                     this.get_id(),
                     key,
                     option
                 )
             );
        }
    }
    remove_tag_option_not_undo(key:typeof EnumOption) : TagsOptionType | Boolean{
        if(this.tags_options.has(key)){
            const tmp = this.tags_options.get(key)
            this.tags_options.delete(key)
            this.notify(null);
            return tmp
        }else{
            return false;
        }
    }
    change_tag_options(enumOption : typeof EnumOption, object : {key : typeof EnumOption, value : TagsOptionType}):void{
        const сhanged_option = this.change_tag_options_not_undo(enumOption, object); 
        if (сhanged_option){
             new UndoManager().push(
                 new TagChangeTagOption(
                     this.parent.get_approach_id(),
                     this.get_id(),
                     enumOption,
                     сhanged_option,
                     object.key
                 )
             );
        }
    }
    change_tag_options_not_undo(enumOption : typeof EnumOption, object : {key : typeof EnumOption, value : TagsOptionType}) : TagsOptionType | Boolean{
        const tmp = this.remove_tag_option_not_undo(enumOption);
        if(tmp && this.update_tag_option_not_undo(object.key, object.value)){
            return tmp;
        } else return false;
    }
    #set_to_options_map(options, map, device_type) {
        options.forEach((element) => {
            const tag_option_id = element[0];
            const tag_option_params = element[1] ?? {};
            tag_option_params.parent = this;
            try {
                var option = TagOptionMap(tag_option_id)(tag_option_params);
                option.unpack_as_array().forEach((el) => {
                    map.set(el.id, el);
                    el.set_device_type(device_type);
                });
            } catch (error) {
                Api.send_to_tg(
                    `Method: Tag ${this.id} -> set_to_options_map -> block -> ${this.parent.name}->;\ntag_optionid = ${tag_option_id} tag_option_param = ${tag_option_params}\nError: ${error}`
                );
            }
        });
    }
    editable() {
        var result = false;
        this.tags_options.forEach((option) => {
            if (option.editable()) {
                result = true;
                return;
            }
        });
        if (result) return result;
        this.tags_options_tablet.forEach((option) => {
            if (option.editable()) {
                result = true;
                return;
            }
        });
        if (result) return result;
        this.tags_options_mobile.forEach((option) => {
            if (option.editable()) {
                result = true;
                return;
            }
        });
        return result;
    }
    get_option_by_id(id, device_type = TagOptionsType.DESKTOP) {
        switch (device_type) {
            case TagOptionsType.DESKTOP:
                return this.tags_options.get(id);
            case TagOptionsType.TABLET:
                return this.tags_options_tablet.get(id);
            case TagOptionsType.MOBILE:
                return this.tags_options_mobile.get(id);
            default:
                console.log(`Не найден подходящий map для ${device_type}`);
        }
        return false;
    }
    get_jq() {
        return this.jquery;
    }
    update_all_options(jquery = this.jquery) {
        this.jquery = jquery;
        if(this.jquery == undefined) {
            return
        }
        this.jquery.removeAttr('contenteditable')

        this.update_all_options_hook();
        this.tags_options.forEach((option) => {
            //desktop
            option.set_parent_jq(this.jquery);
            option.set_option();
        });
        if (
            window.main.state instanceof MainStateTablet ||
            window.main.state instanceof MainStateMobile
        ) {
            //tablet
            this.tags_options_tablet.forEach((option) => {
                option.set_parent_jq(this.jquery);
                option.set_option();
            });
        }
        if (window.main.state instanceof MainStateMobile) {
            //mobile
            this.tags_options_mobile.forEach((option) => {
                option.set_parent_jq(this.jquery);
                option.set_option();
            });
        }

        if (this.text == null) return;
        this.set_text(this.text, false);
        
        this.set_on_click_for_text_editor();
    }

    set_on_click_for_text_editor() {
        this.jquery.css('min-width',`${this.jquery.css('min-width') !=='0px' && this.jquery.css('min-width') !=='auto' ? this.jquery.css('min-width') : '1em'}`)
        this.jquery.css('min-height',`${this.jquery.css('min-height') !=='0px' && this.jquery.css('min-height') !=='auto' ? this.jquery.css('min-height') : '1em'}`)
        var instance = this;
        this.jquery.on("click.callTextEditor", function () {
            $(this).off('click.callTextEditor')
            new WYSIWYGEditor().init({jqObject : $(this) ,onInput:(content)=>{
                instance.text = content;
            } ,onChange : (content)=>{
                instance.text = content;
            } , onDestroy : (content)=>{
                instance.set_text(content)
                instance.set_on_click_for_text_editor();
                setTimeout(function () {  instance.jquery.removeClass("tag-in-focus");},10);
            }})
            // $(this).attr('id', 'myeditablediv')
            // tinymce.init({
            //     selector: '#myeditablediv',
            //     plugins:'lists autolink',
            //     toolbar_location: 'bottom', // top work bad
            //     inline: true,
            //     auto_focus:'editable',
            //     setup : (editor)=>{
            //         editor.on('init', function (e) {
            //             editor.focus();
            //           }),
            //         editor.on('Change', ()=>{
            //             console.log(instance.title, 'Change')
            //         })
            //         editor.on('input', ()=>{
            //             console.log(instance.title, 'input')
            //         })
            //         editor.on('blur', (e)=>{
            //             editor.destroy(false);
            //             $(this).removeAttr('id')
            //             e.stopImmediatePropagation();
            //             instance.set_on_click_for_text_editor()
            //         })
            //     }
            //   });
            // $(this).off("click");
            // var editor = $(this)
            //     .trumbowyg({
            //         btns: [
            //             [
            //                 "strong",
            //                 "align",
            //                 "link",
            //                 "em",
            //                 "fontfamily",
            //                 "foreColor",
            //                 "backColor",
            //                 "fontsize",
            //                 "historyUndo",
            //             ],
            //         ],
            //         btnsDef: {
            //             align: {
            //                 dropdown: [
            //                     "justifyLeft",
            //                     "justifyCenter",
            //                     "justifyRight",
            //                     "justifyFull",
            //                 ],
            //                 ico: "justifyLeft",
            //             },
            //         },
            //         plugins: {
            //             fontsize: {
            //                 sizeList: [
            //                     "12px",
            //                     "14px",
            //                     "16px",
            //                     "18px",
            //                     "20px",
            //                     "22px",
            //                     "24px",
            //                     "26px",
            //                 ],
            //             },
            //             fontfamily: {
            //                 fontList: [
            //                     {
            //                         name: "Arial",
            //                         family: "Arial, Helvetica, sans-serif",
            //                     },
            //                     {
            //                         name: "Open Sans",
            //                         family: "'Open Sans', sans-serif",
            //                     },
            //                     { name: "Futura New", family: "Futura New" },
            //                     { name: "Gilroy", family: "Gilroy" },
            //                     { name: "inter", family: "inter" },
            //                     { name: "Montserrat", family: "Montserrat" },
            //                     { name: "Open Sans", family: "Open Sans" },
            //                     {
            //                         name: "Open Sans Condensed",
            //                         family: "Open Sans Condensed",
            //                     },
            //                     {
            //                         name: "Playfair Display",
            //                         family: "Playfair Display",
            //                     },
            //                     {
            //                         name: "Proxima Nova",
            //                         family: "Proxima Nova",
            //                     },
            //                     { name: "PT Serif", family: "PT Serif" },
            //                     { name: "Roboto", family: "Roboto" },
            //                     { name: "Rubik", family: "Rubik" },
            //                     { name: "Ubuntu", family: "Ubuntu" },
            //                     {
            //                         name: "Yandex Sans Text",
            //                         family: "Yandex Sans Text",
            //                     },
            //                 ],
            //             },
            //         },
            //     })
            //     .off("tbwclose")
            //     .off("tbwchange")
            //     .on("tbwclose", function () {
            //         instance.set_text(this.innerHTML);
            //         instance.set_on_click_for_text_editor();
            //     })
            //     .on("tbwchange", function () {
            //         instance.text = this.innerHTML;
            //     });

            // window.main.set_text_editor(editor);
        });
    }
    set_text(html, add_to_undo_manager = true) {
        let old_text = this.old_text;
        this.text = html;
        this.old_text = this.text;

        this.jquery.html(this.text);

        if (add_to_undo_manager) {
            if (old_text != this.text) {
                new UndoManager().push(
                    new ChangeTextTagCommand(
                        this.parent.approach_id,
                        this.id,
                        old_text
                    )
                );
            }
        }
    }
    update_all_options_hook() {
        return;
    }
    get_options() {
        return this.tags_options();
    }
    get_stuctrure_as_json() {
        var structure = new Object();
        structure["id"] = this.id;
        structure["tag"] = this.tag;
        structure["class"] = this.class;
        structure["title"] = this.title;
        structure["text"] = this.text;
        structure["attributes"] = Object.fromEntries(this.get_attributes());
        structure["options"] = this.#get_options_as_array();
        structure["options_tablet"] = this.#get_options_tablet_as_array();
        structure["options_mobile"] = this.#get_options_mobile_as_array();

        this._hook_after_get_structure(structure);
        return structure;
    }
    _hook_after_set_structure(json) {
        return;
    }
    _hook_after_get_structure(structure) {
        return;
    }
    set_stuctrure_from_json(json) {
        this.text = json["text"];
        if( json["attributes"]){
            this.attributes = new Map(Object.entries(json['attributes']));
        }
        this.#set_options_from_array(json["options"]);
        this.#set_options_tablet_from_array(json["options_tablet"]);
        this.#set_options__mobile_from_array(json["options_mobile"]);

        this._hook_after_set_structure(json);
    }
    #get_options_as_array() {
        var options_array = [];
        this.tags_options.forEach((option) => {
            options_array.push(option.get_stuctrure_as_json());
        });
        return options_array;
    }
    #get_options_tablet_as_array() {
        var options_array = [];
        this.tags_options_tablet.forEach((option) => {
            options_array.push(option.get_stuctrure_as_json());
        });
        return options_array;
    }
    #get_options_mobile_as_array() {
        var options_array = [];
        this.tags_options_mobile.forEach((option) => {
            options_array.push(option.get_stuctrure_as_json());
        });
        return options_array;
    }
    #set_options_from_array(options_array) {
        if (options_array != null) {
            options_array.forEach((output_option) => {
                var tag_option = this.tags_options.get(output_option["id"]);
                if (!tag_option) {
                    console.log(this.tags_options);
                    console.log(
                        "Не удалось применить свойство ",
                        output_option
                    );
                    return; // hui hueviy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                }
                try {
                    tag_option.set_parent_jq(this.jquery);
                    tag_option.set_stuctrure_from_json(output_option);
                } catch (error) {
                    console.log(
                        "Не удалось применить свойство ",
                        output_option,
                        error
                    );
                }
            });
        }
    }
    #set_options_tablet_from_array(options_array) {
        if (options_array != null) {
            options_array.forEach((output_option) => {
                var tag_option = this.tags_options_tablet.get(
                    output_option["id"]
                );
                if (!tag_option) {
                    console.log(
                        "Не удалось применить свойство ",
                        output_option
                    );

                    return; // hui hueviy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                }
                try {
                    tag_option.set_parent_jq(this.jquery);
                    tag_option.set_stuctrure_from_json(output_option);
                } catch (error) {
                    console.log("---------------------");
                    console.log(this);
                    console.log(tag_option);
                    console.log(output_option);
                    console.log(error);
                }
            });
        }
    }
    #set_options__mobile_from_array(options_array) {
        if (options_array != null) {
            options_array.forEach((output_option) => {
                var tag_option = this.tags_options_mobile.get(
                    output_option["id"]
                );
                if (!tag_option) {
                    console.log(
                        "Не удалось применить свойство ",
                        output_option
                    );

                    return; // hui hueviy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                } // hui hueviy !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                try {
                    tag_option.set_parent_jq(this.jquery);
                    tag_option.set_stuctrure_from_json(output_option);
                } catch (error) {
                    console.log("---------------------");
                    console.log(this);
                    console.log(tag_option);
                    console.log(output_option);
                    console.log(error);
                }
            });
        }
    }
}
