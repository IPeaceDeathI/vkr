import { CollectSiteInfo } from "../Quiz/CollectSiteInfo";
import { FindFrames } from "../Quiz/FindFrames";

export class ReplaceURLFrame {
    constructor() {
        let vars = {
            frames: [],
            hash: "",
            url: "",
            value: "",
        };

        // selector
        try {
            vars.frames = FindFrames.find();

            if (vars.frames.length === 0) {
                return;
            }
        } catch (e) {
            console.error(e);
            return;
        }

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        vars.frames.forEach((el, index, list) => {
            try {
                vars.url = el.getAttribute("src") ?? "";
                vars.url = new URL(vars.url);

                // ------------------------------------------------------------------
                // собираем данные
                // ------------------------------------------------------------------

                vars.value = CollectSiteInfo.collect();

                // ------------------------------------------------------------------
                //
                // ------------------------------------------------------------------

                vars.hash = window.btoa(JSON.stringify(vars.value));
                vars.value = "";

                vars.url.hash = vars.hash;
                // el.src = "about:blank";
                el.src = vars.url.toString();
            } catch (e) {
                console.error(e);
            }
        }); //forEach

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------
    }
}
