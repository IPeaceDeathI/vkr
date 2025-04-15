import * as Func from "../../Function/General";
import { getCookie } from "../../../../vendor/inilim/js_cookie/src/Cookie";
import { Counter as LCCounter } from "../Service/LocalStorage/Counter";

/**
 * класс для сбора данны об сайте клиента, для квиза
 */
export class CollectSiteInfo {
    static value = null;

    /**
     * @returns {object}
     */
    static collect() {
        if (CollectSiteInfo.value !== null) {
            return CollectSiteInfo.value;
        }

        CollectSiteInfo.value = {
            url_client: Func.getCurURL().href ?? null, // INFO очень важно!!!
            id_page: Func.getPageID(), // INFO уже не требуется
            id_site: Func.getSiteID(), // INFO уже не требуется
            id_flow: Func.getFlowID(), // INFO уже не требуется
            cookie: {},
            local_storage: {},
        };

        // ройстат визит
        CollectSiteInfo.value.cookie["roistat_visit"] =
            getCookie("roistat_visit");
        let name_visit = LCCounter.getName("visit");
        // наша кука
        CollectSiteInfo.value.cookie[name_visit] = getCookie(name_visit);
        CollectSiteInfo.value.local_storage[name_visit] =
            LCCounter.get("visit");

        console.log("CollectSiteInfo complete");
        return CollectSiteInfo.value;
    }
}
