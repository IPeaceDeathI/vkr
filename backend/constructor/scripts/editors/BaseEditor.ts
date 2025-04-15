import { Observer } from "@/classes/Observer";
import { TagType } from "@/classes/types";

export class TagEditor extends Observer{
    tag : TagType;
    wrapper : JQuery;
    constructor(tag : TagType){
         super();
         this.tag = tag;
         this.subscribe(this.tag);
         this.wrapper = $(`<div class='editor-wrapper'></div>`)
    }
    public get_editor_view():JQuery{
        this.render();
        return this.wrapper;
    }
    public render():void{
        this.wrapper.html('');
        this.wrapper.append(this.get_editor_viev_template());
    }
    _set_template(): void {
        throw new Error("method get_editor_view_template() must be redefined");
    }
    protected get_editor_viev_template():JQuery{
        throw new Error("method get_editor_view_template() must be redefined");
    }
}

export class Editor extends Observer {
    constructor(params) {
        super();
        this.tag_option = params.tag_option;
        this.subscribe(this.tag_option);
        if (this.tag_option.val != null) this.set_value(this.tag_option.val);
        else this.set_value(0);
        this.wrapper = $(`<div class ="editor-wrapper"></div>`);
    }
    _set_template(data) {
        this.set_value(data);
        this.re_render(); //////Плохая оптимизация(ВРеменно для теста реактивности)
    }
    set_value(value) {
        this.value = value;
    }
    set_value_to_tag_option() {
        this.tag_option.set_value_without_notify(this.value);
    }
    get_editor_view() {
        this.wrapper.html("");
        this.wrapper.append(this.get_editor_view_template());
        return this.wrapper;
    }
    re_render() {
        this.wrapper.html("");
        this.wrapper.append(this.get_editor_view_template());
    }
    get_editor_view_template() {
        throw new Error("method get_editor_view_template() must be redefined");
    }
    get_val() {
        return this.value;
    }
}
export class NonEditableEditor {
    constructor() {
        this.wrapper = $(`<div class ="noneditable-editor-wrapper"></div>`);
    }
    delete() {
        return;
    }
    get_view() {
        this.wrapper.html("");
        this.wrapper.append(this.get_editor_view_template());
        return this.wrapper;
    }
    get_editor_view_template() {
        throw new Error("method get_editor_view_template() must be redefined");
    }
}
