import { Directive, createApp } from "vue";

import App from "./index-c.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { router, store, vuetify, loadFonts } from "./providers";
import { redactorComponentTitle } from "@/features/structure";
import { CriticalError } from "@/shared/services/error_service";
loadFonts();
export const app = createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .use(CKEditor);

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        redactorComponentTitle: typeof redactorComponentTitle;
    }
}

// input(val: number, event: MouseEvent) {
//     return true;
// },
// change(val: number) {
//     return true;
// },
// stop() {
//     return true;
// },
// start() {
//     return true;
// },
interface onDrag {
    onInput?: (val: Сoordinates, event: MouseEvent) => any;
    onChange?: (val: Сoordinates) => any;
    onStop?: () => any;
    onStart?: () => any;
}
interface Offsets {
    init: number;
    last: number;
}
export interface Сoordinates {
    x: number;
    y: number;
}
class Drag {
    init: Сoordinates = { x: 0, y: 0 };
    last: Сoordinates = { x: 0, y: 0 };
    onDrag: onDrag;
    popa = (e: MouseEvent) => this.mouseMove(e);
    popaUp = (e: MouseEvent) => this.mouseUp(e);
    constructor(onDrag: onDrag, el: HTMLElement) {
        this.onDrag = onDrag;
        el.addEventListener("mousedown", (e: MouseEvent) => this.mouseDown(e));
    }
    private mouseDown(event: MouseEvent) {
        event.preventDefault();
        document.addEventListener("mousemove", this.popa);
        document.addEventListener("mouseup", this.popaUp);
        this.last.y = event.screenY;
        this.last.x = event.screenX;
        if (this.onDrag.onStart) this.onDrag.onStart();
    }
    private mouseMove(event: MouseEvent) {
        event.preventDefault();
        if (event.which == 0) {
            this.mouseUp(event);
            return;
        }
        const change = {
            y: this.last.y - event.screenY,
            x: this.last.x - event.screenX,
        };
        if (change.x !== 0 && change.y !== 0 && this.onDrag.onInput) {
            this.last.y = event.screenY;
            this.last.x = event.screenX;
            this.onDrag.onInput(change, event);
        }
        // if (change > 0) this.$emit("input", change, event);
        this.init.x += change.x;
        this.init.y += change.y;
    }
    private mouseUp(event: MouseEvent) {
        event.preventDefault();
        if (this.onDrag.onChange) this.onDrag.onChange(this.init);
        if (this.onDrag.onStop) this.onDrag.onStop();
        this.last = { x: 0, y: 0 };
        this.init = { x: 0, y: 0 };
        document.removeEventListener("mousemove", this.popa);
        document.removeEventListener("mouseup", this.popaUp);
    }
}
app.component("redactorComponentTitle", redactorComponentTitle);
app.config.errorHandler = (err, vm) => {
    if (process.env.NODE_ENV === "production")
        new CriticalError({
            isNotification: false,
            bundle: "GLOBAL VUE",
            message: JSON.stringify([err, vm]),
        });
    else {
        throw err;
    }
};
app.directive("on-drag", <Directive<HTMLElement, onDrag>>{
    mounted(el, { value }) {
        //TODO оптимизация?
        new Drag(value, el);
    },
});

// import ace from "ace";
// import "ace/src-min-noconflict/ace";
// import "ace/src-min-noconflict/theme-tomorrow";
// import "ace/src-min-noconflict/mode-html";
// import "ace/src-min-noconflict/mode-css";
// import "ace/src-min-noconflict/mode-javascript";

// import htmlWorker from "ace/src-min-noconflict/worker-html";
// import cssWorker from "ace/src-min-noconflict/worker-css";
// import javascriptWorker from "ace/src-min-noconflict/worker-javascript";
