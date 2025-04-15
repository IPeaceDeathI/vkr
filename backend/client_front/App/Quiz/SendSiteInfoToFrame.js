import { CollectSiteInfo } from "../Quiz/CollectSiteInfo";
import { FindFrames } from "../Quiz/FindFrames";
import { SendMessageToFrame } from "../Quiz/SendMessageToFrame";
/**
 * Отправляем данные клиентского сайта в окно квиза
 */
export class SendSiteInfoToFrame {
    vars = {
        frames: [],
        value: {},
    };

    constructor() {
        try {
            this.process();
        } catch (e) {
            console.log("SendSiteInfoToFrame.exception", e);
        }
    }

    process() {
        // ------------------------------------------------------------------
        // ищем квизы
        // ------------------------------------------------------------------

        this.vars.frames = FindFrames.find();

        if (this.vars.frames.length === 0) {
            return;
        }

        // ------------------------------------------------------------------
        // собираем данные
        // ------------------------------------------------------------------

        this.vars.value = CollectSiteInfo.collect();

        // ------------------------------------------------------------------
        // отправляем данные во фрейм
        // ------------------------------------------------------------------

        this.vars.frames.forEach((el, index, list) => {
            SendMessageToFrame.send(el, {
                type: "site_info",
                data: this.vars.value,
            });
        });
    }
}
