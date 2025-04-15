import { HiddenInputEnum } from "./../../../../../Enum/SAASConstructor/HiddenInputEnum";
import { Counter as LS } from "../../../../LocalStorage/Counter";
import { Counter as COOKIE } from "../../../../Cookie/Counter";

export class SetVisitTildaService {
    static setVisit() {
        let forms = document.querySelectorAll("form");
        if (forms.length === 0) return;
        console.log("tilda.forms", forms.length);
        let hidden_el = this.#getHiddenInput();
        console.log("tilda.form.hidden_el", hidden_el);
        forms.forEach((el) => {
            // console.log("tilda.form.el", el);
            el.append(hidden_el.cloneNode(true));
        });
    }

    static #getHiddenInput() {
        let el, id;

        id = this.#getID() ?? "";

        el = document.createElement("div");
        el.innerHTML = `
        <input type="hidden" name="${HiddenInputEnum.LP_STAT_VISIT}" value="${id}">
        `;

        return el.firstElementChild;
    }

    static #getID() {
        let id = COOKIE.get("visit");

        if (id !== null) return id;

        return LS.get("visit");
    }
}
