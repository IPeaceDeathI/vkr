import { MDCSnackbar } from "@material/snackbar";
import $ from "jquery";
export function getMetaIdPage() {
    return (
        document
            .querySelector('meta[name="id-page"]')
            ?.getAttribute("content") ?? "-1"
    );
}

export function getMetaIdSite() {
    return (
        document
            .querySelector('meta[name="id-site"]')
            ?.getAttribute("content") ?? "-1"
    );
}

export function getMetaIdFlow() {
    return (
        document
            .querySelector('meta[name="id-flow"]')
            ?.getAttribute("content") ?? "-1"
    );
}
export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
                // eslint-disable-next-line no-useless-escape
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : "null";
}
export class Snackbar {
    private static instance: Snackbar;
    private snackbar: MDCSnackbar;
    private constructor() {
        const div = document.createElement("aside");
        div.className =
            "mdc-snackbar mdc-snackbar--stacked mdc-snackbar--leading";
        div.innerHTML = `  <div
                                class="mdc-snackbar__surface"
                                role="status"
                                aria-relevant="additions"
                                >
                                <div class="mdc-snackbar__label" aria-atomic="false">
                                    Can't send photo. Retry in 5 seconds.
                                </div>
                                <div class="mdc-snackbar__actions" aria-atomic="true">
                                    <button
                                        type="button"
                                        class="mdc-button mdc-snackbar__action"
                                    >
                                        <div class="mdc-button__ripple"></div>
                                        <span class="mdc-button__label">Закрыть</span>
                                    </button>
                                </div>
                            </div>`;

        document.body.append(div);
        const selector = document.querySelector(".mdc-snackbar");
        if (selector) {
            this.snackbar = new MDCSnackbar(selector);
            const snackbarAction = selector.querySelector("button");
            snackbarAction?.addEventListener("click", () => {
                this.snackbar.close();
            });
        } else {
            this.snackbar = new MDCSnackbar(document.createElement("aside"));
        }
    }
    static get() {
        if (!Snackbar.instance) {
            Snackbar.instance = new Snackbar();
            // ... здесь единожды выполняется инициализация ...
        }
        return Snackbar.instance.snackbar;
    }
}
export function getElOffset(e: HTMLElement) {
    if (!e || !e.offsetParent) return null;
    let t = 0,
        i = 0;
    for (; e; ) {
        if ("fixed" === $.css(e, "position")) {
            (t += window.scrollY), (i += window.scrollX);
            break;
        }
        (t += e.offsetTop - e.scrollTop),
            (i += e.offsetLeft - e.scrollLeft),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            (e = e.offsetParent);
    }
    return {
        top: Math.round(t),
        left: Math.round(i),
    };
}
