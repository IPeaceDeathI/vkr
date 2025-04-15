import * as TypeString from "./../../../../vendor/inilim/js_type_string/src/String";
import * as Func from "./../../Function/General";
import { CRC32 } from "./../../App/Service/CRC32";
import { Counter as LS } from "../Service/LocalStorage/Counter";
import { Counter as COOKIE } from "../Service/Cookie/Counter";
import { DefineConstructorService } from "./../Service/SAAS/Constructor/DefineConstructorService";
import { SAASConstructorEnum } from "./../Enum/SAASConstructor/SAASConstructorEnum";

// window.lpStatDomain
// window.lpHashStatID

/**
 */
export class Counter {
    data = {};
    obj_crc32;
    names_without_prefix = ["visit", "session_visit", "view_visit"];

    constructor() {
        try {
            this.processVisit();
        } catch (e) {
            console.log("lp_stat.catch:", e);
        }

        this.data = null;

        // ------------------------------------------------------------------
        // TODO опрделеяем конструктор
        // ------------------------------------------------------------------

        try {
            this.processSetVisitToConstructor();
        } catch (e) {
            console.log("lp_stat.catch:", e);
        }
    }

    // ------------------------------------------------------------------
    // INFO подключаем скрытые поля в конструктор
    // ------------------------------------------------------------------

    processSetVisitToConstructor() {
        let res = DefineConstructorService.define();
        if (res === null) return;

        if (SAASConstructorEnum.FLEXBE === res) {
            console.log("flexbe detect");
            this.includeScript("visit_flexbe.js");
            return;
        }

        if (SAASConstructorEnum.TILDA === res) {
            console.log("tilda detect");
            this.includeScript("visit_tilda.js");
            return;
        }
    }

    includeScript(name) {
        let protocol =
            document.location.protocol == "https:" ? "https://" : "http://";
        let js = document.createElement("script");
        js.charset = "UTF-8";
        js.async = 1;
        js.src = protocol + "landing-page.su/resource/js/dist/" + name;
        let js2 = document.getElementsByTagName("script")[0];
        js2.parentNode.insertBefore(js, js2);
    }

    // ------------------------------------------------------------------
    // INFO визит
    // ------------------------------------------------------------------

    processVisit() {
        if (!this.checkHashStatID()) {
            console.log("lp_stat.error:", "hash_stat_id", this.getHashStatID());
            return;
        }

        this.obj_crc32 = new CRC32();

        // ------------------------------------------------------------------
        // заполняем data стандартными данными
        // ------------------------------------------------------------------

        this.fillDataFromEnv();

        // ------------------------------------------------------------------
        // берем из localstorage
        // ------------------------------------------------------------------

        this.fillDataFromLocalStorage();

        // ------------------------------------------------------------------
        // берем из кук
        // ------------------------------------------------------------------

        this.fillDataFromCookie();

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        this.send();
    }

    send() {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "//" + window.lpStatDomain + "/api/stat_visit");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                // ------------------------------------------------------------------
                //
                // ------------------------------------------------------------------

                let res = JSON.parse(xhr.responseText);

                // ------------------------------------------------------------------
                // записываем в куки
                // ------------------------------------------------------------------

                this.fillCookieFromResponse(res.cookie.set ?? {});

                // ------------------------------------------------------------------
                // записываем на всякий случай куки в localstorage
                // ------------------------------------------------------------------

                this.fillLocalStorageFromResponse(res.local_storage.set ?? {});

                // ------------------------------------------------------------------
                //
                // ------------------------------------------------------------------
                console.log("lp_stat.success.response:", res);
            } else {
                console.log("lp_stat.error.response:", xhr.responseText);
            }
        };

        xhr.onerror = () => {
            console.log("lp_stat.error:", xhr.statusText);
        };

        xhr.send(JSON.stringify(this.data));
    }

    getHashStatID() {
        return window.lpHashStatID ?? null;
    }

    checkHashStatID() {
        let hash = this.getHashStatID();
        if (!TypeString.isString(hash)) {
            console.log("не строка", hash);
            return false;
        }
        if (hash.length !== 40) {
            console.log("не 40 символов", hash.length);
            return false;
        }
        return true;
    }

    fillDataFromEnv() {
        this.data.hash_stat_id = this.getHashStatID();
        this.data.url_protocol = Func.getCurURLProtocol();

        this.data.url = Func.getCurURL().href;
        this.data.hash_url = this.obj_crc32.exec(this.data.url ?? "");

        this.data.domain = Func.getCurDomain();
        this.data.hash_domain = this.obj_crc32.exec(this.data.domain ?? "");

        this.data.referer_js = Func.getReferer();
        this.data.hash_referer_js = this.obj_crc32.exec(
            this.data.referer_js ?? ""
        );

        this.data.user_agent = Func.getUserAgent();
        this.data.hash_user_agent = this.obj_crc32.exec(
            this.data.user_agent ?? ""
        );

        this.data.device_memory = Func.getDeviceMemory();
        this.data.language = Func.getDocLanguage();
        this.data.platform = Func.getPlatform();
        this.data.time_zone_client = Func.getCurTimeZone();
        this.data.time_client = Func.getCurUnixTime();
        this.data.screen_size = Func.getScreenSize();
    }

    fillDataFromLocalStorage() {
        let id;
        this.data.local_storage = {};

        this.names_without_prefix.forEach((name) => {
            id = LS.get(name);
            if (TypeString.isNotEmptyString(id)) {
                this.data.local_storage[LS.getName(name)] = id;
            }
        });
    }

    fillDataFromCookie() {
        let id;
        this.data.cookie = {};

        this.names_without_prefix.forEach((name) => {
            id = COOKIE.get(name);
            this.data.cookie[COOKIE.getName(name)] = id;
        });
    }

    fillCookieFromResponse(res) {
        let id, sec;

        this.names_without_prefix.forEach((name) => {
            id = res[COOKIE.getName(name)] ?? "";
            // устанавливаем если нету или не равны
            if (TypeString.isNotEmptyString(id) && !COOKIE.isEqual(name, id)) {
                if (name === "session_visit") {
                    sec = 0;
                } else {
                    sec = 31557600;
                }
                COOKIE.set(name, id, sec);
            }
        });
    }

    fillLocalStorageFromResponse(res) {
        let id;

        this.names_without_prefix.forEach((name) => {
            id = res[LS.getName(name)] ?? "";
            if (TypeString.isNotEmptyString(id)) {
                LS.set(name, id);
            }
        });
    }
}
