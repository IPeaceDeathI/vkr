export class DefineFlexbeService {
    /**
     * @returns {bool}
     */
    define() {
        return this.#process();
    }

    // ------------------------------------------------------------------
    //
    // ------------------------------------------------------------------

    #process() {
        let selectors, status;

        status = false;
        // сигнатуры flexbe
        selectors = [
            "script#flexbe-vars",
            "div#flexbe-products-store", // после рендера пропадает
            "script#flexbe-lang",
        ];

        selectors.forEach((selector) => {
            if (status) return;
            let el = document.querySelector(selector);
            if (el !== null) status = true;
        });

        return status;
    }
}
