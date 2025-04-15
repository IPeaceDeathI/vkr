import MessagesIndicator from "@/services/MessagesIndicator";
import { EnumMessagesStatus } from "@/services/MessagesIndicator";
export default class Api {
    /**
     *
     * @param {*} block_id Если null, то блок добавляется в магазин, иначе изменяется блок с указанным id
     * @param {*} json json блока
     * @param {*} category_ids категория блока;
     * @param {*} preview_src Картинка preview блока
     */
    static getAllPublishedIds() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/blocks/method/get_all_published_ids`,
                method: "GET",
                dataType: "json",
                success: (response) => {
                    resolve(response["data"]);
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Ошибка загрузки всех блоков`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject();
                },
            });
        });
    }
    static getAllCategories() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/categories`,
                method: "GET",
                dataType: "json",
                success: (response) => {
                    resolve(response["data"] ?? []);
                },
                error: (error) => {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Ошибка загрузки категорий блоков`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    this.send_to_tg(
                        `Method: getAllCategoties(). error ${error}`
                    );
                    reject();
                },
            });
        });
    }
    static deleteFormById(form_id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/forms/${form_id}`,
                method: "DELETE",
                dataType: "json",
                success: function (response) {
                    if (response.data === true) {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Форма удалена`,
                            status: EnumMessagesStatus.SUCCESS,
                        });
                        resolve(true);
                    } else {
                        this.error("status false");
                    }
                },
                error: (error) => {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Не удалось удалить форму`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject(error);
                },
            });
        });
    }
    static deleteQuizById(form_id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/quiz/${form_id}`,
                method: "DELETE",
                dataType: "json",
                success: function (response) {
                    if (response.data === true) {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Квиз удален`,
                            status: EnumMessagesStatus.SUCCESS,
                        });
                        resolve(true);
                    } else {
                        this.error("status false");
                    }
                },
                error: (error) => {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Не удалось удалить квиз`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject(error);
                },
            });
        });
    }
    static getAllTemplateCategories() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/templates/method?method=getAllCategories`,
                method: "GET",
                dataType: "json",
                success: (response) => {
                    resolve(response["data"]);
                },
                error: (error) => {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Ошибка загрузки категорий шаблонов`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    this.send_to_tg(
                        `Method: getAllTemplateCategories(). error ${error}`
                    );
                    reject();
                },
            });
        });
    }
    static getBlocksByCategory(category_id) {
        return new Promise((resolve, reject) => {
            let blocks = [];
            $.ajax({
                url: `/api/blocks/method/get_blocks_by_category?values[]=${category_id}`,
                method: "GET",
                dataType: "json",
                success: (response) => {
                    //TODO ПЕРЕПИПИШИ БЛЯТЬ НА АССОЦИАТИЫНЙ МПССИВ
                    if (response.status === true) {
                        response["data"].forEach((block) => {
                            const preview = block["block_priority_preview_src"]
                                ? block["block_priority_preview_src"]
                                : block["block_preview_src"];
                            blocks.push([
                                block["block_name"],
                                block["block_id"],
                                preview,
                                block["user_id"],
                            ]);
                        });
                        resolve(blocks);
                    }
                    reject();
                },
                error: () => {
                    new MessagesIndicator().showPopUpMessage({
                        message: "Ошибка загрузки блоков по текущей категории",
                        status: EnumMessagesStatus.ERROR,
                    });
                    this.send_to_tg(
                        `Ошибка загрузки блоков по категории id ${category_id}`
                    );
                    reject();
                },
            });
        });
    }
    static getTplsByCategory(category_id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/templates/method?method=getTemplatesByIdCategory&values[]=${category_id}`,
                method: "GET",
                dataType: "json",
                //TODO убрать работу с данными в отдельную логигу
                async: false,
                success: (response) => {
                    try {
                        let tpls = [];
                        response["data"].forEach((tpl) => {
                            if (tpl["tpl_preview_src"] == null) {
                                tpl["tpl_preview_src"] =
                                    "/resource/img/constructor_default/block_11/1681828669_643eab3d31885.png";
                            }
                            tpls.push([
                                tpl["tpl_title"],
                                tpl["tpl_id"],
                                tpl["tpl_preview_src"],
                            ]);
                        });
                        resolve(tpls);
                    } catch (error) {
                        new MessagesIndicator().showPopUpMessage({
                            message:
                                "Ошибка загрузки шаблонов по текущей категории",
                            status: EnumMessagesStatus.ERROR,
                        });
                        this.send_to_tg(
                            `Ошибка загрузки шаблонов по категории id ${category_id} error ${error}`
                        );
                        reject();
                    }
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message:
                            "Ошибка загрузки шаблонов по текущей категории",
                        status: EnumMessagesStatus.ERROR,
                    });
                    this.send_to_tg(
                        `Ошибка загрузки шаблонов по категории id ${category_id}`
                    );
                    reject();
                },
            });
        });
    }
    static async update_block(
        block_id = null,
        json,
        category_id = [1],
        preview_src
    ) {
        return new Promise((resolve, reject) => {
            let formData = {
                block_id: block_id,
                block_structure: JSON.stringify(json),
                id_categories: json.id_categories ?? category_id,
                block_preview_src: preview_src,
            };
            let method, url;
            if (block_id) {
                method = "PUT";
                url = `/api/blocks/${block_id}`;
            } else {
                method = "POST";
                url = `/api/blocks`;
            }
            console.log(method, block_id);
            $.ajax({
                url: url,
                method: method,
                dataType: "json",
                data: formData,
                async: false,
                success: (response) => {
                    if (response.status) {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Блок ${block_id} загружен`,
                            status: EnumMessagesStatus.SUCCESS,
                        });
                        resolve();
                    } else {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Не получилось загрузить блок ${block_id}`,
                            status: EnumMessagesStatus.ERROR,
                        });
                        reject();
                    }
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Не получилось загрузить блок ${block_id}`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject();
                },
            });
        });
    }

    static send_to_tg(message = "test") {
        if (window.main.isUserBlockCreator) return;
        let id_page = window.main?.id_page ?? "Неизвестно";
        let id_site = window.main?.id_site ?? "Неизвестно";
        const formData = {
            method: "send",
            body: `id site : ${id_site};\nid page : ${id_page};\nMessage:\n\n ${message}`,
        };
        console.log(`%c${formData.body}`, "color:red");
        $.ajax({
            url: `/constructor/api/notices`,
            method: "POST",
            dataType: "json",
            data: formData,
        });
    }
    static add_block_to_favorite(block_id) {
        this.#block_favorite("addBlockToFavourite", block_id);
    }
    static delete_block_from_favorite(block_id) {
        this.#block_favorite("deleteBlockFromFavourite", block_id);
    }
    static #block_favorite(method, block_id) {
        if (block_id != null && method != null) {
            let success_message = "Успешно";
            let error_message = "Ошибка";
            let status = false;
            let ajax_method = null;
            switch (method) {
                case "addBlockToFavourite":
                    success_message = "Блок добавлен в избранное";
                    error_message = "Не удалось добавить блок в избранное";
                    status = true;
                    ajax_method = "POST";
                    break;
                case "deleteBlockFromFavourite":
                    success_message = "Блок удален из избранного";
                    error_message =
                        "Не удалось удалить блок из избранного из избранного";
                    status = null;
                    ajax_method = "DELETE";
                    break;
            }
            $.ajax({
                method: ajax_method,
                url: `/api/blocks/${block_id}/favourites`,
                dataType: "json",
                success: (response) => {
                    if (response.status) {
                        new MessagesIndicator().showPopUpMessage({
                            message: success_message,
                            status: EnumMessagesStatus.SUCCESS,
                        });
                        window.main.buffer.set_favorite_status_to_block(
                            block_id,
                            status
                        );
                    } else
                        new MessagesIndicator().showPopUpMessage({
                            message: error_message,
                            status: EnumMessagesStatus.ERROR,
                        });
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message: error_message,
                        status: EnumMessagesStatus.ERROR,
                    });
                },
            });
        }
    }
    static get_all_form() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/forms`,
                dataType: "json",
                method: "GET",
                dataType: "json",
                success: function (response) {
                    if (response.status) {
                        resolve(response.data);
                    } else this.error("status false Api.get_all_forms");
                },
                error: function (error) {
                    console.error(error);
                    new MessagesIndicator().showPopUpMessage({
                        message: "Не получилось загрузить информацию о формах",
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject();
                },
            });
        });
    }
    static save_project(ajax_method, url_save, data) {
        $.ajax({
            method: ajax_method,
            url: url_save,
            data: data,
            dataType: "json",
            success: function (data) {
                if (data.status) {
                    new MessagesIndicator().showPopUpMessage({
                        message: "Изменения успешно сохранены",
                        status: EnumMessagesStatus.SUCCESS,
                    });
                    window.main.has_change = false;
                    $(window).off("beforeunload");
                } else
                    new MessagesIndicator().showPopUpMessage({
                        message: "Не удалось сохранить страницу",
                        status: EnumMessagesStatus.ERROR,
                    });
            },
            error: function () {
                new MessagesIndicator().showPopUpMessage({
                    message: "Не удалось сохранить страницу",
                    status: EnumMessagesStatus.ERROR,
                });
            },
        });
    }
    static save_project_structure(data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: "POST",
                url: `/constructor/api/pages?method=savePageText&id_page=${window.main.id_page}`,
                data: data,
                dataType: "json",
                success: function (data) {
                    resolve("true");
                },
                error: function (error) {
                    reject(error);
                },
            });
        });
        savePageText;
    }
    static get_all_quiz() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `../constructor/api/quizs?method=getAllShortQuiz`,
                dataType: "json",
                method: "GET",
                dataType: "json",
                success: (response) => {
                    if (response.status) {
                        resolve(response.data);
                    } else
                        new MessagesIndicator().showPopUpMessage({
                            message:
                                "Не получилось загрузить информацию о квизах",
                            status: EnumMessagesStatus.ERROR,
                        });
                    reject();
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message: "Не получилось загрузить информацию о квизах",
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject();
                },
            });
        });
    }

    static async save_images_from_base64(canvas) {
        let blob = await new Promise((resolve) => canvas.toBlob(resolve));
        blob = new Blob([blob], { type: "image/jpeg" });
        return this.#save_images([blob], "file", "blob_image.jpg");
    }
    static save_images_from_files(files) {
        return this.#save_images(files, "file");
    }
    static save_images_from_urls(urls) {
        return this.#save_images(urls, "url");
    }
    static #save_images(items, type, fileName = undefined) {
        return new Promise((resolve, reject) => {
            let url_save = `https://noks-d1.ru/`;
            for (let index = 0; index < items.length; index++) {
                let formData = new FormData();
                formData.append(`${type}`, items[index], fileName);
                $.ajax({
                    url: url_save,
                    method: "POST",
                    dataType: "json",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: (response) => {
                        if (!response["status"]) {
                            new MessagesIndicator().showPopUpMessage({
                                message: "Не получилось загрузить картинку",
                                status: EnumMessagesStatus.ERROR,
                            });
                            reject();
                        }
                        resolve(response.result[0].src);
                    },
                    error: function () {
                        new MessagesIndicator().showPopUpMessage({
                            message: "Не получилось загрузить картинку",
                            status: EnumMessagesStatus.ERROR,
                        });
                        reject();
                    },
                });
            }
        });
    }
    static update_block_preview(block_id, src) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/blocks/${block_id}`,
                method: "PUT",
                dataType: "json",
                data: {
                    block_priority_preview_src: src,
                },
                async: false,
                success: (response) => {
                    if (response.status) {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Блок ${block_id} загружена картинка`,
                            status: EnumMessagesStatus.SUCCESS,
                        });
                        resolve(true);
                    } else {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Не получилось обновить картинку блок ${block_id}`,
                            status: EnumMessagesStatus.ERROR,
                        });
                        reject();
                    }
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Не получилось загрузить картинку блок ${block_id}`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject();
                },
            });
        });
    }
    static delete_block_preview(block_id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/blocks/${block_id}`,
                method: "PUT",
                dataType: "json",
                data: {
                    block_priority_preview_src: null,
                },
                async: false,
                success: (response) => {
                    if (response.status) {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Блок ${block_id} загружена картинка`,
                            status: EnumMessagesStatus.SUCCESS,
                        });
                        resolve(true);
                    } else {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Не получилось обновить картинку блок ${block_id}`,
                            status: EnumMessagesStatus.ERROR,
                        });
                        reject();
                    }
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Не получилось загрузить картинку блок ${block_id}`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject();
                },
            });
        });
    }
    static set_block_status_available(block_id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/blocks/${block_id}`,
                method: "PUT",
                dataType: "json",
                data: {
                    block_status: 1,
                },
                async: false,
                success: (response) => {
                    if (response.status) {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Блок ${block_id} загружена картинка`,
                            status: EnumMessagesStatus.SUCCESS,
                        });
                        resolve(true);
                    } else {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Не получилось обновить картинку блок ${block_id}`,
                            status: EnumMessagesStatus.ERROR,
                        });
                        reject();
                    }
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Не получилось загрузить картинку блок ${block_id}`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject();
                },
            });
        });
    }
    static set_block_status_unavailable(block_id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/blocks/${block_id}`,
                method: "PUT",
                dataType: "json",
                data: {
                    block_status: 2,
                },
                async: false,
                success: (response) => {
                    if (response.status) {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Блок ${block_id} загружена картинка`,
                            status: EnumMessagesStatus.SUCCESS,
                        });
                        resolve(true);
                    } else {
                        new MessagesIndicator().showPopUpMessage({
                            message: `Не получилось обновить картинку блок ${block_id}`,
                            status: EnumMessagesStatus.ERROR,
                        });
                        reject();
                    }
                },
                error: function () {
                    new MessagesIndicator().showPopUpMessage({
                        message: `Не получилось загрузить картинку блок ${block_id}`,
                        status: EnumMessagesStatus.ERROR,
                    });
                    reject();
                },
            });
        });
    }
}
