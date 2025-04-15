import Api from "@/classes/Api";
import { waitForEl } from "@/helpers/helpers";
import MessagesIndicator from "@/services/MessagesIndicator";
import { ModalHelper } from "@/helpers/modal";
import { EnumMessagesStatus } from "@/services/MessagesIndicator";

class FrameContentWrapper {
    jquery = `<div></div>`;
    constructor(parent) {
        this.parent = parent;
    }
    async close() {
        return true;
    }
    get_jquery() {
        return this.jquery;
    }
    filling_main_wrapper() {
        return;
    }
    _after_create() {
        this._create_main_wrapper();
        this._create_content_wrapper();
        this._create_toolbar();
        // this.set_message();
        // console.log('qsqqwqw after_create');
        // this._create_message_wrapper();
    }
    _filling_main_wrapper_template() {
        return;
    }
    _create_main_wrapper() {
        this.main_wrapper = $(`<div class="frame-content-main-wrapper"></div>`);
        this.jquery.append(this.main_wrapper);
    }
    _create_content_wrapper() {
        this.content_wrapper = $(
            `<div class="frame-content-wrapper-loading"></div>`
        );
        this.main_wrapper.append(this.content_wrapper);
    }
    _create_toolbar() {
        //this._create_toolbar_template();
        // this.toolbar = $(`<div class='frame-content-main-toolbar'></div>`);
        // this.content_wrapper.append(this.toolbar);
        // this._filling_toolbar();
    }
    _create_toolbar_template() {
        // this.toolbar = $(`<div class='frame-content-main-toolbar'></div>`);
    }
    get_message() {
        return this.set_info_message();
    }
}
class SelectEntityWrapper extends FrameContentWrapper {
    constructor(parent) {
        super(parent);
        this.jquery = $(`<div class="select-entity-wrapper"></div>`);
        this._after_create();
        this.filling_main_wrapper();
    }
    filling_main_wrapper() {
        this.main_wrapper.remove();
        this.main_wrapper = $(
            `<div class="frame-content-main-wrapper select-entity"></div>`
        );
        this.main_wrapper.appendTo(this.jquery);
        let quiz_wrapper = $(
            `<div class="frame-content-entity-item"><div class="frame-content-entity-item-top"><div class="frame-content-entity-id">Добавить Квиз</div></div><div class="frame-content-entity-item-body"><img src="/v0020/constructor/images/image-form.jpg"></div></div>`
        ).on("click", () => {
            //$(`<div><div class="add-new-block-first hint-block hint-block-blocks"><div class="hint-block-blocks-text">Добавить квиз</div><div class="hint-block-blocks-svg"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,11H17.5V3a1,1,0,0,0-1-1h-9a1,1,0,0,0-1,1v8H3a1,1,0,0,0-1,1v9a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V12A1,1,0,0,0,21,11ZM11,20H4V13h7ZM8.5,11V4h7v7ZM20,20H13V13h7Z"></path></svg></div></div></div>`)
            this.parent.set_param({ entity: EnumFrameContent.QUIZ });
        });
        let form_wrapper = $(
            `<div class="frame-content-entity-item"><div class="frame-content-entity-item-top"><div class="frame-content-entity-id">Добавить Форму</div></div><div class="frame-content-entity-item-body"><img src="/v0020/constructor/images/image-form.jpg"></div></div>`
        ).on("click", () => {
            this.parent.set_param({ entity: EnumFrameContent.FORM });
        });
        this.main_wrapper.append(quiz_wrapper);
        this.main_wrapper.append(form_wrapper);
    }
    _create_toolbar_template() {
        this.toolbar = $(
            `<div class="select-entity-wrapper-toolbar">Выберите элемент</div>`
        );
    }
    _filling_toolbar() {
        return;
    }
    set_info_message() {
        return "Выбирайте квиз или форму";
    }
}
// SelectEntityIdWrapper
class SelectEntityIdWrapperState {
    constructor(parent) {
        this.parent = parent;
    }
    get_items() {
        return;
    }
    get_item(item_data) {
        return null;
    }
}
class QuizState extends SelectEntityIdWrapperState {
    constructor(parent) {
        super(parent);
    }
    get_items() {
        Api.get_all_quiz()
            .then((forms) => {
                this.parent.filling_main_wrapper(forms);
            })
            .catch((err) => {});
    }
    get_item(item_data) {
        let item = $(`<div class="frame-content-entity-item"></div>`);
        let top_item = $(
            `<div class="frame-content-entity-item-top"></div>`
        ).appendTo(item);
        let top_id = $(
            `<div class="frame-content-entity-id">${item_data.quiz_title}</div>`
        ).appendTo(top_item);
        let edit = $(
            `<button class="frame-content-entity-item-edit" title="Редактировать"></button>`
        ).appendTo(top_item); //Редактировать
        let deleteEntity = $(
            `<button class="frame-content-entity-item-delete" title="Удалить"></button>`
        ).appendTo(top_item); //Удалить
        let select = $(
            `<button class="frame-content-entity-item-select" title="Выбрать"></button>`
        ).appendTo(top_item); //Выбрать
        let body_item = $(
            `<div class="frame-content-entity-item-body"><img src="/v0020/constructor/images/image-form.jpg"/></div>`
        ).appendTo(item);
        edit.on("click", () => {
            this.parent.parent.set_param({
                entity: this.parent.entity,
                entity_id: item_data.quiz_id,
            });
        });
        select.on("click", () => {
            this.parent.parent.set_param_to_parent_tag({
                entity: this.parent.entity,
                entity_id: item_data.quiz_id,
            });
        });
        deleteEntity.on("click", async () => {
            try {
                const result = await Api.deleteQuizById(item_data.quiz_id);
                if (result) {
                    item.remove();
                }
            } catch (error) {
                console.log(error);
            }
        });
        return item;
    }
}
class FormState extends SelectEntityIdWrapperState {
    constructor(parent) {
        super(parent);
    }
    get_items() {
        Api.get_all_form()
            .then((forms) => {
                this.parent.filling_main_wrapper(forms);
            })
            .catch((err) => {});
    }
    get_item(item_data) {
        let item = $(`<div class="frame-content-entity-item"></div>`);
        let top_item = $(
            `<div class="frame-content-entity-item-top"></div>`
        ).appendTo(item);
        let top_id = $(
            `<div class="frame-content-entity-id">${item_data.form_title}</div>`
        ).appendTo(top_item);
        let edit = $(
            `<button class="frame-content-entity-item-edit" title="Редактировать"></button>`
        ).appendTo(top_item); //Редактировать
        let deleteEntity = $(
            `<button class="frame-content-entity-item-delete" title="Удалить"></button>`
        ).appendTo(top_item); //Удалить
        let select = $(
            `<button class="frame-content-entity-item-select" title="Выбрать"></button>`
        ).appendTo(top_item); //Выбрать

        let form_src = item_data.preview_src ?? false;
        form_src = form_src
            ? form_src
            : "/v0020/constructor/images/image-form.jpg";
        let body_item = $(
            `<div class="frame-content-entity-item-body"><div class="frame-content-entity-item-body-image"  style="background-image:url(${form_src})"></div></div>`
        ).appendTo(item);
        edit.on("click", () => {
            this.parent.parent.set_param({
                entity: this.parent.entity,
                entity_id: item_data.form_id,
            });
        });
        select.on("click", () => {
            this.parent.parent.set_param_to_parent_tag({
                entity: this.parent.entity,
                entity_id: item_data.form_id,
            });
        });
        deleteEntity.on("click", async () => {
            try {
                const result = await Api.deleteFormById(item_data.form_id);
                if (result) {
                    item.remove();
                }
            } catch (error) {
                console.log(error);
            }
        });
        return item;
    }
}
class SelectEntityIdWrapper extends FrameContentWrapper {
    constructor(parent, entity) {
        super(parent);
        this.entity = entity;
        this.jquery = $(`<div class="select-entity-id-wrapper"></div>`);
        this._after_create();
        this._filling_toolbar();
        if (entity == EnumFrameContent.QUIZ) {
            this.state = new QuizState(this);
        } else {
            this.state = new FormState(this);
        }
        this.state.get_items();
    }
    /**
     *
     * @param {Array} array_of_entity
     * @returns
     */
    filling_main_wrapper(array_of_entity) {
        if (array_of_entity instanceof Array) {
            this.main_wrapper.remove();
            this.main_wrapper = $(
                `<div class="frame-content-main-wrapper entity-id"></div>`
            );
            this.main_wrapper.appendTo(this.jquery);
            if (array_of_entity.length < 1) {
                this.main_wrapper.append(
                    '<div> <p class="info_message">У Вас нет готовых сущностей</p></div>'
                );
            } else {
                array_of_entity.forEach((element) => {
                    this.main_wrapper.prepend(this.state.get_item(element));
                });
            }
        }
    }
    _create_toolbar_template() {
        this.toolbar = $(
            `<div class="select-entity-id-wrapper-toolbar" style="display : flex"></div>`
        );
    }
    _filling_toolbar() {
        const buttons_wrapper = $(`<div style="display: flex;"><div>`);
        const back_btn = $(
            `<button class="back" style="margin-right: 10px;">Назад</button>`
        ).on("click", () => {
            this.parent.set_param();
        });
        this.add_new_btn = $(
            `<button class="back frame-add-new-entity-btn" s>Создать</button>`
        ).on("click", () => {
            this.add_new();
        });
        buttons_wrapper.append(back_btn);
        buttons_wrapper.append(this.add_new_btn);
        this.jquery.append(buttons_wrapper);
    }
    add_new() {
        this.main_wrapper.html("");
        this.main_wrapper.removeClass("entity-id");
        this.main_wrapper.addClass("edit");
        this.frame = $(
            `<iframe src="/${this.entity}/add/frame" allow="fullscreen" frameborder="0" scrolling="auto" allow="autoplay"></iframe>`
        );
        this.add_new_btn
            .html("Сохранить")
            .off("click")
            .on("click", () => {
                this.#save_new_form();
            });
        this.main_wrapper.append(this.frame);
    }
    set_info_message() {
        return `Выбирайте готовый ${this.entity}`;
    }
    async #save_new_form() {
        ModalHelper.show_loading();
        this.frame.contents().find("[data-id]").trigger("click");
        const result = await waitForEl(
            this.frame.contents(),
            "[data-success]",
            50,
            100
        );
        ModalHelper.close_loading();
        if (result == null) {
            new MessagesIndicator().showPopUpMessage({
                message: "Не удалось сохранить",
                status: EnumMessagesStatus.ERROR,
            });
        } else {
            new MessagesIndicator().showPopUpMessage({
                message: "Изменения сохранены",
                status: EnumMessagesStatus.SUCCESS,
            });
            this.parent.set_param({ entity: this.entity });
        }
    }
}
class EditEntityWrapper extends FrameContentWrapper {
    constructor(parent, entity, entity_id) {
        super(parent);
        this.entity = entity;
        this.entity_id = entity_id;
        this.exit_without_save = false;
        this.jquery = $(`<div class="edit-entity-wrapper"></div>`);
        this._filling_toolbar();
        this._after_create();
        this.filling_main_wrapper();
    }
    filling_main_wrapper() {
        this.main_wrapper.remove();
        this.main_wrapper = $(
            `<div class="frame-content-main-wrapper edit"></div>`
        );
        this.main_wrapper.appendTo(this.jquery);
        this.frame2 = $(
            `<iframe src="/${this.entity}/edit/${this.entity_id}/frame" allow="fullscreen" frameborder="0" scrolling="auto" allow="autoplay"></iframe>`
        );
        this.main_wrapper.append(this.frame2);
    }
    _create_toolbar_template() {
        this.toolbar = $(`<div class="edit-entity-wrapper-toolbar"></div>`);
    }
    _filling_toolbar() {
        const button_wrapper = $(
            `<div class="frame-content-buttons-wrapper " style="display : flex"></div>`
        );
        const back_btn = $(
            `<button class="back">Отменить выбор и вернуться</button>`
        ).on("click", () => {
            this.parent.set_param({ entity: this.entity });
        });
        const exit_without_save_btn = $(
            `<button class="back" style="margin-left:5px">Вернуться без сохранения</button>`
        ).on("click", () => {
            this.exit_without_save = true;
            this.parent.set_param({ entity: this.entity });
        });
        const select_btn = $(
            `<button class="back select" style="margin-left:5px">Сохранить и выбрать</button>`
        ).on("click", () => {
            this.parent.close_button.trigger("click");
        });
        //get autosave from localstorage
        let autosave = localStorage.getItem("frame-content-autosave");
        if (autosave == null) {
            localStorage.setItem("frame-content-autosave", false);
            autosave = false;
        }

        if (autosave != "false") autosave = "checked";
        else autosave = "";

        this.autosave_checkbox = $(`
            <div style = "display:flex; margin-top:5px;">
            <input type="checkbox" id="frame-content-autosave" ${autosave}>
                <label for="frame-content-autosave">Автосохранение при выходе</label>
            </div>
        `).on("change", () => {
            localStorage.setItem(
                "frame-content-autosave",
                this.autosave_checkbox.find("input")[0].checked
            );
        });
        //END get autosave from localstorage
        button_wrapper.append(back_btn);
        button_wrapper.append(exit_without_save_btn);
        button_wrapper.append(select_btn);

        this.jquery.append(button_wrapper);
        this.jquery.append(this.autosave_checkbox);
    }
    async close() {
        if (this.exit_without_save) return;

        if (this.autosave_checkbox.find("input")[0].checked) {
            //if autosave checked
            await this.#save_quiz();
        } else {
            if (await asyncConfirm({ message: "Сохранить изменения?" }))
                await this.#save_quiz();
        }
    }
    async #save_quiz() {
        ModalHelper.show_loading();
        this.frame2.contents().find("[data-id]").trigger("click");
        const result = await waitForEl(
            this.frame2.contents(),
            "[data-success]",
            50,
            100
        );
        ModalHelper.close_loading();
        if (result == null) {
            new MessagesIndicator().showPopUpMessage({
                message: "Не удалось сохранить квиз",
                status: EnumMessagesStatus.ERROR,
            });
        } else {
            new MessagesIndicator().showPopUpMessage({
                message: "Изменения квиза сохранены",
                status: EnumMessagesStatus.SUCCESS,
            });
        }
    }
    set_info_message() {
        return "Редактирование";
    }
}
export default class FrameContentEditor {
    pop_up = $(`<div class='frame-content-pop-up'></div>`);
    content_wrapper = $(`<div class='frame-content-wrapper'></div>`);
    flex_wrapper = $(`<div class='frame-content-flex-wrapper'></div>`);
    toolbar = $(`<div class='frame-content-main-toolbar'></div>`);
    info_wrapper = $(`<div class='frame-content-info-wrapper'></div>`);
    info_message = $(
        `<div class="frame-info-message">Сообщение информационное</div>`
    );
    static FORM_TEMPLATE = "noksgeneratedform_";
    static QUIZ_TEMPLATE = ":noksquiz_";
    /**
     *
     * @param {{entity : string,
     *          entity_id : int}} param
     */
    constructor({ tag_parent = null, parent_input = null, param = {} }) {
        this.tag_parent = tag_parent;
        this.parent_input = parent_input;
        this.entity = param.entity ?? null;
        this.entity_id = param.entity_id ?? null;
        this.#render_wrapper();
        //временно
        this.#add_flex_wrapper();
    }
    delete() {
        this.pop_up.remove();
    }
    get_pop_up() {
        return this.pop_up;
    }
    async set_param(param = {}) {
        await this.wrapper.close();
        this.entity = param.entity ?? null;
        this.entity_id = param.entity_id ?? null;
        this.#render_wrapper();
    }
    get_wrapper() {
        return this.wrapper;
    }

