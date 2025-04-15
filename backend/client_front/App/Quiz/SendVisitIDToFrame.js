import { getCookie } from "../../../../vendor/inilim/js_cookie/src/Cookie";
import { FindFrames } from "../Quiz/FindFrames";
import { SendMessageToFrame } from "../Quiz/SendMessageToFrame";

/**
 * отправляем куку визита в iframe квиза
 */
export class SendVisitIDToFrame {
    vars = {
        frames: [],
        timeout: 10000,
        interval: 1000,
    };

    constructor() {
        try {
            this.process();
        } catch (e) {
            console.log("SendVisitIDToFrame.exception", e);
        }
    }

    process() {
        this.vars.frames = FindFrames.find();

        if (this.vars.frames.length === 0) {
            return;
        }

        // ------------------------------------------------------------------
        // ждем куку 10 сек с интервалом в 1 сек
        // ------------------------------------------------------------------

        this.waitForCookieVisit((visit_id) => {
            if (visit_id) {
                this.send(visit_id);
                console.log("SendVisitIDToFrame.cookie", visit_id);
            } else {
                console.log("SendVisitIDToFrame.cookie", "не найден");
            }
        });
    }

    send(visit_id) {
        // ------------------------------------------------------------------
        // отправляем куку визита в iframe квиза
        // ------------------------------------------------------------------

        this.vars.frames.forEach((el, index, list) => {
            SendMessageToFrame.send(el, {
                type: "visit",
                lp_stat_visit: visit_id,
            });
        });
    }

    waitForCookieVisit(callback) {
        const max_attempts = this.vars.timeout / this.vars.interval;
        let attempts = 0;

        const check_cookie = () => {
            const visit_id = getCookie("lp_stat_visit");

            if (visit_id !== null) {
                callback(visit_id);
            } else if (attempts < max_attempts) {
                attempts++;
                setTimeout(check_cookie, this.vars.interval);
            } else {
                callback(null);
            }
        };

        check_cookie();
    }
}
