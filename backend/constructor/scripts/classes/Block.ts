import { SettingOptionMap } from "@/constant";
import SettingOption from "@/classes/SettingOption";
import Api from "@/classes/Api";
import Tag from "@/classes/Tag";
import TagUl from "@/classes/TagUl";
import TagFrameContent from "@/classes/TagFrameContent";
import HtmlVariant from "@/classes/HtmlVariant";
import ContextMenu from "@/menus/ContextMenu";
import { getRandomInt, getUUID } from "@/helpers/helpers";
import MessagesIndicator, {
    EnumMessagesStatus,
} from "@/services/MessagesIndicator";
enum JqueryPosition {
    after,
    before,
    appendTo,
    prependTo,
}

export default class Block {
    id: number;
    name: string;
    approach_id: number;
    in_focus = false;
    html_variants: HTMLVariantMap;
    tags: TagMap;
    settings: SettingsMap;
    wrapper: JQuery;
    element_html: JQuery;
    context_menu: ContextMenu;
    client_id: string;
    // overlay_html : JQuery | undefined = undefined; TMP maybe back
    /**
     *
     * @param {json} params // Спрашивай у Никиты, что сюда передать
     * @param {int} approach_id
     */
    constructor(params: BlockInitialParams, approach_id: number) {
        this.approach_id = approach_id;
        this.id = params["id"]; // id from database
        this.name = params["name"];
        this.settings = new Map();
        this.tags = new Map();
        this.html_variants = new Map();

        this.#filling_block_params(params);
        this.client_id = getUUID();
        this.#render();
        this.set_attr("id", approach_id.toString());
    }
    // public get_overlay_html() : JQuery | undefined { return this.overlay_html}
    getBlockBDId(): number {
        return this.id;
    }
    get_client_id(): string {
        return this.client_id;
    }
    get_approach_id(): number {
        return this.approach_id;
    }
    #filling_block_params(params: BlockInitialParams): void {
        //Заполняем ассоциативный массив настроек
        this.#filling_settings(params.settings ?? []);
        //Заполняем ассоциативный массив тегов
        this.#filling_tags(params.tags ?? []);
        //Заполняем ассоциативный массив html вариантов
        this.#filling_html_variants(params.html_variants ?? []);
    }
    #filling_settings(settings: SettingInitialParams[]): void {
        settings.forEach((setting) => {
            try {
                //Получаем функцию для создания объекта настроек
                const settingOpt = SettingOptionMap.html_variant(setting[1]);
                this.settings.set(settingOpt.name, settingOpt);
            } catch (error) {
                Api.send_to_tg(
                    `Method: filling block params -> settigs;\nError: ${error}`
                );
            }
        });
    }
    #filling_tags(tags: TagInitialParams[]): void {
        let tag: TagUl | Tag | TagFrameContent | null = null;
        tags.forEach((tag_json) => {
            try {
                tag_json.parent = this;
                if (tag_json.tag == "ul") tag = new TagUl(tag_json);
                else if (tag_json.tag == "frame_content")
                    tag = new TagFrameContent(tag_json);
                else tag = new Tag(tag_json);
                this.tags.set(tag.id, tag);
            } catch (error) {
                Api.send_to_tg(
                    `Method: filling block params -> tags;\nError: ${error}`
                );
            }
        });
    }
    #filling_html_variants(html_variants: HTMLVariantInitialParams[]): void {
        html_variants.forEach((variant_json) => {
            try {
                var html_var = new HtmlVariant(variant_json);
                this.html_variants.set(html_var.name, html_var);
            } catch (error) {
                Api.send_to_tg(
                    `Method: filling block params -> html_variants;\nError: ${error}`
                );
            }
        });
    }
    delete(): void {}
    get_stuctrure_as_json(): BlockOutputStructure {
        const structure = {} as BlockOutputStructure;
        structure["id"] = this.id;
        structure["name"] = this.name;
        structure["client_id"] = this.client_id;
        structure["settings"] = this.#get_settings_as_array();
        structure["tags"] = this.#get_tags_as_array();
        structure["html"] = this.#get_current_html();
        return structure;
    }
    set_structure_from_json(json: BlockInputStructure): void {
        this.#set_settings_from_array(json["settings"]);
        this.#set_tags_from_array(json["tags"]);
        this.reset_options();
        this.client_id = json.client_id ? json.client_id : this.client_id;
    }
    show(jq_landmark: JQuery, jq_position: JqueryPosition | string): void {
        //tmp
        if (typeof jq_position === "string") {
            jq_position = jq_position.trim();
            switch (jq_position) {
                case "after":
                    jq_position = JqueryPosition.after;
                    break;
                case "before":
                    jq_position = JqueryPosition.before;
                    break;
                case "appendTo":
                    jq_position = JqueryPosition.appendTo;
                    break;
                case "prependTo":
                    jq_position = JqueryPosition.prependTo;
                    break;
            }
        }
        //end tmp
        switch (jq_position) {
            case JqueryPosition.after:
                jq_landmark.after(this.wrapper);
                break;
            case JqueryPosition.before:
                jq_landmark.before(this.wrapper);
                break;
            case JqueryPosition.appendTo:
                this.wrapper.appendTo(jq_landmark);
                break;
            case JqueryPosition.prependTo:
                this.wrapper.prependTo(jq_landmark);
                break;
            default:
                console.error(
                    `Не удалось отобразить блок ${this.name}. Указана неверная позиция: ${jq_position}`
                );
                new MessagesIndicator().showPopUpMessage({
                    message: `Не удалось отобразить блок ${this.name}`,
                    status: EnumMessagesStatus.ERROR,
                });
        }
        this.re_render();
    }
    get_tag_by_id(id: string): Tag | undefined {
        return this.tags.get(id);
    }
    re_render(): void {
        // this.element_html.html(this.#get_current_html());
        this.element_html.html(this.set_id_script_block());
        this.reset_options();
    }
    set_id_script_block() {
        let html = this.#get_current_html();
        if (!html) return html;
        if (!html.includes("</script>")) return html;
        if (html.includes("getScriptHandle(")) return html;
        let jq_html = $("<div>" + html + "</div>");
        let finds = jq_html.find("script");
        finds.each((i, el) => {
            let before = $(el).html();
            before = before.trim();
            let after = `$(document).ready(function()
            {
                let currentScript = getScriptHandle(${getRandomInt()});
                // Start
                ${before}
                // End
            });`;
            $(el).html(after);
        });
        return jq_html.prop("innerHTML");
    }
    set_attr(name: string, value: string): void {
        this.wrapper.attr(name, value);
    }
    get_attr(name: string): string | undefined {
        return this.wrapper.attr(name);
    }
    add_class(name: string): void {
        this.wrapper.addClass(name);
    }
    remove_class(name: string) {
        this.wrapper.removeClass(name);
    }
    get_jq(): JQuery {
        return this.wrapper;
    }
    set_focus(): void {
        // if(this.overlay_html) this.overlay_html.attr('data-noks-constructor-overlay-bilyalov', 'false')
        this.in_focus = true;
    }
    remove_focus(): void {
        // if(this.overlay_html) this.overlay_html.attr('data-noks-constructor-overlay-bilyalov', 'true')
        this.in_focus = false;
    }
    add_to_context_menu(
        jquery_view: JQuery,
        title_view: JQuery,
        title: string
    ) {
        if (this.in_focus) {
            this.context_menu.add(jquery_view, title_view, title);
        }
    }
    scroll_to_me(): void {
        console.log("Заглушка на скролл");
    }
    reset_options(): void {
        this.tags.forEach((values) => {
            values.update_all_options(this.wrapper.find(values.class));
        });
    }
    get_element_html(): JQuery {
        return this.element_html;
    }
    #redefinition_context_menu(): void {
        this.context_menu = new ContextMenu();

        this.element_html.on("contextmenu", (event) => {
            if (!this.in_focus || !this.context_menu.hide) return;
            if (this.element_html.find(".context-menu").length == 0)
                this.context_menu.wrapper.prependTo(this.element_html);

            const offset = this.element_html.offset();
            const off_top: number = offset?.top ?? 0;
            const off_left: number = offset?.left ?? 0;
            this.context_menu.show_menu(
                event.pageY - 5 - off_top,
                event.pageX - 5 - off_left
            );
            return false; // cancel default menu
        });
    }
    #get_settings_as_array(): SettingOutputStructure[] {
        var settings_array = [] as SettingOutputStructure[];
        this.settings.forEach((setting) => {
            settings_array.push(setting.get_stuctrure_as_json());
        });
        return settings_array;
    }
    #set_settings_from_array(settings_array: SettingInputStructure[]): void {
        settings_array.forEach((output_setting) => {
            var setting = this.settings.get(output_setting["name"]);
            if (setting != null) {
                setting.set_stuctrure_from_json(output_setting);
            }
        });
    }
    #get_tags_as_array(): TagOutputStructure[] {
        var tags_array = [] as TagOutputStructure[];
        this.tags.forEach((tag) => {
            tags_array.push(tag.get_stuctrure_as_json());
        });
        return tags_array;
    }
    #set_tags_from_array(tags_array: TagInputStructure[]) {
        tags_array.forEach((output_tag) => {
            var tag = this.tags.get(output_tag["id"]);
            if (tag != null) {
                tag.set_stuctrure_from_json(output_tag);
            }
        });
    }
    #get_current_html(): string {
        let result = "";
        const html_variant = this.settings.get("html_variant");

        if (html_variant !== undefined) {
            try {
                const val = html_variant.val;
                result = this.html_variants.get(val).html;
            } catch {
                this.html_variants.forEach((element) => {
                    html_variant.val = element.html;
                    result = element.html;
                    return;
                });
            }
        }
        return result;
    }
    #render() {
        this.wrapper = $(`<div class="element-wrapper sort-element">
                            <div class="add-new-block-up"></div>
                            <div class="add-new-block-bottom"></div>
                             ${this.#get_element_bar()}
                             ${this.#get_element_html()}
                          </div>`);
        this.element_html = this.wrapper.find(".element-html");
        this.#redefinition_context_menu();
        var tmp = this.approach_id;

        this.wrapper.find(".bar-delete").on("click", function () {
            (window as unknown as MyWindow).main.blocks_model.delete_block(tmp);
        });
        const instance = this;
        this.wrapper.find(".clone-btn").on("click", function () {
            (window as unknown as MyWindow).main.blocks_model.clone_block(
                instance
            );
        });

        //add overlay
        // this.overlay_html = $(`<div data-noks-constructor-overlay-bilyalov=true></div>`).appendTo(this.wrapper);
        this.#set_onclick_event();
        this.wrapper.find(".clone-report").on("click", function () {
            $(this).parent().find(".clone-btn").toggle();
            $(this).parent().find(".report-btn").toggle();
        });
    }
    #set_onclick_event() {
        if (this.element_html) {
            var id = this.approach_id;
            this.element_html.on("click", function () {
                (
                    window as unknown as MyWindow
                ).main.blocks_model.set_focus_on_block(id);
            });
        }
    }
    #get_element_bar() {
        const btns_wrp = `<div class="element-bar">
                            <div class="bar-btn sort-handle"></div>
                            <div class="bar-btn clone-report"></div>
                            <div class="bar-btn bar-delete"></div>
                            <div class="bar-btn-lower clone-btn" style="display:none"></div>
                            <div class="bar-btn-lower report-btn" style="display:none"></div>
                          </div>`;
        // const clone_report_btn = $(btns_wrp).find('.clone-report');
        // clone_report_btn.on('click', function(e){
        //     console.log($(this).find('.clone-btn'));
        //     console.log($(this).find('.report-btn'));
        //     $(this).find('.clone-btn').css('display', 'flex');
        //     $(this).find('.report-btn').css('display', 'flex');
        //     $(this).css('height', '4em');
        // });
        return btns_wrp;
    }
    #get_element_html() {
        return `<div class = "element-html"></div>`;
    }
}