    async set_param_to_parent_tag(param = {}) {
        await this.wrapper.close();
        if (this.parent_input) {
            this.parent_input.val(
                FrameContentEditor.render_href_from_param(
                    param.entity ?? null,
                    param.entity_id ?? null
                )
            );
            this.parent_input.trigger("change");
        } else {
            this.tag_parent.set_param(param);
        }
        this.delete();
    }

    #add_flex_wrapper() {
        this.close_button = $('<button class="popup-close"></button>').on(
            "click",
            () => {
                this.set_param_to_parent_tag({
                    entity: this.entity,
                    entity_id: this.entity_id,
                });
            }
        );
        this.toolbar.append(this.close_button);

        this.content_wrapper.append(this.toolbar);
        this.content_wrapper.append(this.info_wrapper);

        this.content_wrapper.append(this.flex_wrapper);

        this.pop_up.append(this.content_wrapper);
        this.info_wrapper.append(this.info_message);
        //this.main_wrapper.append(close_button)
    }
    #render_wrapper() {
        if (this.entity !== null) {
            if (this.entity_id === null) {
                this.wrapper = new SelectEntityIdWrapper(this, this.entity);
            } else {
                this.wrapper = new EditEntityWrapper(
                    this,
                    this.entity,
                    this.entity_id
                );
            }
        } else {
            this.entity_id = null;
            this.wrapper = new SelectEntityWrapper(this);
        }
        this.flex_wrapper.html("");
        this.flex_wrapper.append(this.wrapper.get_jquery());
        this.info_message.html(this.wrapper.get_message());
    }
    static render_href_from_param(entity, entity_id) {
        let result = "";
        if (entity && entity_id) {
            result += "#popup";
            switch (entity) {
                case EnumFrameContent.QUIZ:
                    result += this.QUIZ_TEMPLATE;
                    break;
                case EnumFrameContent.FORM:
                    result += this.FORM_TEMPLATE;
                    break;
                default:
                    return "";
            }
            result += `${entity_id}`;
        }
        return result;
    }
    static parse_href_for_editor(href) {
        let entity = null;
        let entity_id = null;

        //find entity
        if (href.includes(this.FORM_TEMPLATE)) {
            entity = EnumFrameContent.FORM;
        } else if (href.includes(this.QUIZ_TEMPLATE)) {
            entity = EnumFrameContent.QUIZ;
        }

        //find entity_id
        if (entity) {
            const index = href.lastIndexOf("_");
            entity_id = href.substring(index + 1);
        }
        return {
            entity: entity,
            entity_id: entity_id,
        };
    }
}
