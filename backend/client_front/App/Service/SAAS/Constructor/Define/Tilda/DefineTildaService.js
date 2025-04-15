export class DefineTildaService {
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
        // сигнатуры tilda
        selectors = [
            "[data-tilda-project-id]",
            "[data-tilda-page-id]",
            "[data-tilda-root-zone]",
            "[data-tilda-lazy]",
            "[data-tilda-cookie]",
        ];

        selectors.forEach((selector) => {
            if (status) return;
            let el = document.querySelector(selector);
            if (el !== null) status = true;
        });

        return status;
    }
}
