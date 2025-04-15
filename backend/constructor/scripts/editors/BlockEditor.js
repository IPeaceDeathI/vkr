import { save_block_in_db } from "@/services/blocks";
import { tempFuncSetBlock } from "@/services/blocks";
import MessagesIndicator from "@/services/MessagesIndicator";
import { EnumMessagesStatus } from "@/services/MessagesIndicator";

import Api from "@/classes/Api";
//TODO reamake :
// BlockEditor            CommonInterface
//      v          ->       v        v
// AdminPanel          AdminPanel  BlockEditor
export default class BlockEditor {
    block_id;
    //components
    close_btn;
    hide_btn;
    content_wrapper;
    current_structure;
    //inside_content_wrapper
    cw_toolbar;
    cw_btn_save;
    cw_btn_preview;
    cw_btn_copy;
    cw_btn_paste;
    cw_btn_get_json;
    cw_ta_error_screen;
    cw_ta_json;

    constructor(block_id) {
        this.block_id = block_id;
        this.wrapper = $('<div class="block-editor-wrapper"></div>');
        this._set_block_structure();
        this._render();
        this._hangingKyeCombinationButton();
        this.#update_localstorage();
    }
    delete() {
        this.wrapper.remove();
    }
    _set_block_structure() {
        this.block_structure = window.main.buffer.get_json_block(this.block_id);
        this.block_name = this.block_structure.name;
        this.block_status = this.block_structure.status;
    }
    _render() {
        $("body").append(this.wrapper);

        this.hide_btn = $('<div class="block-editor-popup-hide"></div>')
            .appendTo(this.wrapper)
            .on("click", () => {
                if (this.content_wrapper.css("display") != "none") {
                    this.content_wrapper.css("display", "none");
                } else {
                    this.content_wrapper.css("display", "flex");
                }
            });

        $(
            '<div class="block-editor-popup-title">Окно редактора</div>'
        ).appendTo(this.wrapper);

        this.close_btn = $('<div class="block-editor-popup-close"></div>')
            .appendTo(this.wrapper)
            .on("click", () => {
                this.delete();
            });

        this.content_wrapper = $(
            '<div class="block-editor-content-wrapper"></div>'
        ).appendTo(this.wrapper);
        this._render_content_wrapper();
    }
    _render_content_wrapper() {
        this.cw_toolbar = $(
            '<div class="block-editor-toolbar"></div>'
        ).appendTo(this.content_wrapper);
        this.#render_toolbar();
        this.content_wrapper.append(`<div>Структура блока</div>`);
        this.cw_ta_json = $("<textarea></textarea>").appendTo(
            this.content_wrapper
        );
        this.content_wrapper.append(`<div>Оповещения</div>`);
        this.cw_ta_error_screen = $(
            '<textarea style="heigth:350px;"></textarea>'
        ).appendTo(this.content_wrapper);
    }
    #render_toolbar() {
        $(
            `<div style="margin-right:1em; width: 100%">Вы редактируете блок <b>#${this.block_id}</b><br><b style="font-style:italic">${this.block_name}</b></div>`
        ).appendTo(this.cw_toolbar);
        this.cw_btn_save = $(
            '<div class="block-editor-button beb-save" title="Сохранить (Ctrl + a)"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                this.#save_block();
            });

        this.cw_preview = $(
            '<div class="block-editor-button beb-preview" title="Предпросмотр (Ctrl + x)"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                this.#preview_block();
            });

        this.cw_btn_copy = $(
            '<div class="block-editor-button beb-copy" title="Копировать в буфер"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                this.#copy_ta();
            });

        this.cw_btn_paste = $(
            '<div class="block-editor-button beb-paste" title="Вставить из буфера (Ctrl + a)"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                this.#past_to_ta();
            });
        this.cw_btn_get_json = $(
            '<div class="block-editor-button beb-get" title="Получить json блока в буфер"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                this.#get_json();
            });

        this.cw_btn_paste_string = $(
            '<div class="block-editor-button beb-paste" title="Вставить из буфера.Принимает текст(без Enum)."></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                this.#past_to_ta_string();
            });

        this.hidden_preview_update_input = $(
            '<input style="display: none" type="file" accept="image/png, image/jpeg, image/svg+xml, image/svg">'
        )
            .appendTo(this.cw_toolbar)
            .on("change", () => {
                this.#update_preview(
                    this.hidden_preview_update_input.prop("files")
                );
            });

        this.cw_update_preview = $(
            '<div class="block-editor-button beb-preview" title="Добавить превью для блока"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                this.hidden_preview_update_input.trigger("click");
            });

        this.cw_delete_preview = $(
            '<div class="block-editor-button beb-preview-off" title="Удалить превью блока, будет показываться автопревью"></div>'
        )
            .appendTo(this.cw_toolbar)
            .on("click", () => {
                this.#delete_preview();
            });

        this.change_status_checkbox = $(`
                <label style="margin-left: 2px" class="checkbox-ios top-menu-hide-menus-checkbox" title="Изменить статус блока">
                    <input type="checkbox" ${
                        this.block_status ? "checked" : ""
                    }>
                    <span class="checkbox-ios-switch"></span>
                </label>
                `).appendTo(this.cw_toolbar);
        this.change_status_checkbox.find("input").change(() => {
            if (this.change_status_checkbox.find("input")[0].checked == true) {
                this.#set_status_available();
            } else {
                this.#set_status_unavailable();
            }
        });

        this.autoopen_editor = $(
            `<input style="margin: 0 7px" id='noks-constructor-autoopen-editor' type='checkbox'
            ${
                JSON.parse(localStorage.getItem("noksAutoopenEditorChange"))
                    ? "checked"
                    : ""
            }>`
        )
            .appendTo(this.cw_toolbar)
            .on("change", () => {
                this.#autoopen_editor_change();
            })
            .after(
                ` <label for="noks-constructor-autoopen-editor">Автоматически открывать при загрузке<label>`
            );
    }
    _hangingKyeCombinationButton() {
        const instance = this;
        $(document).keydown(function (event) {
            // s = 83;
            // a = 65;
            // x = 88
            if ((event.ctrlKey || event.metaKey) && event.which === 83) {
                instance.cw_btn_save.trigger("click");
                event.preventDefault();
            } else if ((event.ctrlKey || event.metaKey) && event.which === 65) {
                instance.cw_btn_paste.trigger("click");
                event.preventDefault();
            } else if ((event.ctrlKey || event.metaKey) && event.which === 88) {
                instance.cw_preview.trigger("click");
                event.preventDefault();
            }
        });
    }
    #autoopen_editor_change() {
        if (this.autoopen_editor.is(":checked")) {
            localStorage.setItem("noksAutoopenEditorChange", true);
        } else {
            localStorage.setItem("noksAutoopenEditorChange", false);
        }
    }
    #update_localstorage() {
        localStorage.setItem("noksTesterLastEditedBlock", this.block_id);
    }
    async #set_status_available() {
        await this.#set_status(Api.set_block_status_available(this.block_id));
    }
    async #set_status_unavailable() {
        this.#set_status(Api.set_block_status_unavailable(this.block_id));
    }
    async #set_status(api_function) {
        tempDisabledElem(this.change_status_checkbox, true);
        try {
            await api_function;
            new MessagesIndicator().showPopUpMessage({
                message: `Статус изменен`,
                status: EnumMessagesStatus.SUCCESS,
            });
        } catch (error) {
            new MessagesIndicator().showPopUpMessage({
                message: `Не удалось изменить статус`,
                status: EnumMessagesStatus.Error,
            });
            this.change_status_checkbox.find("input")[0].checked =
                !this.change_status_checkbox.find("input")[0].checked;
        }
        tempDisabledElem(this.change_status_checkbox, false);
    }
    async #save_block() {
        // try {
        await save_block_in_db(this.block_id, this.current_structure);
        this.#send_msg("Блок загружен, спасибо, ты молодец ;)");
        // } catch (error) {
        //     this.#send_msg(
        //         "К сожалению, не получилось загрузить блок. Не унывай, проверь валидность json и попробуй еще раз!!! " +
        //             `\n${error}`,
        //         true
        //     );
        // }
    }
    async #preview_block() {
        // try {
        if (this.current_structure) {
            await tempFuncSetBlock(this.current_structure);
        } else {
            await tempFuncSetBlock(eval(this.cw_ta_json.val()));
        }
        this.#send_msg("Блок срендерен в рабочей области");
        // } catch (error) {
        //     this.#send_msg(
        //         `Не удалось вывести блок, скорее всего структура невалидна\n${error}`,
        //         true
        //     );
        // }
    }
    async #copy_ta() {
        try {
            await window.navigator.clipboard.writeText(this.cw_ta_json.val());
            this.#send_msg("Скопировано");
        } catch (error) {
            this.#send_msg(`Не удалось скопировать\n${error}`, true);
        }
    }
    async #past_to_ta() {
        try {
            console.log(window.navigator);
            console.log(window.navigator.clipboard);
            const popa = eval(await window.navigator.clipboard.readText());
            this.current_structure = popa;
            this.cw_ta_json.val(await window.navigator.clipboard.readText());
            this.#send_msg("Вставлено");
        } catch (error) {
            this.#send_msg(`Не удалось вставить 2\n${error}`, true);
        }
    }
    async #past_to_ta_string() {
        try {
            this.current_structure = JSON.parse(
                await window.navigator.clipboard.readText()
            );
            this.cw_ta_json.val(await window.navigator.clipboard.readText());
            this.#send_msg("Вставлено");
        } catch (error) {
            this.#send_msg(`Не удалось вставить 1\n${error}`, true);
        }
    }
    #send_msg($msg, error = false) {
        const color = !error ? "green" : "red";
        this.cw_ta_error_screen.val($msg).css("color", color);
    }
    async #get_json() {
        try {
            await window.navigator.clipboard.writeText(
                JSON.stringify(this.block_structure)
            );
            this.#send_msg("Json блока скопирован в буфер");
        } catch (error) {
            this.#send_msg(`Не удалось скопировать json\n${error}`, true);
        }
    }
    async #update_preview(files) {
        tempDisabledElem(this.cw_update_preview, true);
        tempDisabledElem(this.cw_delete_preview, true);
        Api.save_images_from_files(files)
            .then((image_src) => {
                return Api.update_block_preview(this.block_id, image_src);
            })
            .then((result) => {
                new MessagesIndicator().showPopUpMessage({
                    message: `Превью загружено`,
                    status: EnumMessagesStatus.SUCCESS,
                });
            })
            .catch((error) => {
                console.error(error);
                new MessagesIndicator().showPopUpMessage({
                    message: `Не удалось загрузить превью `,
                    status: EnumMessagesStatus.ERROR,
                });
            })
            .finally(() => {
                tempDisabledElem(this.cw_update_preview, false);
                tempDisabledElem(this.cw_delete_preview, false);
            });
    }
    async #delete_preview() {
        tempDisabledElem(this.cw_update_preview, true);
        tempDisabledElem(this.cw_delete_preview, true);
        Api.delete_block_preview(this.block_id)
            .then((result) => {
                new MessagesIndicator().showPopUpMessage({
                    message: `Превью удалено`,
                    status: EnumMessagesStatus.SUCCESS,
                });
            })
            .catch((error) => {
                console.error(error);
                new MessagesIndicator().showPopUpMessage({
                    message: `Не удалось удалить превью `,
                    status: EnumMessagesStatus.ERROR,
                });
            })
            .finally(() => {
                tempDisabledElem(this.cw_update_preview, false);
                tempDisabledElem(this.cw_delete_preview, false);
            });
    }
}
