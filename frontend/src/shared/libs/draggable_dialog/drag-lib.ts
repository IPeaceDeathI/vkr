import { defineComponent } from "vue";

interface Container {
    el?: any;
    mouseStartX?: number;
    mouseStartY?: number;
    elStartX?: number;
    elStartY?: number;
    oldTransition?: string;
}

const container = {} as Container;
const wrappersSelector = ".v-overlay--active.v-dialog"; //.v-overlay--active.v-dialog
const dialogSelector = ".dragDialog"; //.v-overlay--active.v-dialog .v-overlay__content

/**
 * Find the closest dialog
 */
function closestDialog(event: MouseEvent, handle: string) {
    // check for left click
    if (event.button !== 0) {
        return;
    }

    let dialog = {} as HTMLElement;
    // target must contain one of provided classes

    const el = event.target as HTMLElement;

    if (el?.classList.contains(handle) || el.closest("." + handle)) {
        // НЕ НАХОДИТ ТУЛБАР // OFFTOP // ЕБУЧИЙ CONTAINS НЕ ПРИНИМАЕТ СЕЛЕКТОР С "." В НАЧАЛЕ, СУКА, ВЕСЬ ДЕНЬ УБИЛ НА ЭТУ ЗАЛУПУ
        dialog = el.closest(dialogSelector) as HTMLElement;
    }
    // handle.forEach((className) => {
    //     if (el.classList.contains(className)) {
    //         dialog = el.closest(dialogSelector) as HTMLElement;
    //     }
    // });
    // ['v-card__title', 'v-toolbar__content', 'v-toolbar__title'].forEach((className) => {
    //     if (el.classList.contains(className)) {
    //         dialog = el.closest(dialogSelector) as HTMLElement;
    //     }
    // });
    // if (dialog?.innerHTML?.trim() !== "") {
    //     return dialog;
    // }
    return dialog;
    // if(Object.keys(dialog).length !== 0){
    //     return dialog;
    // }
}

/**
 * Make current dialog above the rest by switching their z-indexes
 */
function makeDialogAbove(event: MouseEvent, wrappersSelector: string) {
    const wrappers = document.querySelectorAll(
        wrappersSelector
    ) as NodeListOf<HTMLElement>;
    const el = event.target as HTMLElement;
    const activeWrapper = el.closest(wrappersSelector) as HTMLElement;
    // if we clicked on non-related element
    if (!activeWrapper) {
        return false;
    }

    // list of all z-indexes of wrappers
    const indexes = [] as Array<number>;
    // collect all the indexes
    wrappers.forEach((element: HTMLElement) => {
        indexes.push(parseInt(element.style.zIndex));
    });

    const maxIndex = Math.max(...indexes);
    const currentIndex = parseInt(activeWrapper.style.zIndex);
    // if z-index of current active dialog is less than we will switch them
    // to make this dialog above the rest
    if (currentIndex < maxIndex) {
        wrappers.forEach((element) => {
            if (parseInt(element.style.zIndex) === maxIndex) {
                element.style.zIndex = currentIndex.toString();
                activeWrapper.style.zIndex = maxIndex.toString();
            }
        });
    }
}

/**
 * Assign main styles
 */
function setStyles(event: MouseEvent, handle: string) {
    const dialog = closestDialog(event, handle);

    if (dialog && dialog.parentNode) {
        document.addEventListener("mousemove", mousemove);
        container.el = dialog.parentNode;
        container.mouseStartX = event.clientX;
        container.mouseStartY = event.clientY;
        container.elStartX = container.el.getBoundingClientRect().left;
        container.elStartY = container.el.getBoundingClientRect().top;
        container.el.style.position = "fixed";
        container.oldTransition = container.el.style.transition;
        container.el.style.transition = "none";
    }
}

/**
 * Prevent out of bounds
 */
