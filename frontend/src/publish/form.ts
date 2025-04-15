import { ActionTypes, EventTypes } from "@/types";
import $ from "jquery";

import {
    getCookie,
    getMetaIdFlow,
    getMetaIdPage,
    getMetaIdSite,
} from "./helpers";
import { PublishTargetAttributes } from "./target-attributes";
import { actionsHandlers } from "./events";
import { sendGoal } from "./metric";
function validateform(form: HTMLFormElement) {
    try {
        //Добавить валидацию полей формы на соответсвие(телефон должен быть не менее 15 символов и т.д.)
        let errors = 0;
        (
            form.querySelectorAll(".form-field") as NodeListOf<HTMLElement>
        ).forEach((formField) => {
            //TODO подумать над radio buttons
            const input = formField.querySelector("input");
            if (input === null) {
                return false;
            }
            formField.classList.remove("is_error");
            if (input.getAttribute("required") !== null && input.value === "") {
                const error_text = formField.querySelector(".error-text");
                if (error_text !== null) {
                    error_text.innerHTML = "Поле должно быть заполнено";
                }
                formField.classList.add("is_error", "animate");
                setTimeout(() => {
                    formField.classList.remove("animate");
                }, 1000);
                errors++;
            }
        });

        return errors === 0;
    } catch (error) {
        console.error("form_valided", error);
        return false;
    }
}
function collectFieldsData(form: HTMLFormElement): string {
    try {
        const result: Array<{
            name: string | null;
            label: string | null;
            value: string | null;
        }> = [];
        (
            form.querySelectorAll(".form-field") as NodeListOf<HTMLElement>
        ).forEach((formField) => {
            const name =
                formField.querySelector("input")?.getAttribute("name") ??
                formField.querySelector("select")?.getAttribute("name") ??
                null;
            //TODO Убирать звездоску в конце усли поле обязательно
            let label =
                formField.querySelector(".form-field-title")?.innerHTML ?? null;
            let value: string | null = null;
            //TODO подумать над radio buttons
            if (formField.querySelector(".form-field-select")) {
                // if slider
                value = formField.querySelector("select")?.value ?? null;
            } else if (formField.querySelector(".form-field-radio")) {
                // if radio
                $(formField)
                    .find(".form-field-radio-item")
                    .each((index, el) => {
                        const jel = $(el);
                        if (jel.find("input")[0].checked) {
                            value =
                                jel.find(".form-field-radio-item__text")[0]
                                    .innerHTML ?? null;
                        }
                    });
            } else {
                const input = formField.querySelector("input");
                if (input === null) return;
                value = input.value ?? null;
                if (input.classList.contains("form-field-range__input")) {
                    //if slider-range
                    if (
                        formField
                            .querySelector(".range-outer")
                            ?.getAttribute("data-double")
                    ) {
                        const leftVal =
                            formField.querySelector(".range-runner-left .value")
                                ?.innerHTML ?? "";
                        const rightVal =
                            formField.querySelector(
                                ".range-runner-right .value"
                            )?.innerHTML ?? "";
                        value = leftVal + " - " + rightVal;
                    } else {
                        value =
                            formField.querySelector(
                                ".range-runner-right .value"
                            )?.innerHTML ?? null;
                    }
                } else if (input.getAttribute("type") === "checkbox") {
                    value = input.checked ? "1" : "0";
                    label =
                        formField.querySelector(".form-field-checkbox__name")
                            ?.innerHTML ?? null;
                }
            }

            result.push({ name: name, label: label, value: value });
        });
        return JSON.stringify(result);
    } catch (error) {
        console.error(error);
        return "";
    }
}
function send_lead(form: HTMLFormElement, button: HTMLElement) {
    try {
        button.classList.add("loading");
        const buttonTag = button.querySelector("button");
        buttonTag?.setAttribute("disabled", "true");
        const formData = new FormData();
        formData.append("fields", collectFieldsData(form));
        formData.append("url_client", document.URL);
        formData.append("id_page", getMetaIdPage());
        formData.append("id_flow", getMetaIdFlow());
        formData.append("id_site", getMetaIdSite());
        // COOKIE
        formData.append("roistat_visit", getCookie("roistat_visit"));
        formData.append("noks_visit", getCookie("noks_visit"));
        const xhr = new XMLHttpRequest();

        xhr.addEventListener("loadend", () => {
            sendGoal(form);
            const eventType = form.getAttribute(
                PublishTargetAttributes.eventType
            );
            button.classList.remove("loading");
            buttonTag?.removeAttribute("disabled");
            if (eventType && eventType === EventTypes.afterFormSend) {
                actionsHandlers(form);
            }
        });

        xhr.open(
            "POST",
            `//${window.site_domain ?? "noks.ru"}/api/constructor/save/lead`
        );
        xhr.send(formData);
    } catch (error) {
        console.error(error);
    }
}
try {
    const forms = document.querySelectorAll(
        `[${PublishTargetAttributes.form}]`
    ) as NodeListOf<HTMLFormElement>;

    forms.forEach((form) => {
        const button: HTMLElement | null = form.querySelector(
            ".form-submit.item-button"
        );
        //TODO надо оповещалку в ТГ
        if (button === null) return;
        button.addEventListener("click", (e) => {
            e.preventDefault();
            if (!validateform(form)) {
                return;
            }
            send_lead(form, button);
        });
    });
} catch (error) {
    console.error(error);
}
