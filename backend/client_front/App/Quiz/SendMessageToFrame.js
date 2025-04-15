import * as TypeObject from "./../../../../vendor/inilim/js_type_string/src/Object";

/**
 * отправляем сообщение в окно фрейма
 */
export class SendMessageToFrame {
    /**
     *
     * @param {HTMLElement} el
     * @param {Object} object
     * @returns {void}
     */
    static send(el, object) {
        if (!TypeObject.isObject(object)) {
            console.log("SendMessageToFrame.value.not_object", object);
            return;
        }

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        try {
            el.contentWindow.postMessage(
                JSON.stringify(object),
                "https://landing-page.su"
                // "http://noks.local"
            );
            console.log("SendMessageToFrame.send", object);
        } catch (e) {
            console.log("SendMessageToFrame.exception", e, object);
        }
    }
}