function alignDialog() {
    const dialog = document.querySelector(dialogSelector) as HTMLElement;
    if (dialog === null) return;

    const styleLeft = parseInt(dialog.style.left);
    const styleTop = parseInt(dialog.style.top);
    const boundingWidth = dialog.getBoundingClientRect().width;
    const boundingHeight = dialog.getBoundingClientRect().height;

    const left = Math.min(styleLeft, window.innerWidth - boundingWidth);
    const top = Math.min(styleTop, window.innerHeight - boundingHeight);

    // let borderLeft = 0;
    // let borderTop = 0;

    // we need to add some borders to center the dialog once the window has resized
    // if (styleLeft > window.innerWidth) {
    //     borderLeft = left / 2;
    // }

    // if (styleTop + boundingHeight > window.innerHeight) {
    //     borderTop = (window.innerHeight - boundingHeight) / 2;
    // }

    // dialog.style.left = left - borderLeft + "px";
    // dialog.style.top = top - borderTop + "px";

    dialog.style.left = left + "px";
    dialog.style.top = top + "px";
}

/**
 * Move the dialog by mouse cursor
 */
function moveDialog(event: MouseEvent) {
    if (
        container.el !== undefined &&
        container.elStartX !== undefined &&
        container.elStartY !== undefined &&
        container.mouseStartX !== undefined &&
        container.mouseStartY !== undefined
    ) {
        container.el.style.left =
            // Math.min(
            //     Math.max(
            //         container.elStartX + event.clientX - container.mouseStartX,
            //         0
            //     ),
            //     window.innerWidth - container.el.getBoundingClientRect().width
            // ) + "px";
            container.elStartX + event.clientX - container.mouseStartX + "px";

        container.el.style.top =
            // Math.min(
            //     Math.max(
            //         container.elStartY + event.clientY - container.mouseStartY,
            //         0
            //     ),
            //     window.innerHeight - container.el.getBoundingClientRect().height
            // ) + "px";
            Math.min(
                Math.max(
                    container.elStartY + event.clientY - container.mouseStartY,
                    10
                ),
                window.innerHeight - 20
            ) + "px";
        // Math.max(
        //     container.elStartY + event.clientY - container.mouseStartY,
        //     10
        // ) + "px";
    }
}

/**
 * Return the initial transition
 */
function setTransitionBack(event: MouseEvent) {
    if (
        container.el &&
        container.el.style.transition &&
        container.oldTransition
    ) {
        container.el.style.transition = container.oldTransition;
        container.el = undefined;
    }
}

function setUserSelect() {
    const card = document.querySelector(dialogSelector) as HTMLElement;
    if (card) {
        // card.style.userSelect = "none";
        document.body.style.userSelect = "none";
    }
}

function unsetUserSelect() {
    const card = document.querySelector(dialogSelector) as HTMLElement;
    if (card) {
        // card.style.userSelect = "auto";
        document.body.style.userSelect = "auto";
    }
}
function mousemove(event: MouseEvent) {
    if (event.which == 0) {
        unsetUserSelect();
        setTransitionBack(event);
        return;
    }
    setUserSelect();
    moveDialog(event);
}

function mouseup(event: MouseEvent) {
    document.removeEventListener("mousemove", mousemove);
    unsetUserSelect();
    setTransitionBack(event);
}
export default defineComponent({
    props: {
        handle: {
            type: String,
            required: true,
        },
    },
    methods: {
        mousedown(event: MouseEvent) {
            if (this.handle) {
                makeDialogAbove(event, wrappersSelector);
                setStyles(event, this.handle);
            }
        },
        removeEvents() {
            document.removeEventListener("mousedown", this.mousedown);
            document.removeEventListener("mouseup", mouseup);
        },
        activateMultipleDraggableDialogs() {
            document.addEventListener("mousedown", this.mousedown);
            document.addEventListener("mouseup", mouseup);

            // setInterval(() => {
            //     alignDialog();
            // }, 500);
        },
    },
});
