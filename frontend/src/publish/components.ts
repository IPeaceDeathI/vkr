import $ from "jquery";
try {
    //initial
    const checkboxes = document.querySelectorAll(
        "label.form-field-checkbox-item"
    ) as NodeListOf<HTMLFormElement>;
    checkboxes.forEach((el) => {
        const input = el.querySelector("input.form-field-checkbox__input");
        if (input === null) return;
        if ((input.getAttribute("data-checked") ?? false) === "true") {
            input.setAttribute("checked", "");
        }
    });
    const radios = document.querySelectorAll(
        "label.form-field-radio-item"
    ) as NodeListOf<HTMLFormElement>;
    radios.forEach((el) => {
        const input = el.querySelector("input");
        if (input) {
            if ((input.getAttribute("data-checked") ?? false) === "true") {
                input.setAttribute("checked", "");
            }
        }

        el.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const isChecked = $(el).find("input")[0].checked;
            if (isChecked) return;
            $(el).find("input")[0].checked = true;
            $(el)
                .siblings("label")
                .each((index, element) => {
                    $(element).find("input")[0].checked = false;
                });
        });
    });
} catch (error) {
    console.error(error);
}
