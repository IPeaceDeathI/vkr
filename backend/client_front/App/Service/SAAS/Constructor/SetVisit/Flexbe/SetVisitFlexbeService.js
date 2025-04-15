import { HiddenInputEnum } from "./../../../../../Enum/SAASConstructor/HiddenInputEnum";
import { Counter as LS } from "../../../../LocalStorage/Counter";
import { Counter as COOKIE } from "../../../../Cookie/Counter";

export class SetVisitFlexbeService {
    static setVisit() {
        let forms = document.querySelectorAll("form");
        if (forms.length === 0) return;
        console.log("flexbe.forms", forms.length);
        let hidden_el = this.#getHiddenInput();
        forms.forEach((el) => {
            el.append(hidden_el.cloneNode(true));
        });
    }

    static #getHiddenInput() {
        let el, num, id;

        id = this.#getID() ?? "";
        num = 123456789;

        el = document.createElement("div");
        el.innerHTML = `
        <span class="form-field form-field-hidden" data-field-id="${num}" data-type="hidden">
            <input type="hidden" class="form-field-hidden--input" name="fields[${num}][value]" value="${id}">
            <input type="hidden" name="fields[${num}][id]" value="${num}">
            <input type="hidden" name="fields[${num}][type]" value="hidden">
            <input type="hidden" name="fields[${num}][name]" value="${HiddenInputEnum.LP_STAT_VISIT}">
        </span>
        `;

        return el.firstElementChild;
    }

    static #getID() {
        let id = COOKIE.get("visit");

        if (id !== null) return id;

        return LS.get("visit");
    }
}
